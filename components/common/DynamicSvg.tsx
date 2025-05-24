// components/DynamicSvg.tsx
import { svgMapper } from "@/manager";
import React, { useEffect, useState } from "react";
import { View } from "react-native";

type Props = {
  uri: string;
  style?: any;
  height?:number;
  width?:number;
};

export const DynamicSvg: React.FC<Props> = ({ uri, style = {}, width, height }) => {
  const SvgComponent = svgMapper[uri];
  if (!SvgComponent)
    return <View style={{ height: 80, width: 80 }} />;
  return <SvgComponent style={style} width={width} height={height} />;
};
