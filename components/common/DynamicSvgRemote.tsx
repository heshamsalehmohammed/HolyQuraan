import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import Svg, { SvgXml } from "react-native-svg";
import { useThemeColor } from "../Themed";

type Props = {
  uri: string;
  width?: number;
  height?: number;
};

const fillColorsToReplace = ["#fcbb81", "#c0e2ca", "#d0aaca"];

export const DynamicSvgRemote: React.FC<Props> = ({ uri, width, height }) => {
  const [svgXml, setSvgXml] = useState<string | null>(null);

  const quraanFillColor = useThemeColor("quraanFillColor");
  const quraanTextColor = useThemeColor("quraanTextColor");

  useEffect(() => {
    fetch(uri)
      .then((res) => res.text())
      .then((xml) => {
        if (quraanFillColor) {
          let modifiedXml = xml;

          fillColorsToReplace.forEach((color) => {
            const regex = new RegExp(`fill=["']${color}["']`, "gi");
            modifiedXml = modifiedXml.replace(
              regex,
              `fill="${quraanFillColor}"`
            );
          });

          setSvgXml(modifiedXml);
        } else {
          setSvgXml(xml);
        }
      })
      .catch(console.error);
  }, [uri, quraanFillColor]);

  if (!svgXml) return <ActivityIndicator />;

  return (
    <SvgXml xml={svgXml} width={width} height={height} fill={quraanTextColor} />
  );
};