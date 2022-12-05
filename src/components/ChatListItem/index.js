import {Text, View, Image, StyleSheet, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';

const ChatListItem = ({chat}) => {
  return (
    <View style={styles.container}>
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
          <Text style={{color: 'gray'}}>{chat.lastMessage.createdAt}</Text>
        </View>
        <Text style={{color: 'gray'}} numberOfLines={2}>
          {chat.lastMessage.text}
        </Text>
      </View>
    </View>
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
