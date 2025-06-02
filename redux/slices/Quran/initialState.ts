import { Reading, ReadingButton, Hotspot } from "./types";

type QuraanState = {
  readings: Record<string, Reading>;
  readingsButtons: ReadingButton[];
  selectedReadingKey: string;
  likedHotspots: Hotspot[];
};

const initialState: QuraanState = {
  readings: {},
  readingsButtons: [],
  selectedReadingKey: "hafs_shuba",
  likedHotspots: [],
};

export default initialState;
