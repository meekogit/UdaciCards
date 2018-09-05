import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

class DeckDetails extends Component {

  static navigationOptions = ({ navigation }) => {
    const { id } = navigation.state.params;
    return { title: id };
  }

  render() {
    const { deck, navigation } = this.props;
    const { id } = navigation.state.params;

    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{deck.title}</Text>
          <Text style={styles.text}>{deck.questions.length} Cards</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('AddCard', {id})}
          >
            <Text style={styles.button}>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('TakeQuiz', {id})}
            disabled={deck.questions.length === 0}
          >
            <Text style={styles.button}>Take Quiz</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-end',
    margin: 50,
  },
  title: {
    fontSize: 36,
    textAlign: 'center',
    padding: 20
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center'
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 22,
    color: 'black',
    borderRadius:10,
    borderWidth: 1,
    margin: 5
  },
  text: {
    fontSize: 22,
    color: 'grey',
    textAlign: 'center',
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'grey'
  }
});

function mapStateToProps(state, { navigation }) {
  const id = navigation.state.params.id;
  return {
    deck: state[id]
  }
}

export default connect(mapStateToProps)(DeckDetails);