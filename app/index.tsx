import React, { FC, useEffect, useState } from "react";
import { StyleSheet, SectionList, NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import { View } from "@/components/Themed";
import { readingsButtons } from "@/manager";
import LikedTracksSection from "@/components/screens/Home/LikedTracksSection";
import ReadingSection from "@/components/screens/Home/ReadingSection";
import WelcomeSection from "@/components/screens/Home/WelcomeSection";
import { useNavigation } from "expo-router";
import HomeHeader from "@/components/screens/Home/HomeHeader/HomeHeader";

type ReadingItem = (typeof readingsButtons)[number];

interface SectionData {
  title: string;
  data: ReadingItem[];
}

const likedTracks: ReadingItem[] = [
  {
    id: 101,
    title: "قراءه شعبة",
    details: "سورة البقرة - الآية 1",
    image: "word-00001-shuba",
    path: "",
    params: {},
    disabled: false,
    sideNotes: false,
  },
  {
    id: 102,
    title: "قراءه حفص",
    details: "سورة آل عمران - الآية 5",
    image: "word-00001-shuba",
    path: "",
    params: {},
    disabled: false,
    sideNotes: false,
  },
  {
    id: 103,
    title: "قراءه ورش",
    details: "سورة النساء - الآية 10",
    image: "word-00001-shuba",
    path: "",
    params: {},
    disabled: false,
    sideNotes: false,
  },
  {
    id: 1024,
    title: "قراءه قالون",
    details: "سورة المائدة - الآية 15",
    image: "word-00001-shuba",
    path: "",
    params: {},
    disabled: false,
    sideNotes: false,
  },
];
const Index: FC = () => {
  /* ------------------  shadow on scroll  ------------------ */
  const [scrolled, setScrolled] = useState(false);
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
      return <LikedTracksSection items={section.data} />;
    return <ReadingSection title={section.title} items={section.data} />;
  };

  return (
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
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "flex-start" },
  listContent: {},
});