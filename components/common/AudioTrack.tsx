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
    if (playing) await audioService.pause();
    else if (audioService.isCurrentTrack(audioId)) await audioService.resume();
    else await audioService.playAudio(audioId);
  };

  const onStart = () => {
    slidingRef.current = true;
    /* audioService.pause(); */
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
    <View style={styles.container}>
      <TapGestureHandler
        onHandlerStateChange={(e) =>
          e.nativeEvent.state === State.END && toggle()
        }
      >
        <View style={styles.icon}>
          <FontAwesome
            name={playing ? "pause" : "play"}
            size={24}
            color="#000"
          />
        </View>
      </TapGestureHandler>

      <View style={styles.track}>
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

        <Text style={styles.time}>
          {fmt(sliderValue)} / {fmt(duration)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  icon: { marginHorizontal: 12 },
  track: { flex: 1, marginRight: 12 },
  slider: { width: "100%", height: 30 },
  time: { fontSize: 12, color: "#555", textAlign: "right" },
});
