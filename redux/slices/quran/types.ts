export type HotspotType = {
  id: number;
  key: string;
  wordURL: string;
  audio: string;
  x: number;
  y: number;
  w: number;
  h: number;
  otherAudios: string[];
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
  pageNumber: number;
  souraNumber: number;
};

export type PartType = {
  id: number;
  title: string;
  pageNumber: number;
};

export type ReadingType = {
  id?: number;
  name?: string;
  prePagesCount?: number;
  index: SuraType[];
  pages: PageType[];
  parts?: PartType[];
};

export type ReadingItemType = {
  id: number;
  title: string;
  readingKey: string;
  disabled: boolean;
  image: any;
  sideNotes: boolean;
};
