import {
  Text,
  View,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
  ImageBackground,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ChatListItem from '../components/ChatListItem';
import message from '../../assets/data/messages.json';
import Message from '../components/Message';
import InputBox from '../components/inputBox';
import {useNavigation} from '@react-navigation/native';

const ChatScreen = ({route}) => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({title: route.params.name});
  }, [route.params.name]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 90}
      style={styles.container}>
      <ImageBackground style={styles.container}>
        <FlatList
          style={{padding: 10}}
          data={message}
          inverted
          renderItem={({item}) => <Message message={item} />}
        />
        <InputBox />
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
});

export default ChatScreen;
