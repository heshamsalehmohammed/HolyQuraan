import React, { useRef, useState } from "react";
import { Dimensions, StyleSheet, ScrollView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  createZoomListComponent,
  Zoom,
} from "../packages/react-native-reanimated-zoom";
import { HotspotModal } from "@/components/screens/Modals/hostspot/HotspotModal";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Hotspot from "@/components/screens/Modals/hostspot/Hotspot";

import { DynamicSvg } from "@/components/common/DynamicSvg";
import { View } from "@/components/Themed";
import { readings } from "@/manager";
import { useLocalSearchParams } from "expo-router";

const { width, height: rawH } = Dimensions.get("window");
const headerH = 65;



const ZoomScrollView = createZoomListComponent(ScrollView);


export default function QuraanModal() {


  const [visiblePage, setVisiblePage] = useState(0);



  const modalizeRef = useRef<any>(null);
  const { readingKey } = useLocalSearchParams<{
    readingKey: keyof typeof readings;
  }>();

  const insets = useSafeAreaInsets();
  const pageH = rawH - headerH - insets.top - insets.bottom;

  
  const handleScroll = (e: any) => {
    const offsetY = e.nativeEvent.contentOffset.y;
    const currentPage = Math.round(offsetY / pageH);
    if (currentPage !== visiblePage) {
      setVisiblePage(currentPage);
    }
  };
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
          onScroll={handleScroll}
        >
          {readings[readingKey].pages.map((page, pageIdx) => {
            const shouldRender = Math.abs(pageIdx - visiblePage) <= 1;

            return (
              <View
                key={`page-container-${pageIdx}`}
                style={[styles.page, { height: pageH, width }]}
              >
                {shouldRender && (
                  <Zoom
                    key={`page-zoom-${page.pageURL}-${pageIdx}`}
                    maximumZoomScale={page.hotspots.length > 0 ? 4 : 3}
                  >
                    <View level="3" style={{ height: pageH, width }}>
                      <DynamicSvg
                        key={`page-${page.pageURL}-${pageIdx}`}
                        uri={page?.pageURL ?? ""}
                        width={width}
                        height={pageH}
                      />
                      {page.hotspots.map((hotspot, index) => (
                        <Hotspot
                          key={`hotspot-${hotspot.key}-${index}`}
                          hotspot={hotspot}
                          modalizeRef={modalizeRef}
                        />
                      ))}
                    </View>
                  </Zoom>
                )}
              </View>
            );
          })}
        </ZoomScrollView>
        <HotspotModal ref={modalizeRef} />
      </GestureHandlerRootView>
    </>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  scrollContainer: { alignItems: "center" },
  page: {
    position: "relative",
  },
});
