import { Dimensions, ScrollView, StyleSheet } from "react-native";

import { ThemedIcon, TextInput, View } from "@/components/Themed";
import { useRef, useState } from "react";
import { Input as KittenInput } from "@ui-kitten/components";
import { LikedTrackCard } from "@/components/screens/Home/LikedTrackCard";
import { HotspotModal } from "@/components/screens/Modals/hostspot/HotspotModal";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { selectLikedHotspots } from "@/redux/slices/quran/quraanSelectors";

const LIKED_CARD_HEIGHT = 75;

export default function LikedTracksModal() {
  const inputRef = useRef<KittenInput>(null);
  const [filterText, setFilterText] = useState("");
  const hotspotModalRef = useRef<any>(null);

  const likedHotsspots = useSelector(selectLikedHotspots)

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container} level="3">
        <View level="3" style={styles.header}>
          <ThemedIcon
            name="play"
            size={24}
            style={{ color: "#000", padding: 5 ,borderRadius: 25}}
            iconLib="DefaultIonicons"
          />
          <ThemedIcon
            name="shuffle"
            size={24}
            style={{ color: "#000", padding: 5 }}
            iconLib="DefaultIonicons"
          />
          <TextInput
            ref={inputRef}
            leftIcon="search"
            value={filterText}
            onChangeText={setFilterText}
            style={[styles.input]}
          />
          <ThemedIcon
            name="filter"
            size={24}
            style={{ color: "#000", padding: 5 }}
            iconLib="DefaultIonicons"
          />
        </View>
        <View level="3" style={{ flex: 1, width: "100%" }}>
          <ScrollView
            contentContainerStyle={[
              styles.scrollContainer,
              {
                rowGap: 10,
              },
            ]}
          >
            {likedHotsspots.map((item, index) => (
              <View level="3" key={index}>
                <LikedTrackCard
                  item={item}
                  hotspotModalRef={hotspotModalRef}
                  LIKED_CARD_HEIGHT={LIKED_CARD_HEIGHT}
                />
              </View>
            ))}
          </ScrollView>
        </View>
        <HotspotModal ref={hotspotModalRef} />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  input: { marginHorizontal: 12, marginVertical: 10, flexGrow: 1,borderRadius:  25},
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 16,
    marginVertical: 10,
    textAlign: "right",
  },
  scrollContainer: {
    paddingHorizontal: 16,
    width: "100%",
  },
});
