import {Text, View, Image, StyleSheet, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import ChatListItem from '../../components/ChatListItem';
import {API, graphqlOperation, Auth} from 'aws-amplify';
import {listChatRooms} from './queries';

const ChatsScreen = () => {
  const [chatRoom, setChatRooms] = useState([]);

  useEffect(() => {
    const fetchChatRooms = async () => {
      const authUser = await Auth.currentAuthenticatedUser();

      const response = await API.graphql(
        graphqlOperation(listChatRooms, {id: authUser.attributes.sub}),
      );
      setChatRooms(response.data.getUser.ChatRooms.items);
    };
    fetchChatRooms();
  }, []);

  return (
    <FlatList
      data={chatRoom}
      renderItem={({item}) => <ChatListItem chat={item.chatRoom} />}
    />
  );
};

const styles = StyleSheet.create({});

export default ChatsScreen;
