import { createSlice } from "@reduxjs/toolkit";
import initialState from "./initialState";
import {
  fetchReadingsItems,
  fetchLikedHotspots,
  fetchReadingByKey,
  likeHotspot,
  dislikeHotspot,
} from "./thunks";
import { HotspotType } from "./types";
import _ from "lodash";

const quraanSlice = createSlice({
  name: "quraan",
  initialState,
  reducers: {
    reset_quraanSlice: () => _.cloneDeep(initialState),
  },
  extraReducers: (builder) => {
    builder.addCase(fetchReadingsItems.fulfilled, (state, action) => {
      state.readingsItems = action.payload;
    });

    builder.addCase(fetchLikedHotspots.fulfilled, (state, action) => {
      state.likedHotspots = action.payload;
    });

    builder.addCase(fetchReadingByKey.fulfilled, (state, action) => {
      const { key, data } = action.payload;
      state.readings[key] = data;
    });

    builder.addCase(likeHotspot.fulfilled, (state, action) => {
      const exists = state.likedHotspots.find(
        (h: HotspotType) => h.key === action.payload.key
      );
      if (!exists) {
        state.likedHotspots.push(action.payload);
      }
    });

    builder.addCase(dislikeHotspot.fulfilled, (state, action) => {
      state.likedHotspots = state.likedHotspots.filter(
        (h: HotspotType) => h.key !== action.payload
      );
    });
  },
});

export const { reset_quraanSlice } = quraanSlice.actions;

export {
  fetchReadingsItems,
  fetchLikedHotspots,
  fetchReadingByKey,
  likeHotspot,
  dislikeHotspot,
};

export default quraanSlice.reducer;
