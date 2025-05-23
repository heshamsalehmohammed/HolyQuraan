import { useEffect } from "react";
import { Platform } from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import { useThemeColor } from "@/components/Themed";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function useNavigationBarColor() {
  const backgroundColor = useThemeColor("systemNavBarColor");
  const theme = useColorScheme() ?? "light";

  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setBackgroundColorAsync(backgroundColor);
      NavigationBar.setButtonStyleAsync(theme === "dark" ? "light" : "dark");
    }
  }, [backgroundColor, theme]);

  return null; // This component doesn't render anything
}
