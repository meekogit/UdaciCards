import React, { Component } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import { clearLocalNotifications, setLocalNotification } from '../utils/notifications';

class TakeQuiz extends Component {

  static navigationOptions = ({ navigation }) => {
    const { id } = navigation.state.params;
    return { title: id };
  }

  state = {
    correctCount: 0,
    cardId: 0,
    show: 'question',
    complete: false,
    toHome: false
  }

  static navigationOptions = () => {
    return { title: 'Quiz' };
  }

  nextCard = () => {

    const { deck } = this.props;
    const totalCards = deck.questions.length;
    if (this.state.cardId + 1 === totalCards) {
      this.setState({ complete: true });
      clearLocalNotifications()
        .then(setLocalNotification)
    } else {
      this.setState((state) => ({
        cardId: state.cardId + 1
      }))
    }
  }

  addCorrect = () => {
    this.setState((state) => ({ correctCount: state.correctCount + 1 }))
    this.nextCard()
  }

  flip = () => {
    this.setState((state) => ({ 
      show: state.show === 'question' 
        ? 'answer' 
        : 'question' 
    }))
  }

  reset = () => {
    this.setState({
      correctCount: 0,
      cardId: 0,
      show: 'question',
      complete: false,
      toHome: false
    })
  }
 

  render() {
    const { cardId, show, complete, correctCount } = this.state
    const { deck } = this.props
    const totalCards = deck.questions.length;

    const currentCard = deck.questions[cardId]
    const { answer, question } = currentCard

    if (complete)
      return (
        <View style={{flex: 1, justifyContent: 'flex-end', paddingTop: 60}}>
          <Text style={styles.title}>The quiz is done!</Text>
          <Text style={styles.percentage}>{`${correctCount*100/totalCards}%`}</Text>
          <Text style={styles.text}>{`${correctCount} / ${totalCards}`}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={this.reset}>
              <Text style={styles.button}>Restart</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('DeckDetails', {id: deck.title})}>
              <Text style={styles.button}>Back to Deck</Text>
            </TouchableOpacity>
          </View>
        </View>
      )

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.card}
          onPress={this.flip}
        >
          <Text style={styles.title}>{show === 'question' ? question : answer}</Text>
          <Text style={styles.text}>{`${cardId + 1} of ${totalCards}`}</Text>
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this.addCorrect}>
            <Text style={styles.button}>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.nextCard}>
            <Text style={styles.button}>Incorrect</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  percentage: {
      fontSize: 32,
      fontWeight: 'bold',
      textAlign: 'center'
  },
  card: {
    flex: 3,
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    }
  },
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
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around'
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
  return {
    deck: state[navigation.state.params.id]
  }
}

export default connect(mapStateToProps)(TakeQuiz);