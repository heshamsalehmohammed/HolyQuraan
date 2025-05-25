import React, { useRef, useEffect } from "react";
import { StyleSheet, Animated, TouchableOpacity, Image } from "react-native";
import { Button, Text, View } from "@/components/Themed";
import { useRouter } from "expo-router";
import { readingsButtons } from "@/manager";
import { HorizontalCardSection } from "@/components/common/HorizontalCardSection";

const CARD_WIDTH = 250;
const CARD_HEIGHT = 200;

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container} level="3">
      <View style={{ display: "flex", alignItems: "flex-end", width: "100%" }}>
        <Text style={styles.sectionTitle}>القراءات مع الهامش</Text>
        <HorizontalCardSection
          cardHeight={CARD_HEIGHT}
          items={readingsButtons.filter((item: any) => item.sideNotes)}
          renderItem={(item: any) => (
            <TouchableOpacity
              style={[styles.card, item.disabled && styles.cardDisabled]}
              onPress={() =>
                !item.disabled &&
                router.push({ pathname: item.path, params: item.params })
              }
              disabled={item.disabled}
            >
              <Image
                source={
                  typeof item.image === "string"
                    ? { uri: item.image }
                    : item.image
                }
                style={styles.image}
              />
              <Text style={styles.subtitle}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={{ display: "flex", alignItems: "flex-end", width: "100%" }}>
        <Text style={styles.sectionTitle}>القراءات بدون هامش</Text>
        <HorizontalCardSection
          cardHeight={CARD_HEIGHT}
          items={readingsButtons.filter((item: any) => !item.sideNotes)}
          renderItem={(item: any) => (
            <TouchableOpacity
              style={[styles.card, item.disabled && styles.cardDisabled]}
              onPress={() =>
                !item.disabled &&
                router.push({ pathname: item.path, params: item.params })
              }
              disabled={item.disabled}
            >
              <Image
                source={
                  typeof item.image === "string"
                    ? { uri: item.image }
                    : item.image
                }
                style={styles.image}
              />
              <Text style={styles.subtitle}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#222",
  },
  cardDisabled: {
    opacity: 0.5,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "stretch",
  },
  subtitle: {
    position: "absolute",
    bottom: 15,
    right: 5,
    padding: 8,
    marginHorizontal: 8,
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    textAlign: "right",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 16,
    marginVertical: 10,
    marginHorizontal: 12,
    textAlign: "right",
  },
});
