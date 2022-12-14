import {Text, View, Image, StyleSheet, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import relativeTime from 'dayjs/plugin/relativeTime';
import {useNavigation} from '@react-navigation/native';

import dayjs from 'dayjs';
dayjs.extend(relativeTime);

const ChatListItem = ({chat}) => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() =>
        navigation.navigate('Chat', {id: chat.id, name: chat.user.name})
      }
      style={styles.container}>
      <Image
        style={{
          width: 60,
          height: 60,
          backgroundColor: 'gray',
          borderRadius: 30,
          marginRight: 10,
        }}
        source={{uri: chat.user.image}}
      />
      <View style={styles.content}>
        <View style={styles.row}>
          <Text
            style={{color: 'black', flex: 1, fontWeight: 'bold'}}
            numberOfLines={1}>
            {chat.user.name}
          </Text>
          <Text style={{color: 'gray'}}>
            {dayjs(chat.lastMessage.createdAt).fromNow(true)}
          </Text>
        </View>
        <Text style={{color: 'gray'}} numberOfLines={2}>
          {chat.lastMessage.text}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 5,
    height: 70,
  },
  content: {
    flex: 1,
    borderBottomColor: 'lightgray',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  row: {flexDirection: 'row', marginBottom: 5},
});

export default ChatListItem;
