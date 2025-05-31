import React, { useState, useContext } from "react";
import { StyleSheet, Pressable, Text } from "react-native";
import {
  LongPressGestureHandler,
  TapGestureHandler,
} from "react-native-gesture-handler";
import { ZoomListContext } from "../../../../packages/react-native-reanimated-zoom/zoom-list-context";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { View } from "@/components/Themed";

const AnimatedView = Animated.createAnimatedComponent(View);

export default function Hotspot({ hotspot, hotspotModalRef }: any) {

  const zoomContext = useContext(ZoomListContext);
  if (!zoomContext) throw new Error("ZoomListContext not found");

  const { scale, translationX, translationY } = zoomContext;

  const animatedStyle = useAnimatedStyle(() => ({
    position: "absolute",
    width: hotspot.w,
    height: hotspot.h,
    backgroundColor: "rgba(255, 106, 0, 0)",
    left: 0,
    top: 0,
    transform: [
      { translateX: hotspot.x * scale.value + translationX.value },
      { translateY: hotspot.y * scale.value + translationY.value },
      { scale: scale.value },
    ],
  }));

  const onTapHandler = (event: any) => {
    hotspotModalRef.current?.openWithHotspot(hotspot);
  };

  return (
    <TapGestureHandler onActivated={onTapHandler}>
      <AnimatedView style={animatedStyle} />
    </TapGestureHandler>
  );
}

const styles = StyleSheet.create({
  hotspot: {
    position: "absolute",
  },
  menu: {
    position: "absolute",
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 6,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    zIndex: 1000,
  },
  menuItem: {
    paddingVertical: 4,
    fontSize: 16,
  },
});
