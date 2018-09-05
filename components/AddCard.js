import React, { Component } from 'react';
import { 
  Text, 
  TextInput, 
  KeyboardAvoidingView, 
  StyleSheet,
  TouchableOpacity,
  View
 } from 'react-native';
import { connect } from 'react-redux';
import { addCard } from '../actions';
import { saveCard } from '../utils/api';

class AddCard extends Component {

  static navigationOptions = () => {
    return { title: 'Add Card' };
  }

  state={
    question: '',
    answer: ''
  }

  handleQuestion = (question) => {
    this.setState({ question });
  }

  handleAnswer = (answer) => {
    this.setState({ answer });
  }

  handleSubmit = () => {
    const { id } = this.props.navigation.state.params;
    const card = {
      id,
      content: {
        question: this.state.question,
        answer: this.state.answer 
      }
    };

    saveCard(card);

    this.props.dispatch(addCard({...card }));
    
    this.setState(() => ({ question: '', answer: '' }));
  }

  render() {
    const { question, answer } = this.state;
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.text}>Question</Text>
          <TextInput 
            placeholder="Enter the question..." 
            onChangeText={this.handleQuestion}
            style={styles.input}
          >
            {question}
          </TextInput>
          <Text style={styles.text}>Answer</Text>
          <TextInput 
            placeholder="Enter the answer..." 
            onChangeText={this.handleAnswer}
            style={styles.input}
          >
            {answer}
          </TextInput>
        </View>
        <TouchableOpacity 
          style={styles.buttonContainer}
          onPress={this.handleSubmit}
          disabled={question === '' || answer === '' ? true : false }
        >
          <Text style={[styles.button]}>Create</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 22,
    paddingTop: 20
  },
  input: {
    fontSize: 22,
    color: 'grey',
    textAlign: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'grey',
    margin: 10
  },
  inputContainer: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  buttonContainer: {
    flex: 6,
    alignItems: 'center',
    justifyContent: 'flex-start'
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
    borderWidth: 1,
    marginTop: 20
  }
});

export default connect()(AddCard);