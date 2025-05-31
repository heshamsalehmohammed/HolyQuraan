// components/common/PlayPauseAudioButton.tsx
import React, { useEffect, useState } from "react";
import { TapGestureHandler, State } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { AVPlaybackStatus } from "expo-av";
import { audioService } from "@/services/audio";
import { ThemedIcon } from "../Themed";

type Props = {
  audioId: string;
  style?: object; // Optional style prop for custom styling
};

export const PlayPauseAudioButton = ({ audioId, style = {} }: Props) => {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!audioId) return;

    const onStatus = (status: AVPlaybackStatus) => {
      if (status.isLoaded) {
        setPlaying(status.isPlaying ?? false);
      }
    };

    audioService.registerStatusCallback(audioId, onStatus);

    return () => {
      audioService.unregisterStatusCallback(audioId, onStatus);
    };
  }, [audioId]);

  const handleTap = ({ nativeEvent }: any) => {
    if (nativeEvent.state === State.END) {
      if (playing) {
        audioService.pause();
      } else {
        audioService.playAudio(audioId);
      }
    }
  };

  return (
    <TapGestureHandler onHandlerStateChange={handleTap}>
      <Animated.View style={style}>
        <ThemedIcon
          name={playing ? "pause" : "play"}
          size={24}
          iconLib="DefaultIonicons"
        />
      </Animated.View>
    </TapGestureHandler>
  );
};
