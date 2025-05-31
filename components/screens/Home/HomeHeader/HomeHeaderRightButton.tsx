import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { ThemedIcon } from "@/components/Themed";
import { useDispatch } from "react-redux";

function HomeHeaderRightButton() {
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.TouchableOpacity}
        onPress={() => router.push("/notifications-modal")}
      >
        <ThemedIcon name="bell" size={20} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.TouchableOpacity}
        onPress={() => router.push("/settings-modal")}
      >
        <ThemedIcon name="cog" size={20} style={styles.icon} />
      </TouchableOpacity>
      {/*       <TouchableOpacity
        style={styles.TouchableOpacity}
        onPress={() => dispatch(logoutUser())}
      >
        <FontAwesome name="sign-out" size={20} style={styles.icon} />
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  TouchableOpacity: {
    paddingHorizontal: 10, // Increases touchable area
  },
  icon: {},
});

export default HomeHeaderRightButton;
