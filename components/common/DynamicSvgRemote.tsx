// DynamicSvgRemote.tsx
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import Svg, { SvgXml } from "react-native-svg";
import { useThemeColor } from "../Themed";
import { fetchAndCacheSvgFile } from "@/services/svgFileCache";

type Props = {
  uri: string;
  width?: number;
  height?: number;
};

const fillColorsToReplace = [
  "#fcbb81",
  "#c0e2ca",
  "#d0aaca",
  "#84d5f7",
  "#d4b98b",
];

export const DynamicSvgRemote: React.FC<Props> = ({ uri, width, height }) => {
  const [svgXml, setSvgXml] = useState<string | null>(null);
  const quraanFillColor = useThemeColor("quraanFillColor");
  const quraanTextColor = useThemeColor("quraanTextColor");

  useEffect(() => {
    let isMounted = true;

    const loadSvg = async () => {
      const xml = await fetchAndCacheSvgFile(uri);
      if (!xml || !isMounted) return;

      if (quraanFillColor) {
        let modified = xml;
/*         fillColorsToReplace.forEach((color) => {
          const regex = new RegExp(`fill=["']${color}["']`, "gi");
          modified = modified.replace(regex, `fill="${quraanFillColor}"`);
        }); */
        setSvgXml(modified);
      } else {
        setSvgXml(xml);
      }
    };

    loadSvg();
    return () => {
      isMounted = false;
    };
  }, [uri, quraanFillColor]);

  if (!svgXml) {
    return (
      <View
        style={{
          width: width || 100,
          height: height || 100,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <SvgXml xml={svgXml} width={width} height={height} fill={quraanTextColor} />
  );
};
