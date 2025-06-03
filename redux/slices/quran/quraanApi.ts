import { _apirequest } from "@/services/apiRequest";

export const fetchReadingsItemsApi = async () => {
  const res = _apirequest.makeRequest("readings_Items", {}, {});
  return res;
};

export const fetchLikedHotspotsApi = async () => {
  const res = _apirequest.makeRequest("liked_hotspots", {}, {});
  return res;
};

export const fetchLastNLikedHotspotsApi = async (N:number) => {
  const res = _apirequest.makeRequest("last_n_liked_hotspots", {}, {N});
  return res;
};
export const likeHotspotApi = async (id: any) => {
  const res = _apirequest.makeRequest("like_hotspot", {}, id);
  return res;
};

export const dislikeHotspotApi = async (id: string) => {
  const res = _apirequest.makeRequest("dislike_hotspot", {}, { id });
  return res;
};


// will fetch all ReadingType only first 5 pages is included as pages will be fetched upon need
export const fetchReadingByKeyApi = async (key: string) => {
  const res = _apirequest.makeRequest("reading_by_key", {}, { key });
  return res;
};



export const fetchReadingPagesByKeyApi = async (key: string,pagesNumber:number[]) => {
  const res = _apirequest.makeRequest("reading_pages_by_key", {}, { key, pagesNumber });
  return res;
};