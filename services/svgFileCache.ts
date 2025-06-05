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
    let path = parsed.pathname;
    if (path.startsWith("/")) {
      path = path.slice(1);
    }
    return path.replace(/\//g, "-");
  } catch {
    const withoutQuery = url.split("?")[0];
    const parts = withoutQuery.split("/");
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
    await ensureCacheDirExists();

    const filename = extractFilename(url);
    const localUri = `${SVG_CACHE_DIR}${filename}`;

    const info = await FileSystem.getInfoAsync(localUri);
    if (info.exists && info.size > 0) {
      const cachedContent = await FileSystem.readAsStringAsync(localUri, {
        encoding: FileSystem.EncodingType.UTF8,
      });
      return cachedContent;
    }

    const response = await fetch(url);
    if (!response.ok) {
      return null;
    }
    const xml = await response.text();
    await FileSystem.writeAsStringAsync(localUri, xml, {
      encoding: FileSystem.EncodingType.UTF8,
    });
    return xml;
  } catch {
    return null;
  }
};
