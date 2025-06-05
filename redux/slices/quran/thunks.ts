// quraanThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchLikedHotspotsApi,
  fetchReadingsItemsApi,
  fetchReadingByKeyApi,
  fetchLastNLikedHotspotsApi,
  fetchReadingPagesByKeyApi,
  likeHotspotApi,
  dislikeHotspotApi,
} from "./quraanApi";
import { handleHttpRequestPromise } from "@/services/reduxHelpers";
import { fetchAndCacheSvgFile } from "@/services/svgFileCache";

// 🔽 Reads buttons (used in splash)
export const fetchReadingsItems = createAsyncThunk(
  "quraan/fetchReadingsItems",
  async (_: void, thunkAPI) => {
    return handleHttpRequestPromise(fetchReadingsItemsApi())
      .then((res: any) => {
        if (!res?.data) {
          console.error("fetchReadingsItems: No data returned");
          return thunkAPI.rejectWithValue({ message: "No data returned" });
        }
        return thunkAPI.fulfillWithValue(res.data);
      })
      .catch((err: any) => {
        console.error("fetchReadingsItems failed:", err?.message ?? "Unknown error");
        return thunkAPI.rejectWithValue(err?.message ?? "Unknown error");
      });
  }
);

// 🔽 Liked hotspots (used in splash)
export const fetchLikedHotspots = createAsyncThunk(
  "quraan/fetchLikedHotspots",
  async (_: void, thunkAPI) => {
    return handleHttpRequestPromise(fetchLikedHotspotsApi())
      .then(async (res: any) => {
        if (!res?.data) {
          console.error("fetchLikedHotspots: No data returned");
          return thunkAPI.rejectWithValue({ message: "No data returned" });
        }

        const hotspots: Array<{ wordURL: string }> = res.data;
        for (const hotspot of hotspots) {
          if (hotspot.wordURL) {
            await fetchAndCacheSvgFile(hotspot.wordURL).catch((e) => {
              console.error("Failed to cache hotspot.wordURL:", e.message);
            });
          }
        }

        return thunkAPI.fulfillWithValue(res.data);
      })
      .catch((err: any) => {
        console.error("fetchLikedHotspots failed:", err?.message ?? "Unknown error");
        return thunkAPI.rejectWithValue(err?.message ?? "Unknown error");
      });
  }
);

// 🔽 Last N liked hotspots
export const fetchLastNLikedHotspots = createAsyncThunk(
  "quraan/fetchLastNLikedHotspots",
  async (N: number, thunkAPI) => {
    return handleHttpRequestPromise(fetchLastNLikedHotspotsApi(N))
      .then(async (res: any) => {
        if (!res?.data) {
          console.error("fetchLastNLikedHotspots: No data returned");
          return thunkAPI.rejectWithValue({ message: "No data returned" });
        }

        const hotspots: Array<{ wordURL: string }> = res.data;
        for (const hotspot of hotspots) {
          if (hotspot.wordURL) {
            await fetchAndCacheSvgFile(hotspot.wordURL).catch((e) => {
              console.error("Failed to cache hotspot.wordURL:", e.message);
            });
          }
        }

        return thunkAPI.fulfillWithValue(res.data);
      })
      .catch((err: any) => {
        console.error("fetchLastNLikedHotspots failed:", err?.message ?? "Unknown error");
        return thunkAPI.rejectWithValue(err?.message ?? "Unknown error");
      });
  }
);

// 🔽 Like hotspot
export const likeHotspot = createAsyncThunk(
  "quraan/likeHotspot",
  async (id: string, thunkAPI) => {
    return handleHttpRequestPromise(likeHotspotApi(id))
      .then((res: any) => {
        if (!res?.data) {
          console.error("likeHotspot: No data returned");
          return thunkAPI.rejectWithValue({ message: "No data returned" });
        }
        return thunkAPI.fulfillWithValue(res.data);
      })
      .catch((err: any) => {
        console.error("likeHotspot failed:", err?.message ?? "Unknown error");
        return thunkAPI.rejectWithValue(err?.message ?? "Unknown error");
      });
  }
);

// 🔽 Dislike hotspot
export const dislikeHotspot = createAsyncThunk(
  "quraan/dislikeHotspot",
  async (id: string, thunkAPI) => {
    return handleHttpRequestPromise(dislikeHotspotApi(id))
      .then((res: any) => {
        if (!res?.data) {
          console.error("dislikeHotspot: No data returned");
          return thunkAPI.rejectWithValue({ message: "No data returned" });
        }
        return thunkAPI.fulfillWithValue(res.data);
      })
      .catch((err: any) => {
        console.error("dislikeHotspot failed:", err?.message ?? "Unknown error");
        return thunkAPI.rejectWithValue(err?.message ?? "Unknown error");
      });
  }
);

