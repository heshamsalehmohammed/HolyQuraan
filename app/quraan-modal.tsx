import { useCallback, useRef, useEffect, useState, useContext } from "react";
import {
  Dimensions,
  StyleSheet,
  Pressable,
  Text,
  ScrollView,
} from "react-native";
import {
  GestureHandlerRootView,
  LongPressGestureHandler,
  TapGestureHandler,
} from "react-native-gesture-handler";
import {
  createZoomListComponent,
  Zoom,
} from "../packages/react-native-reanimated-zoom";
import { ZoomListContext } from "../packages/react-native-reanimated-zoom/zoom-list-context";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { HotspotModal } from "@/components/screens/Modals/HotspotModal";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View } from "@/components/Themed";

import Page001 from "../assets/pages/hafs/page-010.svg";
import Page002 from "../assets/pages/hafs/page-011.svg";
import Page003 from "../assets/pages/hafs/page-012.svg";

const { width, height: rawH } = Dimensions.get("window");
const headerH = 65;

const hotspots = [
  {
    page: 1,
    audio: "00001-shuba",
    x: 250,
    y: 405,
    w: 33,
    h: 30,
    otherAudios: ["00001-hafs"],
    instruction: "إبدال الواو همزة",
  },
  {
    page: 1,
    audio: "00001-shuba",
    x: 8,
    y: 405,
    w: 35,
    h: 55,
    otherAudios: ["00001-hafs"],
    instruction: "إبدال الواو همزة",
  },
];

const ZoomScrollView = createZoomListComponent(ScrollView);

export default function QuraanModal() {
  const modalizeRef = useRef<any>(null);

  const insets = useSafeAreaInsets();
  const pageH = rawH - headerH - insets.top - insets.bottom;

  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ZoomScrollView
          pagingEnabled
          minimumZoomScale={1}
          maximumZoomScale={3}
          showsHorizontalScrollIndicator={false}
          style={styles.scroll}
          contentContainerStyle={styles.scrollContainer}
        >
          {[Page001, Page002, Page003].map((Page, pageIdx) => {
            const hotspotsPerPage = hotspots
              .map((h, idx) => ({ ...h, idx }))
              .filter((h) => h.page === pageIdx + 1);

            return (
              <Zoom
                key={pageIdx}
                maximumZoomScale={hotspotsPerPage.length > 0 ? 4 : 3}
              >
                <View level="3" style={[styles.page, { height: pageH, width }]}>
                  <Page width={width} height={pageH} />

                  {hotspotsPerPage.map((hotspot, index) => (
                    <Hotspot
                      key={`idx-${index}`}
                      hotspot={hotspot}
                      modalizeRef={modalizeRef}
                    />
                  ))}
                </View>
              </Zoom>
            );
          })}
        </ZoomScrollView>
        <HotspotModal ref={modalizeRef} />
      </GestureHandlerRootView>
    </>
  );
}

const AnimatedView = Animated.createAnimatedComponent(View);

const Hotspot = ({ hotspot, modalizeRef }: any) => {
  const [menuVisible, setMenuVisible] = useState(false);

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
    modalizeRef.current?.openWithHotspot(hotspot);
  };

  const onLongPressHandler = () => {
    console.log("Hotspot long pressed");
    setMenuVisible(true);
  };

  return (
    <>
      <LongPressGestureHandler
        onActivated={onLongPressHandler}
        minDurationMs={100}
      >
        <TapGestureHandler onActivated={onTapHandler}>
          <AnimatedView style={animatedStyle} />
        </TapGestureHandler>
      </LongPressGestureHandler>

      <Menu
        x={hotspot.x * scale.value + translationX.value}
        y={
          hotspot.y * scale.value +
          translationY.value +
          hotspot.h * scale.value +
          4
        }
        menuVisible={menuVisible}
        setMenuVisible={setMenuVisible}
      />
    </>
  );
};

const Menu = ({ x, y, menuVisible, setMenuVisible }: any) => {
  if (!menuVisible) return null;
  return (
    <View style={[styles.menu, { left: x, top: y }]}>
      <Pressable onPress={() => {}}>
        <Text style={styles.menuItem}>🔊 Play</Text>
      </Pressable>
      <Pressable onPress={() => {}}>
        <Text style={styles.menuItem}>🔖 Bookmark</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          setMenuVisible(false);
        }}
      >
        <Text style={styles.menuItem}>❌ Close</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  scrollContainer: { alignItems: "center" },
  page: {
    position: "relative",
  },
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
