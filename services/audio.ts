// services/audioService.ts
import { audioMapper } from "@/manager";
import { Audio, AVPlaybackStatus } from "expo-av";

type StatusCallback = (status: AVPlaybackStatus) => void;

class AudioService {
  private soundRef: Audio.Sound | null = null;
  private currentTrackId: string | null = null;

  private listeners: Record<string, Set<StatusCallback>> = {};

  private isPlaying = false;
  private positionMillis = 0;
  private durationMillis = 1;

  /* ────────── listeners ────────── */
  registerStatusCallback(audioId: string, cb: StatusCallback) {
    if (!this.listeners[audioId]) this.listeners[audioId] = new Set();
    this.listeners[audioId]!.add(cb);
  }

  unregisterStatusCallback(audioId: string, cb: StatusCallback) {
    this.listeners[audioId]?.delete(cb);
  }

  private notifyListeners(audioId: string, status: AVPlaybackStatus) {
    this.listeners[audioId]?.forEach((cb) => cb(status));
  }

  /* ────────── state helpers ────────── */
  isCurrentTrack = (id: string) => this.currentTrackId === id;

  getStatus() {
    return {
      isPlaying: this.isPlaying,
      positionMillis: this.positionMillis,
      durationMillis: this.durationMillis,
    };
  }

  /* ────────── playback ────────── */
  async playAudio(id: string, initialSeek?: number) {
    // resume if the same track is already loaded
    if (this.isCurrentTrack(id) && this.soundRef) {
      if (typeof initialSeek === "number") await this.seek(initialSeek);
      await this.soundRef.playAsync();
      return;
    }

    // switch track
    console.log("Switching to track ID:", id);
    if (this.currentTrackId && this.currentTrackId !== id) await this.unload();

    // 🔽 Determine the asset
    const asset = id.startsWith("http") ? { uri: id } : audioMapper[id];
    if (!asset) return;

    const { sound } = await Audio.Sound.createAsync(asset, {
      shouldPlay: false,
    });

    this.soundRef = sound;
    this.currentTrackId = id;

    sound.setOnPlaybackStatusUpdate((status: AVPlaybackStatus) => {
      if (!status.isLoaded) return;

      this.isPlaying = status.isPlaying;
      this.positionMillis = status.positionMillis ?? 0;
      this.durationMillis = status.durationMillis ?? 1;

      this.notifyListeners(id, status);

      if (status.didJustFinish) this.unload();
    });

    if (typeof initialSeek === "number") await this.seek(initialSeek);
    await sound.playAsync();
  }

  async pause() {
    if (this.soundRef) await this.soundRef.pauseAsync();
  }
  async resume() {
    if (this.soundRef) await this.soundRef.playAsync();
  }

  async seek(positionMillis: number) {
    if (this.soundRef) await this.soundRef.setPositionAsync(positionMillis);
  }

  async unload() {
    if (this.soundRef) {
      try {
        await this.soundRef.unloadAsync();
      } catch (e) {
        console.error(e);
      }
      this.soundRef = null;
    }

    if (this.currentTrackId) {
      this.notifyListeners(this.currentTrackId, {
        isLoaded: true,
        isPlaying: false,
        positionMillis: 0,
        durationMillis: 1,
        didJustFinish: true,
        shouldPlay: false,
        isBuffering: false,
        rate: 1,
        volume: 1,
        isMuted: false,
        isLooping: false,
        progressUpdateIntervalMillis: 0,
        androidImplementation: "",
        uri: "",
        shouldCorrectPitch: false,
        audioPan: 0,
      });
    }

    this.currentTrackId = null;
    this.isPlaying = false;
    this.positionMillis = 0;
    this.durationMillis = 1;
  }
}

export const audioService = new AudioService();
