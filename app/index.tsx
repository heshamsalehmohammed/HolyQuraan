import React, { FC, useEffect, useState } from "react";
import { StyleSheet, SectionList, NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import { View } from "@/components/Themed";
import { readingsButtons } from "@/manager";
import LikedTracksSection from "@/components/screens/Home/LikedTracksSection";
import ReadingSection from "@/components/screens/Home/ReadingSection";
import WelcomeSection from "@/components/screens/Home/WelcomeSection";
import { useNavigation } from "expo-router";
import HomeHeader from "@/components/screens/Home/HomeHeader/HomeHeader";
import { HotspotModal } from "@/components/screens/Modals/hostspot/HotspotModal";
import { GestureHandlerRootView } from "react-native-gesture-handler";

type ReadingItem = (typeof readingsButtons)[number];

interface SectionData {
  title: string;
  data: ReadingItem[];
}

const likedTracks = [
  {
    id: 1,
    key: "page-010-hafs-00001-shuba-1",
    wordURL: "word-00001-shuba",
    audio: "00001-shuba",
    x: 295,
    y: 407,
    w: 30,
    h: 30,
    otherAudios: ["00001-hafs"],
    instruction: "إبدال الواو همزة",
    readingTitle: "قراءة شعبه",
    surahTitle: "البقرة",
    surahId: 2,
    ayaNumber: 67,
    pageNumber: 13,
  },
  {
    id: 2,
    key: "page-015-hafs-00001-shuba-2",
    wordURL: "word-00001-shuba",
    audio: "00001-shuba",
    x: 300,
    y: 410,
    w: 30,
    h: 30,
    otherAudios: ["00001-hafs"],
    instruction: "إبدال الواو همزة",
    readingTitle: "قراءة شعبه",
    surahTitle: "البقرة",
    surahId: 2,
    ayaNumber: 67,
    pageNumber: 14,
  },
  {
    id: 3,
    key: "page-020-hafs-00001-shuba-3",
    wordURL: "word-00001-shuba",
    audio: "00001-shuba",
    x: 310,
    y: 415,
    w: 30,
    h: 30,
    otherAudios: ["00001-hafs"],
    instruction: "إبدال الواو همزة",
    readingTitle: "قراءة شعبه",
    surahTitle: "البقرة",
    surahId: 2,
    ayaNumber: 67,
    pageNumber: 14,
  },
  {
    id: 4,
    key: "page-025-hafs-00001-shuba-4",
    wordURL: "word-00001-shuba",
    audio: "00001-shuba",
    x: 305,
    y: 420,
    w: 30,
    h: 30,
    otherAudios: ["00001-hafs"],
    instruction: "إبدال الواو همزة",
    readingTitle: "قراءة شعبه",
    surahTitle: "البقرة",
    surahId: 2,
    ayaNumber: 67,
    pageNumber: 14,
  },
];

const Index: FC = () => {
  /* ------------------  shadow on scroll  ------------------ */
  const [scrolled, setScrolled] = useState(false);
  const hotspotModalRef = React.useRef<any>(null);
  const navigation = useNavigation();

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
      data: readingsButtons.filter((i: any) => i.sideNotes),
    },
    {
      title: "القراءات بدون هامش",
      data: readingsButtons.filter((i: any) => !i.sideNotes),
    },
    { title: "liked", data: likedTracks },
  ];

  const renderSection = ({ section }: { section: SectionData }) => {
    if (section.title === "welcome") return <WelcomeSection />;
    if (section.title === "liked")
      return (
        <LikedTracksSection
          items={section.data}
          hotspotModalRef={hotspotModalRef}
        />
      );
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