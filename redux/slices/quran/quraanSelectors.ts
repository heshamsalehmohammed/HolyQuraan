// store/quraan/quraanSelectors.ts
import { createSelector } from "@reduxjs/toolkit";
import { HotspotType } from "./types";
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

// 🔽 Check if a hotspot is liked by its key
export const selectIsHotspotLiked = (key: string) =>
  createSelector(selectLikedHotspots, (likedHotspots) =>
    likedHotspots.some((hotspot:HotspotType) => hotspot.key === key)
  );
