import React from 'react';
import {
  AppRegistry,
  View,
  Text,
  Button,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

// import ChatScreen from './src/ChatScreen.js';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
        <View>
            <Text>Hello, Chat App!</Text>
            <Button
                onPress={() => navigate('Chat')}
                title="Chat with Lucy"
            />
        </View>
    )
  }
}

class ChatScreen extends React.Component {
  static navigationOptions = {
    title: 'Chat with Lucy',
  };
  render() {
    return (
      <View>
        <Text>Chat with Lucy</Text>
      </View>
    );
  }
}

const RnCreditZZ = StackNavigator({
  Home: { screen: HomeScreen },
  Chat: { screen: ChatScreen, {fullscreen:true} },
});

AppRegistry.registerComponent('RnCreditZZ', () => RnCreditZZ);
