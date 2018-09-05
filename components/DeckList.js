import React, { Component } from 'react';
import {
  View, 
  Text,
  FlatList,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';

class DeckList extends Component {

  renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item}>
     <Text style={styles.title}>{this.props.decks[item.key].title}</Text>
     <Text style={styles.text}>{this.props.decks[item.key].questions.length} Cards</Text>
    </TouchableOpacity>
  )

  render() {
    const { decks } = this.props;
    const deckids = Object.keys(decks).map((id) => ({'key': id}))

    return (
      <View style={styles.container}>
        <FlatList
          data={deckids}
          renderItem={this.renderItem}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
    alignItems: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22
  },
  text: {
    fontSize: 16,
    color: 'grey'
  }
})

export default DeckList;