import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchLikedHotspotsApi,
  fetchReadingsButtonsApi,
  fetchReadingByKeyApi,
  likeHotspotApi,
  dislikeHotspotApi,
} from "./quraanApi";
import { handleHttpRequestPromise } from "@/services/reduxHelpers";

// 🔽 Reads buttons (used in splash)
export const fetchReadingsButtons: any = createAsyncThunk(
  "quraan/fetchReadingsButtons",
  async (_: any, thunkAPI) => {
    return handleHttpRequestPromise(fetchReadingsButtonsApi()).then(
      (result: any) => {
        if (!result || !result.data) return thunkAPI.rejectWithValue({});
        return thunkAPI.fulfillWithValue(result.data);
      }
    );
  }
);

// 🔽 Liked hotspots (used in splash)
export const fetchLikedHotspots: any = createAsyncThunk(
  "quraan/fetchLikedHotspots",
  async (_: any, thunkAPI) => {
    return handleHttpRequestPromise(fetchLikedHotspotsApi()).then(
      (result: any) => {
        if (!result || !result.data) return thunkAPI.rejectWithValue({});
        return thunkAPI.fulfillWithValue(result.data);
      }
    );
  }
);

// 🔽 Reading by key (used when selecting a button)
export const fetchReadingByKey: any = createAsyncThunk(
  "quraan/fetchReadingByKey",
  async (key: string, thunkAPI) => {
    return handleHttpRequestPromise(fetchReadingByKeyApi(key)).then(
      (result: any) => {
        if (!result || !result.data) return thunkAPI.rejectWithValue({});
        return thunkAPI.fulfillWithValue({ key, data: result.data });
      }
    );
  }
);

// 🔽 Like hotspot
export const likeHotspot: any = createAsyncThunk(
  "quraan/likeHotspot",
  async (hotspot: any, thunkAPI) => {
    return handleHttpRequestPromise(likeHotspotApi(hotspot)).then(
      (result: any) => {
        if (!result || !result.data) return thunkAPI.rejectWithValue({});
        return thunkAPI.fulfillWithValue(result.data);
      }
    );
  }
);

// 🔽 Dislike hotspot
export const dislikeHotspot: any = createAsyncThunk(
  "quraan/dislikeHotspot",
  async (key: string, thunkAPI) => {
    return handleHttpRequestPromise(dislikeHotspotApi(key)).then(
      (result: any) => {
        if (!result || !result.data) return thunkAPI.rejectWithValue({});
        return thunkAPI.fulfillWithValue(result.data);
      }
    );
  }
);
