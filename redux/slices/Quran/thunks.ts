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
export const fetchReadingsButtons = createAsyncThunk(
  "quraan/fetchReadingsButtons",
  (_: void, thunkAPI) => {
    return handleHttpRequestPromise(fetchReadingsButtonsApi()).then(
      (result) => {
        if (!result?.data) return thunkAPI.rejectWithValue({});
        return thunkAPI.fulfillWithValue(result.data);
      }
    );
  }
);

// 🔽 Liked hotspots (used in splash)
export const fetchLikedHotspots = createAsyncThunk(
  "quraan/fetchLikedHotspots",
  (_: void, thunkAPI) => {
    return handleHttpRequestPromise(fetchLikedHotspotsApi()).then((result) => {
      if (!result?.data) return thunkAPI.rejectWithValue({});
      return thunkAPI.fulfillWithValue(result.data);
    });
  }
);

// 🔽 Reading by key (used when selecting a button)
export const fetchReadingByKey = createAsyncThunk(
  "quraan/fetchReadingByKey",
  (key: string, thunkAPI) => {
    return handleHttpRequestPromise(fetchReadingByKeyApi(key)).then(
      (result) => {
        if (!result?.data) return thunkAPI.rejectWithValue({});
        return thunkAPI.fulfillWithValue({ key, data: result.data });
      }
    );
  }
);

// 🔽 Like hotspot (by ID only)
export const likeHotspot = createAsyncThunk(
  "quraan/likeHotspot",
  (id: string, thunkAPI) => {
    return handleHttpRequestPromise(likeHotspotApi(id)).then((result) => {
      if (!result?.data) return thunkAPI.rejectWithValue({});
      return thunkAPI.fulfillWithValue(result.data);
    });
  }
);

// 🔽 Dislike hotspot (by ID only)
export const dislikeHotspot = createAsyncThunk(
  "quraan/dislikeHotspot",
  (id: string, thunkAPI) => {
    return handleHttpRequestPromise(dislikeHotspotApi(id)).then((result) => {
      if (!result?.data) return thunkAPI.rejectWithValue({});
      return thunkAPI.fulfillWithValue(result.data);
    });
  }
);
