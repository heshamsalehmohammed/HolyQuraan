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
import { Button, View } from "@/components/Themed";
import { readings } from "@/manager";
import { useLocalSearchParams } from "expo-router";
import { PagesNavigationModal } from "@/components/screens/Modals/pages/PagesNavigationModal";

const { width, height: rawH } = Dimensions.get("window");
const headerH = 65;

const ZoomScrollView = createZoomListComponent(ScrollView);

export default function QuraanModal() {
  const [visiblePage, setVisiblePage] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  const hotspotModalRef = useRef<any>(null);
  const pagesNavigationModalRef = useRef<any>(null);
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

  const scrollToPage = (pageNumber: number) => {
    const pageIndex = pageNumber - 1; // Convert page number to zero-based index
    scrollRef.current?.scrollTo({
      y: pageIndex * pageH,
      animated: true, // set to false for instant jump
    });
  };

  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ZoomScrollView
          ref={scrollRef}
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
                level="3"
                key={`page-container-${pageIdx}`}
                style={[styles.page, { height: pageH, width }]}
              >
                {shouldRender && (
                  <Zoom
                    key={`page-zoom-${page.pageURL}-${pageIdx}`}
                    maximumZoomScale={page.hotspots.length > 0 ? 4 : 3}
                  >
                    <View
                      level="3"
                      style={{
                        marginHorizontal: 5,
                        height: pageH,
                        width: width - 10,
                      }}
                    >
                      <DynamicSvg
                        key={`page-${page.pageURL}-${pageIdx}`}
                        uri={page?.pageURL ?? ""}
                        width={width - 10}
                        height={pageH}
                      />
                      {page.hotspots.map((hotspot, index) => (
                        <Hotspot
                          key={`hotspot-${hotspot.key}-${index}`}
                          hotspot={hotspot}
                          modalizeRef={hotspotModalRef}
                        />
                      ))}
                    </View>
                  </Zoom>
                )}
              </View>
            );
          })}
        </ZoomScrollView>
        <PagesNavigationModal
          sourasIndex={readings[readingKey].index ??[]}
          prePagesCount={readings[readingKey].prePagesCount??0}
          scrollRef={scrollRef}
          onGo={scrollToPage}
          ref={pagesNavigationModalRef}
        />
        <HotspotModal ref={hotspotModalRef} />
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
