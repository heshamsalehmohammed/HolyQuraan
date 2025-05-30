import React from "react";
import { StyleSheet } from "react-native";
import { TapGestureHandler } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "@/components/Themed";
import { DynamicSvg } from "@/components/common/DynamicSvg";
import { toArabicNumber } from "@/services/helpers";
import { readingsButtons } from "@/manager";

type ReadingItem = (typeof readingsButtons)[number];

interface Props {
  item: ReadingItem;
  onPress: (item: ReadingItem) => void;
}

const LIKED_CARD_HEIGHT = 75;
const LIKED_CARD_WIDTH = 280;

export const LikedTrackCard = ({ item, onPress }: Props) => {
  return (
    <TapGestureHandler onActivated={() => onPress(item)}>
      <View style={styles.trackCard}>
        <View style={[styles.trackCardSections, { justifyContent: "center" }]}>
          <DynamicSvg width={50} height={50} uri={item.wordURL ?? ""} />
        </View>

        <View style={[styles.trackCardSections, { justifyContent: "center" }]}>
          <Ionicons name="play" size={24} color="#000" />
        </View>

        <View
          style={[
            styles.trackCardSections,
            { flexGrow: 1, alignItems: "flex-end", justifyContent: "flex-end" },
          ]}
        >
          <Text style={styles.audioSubtitle}>{item.readingTitle}</Text>
          <Text style={styles.audioSubtitleDetails}>
            {`سورة ${item.surahTitle} - الآية ${toArabicNumber(
              item.ayaNumber
            )}`}
          </Text>
        </View>
      </View>
    </TapGestureHandler>
  );
};

const styles = StyleSheet.create({
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
