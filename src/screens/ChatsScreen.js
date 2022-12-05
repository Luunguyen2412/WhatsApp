import {Text, View, Image, StyleSheet, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import chats from '../../assets/data/chats.json';
import ChatListItem from '../components/ChatListItem';

const ChatsScreen = ({chat}) => {
  return (
    <FlatList
      data={chats}
      renderItem={({item}) => <ChatListItem chat={item} />}
    />
  );
};

const styles = StyleSheet.create({});

export default ChatsScreen;
