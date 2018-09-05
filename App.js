import React from 'react';
import { View, Platform, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import DeckList from './components/DeckList';
import NewDeck from './components/NewDeck';
import { Constants } from 'expo';
import DeckDetails from './components/DeckDetails';
import AddCard from './components/AddCard';
import TakeQuiz from './components/TakeQuiz';
import { setLocalNotification } from './utils/notifications';

const Tabs = createBottomTabNavigator({
  'Deck List': {
    screen: DeckList,
    navigationOptions: {
      tabBarLaber: 'Deck List',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-home' size={30} color={tintColor} />
    }
  },
  'New Deck': {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    }
  }
 }, {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? 'black' : 'white',
      style: {
        height: 56,
        backgroundColor: Platform.OS === 'ios' ? 'white' : 'black',
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
});

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      title: 'UdaciCards',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'black',
      }
    }
  },
  DeckDetails: {
    screen: DeckDetails,
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'black',
      }
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'black',
      }
    }
  },
  TakeQuiz: {
    screen: TakeQuiz,
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'black',
      }
    }
  }
})

export default class App extends React.Component {

  componentDidMount() {
    return setLocalNotification()
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <View style={{ backgroundColor:'black', height: Constants.statusBarHeight }}>
            <StatusBar translucent backgroundColor='black' barStyle="light-content" />
          </View>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}