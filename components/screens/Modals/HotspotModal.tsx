import React, {
  useRef,
  forwardRef,
  useState,
  useImperativeHandle,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { StyleSheet, Dimensions, LogBox } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
} from "react-native-reanimated";
import {
  GestureHandlerRootView,
  TapGestureHandler,
  State,
} from "react-native-gesture-handler";
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";

import Word00001Page001 from "../../../assets/pages/shuba/words/00001.svg";
import {
  Divider,
  FontAwesome,
  Text,
  useThemeColor,
  View,
} from "@/components/Themed";
import { audioService } from "@/services/audio";
import { AudioTrack } from "@/components/common/AudioTrack";
import { AVPlaybackStatus } from "expo-av";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HEADER_HEIGHT = 100;

LogBox.ignoreLogs(["Warning: This synthetic event is reused"]);

export const HotspotModal = forwardRef((_, ref: any) => {
  const insets = useSafeAreaInsets();
  const snapPoints = useMemo(() => {
    const initial = HEADER_HEIGHT + insets.bottom;
    const maxHeight = Dimensions.get("window").height;
    return [initial, maxHeight];
  }, [insets]);

  const sheetRef = useRef<any>(null);
  const [hotspotData, setHotspotData]: any = useState(null);
  const [playing, setPlaying] = useState(false);
  const animatedIndex = useSharedValue(-1);
  const backgroundColor = useThemeColor("backgroundColor");

  useImperativeHandle(ref, () => ({
    openWithHotspot(hotspot: any) {
      setHotspotData(hotspot);
      sheetRef?.current?.snapToIndex(0);
      audioService.playAudio(hotspot.audio);
    },
    close() {
      audioService.unload();
      setHotspotData(null);
      sheetRef?.current?.close();
    },
  }));

  useEffect(() => {
    if (!hotspotData?.audio) return;

    const onStatus = (status: AVPlaybackStatus) => {
      if (status.isLoaded) {
        setPlaying(status.isPlaying ?? false);
      }
    };

    audioService.registerStatusCallback(hotspotData.audio, onStatus);

    return () => {
      audioService.unregisterStatusCallback(hotspotData.audio, onStatus);
    };
  }, [hotspotData?.audio]);

  const coverStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: interpolate(animatedIndex.value, [0, 1], [1, 3]) },
      { translateX: interpolate(animatedIndex.value, [0, 1], [0, 42]) },
      { translateY: interpolate(animatedIndex.value, [0, 1], [0, 30]) },
    ],
  }));

  const headerStyle = useAnimatedStyle(() => ({
    opacity: interpolate(animatedIndex.value, [0, 1], [1, 0]),
  }));

  const innerStyle = useAnimatedStyle(() => ({
    opacity: interpolate(animatedIndex.value, [0, 1], [0, 1]),
    transform: [
      {
        translateY: interpolate(animatedIndex.value, [0, 1], [-300, 0]),
      },
    ],
  }));


  const renderBackdrop = useCallback(
    (props:any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior="close" // ✅ Automatically closes on outside press
      />
    ),
    []
  );

  const renderContent = () => (
    <BottomSheetView style={{ pointerEvents: "box-none" }}>
      <Animated.View style={[styles.content__cover, coverStyle]}>
        <Word00001Page001 style={{ flex: 1, height: "100%", width: "100%" }} />
      </Animated.View>

      <Animated.View style={[styles.content__header]}>
        <Animated.View style={[headerStyle]}>
          <TapGestureHandler
            onHandlerStateChange={({ nativeEvent }) => {
              if (nativeEvent.state === State.END) {
                if (playing) {
                  audioService.pause();
                } else if (hotspotData) {
                  audioService.playAudio(hotspotData.audio);
                }
              }
            }}
          >
            <Animated.View style={{ marginRight: 20 }}>
              <FontAwesome name={playing ? "pause" : "play"} size={24} />
            </Animated.View>
          </TapGestureHandler>
        </Animated.View>
        <TapGestureHandler
          onHandlerStateChange={({ nativeEvent }) => {
            if (nativeEvent.state === State.END) {
              console.log("❤️ heart pressed");
            }
          }}
        >
          <Animated.View>
            <FontAwesome name="heart" size={24} />
          </Animated.View>
        </TapGestureHandler>
      </Animated.View>

      <Animated.View style={[styles.content__inner, innerStyle]}>
        {hotspotData && (
          <AudioTrack
            key={`main-${hotspotData.audio}`}
            audioId={hotspotData.audio}
          />
        )}
        <View style={{ width: "100%" }}>
          <Text style={styles.headerText}>الحكم</Text>
          <Text style={styles.contentText}>{hotspotData?.instruction}</Text>
        </View>

        <Divider
          style={{
            width: "80%",
            marginVertical: 10,
            backgroundColor: "#ccc",
          }}
        />
      </Animated.View>
    </BottomSheetView>
  );

  return (
    <BottomSheet
      ref={sheetRef}
      index={-1}
      snapPoints={snapPoints}
      enableDynamicSizing={false}
      animatedIndex={animatedIndex}
      enablePanDownToClose
      backgroundStyle={{
        backgroundColor,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}
      handleIndicatorStyle={{ backgroundColor: "#bcc0c1" }}
      onClose={() => {
        setHotspotData(null);
        animatedIndex.value = 0;
        audioService.unload();
      }}
      backdropComponent={renderBackdrop}
    >
      {renderContent()}
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  content__header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    height: 100,
    paddingHorizontal: 30,
    paddingBottom: 5,
  },

  content__cover: {
    zIndex: 100,
    width: 80,
    height: 80,
    marginLeft: 20,
    marginTop: 5,
  },

  content__inner: {
    top: 200,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "right",
    marginRight: 30,
  },

  contentText: {
    fontSize: 18,
    textAlign: "right",
    marginRight: 30,
  },
});
