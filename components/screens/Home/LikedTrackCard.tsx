import React from "react";
import { StyleSheet } from "react-native";
import { TapGestureHandler } from "react-native-gesture-handler";
import { ThemedIcon, Text, View } from "@/components/Themed";
import { DynamicSvg } from "@/components/common/DynamicSvg";
import { toArabicNumber } from "@/services/helpers";
import { readingsButtons } from "@/manager";
import { PlayPauseAudioButton } from "@/components/common/PlayPauseAudioButton";

type ReadingItem = (typeof readingsButtons)[number];

interface Props {
  item: ReadingItem;
  hotspotModalRef: React.RefObject<any>;
  LIKED_CARD_HEIGHT?: number;
  LIKED_CARD_WIDTH?: number;
}

export const LikedTrackCard = ({
  item,
  hotspotModalRef,
  LIKED_CARD_HEIGHT,
  LIKED_CARD_WIDTH,
}: Props) => {
  return (
    <View
      style={[
        styles.trackCard,
        { height: LIKED_CARD_HEIGHT, width: LIKED_CARD_WIDTH },
      ]}
    >
      <View style={[styles.trackCardSections, { justifyContent: "center" }]}>
        <DynamicSvg width={50} height={50} uri={item.wordURL ?? ""} />
      </View>

      <PlayPauseAudioButton
        audioId={item.audio}
        style={[
          styles.trackCardSections,
          { justifyContent: "center", marginHorizontal: 5 },
        ]}
      />

      <View
        style={[
          styles.trackCardSections,
          { flexGrow: 1, alignItems: "flex-end", justifyContent: "flex-end" },
        ]}
      >
        <Text style={styles.audioSubtitle}>{item.readingTitle}</Text>
        <Text style={styles.audioSubtitleDetails}>
          {`سورة ${item.surahTitle} - الآية ${toArabicNumber(item.ayaNumber)}`}
        </Text>
      </View>
      <TapGestureHandler
        onActivated={() => {
          hotspotModalRef.current?.openWithHotspot(item, false);
        }}
      >
        <View style={[styles.trackCardSections, { justifyContent: "center" }]}>
          <ThemedIcon
            name="ellipsis-v"
            size={24}
            style={{ color: "#000", padding: 5 }}
          />
        </View>
      </TapGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  trackCard: {
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
