import {Text, View, Image, StyleSheet, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import relativeTime from 'dayjs/plugin/relativeTime';
import {useNavigation} from '@react-navigation/native';

import dayjs from 'dayjs';
import {Auth} from 'aws-amplify';

dayjs.extend(relativeTime);

const ChatListItem = ({chat}) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      const authUser = await Auth.currentAuthenticatedUser();

      //find user that not us (author user)
      const userItem = chat.users.items.find(
        item => item.user.id !== authUser.attributes.sub,
      );
      setUser(userItem?.user);
    };
    fetchUser();
  });

  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() =>
        navigation.navigate('Chat', {id: chat.id, name: user?.name})
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
        source={{uri: user?.image}}
      />
      <View style={styles.content}>
        <View style={styles.row}>
          <Text
            style={{color: 'black', flex: 1, fontWeight: 'bold'}}
            numberOfLines={1}>
            {user?.name}
          </Text>
          <Text style={{color: 'gray'}}>
            {dayjs(chat.LastMessage?.createdAt).fromNow(true)}
          </Text>
        </View>
        <Text style={{color: 'gray'}} numberOfLines={2}>
          {chat.LastMessage?.text}
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
