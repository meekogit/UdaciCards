import { RECEIVE_DECKS, ADD_DECK, ADD_CARD } from '../actions';

function decks (state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      };
    case ADD_DECK:
      return {
        ...state,
        ...action.deck
      };
    case ADD_CARD:
    const { id, content } = action.card;
      return {
        ...state,
        [id]: {
          ...state[id],
            questions: [...state[id].questions, content ]
        }
      }
    default:
      return state;
  }
}

export default decks;