// --- helper to prefetch all SVG URLs using FileSystem helper ---
const prefetchSvgsInReading = async (data: any) => {
  const pagesRecord: Record<number, { pageURL: string; hotspots: any[] }> =
    data.pages;

  if (!pagesRecord) return;
  for (const pageKey in pagesRecord) {
    const page = pagesRecord[parseInt(pageKey, 10)];

    if (page.pageURL) {
      await fetchAndCacheSvgFile(page.pageURL).catch((e) => {
        console.error("Failed to cache page.pageURL:", e.message);
      });
    }

    if (Array.isArray(page.hotspots)) {
      for (const hotspot of page.hotspots) {
        if (hotspot.wordURL) {
          await fetchAndCacheSvgFile(hotspot.wordURL).catch((e) => {
            console.error("Failed to cache hotspot.wordURL:", e.message);
          });
        }
      }
    }
  }
};

// 🔽 Reading by key (first 5 pages)
export const fetchReadingByKey = createAsyncThunk(
  "quraan/fetchReadingByKey",
  async (key: string, thunkAPI) => {
    const state = thunkAPI.getState() as any;
    const existing = state.quraan.readings[key];
    const pages = existing?.pages;

    const hasFirstFive =
      pages && [0, 1, 2, 3, 4].every((num) => pages.hasOwnProperty(num));
    if (existing && hasFirstFive) {
      console.warn("fetchReadingByKey: Already have first five pages");
      return thunkAPI.rejectWithValue({
        message: "Already have first five pages",
      });
    }

    return handleHttpRequestPromise(fetchReadingByKeyApi(key), undefined, false)
      .then(async (res: any) => {
        if (!res?.data) {
          console.error("fetchReadingByKey: No data returned");
          return thunkAPI.rejectWithValue({ message: "No data returned" });
        }
        await prefetchSvgsInReading(res.data);
        return thunkAPI.fulfillWithValue({ key, data: res.data });
      })
      .catch((err: any) => {
        console.error("fetchReadingByKey failed:", err?.message ?? "Unknown error");
        return thunkAPI.rejectWithValue(err?.message ?? "Unknown error");
      });
  }
);

// 🔽 Reading pages by key (pagination)
export const fetchReadingPagesByKey = createAsyncThunk(
  "quraan/fetchReadingPagesByKey",
  async (payload: { key: string; pagesNumber: number[] }, thunkAPI) => {
    const { key, pagesNumber } = payload;

    return handleHttpRequestPromise(
      fetchReadingPagesByKeyApi(key, pagesNumber),
      undefined,
      false
    )
      .then(async (res: any) => {
        // `res.data` is expected to be an object mapping pageNumber → { …pageObject… }
        console.log("fetchReadingPagesByKey response data:", res?.data);

        if (!res?.data || typeof res.data !== "object") {
          console.error("fetchReadingPagesByKey: No data returned or wrong shape");
          return thunkAPI.rejectWithValue({ message: "No data returned" });
        }

        // Since backend returns:
        // {
        //   "5": { pageNumber: 5, pageURL: "...", hotspots: [ … ] },
        //   "7": { pageNumber: 7, pageURL: "...", hotspots: [ … ] },
        //   …
        // }
        // we can treat `res.data` itself as `pagesRecord`.
        const pagesRecord: Record<
          number,
          {
            pageURL: string;
            hotspots: Array<{
              wordURL: string;
              audio: string;
              // …other hotspot fields…
            }>;
            // plus any other page fields from backend
          }
        > = res.data;

        // Build a “mockReading” object with exactly that pagesRecord:
        const mockReading = { pages: pagesRecord };

        // Prefetch every page.pageURL and each hotspot.wordURL
        await prefetchSvgsInReading(mockReading);

        // Fulfill with the raw pagesRecord under `data`
        return thunkAPI.fulfillWithValue({
          key,
          pagesNumber,
          data: pagesRecord,
        });
      })
      .catch((err: any) => {
        console.error(
          "fetchReadingPagesByKey failed:",
          err?.message ?? "Unknown error"
        );
        return thunkAPI.rejectWithValue(err?.message ?? "Unknown error");
      });
  }
);