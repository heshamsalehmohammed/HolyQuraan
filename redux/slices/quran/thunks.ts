import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchLikedHotspotsApi,
  fetchReadingsItemsApi,
  fetchReadingByKeyApi,
  likeHotspotApi,
  dislikeHotspotApi,
} from "./quraanApi";
import { handleHttpRequestPromise } from "@/services/reduxHelpers";

// 🔽 Reads buttons (used in splash)
export const fetchReadingsItems = createAsyncThunk(
  "quraan/fetchReadingsItems",
  async (_: void, thunkAPI) => {
    return handleHttpRequestPromise(fetchReadingsItemsApi())
      .then((result: any) => {
        if (!result || !result.data) return thunkAPI.rejectWithValue({});
        return thunkAPI.fulfillWithValue(result.data);
      })
      .catch((err) => thunkAPI.rejectWithValue(err));
  }
);

// 🔽 Liked hotspots (used in splash)
export const fetchLikedHotspots = createAsyncThunk(
  "quraan/fetchLikedHotspots",
  async (_: void, thunkAPI) => {
    return handleHttpRequestPromise(fetchLikedHotspotsApi())
      .then((result: any) => {
        if (!result || !result.data) return thunkAPI.rejectWithValue({});
        return thunkAPI.fulfillWithValue(result.data);
      })
      .catch((err) => thunkAPI.rejectWithValue(err));
  }
);

// 🔽 Reading by key (used when selecting a button)
export const fetchReadingByKey = createAsyncThunk(
  "quraan/fetchReadingByKey",
  async (key: string, thunkAPI) => {
    return handleHttpRequestPromise(fetchReadingByKeyApi(key))
      .then((result: any) => {
        if (!result || !result.data) return thunkAPI.rejectWithValue({});
        return thunkAPI.fulfillWithValue({ key, data: result.data });
      })
      .catch((err) => thunkAPI.rejectWithValue(err));
  }
);

// 🔽 Like hotspot (by ID only)
export const likeHotspot = createAsyncThunk(
  "quraan/likeHotspot",
  async (id: string, thunkAPI) => {
    return handleHttpRequestPromise(likeHotspotApi(id))
      .then((result: any) => {
        if (!result || !result.data) return thunkAPI.rejectWithValue({});
        return thunkAPI.fulfillWithValue(result.data);
      })
      .catch((err) => thunkAPI.rejectWithValue(err));
  }
);

// 🔽 Dislike hotspot (by ID only)
export const dislikeHotspot = createAsyncThunk(
  "quraan/dislikeHotspot",
  async (id: string, thunkAPI) => {
    return handleHttpRequestPromise(dislikeHotspotApi(id))
      .then((result: any) => {
        if (!result || !result.data) return thunkAPI.rejectWithValue({});
        return thunkAPI.fulfillWithValue(result.data);
      })
      .catch((err) => thunkAPI.rejectWithValue(err));
  }
);
