export type Hotspot = {
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

export type Page = {
  pageURL: string;
  hotspots: Hotspot[];
};

export type Sura = {
  id: number;
  title: string;
  type: string;
  pageNumber: number;
  souraNumber: number;
};

export type Part = {
  id: number;
  title: string;
  pageNumber: number;
};

export type Reading = {
  id?: number;
  name?: string;
  prePagesCount?: number;
  index: Sura[];
  pages: Page[];
  parts?: Part[];
};

export type ReadingButton = {
  id: number;
  title: string;
  path: string;
  params: Record<string, any>;
  disabled: boolean;
  image: any;
  sideNotes: boolean;
};
