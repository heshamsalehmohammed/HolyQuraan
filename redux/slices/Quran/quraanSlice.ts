import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import initialState from "./initialState";
import {
  fetchReadingsButtons,
  fetchLikedHotspots,
  fetchReadingByKey,
  likeHotspot,
  dislikeHotspot,
} from "./thunks";
import { Reading, Hotspot } from "./types";
import _ from "lodash";

const quraanSlice = createSlice({
  name: "quraan",
  initialState,
  reducers: {
    reset_quraanSlice: () => _.cloneDeep(initialState),
  },
  extraReducers: (builder) => {
    builder.addCase(fetchReadingsButtons.fulfilled, (state, action) => {
      state.readingsButtons = action.payload;
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
        (h: Hotspot) => h.key === action.payload.key
      );
      if (!exists) {
        state.likedHotspots.push(action.payload);
      }
    });

    builder.addCase(dislikeHotspot.fulfilled, (state, action) => {
      state.likedHotspots = state.likedHotspots.filter(
        (h: Hotspot) => h.key !== action.payload
      );
    });
  },
});

export const { reset_quraanSlice } = quraanSlice.actions;

export {
  fetchReadingsButtons,
  fetchLikedHotspots,
  fetchReadingByKey,
  likeHotspot,
  dislikeHotspot,
};

export default quraanSlice.reducer;
