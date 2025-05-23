declare module "*.svg" {
  import React from "react";
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}



declare module "*.mp3" {
  const src: string;

  export default src;
}


declare module "@gorhom/bottom-sheet";
