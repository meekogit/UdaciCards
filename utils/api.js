import { AsyncStorage } from 'react-native';
import { formatDecks, DECKS_STORAGE_KEY } from './_decks';

export function getDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(formatDecks)
}

export function saveDeck(deck) {
  return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(deck))
}