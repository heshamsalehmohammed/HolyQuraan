import React, { FC, useRef, useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Pressable,
  Image,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { Text, TextInput, View } from "@/components/Themed";
import { HorizontalCardSection } from "@/components/common/HorizontalCardSection";
import { Input as KittenInput } from "@ui-kitten/components";
import { ReadingItemType } from "@/redux/slices/quran/types";
import { imageMapper } from "@/manager";

interface ReadingSectionProps {
  title: string;
  items: ReadingItemType[];
}

const CARD_WIDTH = 230;
const CARD_HEIGHT = 100;

const ReadingSection: FC<ReadingSectionProps> = ({ title, items }) => {
  const router = useRouter();
  const inputRef = useRef<KittenInput>(null);
  const [searching, setSearching] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [loadingId, setLoadingId] = useState<number | null>(null);

  useEffect(() => {
    const sub = Keyboard.addListener("keyboardDidHide", () =>
      setSearching(false)
    );
    return () => sub.remove();
  }, []);

  useFocusEffect(
    useCallback(() => {
      setLoadingId(null);
    }, [])
  );

  const filtered = items.filter((i) =>
    i.title.toLowerCase().includes(filterText.toLowerCase())
  );

  const handlePress = (item: ReadingItemType) => {
    setLoadingId(item.id);
    router.push({
      pathname: "/quraan-modal",
      params: { title: item.title, readingKey: item.readingKey },
    });
  };

  return (
    <View level="3" style={styles.sectionContainer}>
      <View level="3" style={styles.header}>
        <TextInput
          ref={inputRef}
          leftIcon="search"
          value={filterText}
          onChangeText={setFilterText}
          onFocus={() => setSearching(true)}
          onBlur={() => setSearching(false)}
          leftIconClickHandler={() => {
            setSearching(true);
            inputRef.current?.focus();
          }}
          style={[styles.input, { width: searching ? "40%" : 38 }]}
        />
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>

      <HorizontalCardSection<ReadingItemType>
        cardHeight={CARD_HEIGHT}
        items={filtered}
        renderItem={(item) => {
          const disabled = item.disabled || loadingId === item.id;
          return (
            <Pressable
              key={item.id}
              onPress={() => !disabled && handlePress(item)}
              disabled={disabled}
              style={({ pressed }) => [
                styles.card,
                disabled && styles.cardDisabled,
                pressed && !disabled && { opacity: 0.7 },
              ]}
            >
              <Image
                source={
                  typeof item.image === "string" &&
                  item.image.startsWith("http")
                    ? { uri: item.image }
                    : imageMapper[item.image]
                }
                style={styles.image}
              />
              <Text style={styles.subtitle}>{item.title}</Text>
              {loadingId === item.id && (
                <View style={styles.spinnerOverlay}>
                  <ActivityIndicator size="small" />
                </View>
              )}
            </Pressable>
          );
        }}
      />
    </View>
  );
};

export default ReadingSection;

const styles = StyleSheet.create({
  sectionContainer: { display: "flex", alignItems: "flex-end", width: "100%" },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: { marginHorizontal: 12, marginVertical: 10, borderRadius: 25 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 16,
    marginVertical: 10,
    textAlign: "right",
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 12,
    overflow: "hidden",
  },
  cardDisabled: { opacity: 0.5 },
  image: { width: "100%", height: "100%", resizeMode: "stretch" },
  subtitle: {
    position: "absolute",
    bottom: 10,
    right: 5,
    padding: 8,
    marginHorizontal: 8,
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    textAlign: "right",
  },
  spinnerOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 1,
  },
});
