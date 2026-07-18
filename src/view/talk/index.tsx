import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getCharacterLabel } from '~/entity/character';
import { useSessionStore } from '~/shared/store/useSessionStore';
import { Avatar } from '~/shared/ui/Avatar';

// ponytail: canned replies stand in for real speech-to-text + LLM conversation;
// swap handleListen/handleSend's setTimeout for the real API call when it's ready.
const CANNED_REPLIES = [
  '우와 김치찌개! 맛있었겠다 할머니~',
  '오늘 하루도 고생하셨어요, 할머니!',
  '저도 할머니 보고 싶어요 :)',
  '밥은 꼭 챙겨 드세요!',
];

export default function TalkView() {
  const characterLabel = useSessionStore((state) => getCharacterLabel(state.character));
  const [bubble, setBubble] = useState(CANNED_REPLIES[0]);
  const [listening, setListening] = useState(false);
  const [writing, setWriting] = useState(false);
  const [draft, setDraft] = useState('');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const pulse = useRef(new Animated.Value(0)).current;
  const float = useRef(new Animated.Value(0)).current;

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

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
    if (!listening) {
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
  }, [listening, pulse]);

  const reply = () => {
    timeoutRef.current = setTimeout(() => {
      setBubble(CANNED_REPLIES[Math.floor(Math.random() * CANNED_REPLIES.length)]);
      setListening(false);
    }, 900);
  };

  const handleListen = () => {
    if (listening) return;
    setListening(true);
    reply();
  };

  const handleSend = () => {
    if (!draft.trim()) return;
    setWriting(false);
    setDraft('');
    reply();
  };

  return (
    <SafeAreaView className="flex-1 bg-cream">
      <View className="flex-1 items-center justify-between px-8 pb-5 pt-7">
        <View className="max-w-[320px] items-center rounded-[32px] bg-white px-8 py-7 shadow-md">
          <Text className="text-center text-2xl font-extrabold leading-snug text-ink">
            {bubble}
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
                  onPress={handleListen}
                  className="h-24 w-24 items-center justify-center rounded-full bg-brand shadow-md active:bg-brand-dark">
                  <Ionicons name="mic" size={44} color="#fff" />
                </Pressable>
              </Animated.View>
              <Text className="text-xl font-extrabold text-ink">
                {listening ? '듣고 있어요...' : '눌러서 말하기'}
              </Text>
              <Pressable
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
