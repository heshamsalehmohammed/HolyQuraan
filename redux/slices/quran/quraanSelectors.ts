// store/quraan/quraanSelectors.ts
import { createSelector } from "@reduxjs/toolkit";
import { HotspotType, LikedHotspotType } from "./types";
import { RootState } from "@/redux/store";

// 🔽 Base selector
const selectQuraanState = (state: RootState) => state.quraan;

// 🔽 Readings buttons
export const selectReadingsItems = createSelector(
  selectQuraanState,
  (quraan) => quraan.readingsItems
);

// 🔽 All readings mapped by key
export const selectReadings = createSelector(
  selectQuraanState,
  (quraan) => quraan.readings
);

// 🔽 Specific reading by key
export const selectReadingByKey = (key: string) =>
  createSelector(selectQuraanState, (quraan) => quraan.readings[key]);

// 🔽 Liked hotspots
export const selectLikedHotspots = createSelector(
  selectQuraanState,
  (quraan) => quraan.likedHotspots
);

export const selectRecentLikedHotspots = createSelector(
  selectQuraanState,
  (quraan) => quraan.recentLikedHotspots
);

// 🔽 Check if a hotspot is liked by its key
export const selectIsHotspotLiked = (id: number) =>
  createSelector(selectLikedHotspots, (likedHotspots) =>
    likedHotspots.some((hotspot:LikedHotspotType) => hotspot.id === id)
  );
