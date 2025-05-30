// components/AudioTrack.tsx
import React, { useEffect, useState, useRef } from "react";
import { StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";
import { FontAwesome } from "@expo/vector-icons";
import {
  TapGestureHandler,
  NativeViewGestureHandler,
  State,
} from "react-native-gesture-handler";
import { audioService } from "@/services/audio";
import { AVPlaybackStatus } from "expo-av";
import { Text, View } from "../Themed";

type Props = { audioId: string; sheetRef: React.RefObject<any> };

export const AudioTrack = ({ audioId, sheetRef }: Props) => {
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(1);
  const [sliderValue, setSliderValue] = useState(0);

  const slidingRef = useRef(false);
  const seekTargetRef = useRef<number | null>(null);

  useEffect(() => {
    const onStatus = (s: AVPlaybackStatus) => {
      if (!s.isLoaded) return;

      if (s.didJustFinish) {
        seekTargetRef.current = null;
        setSliderValue(0);
        setPlaying(false);
        return;
      }

      if (slidingRef.current) return;

      if (seekTargetRef.current !== null) {
        const diff = Math.abs((s.positionMillis ?? 0) - seekTargetRef.current);
        if (diff > 250) return;
        seekTargetRef.current = null;
      }

      setSliderValue(s.positionMillis ?? 0);
      setDuration(s.durationMillis ?? 1);
      setPlaying(s.isPlaying ?? false);
    };

    audioService.registerStatusCallback(audioId, onStatus);
    return () => audioService.unregisterStatusCallback(audioId, onStatus);
  }, [audioId]);

  const toggle = async () => {
    const seekVal = seekTargetRef.current;
    if (playing) {
      await audioService.pause();
    } else if (audioService.isCurrentTrack(audioId)) {
      if (seekVal !== null) {
        await audioService.seek(seekVal);
        seekTargetRef.current = null;
      }
      await audioService.resume();
    } else {
      await audioService.playAudio(audioId, seekVal ?? undefined);
      seekTargetRef.current = null;
    }
  };
  const onStart = () => {
    slidingRef.current = true;
  };

  const onChange = (val: number) => setSliderValue(val);

  const onEnd = (val: number) => {
    slidingRef.current = false;
    setSliderValue(val);
    seekTargetRef.current = val;
    audioService.seek(val).then(() => audioService.resume());
  };

  const fmt = (ms: number) => {
    const s = Math.floor(ms / 1000);
    return (
      String(Math.floor(s / 60)).padStart(2, "0") +
      ":" +
      String(s % 60).padStart(2, "0")
    );
  };

  return (
    <View level="3" style={styles.container}>
      {/* Row 1: Icon + Slider */}
      <View level="3" style={styles.row}>
        <TapGestureHandler
          onHandlerStateChange={(e) =>
            e.nativeEvent.state === State.END && toggle()
          }
        >
          <View style={styles.iconWrapper}>
            <FontAwesome
              name={playing ? "pause" : "play"}
              size={14}
              color="#000"
            />
          </View>
        </TapGestureHandler>

        <View level="3" style={styles.sliderWrapper}>
          <NativeViewGestureHandler
            simultaneousHandlers={sheetRef}
            shouldActivateOnStart
            disallowInterruption
          >
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={duration || 1}
              value={sliderValue}
              onSlidingStart={onStart}
              onValueChange={onChange}
              onSlidingComplete={onEnd}
              minimumTrackTintColor="#007bff"
              maximumTrackTintColor="#ccc"
              thumbTintColor="#007bff"
            />
          </NativeViewGestureHandler>
        </View>
      </View>

      {/* Row 2: Time */}
      <Text style={styles.time}>
        {fmt(sliderValue)} / {fmt(duration)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 10,
    width: "90%",
    position: "relative",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
  },
  sliderWrapper: {
    flex: 1,
  },
  slider: {
    height: 30,
    width: "100%",
  },
  time: {
    fontSize: 12,
    color: "#555",
    textAlign: "right",
    paddingRight: 2,
    position: "absolute",
    bottom: 10,
    right: 20,
  },
});
