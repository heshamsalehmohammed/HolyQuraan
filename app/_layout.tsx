import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { SafeAreaProvider } from "react-native-safe-area-context";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import { customLightTheme } from "@/constants/custom-light-theme";
import { customDarkTheme } from "@/constants/custom-dark-theme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Appearance, View } from "react-native";

import App from "@/components/App";
import store from "@/redux/store";
import { Provider, useDispatch } from "react-redux";
import { useRouter } from "expo-router";
import RouterSingleton from "@/services/routerSingleton";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";
import {
  fetchLastNLikedHotspots,
  fetchReadingsItems,
} from "@/redux/slices/quran/thunks";

// catch any errors thrown by the Layout component
export { ErrorBoundary } from "expo-router";

// Prevent splash auto-hide on app start
SplashScreen.preventAutoHideAsync();

function AppInitializer() {
  const [fontsLoaded, fontError] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  const dispatch: any = useDispatch();
  const router = useRouter();

  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    RouterSingleton.setRouter(router);
  }, [router]);

  useEffect(() => {
    const prepare = async () => {
      try {
        if (fontError) throw fontError;
        if (!fontsLoaded) return;

        await dispatch(fetchReadingsItems()).unwrap();
        // await dispatch(fetchLastNLikedHotspots(5)).unwrap();

        setAppReady(true); // Don't hide splash yet — wait for layout
      } catch (e) {
        console.warn("Splash error", e);
        setAppReady(true);
      }
    };

    prepare();
  }, [fontsLoaded]);

  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === "dark" ? customDarkTheme : customLightTheme;
  const navigationTheme = colorScheme === "dark" ? DarkTheme : DefaultTheme;

  if (!appReady) return null;

  return (
    <ApplicationProvider {...eva} theme={theme}>
      <ThemeProvider value={navigationTheme}>
        <SafeAreaProvider>
          <AutocompleteDropdownContextProvider>
            <View
              style={{ flex: 1 }}
              onLayout={async () => {
                // Hide splash after the first render/layout pass
                await SplashScreen.hideAsync();
              }}
            >
              <App />
            </View>
          </AutocompleteDropdownContextProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </ApplicationProvider>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <AppInitializer />
    </Provider>
  );
}
