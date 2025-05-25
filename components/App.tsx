import useNavigationBarColor from "@/hooks/useNavigationBarColor";

import { SafeAreaView, View } from "@/components/Themed";
import RootLayoutNav from "./RootLayoutNav";
import LoadingOverlay from "./common/OverlayLoading";
import MessagePopup from "./common/MessagePopup";
import ToastCenter from "./common/ToastCenter";
import ConfirmationPopup from "./common/ConfirmationPopup";
import StatusBarColor from "./common/StatusBarColor";
import { StyleSheet } from "react-native";
import { useEffect } from "react";
import { audioService } from "@/services/audio";

export default function App() {
  useNavigationBarColor();

  useEffect(() => {
    return () => {
      audioService.unload();
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBarColor />
        <RootLayoutNav />
        <LoadingOverlay />
        <MessagePopup />
        <ConfirmationPopup />
        <ToastCenter />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
