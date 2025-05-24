// components/DynamicSvg.tsx
import { svgMapper } from "@/manager";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { DynamicSvgRemote } from "./DynamicSvgRemote";
import { useThemeColor } from "../Themed";

type Props = {
  uri: string;
  height?:number;
  width?:number;
};

export const DynamicSvg: React.FC<Props> = ({
  uri,
  width,
  height,
}) => {
  const SvgComponent = svgMapper[uri];

    const quraanTextColor = useThemeColor("quraanTextColor");

  if (SvgComponent)
    return (
      <SvgComponent width={width} height={height} fill={quraanTextColor} />
    );
  if (uri.startsWith("http"))
    return <DynamicSvgRemote uri={uri} width={width} height={height} />;
  return <View style={{ height, width }} />;
};