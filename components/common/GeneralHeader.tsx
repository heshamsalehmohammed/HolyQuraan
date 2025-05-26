// components/common/GeneralHeader.tsx
import React from "react";
import { StyleSheet, Platform } from "react-native";
import { View } from "../Themed";

interface Props {
  children: React.ReactNode;
  elevated?: boolean; // 👈 add
}

function GeneralHeader({ children, elevated = false }: Props) {
  return (
    <View style={[styles.safeArea, elevated && styles.safeAreaElevated]}>
      <View style={styles.generalHeader}>{children}</View>
    </View>
  );
}

export default GeneralHeader;

const styles = StyleSheet.create({
  /* base wrapper – no shadow */
  safeArea: {},

  /* shadow applied only when `elevated` === true */
  safeAreaElevated: {
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: { elevation: 2 },
    }),
  },

  generalHeader: {
    height: 65,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
});
