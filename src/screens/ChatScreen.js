import {
  Text,
  View,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
  ImageBackground,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ChatListItem from '../components/ChatListItem';
import Message from '../components/Message';
import InputBox from '../components/inputBox';
import {useNavigation} from '@react-navigation/native';
import {API, graphqlOperation, Auth} from 'aws-amplify';
import {getChatRoom, listMessagesByChatRoom} from '../graphql/queries';
import background from '../../assets/images/wall.png';
import {onCreateMessage, onUpdateChatRoom} from '../graphql/subscriptions';

const ChatScreen = ({route}) => {
  const navigation = useNavigation();

  const [chatRoom, setChatRoom] = useState(null);
  const [messages, setMessages] = useState([]);

  const chatroomID = route.params.id;

  // fetch Chat Room
  useEffect(() => {
    API.graphql(graphqlOperation(getChatRoom, {id: chatroomID})).then(
      result => {
        setChatRoom(result.data?.getChatRoom);
      },
    );
    const subscription = API.graphql(
      graphqlOperation(onUpdateChatRoom, {filter: {id: {eq: chatroomID}}}),
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
  }, [chatroomID]);

  // fetch Messages
  useEffect(() => {
    API.graphql(
      graphqlOperation(listMessagesByChatRoom, {
        chatroomID,
        sortDirection: 'DESC',
      }),
    ).then(result => {
      setMessages(result.data?.listMessagesByChatRoom?.items);
    });

    // subscribe to new message
    const supscription = API.graphql(
      graphqlOperation(onCreateMessage, {
        filter: {chatroomID: {eq: chatroomID}},
      }),
    ).subscribe({
      next: ({value}) => {
        console.log('new message', value);
        setMessages(m => [value.data.onCreateMessage, ...m]);
      },
      error: err => console.log(err),
    });
    return () => supscription.unsubscribe();
  }, [chatroomID]);

  useEffect(() => {
    navigation.setOptions({title: route.params.name});
  }, [route.params.name]);

  if (!chatRoom) {
    return <ActivityIndicator />;
  }

  console.log(JSON.stringify(chatRoom));
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 90}
      style={styles.container}>
      <ImageBackground source={background} style={styles.container}>
        <FlatList
          style={{padding: 10}}
          data={messages}
          inverted
          renderItem={({item}) => <Message message={item} />}
        />
        <InputBox chatroom={chatRoom} />
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
});

export default ChatScreen;

const a = {
  id: '79796336-f99e-4aad-bb94-e55c28f46a6d',
  name: null,
  image: null,
  Messages: {items: [], nextToken: null, startedAt: null},
  users: {
    items: [
      {
        id: 'f93ac289-cbfb-4c45-ae31-e380d5c9b397',
        chatRoomId: '79796336-f99e-4aad-bb94-e55c28f46a6d',
        userId: 'cc8323ad-3494-46eb-a723-d7877a737509',
        createdAt: '2022-12-13T07:03:49.312Z',
        updatedAt: '2022-12-13T07:03:49.312Z',
        _version: 1,
        _deleted: null,
        _lastChangedAt: 1670915029314,
      },
      {
        id: '647329e9-dfeb-4f2e-8f12-34b31aa01a63',
        chatRoomId: '79796336-f99e-4aad-bb94-e55c28f46a6d',
        userId: '1c90e9de-9db4-426e-937f-907c1fab9311',
        createdAt: '2022-12-13T07:03:49.289Z',
        updatedAt: '2022-12-13T07:03:49.289Z',
        _version: 1,
        _deleted: null,
        _lastChangedAt: 1670915029291,
      },
      {
        id: '469e80fe-262e-4339-8391-e1870155b8af',
        chatRoomId: '79796336-f99e-4aad-bb94-e55c28f46a6d',
        userId: '0e7abce6-a3bc-4b28-b3e8-787b070a9cdd',
        createdAt: '2022-12-13T07:03:49.274Z',
        updatedAt: '2022-12-13T07:03:49.274Z',
        _version: 1,
        _deleted: null,
        _lastChangedAt: 1670915029277,
      },
    ],
    nextToken: null,
    startedAt: null,
  },
  LastMessage: null,
  createdAt: '2022-12-13T07:03:48.655Z',
  updatedAt: '2022-12-13T07:03:48.655Z',
  _version: 1,
  _deleted: null,
  _lastChangedAt: 1670915028679,
  chatRoomLastMessageId: null,
};
