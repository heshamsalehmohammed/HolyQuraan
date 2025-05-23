import { View, Platform, StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useThemeColor } from "@/components/Themed";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function StatusBarColor() {
  const insets = useSafeAreaInsets();
  const backgroundColor = useThemeColor("systemStatusBarColor");
  const theme = useColorScheme() ?? "light";

  return (
    <>
      {/* Background View under the status bar */}
      {Platform.OS === "android" && (
        <View
          style={{
            height: insets.top || StatusBar.currentHeight,
            backgroundColor,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 10,
          }}
        />
      )}

      {/* StatusBar config */}
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
      />
    </>
  );
}
