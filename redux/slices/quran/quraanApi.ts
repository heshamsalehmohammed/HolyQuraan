import { _apirequest } from "@/services/apiRequest";

export const fetchReadingsItemsApi = async () => {
  const res = _apirequest.makeRequest("readings_Items", {}, {});
  return res;
};

export const fetchLikedHotspotsApi = async () => {
  const res = _apirequest.makeRequest("liked_hotspots", {}, {});
  return res;
};

export const fetchReadingByKeyApi = async (key: string) => {
  const res = _apirequest.makeRequest("reading_by_key", {}, { key });
  return res;
};

export const likeHotspotApi = async (hotspot: any) => {
  const res = _apirequest.makeRequest("like_hotspot", {}, hotspot);
  return res;
};

export const dislikeHotspotApi = async (key: string) => {
  const res = _apirequest.makeRequest("dislike_hotspot", {}, { key });
  return res;
};