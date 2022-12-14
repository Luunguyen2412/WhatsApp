import {
  Text,
  View,
  Image,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import relativeTime from 'dayjs/plugin/relativeTime';
import {useNavigation} from '@react-navigation/native';

import dayjs from 'dayjs';
import {API, Auth, graphqlOperation} from 'aws-amplify';
import {onUpdateChatRoom} from '../../graphql/subscriptions';

dayjs.extend(relativeTime);

const ChatListItem = ({chat}) => {
  const [user, setUser] = useState(null);
  const [chatRoom, setChatRoom] = useState(chat);

  useEffect(() => {
    const fetchUser = async () => {
      const authUser = await Auth.currentAuthenticatedUser();

      //find user that not us (author user)
      const userItem = chatRoom.users.items.find(
        item => item.user.id !== authUser.attributes.sub,
      );
      setUser(userItem?.user);
    };
    fetchUser();
  }, []);

  // fetch Chat Room
  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(onUpdateChatRoom, {filter: {id: {eq: chat.id}}}),
    ).subscribe({
      next: ({value}) => {
        // console.log('updated', value);
        setChatRoom(cr => ({
          ...(cr || {}),
          ...value.data.onUpdateChatRoom,
        }));
      },
      error: err => console.log(err),
    });
    return () => subscription.unsubscribe();
  }, [chat.id]);

  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Chat', {
          id: chatRoom.id,
          name: chatRoom.name || user?.name,
        })
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
            {chatRoom.name || user?.name}
          </Text>
          {chat.LastMessage && (
            <Text style={{color: 'gray'}}>
              {dayjs(chatRoom.LastMessage?.createdAt).fromNow(true)}
            </Text>
          )}
        </View>
        <Text style={{color: 'gray'}} numberOfLines={2}>
          {chatRoom.LastMessage?.text}
        </Text>
      </View>
    </TouchableOpacity>
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
