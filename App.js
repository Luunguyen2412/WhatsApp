/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import ChatListItem from './src/components/ChatListItem';
import ChatsScreen from './src/screens/ChatsScreen';

const chat = {
  id: '1',
  user: {image: 'http://img.youtube.com/vi/mxXJSVW4tRY/0.jpg', name: 'Lukas'},
  lastMessage: {
    text: 'goodbye',
    createdAt: '08:30',
  },
};

const App = () => {
  return (
    <View
      style={{
        backgroundColor: 'whitesmoke',
        justifyContent: 'center',
        flex: 1,
        paddingVertical: 40,
      }}>
      {/* <ChatListItem chat={chat} />
      <ChatListItem chat={chat} /> */}
      <ChatsScreen />
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({});

export default App;
