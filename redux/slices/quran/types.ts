export type HotspotType = {
  id: number;
  wordURL: string;
  audio: string;
  x: number;
  y: number;
  w: number;
  h: number;
  instruction: string;
  readingTitle: string;
  surahTitle: string;
  surahId: number;
  ayaNumber: number;
  pageNumber: number;
};

export type LikedHotspotType = {
  id: number;
  hotspotId: number;
  userId: number;
  // some details of the hotspot
  wordURL: string;
  audio: string;
  instruction: string;
  readingTitle: string;
  surahTitle: string;
  surahId: number;
  ayaNumber: number;
  pageNumber: number;
};

export type PageType = {
  pageURL: string;
  hotspots: HotspotType[];
};

export type SuraType = {
  id: number;
  title: string;
  type: string;
};

export type SuraInReadingType = {
  id: number;
  suraId: number;
  title: string;
  type: string;
  pageNumber: number;
  souraNumber: number;
};


export type PartType = {
  id: number;
  title: string;
  pageNumber: number;
};

export type PartInReadingType = {
  id: number;
  partId: number;
  title: string;
  pageNumber: number;
};

export type ReadingType = {
  id?: number;
  name?: string;
  prePagesCount?: number;
  pagesCount: number;
  index: SuraInReadingType[];
  pages: Record<number, PageType>; // ✅ changed here
  parts: PartInReadingType[];
};


export type ReadingItemType = {
  id: number;
  title: string;
  readingKey: string;
  disabled: boolean;
  image: string;
  sideNotes: boolean;
};



export type QuraanState = {
  readings: Record<string, ReadingType>;
  readingsItems: ReadingItemType[];
  likedHotspots: LikedHotspotType[];
};