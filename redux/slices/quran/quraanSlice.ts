import { createSlice } from "@reduxjs/toolkit";
import initialState from "./initialState";
import {
  fetchReadingsItems,
  fetchLikedHotspots,
  fetchLastNLikedHotspots,
  fetchReadingByKey,
  fetchReadingPagesByKey,
  likeHotspot,
  dislikeHotspot,
} from "./thunks";
import { LikedHotspotType } from "./types";
import _ from "lodash";

const quraanSlice = createSlice({
  name: "quraan",
  initialState,
  reducers: {
    reset_quraanSlice: () => _.cloneDeep(initialState),
  },
  extraReducers: (builder) => {
    // 🔹 Readings Items
    builder
      .addCase(fetchReadingsItems.fulfilled, (state, action) => {
        state.readingsItems = action.payload;
      })
      .addCase(fetchReadingsItems.rejected, (state) => {
        state.readingsItems = [];
      });

    // 🔹 Liked Hotspots
    builder
      .addCase(fetchLikedHotspots.fulfilled, (state, action) => {
        state.likedHotspots = action.payload;
      })
      .addCase(fetchLikedHotspots.rejected, (state) => {
        state.likedHotspots = [];
      });

    // 🔹 Last N Liked Hotspots
    builder
      .addCase(fetchLastNLikedHotspots.fulfilled, (state, action) => {
        state.recentLikedHotspots = action.payload;
      })
      .addCase(fetchLastNLikedHotspots.rejected, (state) => {
        state.recentLikedHotspots = [];
      });

    // 🔹 Reading by Key (first 5 pages)
    builder
      .addCase(fetchReadingByKey.fulfilled, (state, action) => {
        const { key, data } = action.payload;
        state.readings[key] = data;
      })
      .addCase(fetchReadingByKey.rejected, (state, action) => {
        if (action.meta.arg) {
          delete state.readings[action.meta.arg];
        }
      });

    // 🔹 Reading pages by key (pagination)
    builder.addCase(fetchReadingPagesByKey.fulfilled, (state, action) => {
      const { key, pagesNumber, data } = action.payload;
      if (!state.readings[key]?.pages) state.readings[key].pages = {};
      for (const pageNum of pagesNumber) {
        state.readings[key].pages[pageNum] = data[pageNum];
      }
    });

    // 🔹 Like Hotspot
    builder.addCase(likeHotspot.fulfilled, (state, action) => {
      const exists = state.likedHotspots.find(
        (h: LikedHotspotType) => h.id === action.payload.id
      );
      if (!exists) {
        state.likedHotspots.push(action.payload);
      }
    });

    // 🔹 Dislike Hotspot
    builder.addCase(dislikeHotspot.fulfilled, (state, action) => {
      state.likedHotspots = state.likedHotspots.filter(
        (h: LikedHotspotType) => h.id !== action.payload
      );
    });
  },
});

export const { reset_quraanSlice } = quraanSlice.actions;

export {
  fetchReadingsItems,
  fetchLikedHotspots,
  fetchLastNLikedHotspots,
  fetchReadingByKey,
  fetchReadingPagesByKey,
  likeHotspot,
  dislikeHotspot,
};

export default quraanSlice.reducer;
