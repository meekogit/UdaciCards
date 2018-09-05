import React from 'react';
import { View } from 'react-native';
import DeckList from './components/DeckList';
import { getDecks } from './utils/api';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers';

export default class App extends React.Component {

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
        <DeckList style={{flex: 1}}/>
        </View>
      </Provider>
    );
  }
}