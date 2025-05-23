import React, {
  useRef,
  forwardRef,
  useState,
  useImperativeHandle,
  useEffect,
} from "react";
import { StyleSheet, Animated, Dimensions,LogBox , View as RNView } from "react-native";
import { Modalize } from "react-native-modalize";
import { useCombinedRefs } from "../../../hooks/use-combined-refs";

import Word00001Page001 from "../../../assets/pages/shuba/words/00001.svg";
import { Divider, FontAwesome, Text, useThemeColor, View } from "@/components/Themed";
import { audioService } from "@/services/audio";
import { AudioTrack } from "@/components/common/AudioTrack";

import { TapGestureHandler, State } from "react-native-gesture-handler";
import { AVPlaybackStatus } from "expo-av";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const HEADER_HEIGHT = 100;

LogBox.ignoreLogs(["Warning: This synthetic event is reused"]);

export const HotspotModal = forwardRef((_, ref: any) => {


  const insets = useSafeAreaInsets();
    const snap = HEADER_HEIGHT + insets.top + insets.bottom;
  const modalizeRef: any = useRef(null);
  const [hotspotData, setHotspotData]: any = useState(null);
  const [playing, setPlaying] = useState(false);
  const animated = useRef(new Animated.Value(0)).current;

  useImperativeHandle(ref, () => ({
    openWithHotspot(hotspot: any) {
      setHotspotData(hotspot);
      modalizeRef?.current?.open();
      audioService.playAudio(hotspot.audio);
    },
    close() {
      audioService.unload();
      setHotspotData(null);
      modalizeRef?.current?.close();
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

  const backgroundColor = useThemeColor("backgroundColor");


  const renderContent = () => (
    <RNView style={{ pointerEvents: "box-none", }}>
      <Animated.View
        style={[
          s.content__cover,
          {
            transform: [
              {
                scale: animated.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 3],
                  extrapolate: "clamp",
                }),
              },
              {
                translateX: animated.interpolate({
                  inputRange: [0, 0.25, 1],
                  outputRange: [0, 22, 42],
                  extrapolate: "clamp",
                }),
              },
              {
                translateY: animated.interpolate({
                  inputRange: [0, 0.25, 1],
                  outputRange: [0, 15, 30],
                  extrapolate: "clamp",
                }),
              },
            ],
          },
        ]}
      >
        <Word00001Page001 style={{ flex: 1, height: "100%", width: "100%" }} />
      </Animated.View>

      <Animated.View
        style={[
          s.content__header,
          {
            opacity: animated.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0],
            }),
          },
        ]}
      >
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

      <Animated.View
        style={[
          s.content__inner,
          {
            opacity: animated.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            }),
            transform: [
              {
                translateY: animated.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-300, 0],
                }),
              },
            ],
          },
        ]}
      >
        {hotspotData && (
          <AudioTrack
            key={`main-${hotspotData.audio}`}
            audioId={hotspotData.audio}
          />
        )}
        <View style={{ width: "100%" }}>
          <Text style={s.headerText}>الحكم</Text>
          <Text style={s.contentText}>ابدال الواو همزه</Text>
        </View>

        <Divider
          style={{
            width: "80%",
            marginVertical: 10,
            backgroundColor: "#ccc",
          }}
        />

        {/*         <View style={{ width: "100%" }}>
          <Text style={s.headerText}>القراءات المتاحه</Text>
          {hotspotData?.otherAudios.map((audio: any, index: number) => (
            <AudioTrack key={`other-${audio}-${index}`} audioId={audio} />
          ))}
        </View> */}
      </Animated.View>
    </RNView>
  );

  return (
    <Modalize
      ref={modalizeRef}
      onClosed={() => {
        setHotspotData(null);
      }}
      panGestureAnimatedValue={animated}
      snapPoint={snap}
      handlePosition="inside"
      handleStyle={{
        top: 13,
        width: 40,
        height: 6,
        backgroundColor: "#bcc0c1",
      }}
      modalStyle={{
        backgroundColor,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}
      onPositionChange={(position) => {
        // position: "top" | "middle" | "bottom"
        if (position === "top") {
          console.log("Modal opened");
          // force animated value to 1 when fully opened
          Animated.timing(animated, {
            toValue: 1,
            duration: 1,
            useNativeDriver: true,
          }).start();
        } else if (position === "bottom" as typeof position) {
          // force animated value to 0 when fully closed
          Animated.timing(animated, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
          }).start();
        }
      }}
    >
      {renderContent()}
    </Modalize>
  );
});

const s = StyleSheet.create({
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
