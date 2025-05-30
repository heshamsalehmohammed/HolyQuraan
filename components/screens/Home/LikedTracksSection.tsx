import React, { FC } from "react";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "@/components/Themed";
import { HorizontalCardSection } from "@/components/common/HorizontalCardSection";
import { readingsButtons } from "@/manager";
import { LikedTrackCard } from "./LikedTrackCard";

type ReadingItem = (typeof readingsButtons)[number];

interface Props {
  items: ReadingItem[];
  hotspotModalRef: React.RefObject<any>;
}

const LIKED_CARD_HEIGHT = 75;
const LIKED_CARD_WIDTH = 280;

const LikedTracksSection: FC<Props> = ({ items, hotspotModalRef }) => {
  const first = items.slice(0, Math.ceil(items.length / 2));
  const second = items.slice(Math.ceil(items.length / 2));

  const renderTrack = (item: ReadingItem) => (
    <LikedTrackCard
      item={item}
      onPress={(item) => hotspotModalRef.current?.openWithHotspot(item)}
    />
  );

  return (
    <View level="3" style={styles.likedContainer}>
      <View style={styles.likedHeader}>
        <View style={styles.likedIcon}>
          <Ionicons name="heart" size={24} color="#f50" />
        </View>
        <Text style={styles.likedTitle}>الصوتيات المفضله</Text>
        <View style={styles.shuffleButton}>
          <Ionicons name="shuffle" size={20} color="#fff" />
        </View>
      </View>

      <HorizontalCardSection<ReadingItem>
        cardHeight={LIKED_CARD_HEIGHT}
        items={first}
        renderItem={renderTrack}
      />

      <View level="3" style={{ height: 8 }} />

      <HorizontalCardSection<ReadingItem>
        cardHeight={LIKED_CARD_HEIGHT}
        items={second}
        renderItem={renderTrack}
        scrollToEnd={false}
      />
    </View>
  );
};

export default LikedTracksSection;

const styles = StyleSheet.create({
  likedContainer: {
    width: "100%",
    marginVertical: 20,
    height: 2 * LIKED_CARD_HEIGHT + 72 + 16 + 8,
  },
  likedHeader: {
    flexDirection: "row-reverse",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 16,
    marginBottom: 16,
  },
  likedIcon: { marginRight: 12 },
  likedTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "right",
    marginRight: 8,
  },
  shuffleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center",
  },
  trackCard: {
    width: LIKED_CARD_WIDTH,
    height: LIKED_CARD_HEIGHT,
    borderRadius: 12,
    overflow: "scroll",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  trackCardSections: {
    height: "100%",
    paddingHorizontal: 5,
  },
  audioSubtitle: {
    marginHorizontal: 8,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "right",
  },
  audioSubtitleDetails: {
    marginHorizontal: 8,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "right",
  },
});
