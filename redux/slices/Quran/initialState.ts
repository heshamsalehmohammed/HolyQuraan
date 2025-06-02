import { Reading, ReadingButton, Hotspot } from "./types";

type QuraanState = {
  readings: Record<string, Reading>;
  readingsButtons: ReadingButton[];
  likedHotspots: Hotspot[];
};

const initialState: QuraanState = {
  readings: {},
  readingsButtons: [],
  likedHotspots: [],
};

export default initialState;
