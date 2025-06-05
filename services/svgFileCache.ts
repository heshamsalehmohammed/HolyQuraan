// svgFileCache.ts
import * as FileSystem from "expo-file-system";

/**
 * Given a full URL, extract its pathname (everything between domain and “?”),
 * strip any leading “/”, and then replace all “/” characters with “-”.
 *
 * Example:
 *   Input:
 *     "https://holyquraan-assets.s3.us-east-2.amazonaws.com/pages/hafs_shuba/page-005.svg?…"
 *   URL.pathname  == "/pages/hafs_shuba/page-005.svg"
 *   After strip leading "/" → "pages/hafs_shuba/page-005.svg"
 *   After replace "/" → "pages-hafs_shuba-page-005.svg"
 */
const extractFilename = (url: string): string => {
  try {
    const parsed = new URL(url);
    // parsed.pathname === "/pages/hafs_shuba/page-005.svg"
    let path = parsed.pathname;
    if (path.startsWith("/")) {
      path = path.slice(1); // "pages/hafs_shuba/page-005.svg"
    }
    return path.replace(/\//g, "-"); // "pages-hafs_shuba-page-005.svg"
  } catch {
    // Fallback: if URL constructor fails (unlikely in RN), do manual split
    const withoutQuery = url.split("?")[0]; // "https://.../pages/hafs_shuba/page-005.svg"
    const parts = withoutQuery.split("/");
    // take everything after the first domain segment
    const idx = parts.findIndex((p) => p === "pages");
    const relevant = idx >= 0 ? parts.slice(idx).join("/") : parts.pop() || "";
    return relevant.replace(/\//g, "-");
  }
};

const SVG_CACHE_DIR = `${FileSystem.documentDirectory}svgcached/`;

const ensureCacheDirExists = async (): Promise<string> => {
  if (!FileSystem.documentDirectory) {
    throw new Error("FileSystem.documentDirectory is not available");
  }
  try {
    const info = await FileSystem.getInfoAsync(SVG_CACHE_DIR);
    if (!info.exists) {
      await FileSystem.makeDirectoryAsync(SVG_CACHE_DIR, {
        intermediates: true,
      });
    }
  } catch {
    // ignore errors; next operations will handle directory creation if needed
  }
  return SVG_CACHE_DIR;
};

/**
 * Fetch an SVG from `url` and cache it under:
 *   FileSystem.documentDirectory + "svgcached/" + extractFilename(url)
 *
 * If that file already exists, read it instead of fetching.
 */
export const fetchAndCacheSvgFile = async (
  url: string
): Promise<string | null> => {
  try {
    console.log(`Ensuring cache directory exists...`);
    await ensureCacheDirExists();

    const filename = extractFilename(url); // e.g. "pages-hafs_shuba-page-005.svg"
    console.log(`Extracted filename: ${filename}`);

    const localUri = `${SVG_CACHE_DIR}${filename}`; // e.g. "file://.../svgcached/pages-hafs_shuba-page-005.svg"
    console.log(`Local URI for cached file: ${localUri}`);

    // 1) If file already on disk, read and return
    console.log(`Checking if file exists locally...`);
    const info = await FileSystem.getInfoAsync(localUri);
    if (info.exists && info.size > 0) {
      console.log(`File exists locally. Reading from disk...`);
      const cachedContent = await FileSystem.readAsStringAsync(localUri, {
        encoding: FileSystem.EncodingType.UTF8,
      });
      console.log(`Successfully read cached file.`);
      return cachedContent;
    }

    // 2) Otherwise, fetch from network, write to disk, then return
    console.log(`File not found locally. Fetching from network: ${url}`);
    const response = await fetch(url);
    if (!response.ok) {
      console.log(`Failed to download SVG at ${url}: ${response.status}`);
      return null;
    }
    const xml = await response.text();
    console.log(`Successfully fetched SVG from network. Writing to disk...`);
    await FileSystem.writeAsStringAsync(localUri, xml, {
      encoding: FileSystem.EncodingType.UTF8,
    });
    console.log(`Successfully wrote SVG to disk.`);
    return xml;
  } catch (err) {
    console.log("Error in fetchAndCacheSvgFile:", err);
    return null;
  }
};
