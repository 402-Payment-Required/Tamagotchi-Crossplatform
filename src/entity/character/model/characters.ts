import type { CharacterId } from '~/shared/store/useSessionStore';

export interface CharacterOption {
  id: CharacterId;
  label: string;
  tone: 'brand' | 'peach';
}

export const CHARACTERS: CharacterOption[] = [
  { id: 'grandson', label: '손자', tone: 'brand' },
  { id: 'granddaughter', label: '손녀', tone: 'peach' },
  { id: 'cat', label: '고양이', tone: 'peach' },
  { id: 'dog', label: '강아지', tone: 'peach' },
];

export const getCharacterLabel = (id: CharacterId | null) =>
  CHARACTERS.find((option) => option.id === id)?.label ?? '손주';
