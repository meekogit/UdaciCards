import React, { Component } from 'react';
import { 
  Text, 
  StyleSheet, 
  View, 
  TouchableOpacity, 
  TextInput,
  KeyboardAvoidingView 
} from 'react-native';
import { addDeck } from '../actions';
import { connect } from 'react-redux';
import { saveDeck } from '../utils/api';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-end'
  },
  title: {
    fontSize: 36,
    textAlign: 'center',
    padding: 20
  },
  input: {
    fontSize: 22,
    color: 'grey',
    textAlign: 'center',
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'grey'
  },
  inputContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center'
  },
  textContainer: {
    flex: 2,
    justifyContent: 'flex-end'
  },
  button: {
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 22,
    color: 'black',
    borderRadius:10,
    borderWidth: 1
  }
});

class NewDeck extends Component {

  state = {
    text: ''
  }

  handleChangeText = (text) => {
    this.setState({ text });
  }

  handleSubmit = () => {

      const { text } = this.state;
      const deck = {
        [text]: {
          title: text,
          questions: []
        }
      };
  
      this.props.dispatch(addDeck(deck));
  
      this.setState(() => ({ text: '' }));

      saveDeck(deck);

      this.props.navigation.navigate('AddCard', {id: text});
  }

  render() {
    const { text } = this.state;
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Text>{text}</Text>
        <View style={styles.textContainer}>
          <Text style={styles.title}>What is the title of your new deck?</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput 
            placeholder="Enter deck title..." 
            onChangeText={this.handleChangeText}
            style={styles.input}
          >
            {text}
          </TextInput>
        </View>
        <TouchableOpacity 
          style={styles.buttonContainer}
          onPress={this.handleSubmit}
          disabled={text === '' ? true : false}
        >
          <Text style={[styles.button]}>Create</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}

export default connect()(NewDeck);