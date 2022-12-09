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
import {API, graphqlOperation, Auth} from 'aws-amplify';
import {createChatRoom, createUserChatRoom} from '../../graphql/mutations';
import {getCommonChatRoomWithUser} from '../../services/chatRoomService';

import dayjs from 'dayjs';
dayjs.extend(relativeTime);

const ContactListItem = ({user}) => {
  const navigation = useNavigation();

  const onPress = async () => {
    console.log('press');

    //check if already have a Chatroom with user
    const existingChatroom = await getCommonChatRoomWithUser(user.id);
    if (existingChatroom) {
      navigation.navigate('Chat', {id: existingChatroom.chatRoom.id});
      return;
    }

    // create a new chatRoom
    const newChatRoomData = await API.graphql(
      graphqlOperation(createChatRoom, {input: {}}),
    );
    console.log('newChatRoom', newChatRoomData);

    if (!newChatRoomData.data?.createChatRoom) {
      console.log('Error creating the chat');
    }

    const newChatRoom = newChatRoomData.data?.createChatRoom;

    // add the user to the chatRoom
    await API.graphql(
      graphqlOperation(createUserChatRoom, {
        input: {chatRoomID: newChatRoom.id, userID: user.id},
      }),
    );

    // add the Auth User to the chatRoom
    const authUser = await Auth.currentAuthenticatedUser();
    await API.graphql(
      graphqlOperation(createUserChatRoom, {
        input: {
          chatRoomID: newChatRoom.id,
          userID: authUser.attributes.sub,
        },
      }),
    );

    // navigate to the new chatRoom screen
    navigation.navigate('Chat', {id: newChatRoom.id});
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image
        style={{
          width: 60,
          height: 60,
          backgroundColor: 'gray',
          borderRadius: 30,
          marginRight: 10,
        }}
        source={{uri: user.image}}
      />
      <View style={{flex: 1, marginRight: 10, marginVertical: 10}}>
        <Text
          style={{color: 'black', flex: 1, fontWeight: 'bold'}}
          numberOfLines={1}>
          {user.name}
        </Text>
        <Text style={{color: 'gray', flex: 1}} numberOfLines={1}>
          {user.status}
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    borderBottomColor: 'lightgray',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default ContactListItem;
