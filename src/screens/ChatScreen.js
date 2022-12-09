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

  // console.log(chatRoom.Messages.items);

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
