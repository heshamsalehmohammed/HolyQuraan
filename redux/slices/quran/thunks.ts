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

// 🔽 Reads buttons (used in splash)
export const fetchReadingsItems = createAsyncThunk(
  "quraan/fetchReadingsItems",
  async (_: void, thunkAPI) => {
    return handleHttpRequestPromise(fetchReadingsItemsApi())
      .then((res:any) => {
        if (!res?.data) return thunkAPI.rejectWithValue({});
        return thunkAPI.fulfillWithValue(res.data);
      })
      .catch((err) => {
        thunkAPI.rejectWithValue(err)
      });
  }
);

// 🔽 Liked hotspots (used in splash)
export const fetchLikedHotspots = createAsyncThunk(
  "quraan/fetchLikedHotspots",
  async (_: void, thunkAPI) => {
    return handleHttpRequestPromise(fetchLikedHotspotsApi())
      .then((res:any) => {
        if (!res?.data) return thunkAPI.rejectWithValue({});
        return thunkAPI.fulfillWithValue(res.data);
      })
      .catch((err) => thunkAPI.rejectWithValue(err));
  }
);

// 🔽 Last N liked hotspots
export const fetchLastNLikedHotspots = createAsyncThunk(
  "quraan/fetchLastNLikedHotspots",
  async (N: number, thunkAPI) => {
    return handleHttpRequestPromise(fetchLastNLikedHotspotsApi(N))
      .then((res:any) => {
        if (!res?.data) return thunkAPI.rejectWithValue({});
        return thunkAPI.fulfillWithValue(res.data);
      })
      .catch((err) => thunkAPI.rejectWithValue(err));
  }
);

// 🔽 Reading by key (first 5 pages)
export const fetchReadingByKey = createAsyncThunk(
  "quraan/fetchReadingByKey",
  async (key: string, thunkAPI) => {
    return handleHttpRequestPromise(fetchReadingByKeyApi(key))
      .then((res:any) => {
        if (!res?.data) return thunkAPI.rejectWithValue({});
        return thunkAPI.fulfillWithValue({ key, data: res.data });
      })
      .catch((err) => thunkAPI.rejectWithValue(err));
  }
);

// 🔽 Reading pages by key (pagination)
export const fetchReadingPagesByKey = createAsyncThunk(
  "quraan/fetchReadingPagesByKey",
  async (payload: { key: string; pagesNumber: number[] }, thunkAPI) => {
    const { key, pagesNumber } = payload;
    return handleHttpRequestPromise(fetchReadingPagesByKeyApi(key, pagesNumber),undefined, false)
      .then((res:any) => {
        if (!res?.data) return thunkAPI.rejectWithValue({});
        return thunkAPI.fulfillWithValue({ key, pagesNumber, data: res.data });
      })
      .catch((err) => thunkAPI.rejectWithValue(err));
  }
);

// 🔽 Like hotspot
export const likeHotspot = createAsyncThunk(
  "quraan/likeHotspot",
  async (id: string, thunkAPI) => {
    return handleHttpRequestPromise(likeHotspotApi(id))
      .then((res:any) => {
        if (!res?.data) return thunkAPI.rejectWithValue({});
        return thunkAPI.fulfillWithValue(res.data);
      })
      .catch((err) => thunkAPI.rejectWithValue(err));
  }
);

// 🔽 Dislike hotspot
export const dislikeHotspot = createAsyncThunk(
  "quraan/dislikeHotspot",
  async (id: string, thunkAPI) => {
    return handleHttpRequestPromise(dislikeHotspotApi(id))
      .then((res:any) => {
        if (!res?.data) return thunkAPI.rejectWithValue({});
        return thunkAPI.fulfillWithValue(res.data);
      })
      .catch((err) => thunkAPI.rejectWithValue(err));
  }
);
