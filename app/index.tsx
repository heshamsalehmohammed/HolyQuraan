import React, { FC, useEffect, useState } from "react";
import {
  StyleSheet,
  SectionList,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { View } from "@/components/Themed";
import LikedTracksSection from "@/components/screens/Home/LikedTracksSection";
import ReadingSection from "@/components/screens/Home/ReadingSection";
import WelcomeSection from "@/components/screens/Home/WelcomeSection";
import { useNavigation } from "expo-router";
import HomeHeader from "@/components/screens/Home/HomeHeader/HomeHeader";
import { HotspotModal } from "@/components/screens/Modals/hostspot/HotspotModal";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ReadingItemType } from "@/redux/slices/quran/types";
import { useSelector } from "react-redux";
import { selectReadingsItems } from "@/redux/slices/quran/quraanSelectors";

interface SectionData {
  title: string;
  data: ReadingItemType[];
}

const Index: FC = () => {
  /* ------------------  shadow on scroll  ------------------ */
  const [scrolled, setScrolled] = useState(false);
  const hotspotModalRef = React.useRef<any>(null);
  const navigation = useNavigation();


  const readingsItems = useSelector(selectReadingsItems)

  /** whenever the flag changes, rebuild the header */
  useEffect(() => {
    navigation.setOptions({
      header: () => <HomeHeader elevated={scrolled} />,
    });
  }, [navigation, scrolled]);

  /** SectionList → onScroll */
  const handleScroll = ({
    nativeEvent,
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    // any vertical offset > 0 → show shadow
    setScrolled(nativeEvent.contentOffset.y > 0);
  };

  /* ------------------  your existing code  ------------------ */
  const sections: SectionData[] = [
    { title: "welcome", data: [] },
    {
      title: "القراءات مع الهامش",
      data: readingsItems.filter((i: ReadingItemType) => i.sideNotes),
    },
    {
      title: "القراءات بدون هامش",
      data: readingsItems.filter((i: ReadingItemType) => !i.sideNotes),
    },
    { title: "liked", data: [] },
  ];

  const renderSection = ({ section }: { section: SectionData }) => {
    if (section.title === "welcome") return <WelcomeSection />;
    if (section.title === "liked")
      return <LikedTracksSection hotspotModalRef={hotspotModalRef} />;
    return <ReadingSection title={section.title} items={section.data} />;
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container} level="3">
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id.toString()}
          renderSectionHeader={renderSection}
          renderItem={() => null}
          stickySectionHeadersEnabled={false}
          contentContainerStyle={styles.listContent}
          onScroll={handleScroll} // 👈 listen here
          scrollEventThrottle={16} //   ( ~60 fps )
        />
        <HotspotModal ref={hotspotModalRef} />
      </View>
    </GestureHandlerRootView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "flex-start" },
  listContent: {},
});
