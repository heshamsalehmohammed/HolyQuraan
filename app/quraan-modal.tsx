import React, { useEffect, useRef, useState } from "react";
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
import { useLocalSearchParams } from "expo-router";
import { PagesNavigationModal } from "@/components/screens/Modals/pages/PagesNavigationModal";
import { useDispatch, useSelector } from "react-redux";
import { selectReadingByKey } from "@/redux/slices/quran/quraanSelectors";
import { ReadingType } from "@/redux/slices/quran/types";
import { fetchReadingPagesByKey } from "@/redux/slices/quran/thunks";

const { width, height: rawH } = Dimensions.get("window");
const headerH = 65;

const ZoomScrollView = createZoomListComponent(ScrollView);

export default function QuraanModal() {
  const [visiblePage, setVisiblePage] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  const hotspotModalRef = useRef<any>(null);
  const pagesNavigationModalRef = useRef<any>(null);
  const { readingKey } = useLocalSearchParams();

  const insets = useSafeAreaInsets();
  const pageH = rawH - headerH - insets.top - insets.bottom;

  const reading: ReadingType = useSelector(
    selectReadingByKey(readingKey as string)
  );

  const dispatch: any = useDispatch();

  useEffect(() => {
    if (readingKey && reading.pagesCount) {
      ensurePagesLoaded(0);
    }
  }, [readingKey, reading.pagesCount]);

  const ensurePagesLoaded = (centerPage: number) => {
    const pageRange = Array.from(
      { length: 7 },
      (_, i) => centerPage - 3 + i
    ).filter((p) => p >= 0 && p < reading.pagesCount);

    const missingPages = pageRange.filter((p) => !reading.pages[p]);
    if (missingPages.length > 0) {
      dispatch(
        fetchReadingPagesByKey({
          key: readingKey as string,
          pagesNumber: missingPages,
        })
      );
    }
  };

  const handleScroll = (e: any) => {
    const offsetY = e.nativeEvent.contentOffset.y;
    const currentPage = Math.round(offsetY / pageH);
    if (currentPage !== visiblePage) {
      setVisiblePage(currentPage);
      ensurePagesLoaded(currentPage); // 🔽 ensure buffer
    }
  };

  const scrollToPage = (pageNumber: number) => {
    const pageIndex = pageNumber - 1;
    ensurePagesLoaded(pageIndex); // 🔽 ensure 2 up/down
    scrollRef.current?.scrollTo({ y: pageIndex * pageH, animated: true });
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
          {Array.from({ length: reading.pagesCount }).map((_, pageIdx) => {
            const pageData = reading.pages[pageIdx];
            const shouldRender = Math.abs(pageIdx - visiblePage) <= 1;

            return (
              <View
                level="3"
                key={`page-container-${pageIdx}`}
                style={[styles.page, { height: pageH, width }]}
              >
                {shouldRender && pageData && (
                  <Zoom
                    key={`page-zoom-${pageData.pageURL}-${pageIdx}`}
                    maximumZoomScale={pageData.hotspots.length > 0 ? 4 : 3}
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
                        key={`page-${pageData.pageURL}-${pageIdx}`}
                        uri={pageData.pageURL}
                        width={width - 10}
                        height={pageH}
                      />
                      {pageData.hotspots.map((hotspot, index) => (
                        <Hotspot
                          key={`hotspot-${hotspot.id}-${index}`}
                          hotspot={hotspot}
                          hotspotModalRef={hotspotModalRef}
                        />
                      ))}
                    </View>
                  </Zoom>
                )}
              </View>
            );
          })}
        </ZoomScrollView>
        {reading.index && (
          <PagesNavigationModal
            sourasIndex={reading.index ?? []}
            quranParts={reading.parts ?? []}
            prePagesCount={reading.prePagesCount ?? 0}
            scrollRef={scrollRef}
            onGo={scrollToPage}
            ref={pagesNavigationModalRef}
          />
        )}
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
