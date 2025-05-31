import { StyleSheet } from "react-native";

import { ThemedIcon, TextInput, View } from "@/components/Themed";
import { useRef, useState } from "react";
import { Input as KittenInput } from "@ui-kitten/components";

export default function LikedTracksModal() {
  const inputRef = useRef<KittenInput>(null);
  const [filterText, setFilterText] = useState("");

  return (
    <View style={styles.container} level="3">
      <View level="3" style={styles.header}>
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
        />
      </View>
    </View>
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
  input: { marginHorizontal: 12, marginVertical: 10, flexGrow: 1 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 16,
    marginVertical: 10,
    textAlign: "right",
  },
});
