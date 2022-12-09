import {Text, View, Image, StyleSheet, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import ChatListItem from '../../components/ChatListItem';
import {API, graphqlOperation, Auth} from 'aws-amplify';
import {listChatRooms} from './queries';

const ChatsScreen = () => {
  const [chatRoom, setChatRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchChatRooms = async () => {
    setLoading(true);
    const authUser = await Auth.currentAuthenticatedUser();

    const response = await API.graphql(
      graphqlOperation(listChatRooms, {id: authUser.attributes.sub}),
    );

    const rooms = response.data.getUser.ChatRooms.items || [];

    const sortedRooms = rooms.sort((r1, r2) => {
      new Date(r2.chatRoom.updatedAt) - new Date(r1.chatRoom.updatedAt);
    });

    setChatRooms(sortedRooms);
    setLoading(false);
  };

  useEffect(() => {
    fetchChatRooms();
  }, []);

  return (
    <FlatList
      data={chatRoom}
      renderItem={({item}) => <ChatListItem chat={item.chatRoom} />}
      refreshing={loading}
      onRefresh={fetchChatRooms}
    />
  );
};

const styles = StyleSheet.create({});

export default ChatsScreen;
