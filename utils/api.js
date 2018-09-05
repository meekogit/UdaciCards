import { AsyncStorage } from 'react-native';
import { formatDecks, DECKS_STORAGE_KEY } from './_decks';

export function getDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(formatDecks)
}

export function saveDeck(deck) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(deck))
}

export function saveCard(card) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
     const data = JSON.parse(results)
     const decks = {
       ...data,
       [card.id]: {
         ...data[card.id],
         questions: [...data[card.id].questions, card.content]
       }
     };
     AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks))
    })
}