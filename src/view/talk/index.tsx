import { Ionicons } from '@expo/vector-icons';
import {
  RecordingPresets,
  requestRecordingPermissionsAsync,
  setAudioModeAsync,
  useAudioPlayer,
  useAudioPlayerStatus,
  useAudioRecorder,
} from 'expo-audio';
import { File, Paths } from 'expo-file-system';
import { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getCharacterLabel } from '~/entity/character';
import { useChat, useVoiceChat, useVoiceEnd, useVoiceStart } from '~/entity/chat';
import { useSessionStore } from '~/shared/store/useSessionStore';
import { Avatar } from '~/shared/ui/Avatar';

const EMOTION_EMOJI: Record<string, string> = {
  happy: '😊',
  worried: '😟',
  excited: '🤩',
  sad: '😢',
  neutral: '🙂',
};

type Mode = 'idle' | 'listening' | 'thinking';

// Byte size of a recorded file, or null if it can't be read (then we don't block).
function safeFileSize(uri: string): number | null {
  try {
    const size = new File(uri).size;
    return typeof size === 'number' ? size : null;
  } catch {
    return null;
  }
}

export default function TalkView() {
  const characterLabel = useSessionStore((state) => getCharacterLabel(state.character));
  const userId = useSessionStore((state) => state.phone) ?? '';

  const [bubble, setBubble] = useState('편하게 말씀해 보세요');
  const [emotion, setEmotion] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>('idle');
  const [writing, setWriting] = useState(false);
  const [draft, setDraft] = useState('');
  const sessionIdRef = useRef<string | null>(null);
  // synchronous re-entrancy lock: a double-tap must not stop/upload twice
  // (that corrupts the recording and fires /voice/chat more than once).
  const busyRef = useRef(false);

  const chat = useChat();
  const voiceStart = useVoiceStart();
  const voiceChat = useVoiceChat();
  const voiceEnd = useVoiceEnd();

  const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const player = useAudioPlayer(null);
  const playerStatus = useAudioPlayerStatus(player);
  const pendingPlayRef = useRef(false);

  const pulse = useRef(new Animated.Value(0)).current;
  const float = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (pendingPlayRef.current && playerStatus.isLoaded) {
      pendingPlayRef.current = false;
      player.play();
    }
  }, [playerStatus.isLoaded, player]);

  const playReplyAudio = (base64Audio: string) => {
    try {
      const file = new File(Paths.cache, `voice-reply-${Date.now()}.mp3`);
      file.create({ overwrite: true, intermediates: true });
      file.write(base64Audio, { encoding: 'base64' });
      pendingPlayRef.current = true;
      player.replace(file.uri);
    } catch {
      // playback is a nice-to-have here; the reply text still shows either way
    }
  };

  useEffect(
    () => () => {
      if (recorder.isRecording) recorder.stop();
      if (sessionIdRef.current) voiceEnd.mutate({ userId, sessionId: sessionIdRef.current });
    },
    // ponytail: end-of-session cleanup only, not meant to re-run on every render
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(float, { toValue: 1, duration: 1800, useNativeDriver: true }),
        Animated.timing(float, { toValue: 0, duration: 1800, useNativeDriver: true }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [float]);

  useEffect(() => {
    if (mode !== 'listening') {
      pulse.stopAnimation();
      pulse.setValue(0);
      return;
    }
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 650, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0, duration: 650, useNativeDriver: true }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [mode, pulse]);

  const applyReply = (reply: string, replyEmotion: string) => {
    setBubble(reply);
    setEmotion(replyEmotion);
    setMode('idle');
  };

  const handleListen = async () => {
    // hard synchronous lock — blocks a second tap that hasn't re-rendered yet.
    if (busyRef.current || mode === 'thinking') return;
    busyRef.current = true;

    // STOP + SEND (exactly once per recording)
    if (mode === 'listening') {
      setMode('thinking');
      let uri: string | null = null;
      try {
        await recorder.stop();
        uri = recorder.uri;
      } catch {
        // fall through to the missing-uri branch below
      }
      const sessionId = sessionIdRef.current;
      if (!uri || !sessionId) {
        setBubble('녹음을 확인하지 못했어요. 다시 눌러서 말씀해 주세요.');
        setMode('idle');
        busyRef.current = false;
        return;
      }
      const size = safeFileSize(uri);
      const dbg = `[debug] uri=${uri}\nsize=${size}`;
      if (size !== null && size < 2000) {
        setBubble(`조금 더 길게 말씀해 주세요.\n${dbg}`);
        setMode('idle');
        busyRef.current = false;
        return;
      }
      voiceChat.mutate(
        { userId, sessionId, audioUri: uri },
        {
          onSuccess: (result) => {
            playReplyAudio(result.audio);
            applyReply(result.reply, result.emotion);
          },
          onError: (err) => {
            // debug: surface the recording path/size + real server error
            setBubble(`${dbg}\n${String((err as Error)?.message ?? err)}`);
            setMode('idle');
          },
          onSettled: () => {
            busyRef.current = false;
          },
        }
      );
      return;
    }

    // START
    try {
      const { granted } = await requestRecordingPermissionsAsync();
      if (!granted) {
        setBubble('마이크 권한을 허용해 주셔야 이야기할 수 있어요.');
        return;
      }
      if (!sessionIdRef.current) {
        sessionIdRef.current = await voiceStart.mutateAsync(userId);
      }
      await setAudioModeAsync({ allowsRecording: true, playsInSilentMode: true });
      await recorder.prepareToRecordAsync();
      recorder.record();
      setMode('listening');
    } catch {
      setBubble('녹음을 시작하지 못했어요. 다시 시도해 주세요.');
      setMode('idle');
    } finally {
      busyRef.current = false;
    }
  };

  const handleSend = () => {
    const message = draft.trim();
    if (!message || mode === 'thinking') return;
    setWriting(false);
    setDraft('');
    setMode('thinking');
    chat.mutate(
      { userId, message },
      {
        onSuccess: (result) => applyReply(result.reply, result.emotion),
        onError: () => {
          setBubble('지금은 답하기 어려워요. 잠시 후 다시 말씀해 주세요.');
          setMode('idle');
        },
      }
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-cream">
      <View className="flex-1 items-center justify-between px-8 pb-5 pt-7">
        <View className="w-full">
          <Text className="text-lg font-bold text-ink-soft">{characterLabel}와 이야기</Text>
          <Text className="mt-1 text-2xl font-extrabold text-ink">편하게 말씀해 보세요</Text>
        </View>
        <View className="max-w-[320px] items-center rounded-[32px] bg-white px-8 py-7 shadow-md">
          {emotion && <Text className="mb-2 text-3xl">{EMOTION_EMOJI[emotion] ?? '🙂'}</Text>}
          <Text
            selectable
            className={`text-center font-extrabold leading-snug text-ink ${
              bubble.includes('[debug]') ? 'text-xs' : 'text-2xl'
            }`}>
            {mode === 'thinking' ? '생각하고 있어요...' : bubble}
          </Text>
        </View>
        <Animated.View
          style={{
            transform: [
              { translateY: float.interpolate({ inputRange: [0, 1], outputRange: [0, -8] }) },
            ],
          }}>
          <Avatar label={characterLabel} size={176} />
        </Animated.View>

        <View className="w-full items-center gap-4">
          {writing ? (
            <View className="w-full flex-row items-center gap-3">
              <TextInput
                value={draft}
                onChangeText={setDraft}
                placeholder="할머니 이야기를 들려주세요"
                autoFocus
                onSubmitEditing={handleSend}
                returnKeyType="send"
                className="h-16 flex-1 rounded-2xl border-2 border-line bg-white px-5 text-lg font-semibold text-ink"
              />
              <Pressable
                disabled={mode === 'thinking'}
                onPress={handleSend}
                className="h-16 w-16 items-center justify-center rounded-2xl bg-brand active:bg-brand-dark">
                <Ionicons name="arrow-up" size={26} color="#fff" />
              </Pressable>
            </View>
          ) : (
            <>
              <Animated.View
                style={{
                  transform: [
                    { scale: pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.08] }) },
                  ],
                  opacity: pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 0.82] }),
                }}>
                <Pressable
                  accessibilityLabel="말하기"
                  disabled={mode === 'thinking'}
                  onPress={handleListen}
                  className="h-24 w-24 items-center justify-center rounded-full bg-brand shadow-md active:bg-brand-dark">
                  <Ionicons name={mode === 'listening' ? 'stop' : 'mic'} size={44} color="#fff" />
                </Pressable>
              </Animated.View>
              <Text className="text-xl font-extrabold text-ink">
                {mode === 'listening'
                  ? '듣고 있어요, 다시 누르면 끝나요'
                  : mode === 'thinking'
                    ? '답을 기다리고 있어요...'
                    : '눌러서 말하기'}
              </Text>
              <Pressable
                disabled={mode !== 'idle'}
                onPress={() => setWriting(true)}
                className="flex-row items-center gap-2 p-3 active:opacity-60">
                <Ionicons name="keypad" size={22} color="#8A7F6E" />
                <Text className="text-lg font-bold text-ink-soft">글로 쓰기</Text>
              </Pressable>
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
