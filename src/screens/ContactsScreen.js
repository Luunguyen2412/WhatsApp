import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import chats from '../../assets/data/chats.json';
import React, {useEffect, useState} from 'react';
import ContactListItem from '../components/ContactListItem';
import {listUsers} from '../graphql/queries';
import {useNavigation} from '@react-navigation/native';
import {API, graphqlOperation, Auth} from 'aws-amplify';
import {createChatRoom, createUserChatRoom} from '../graphql/mutations';
import {getCommonChatRoomWithUser} from '../services/chatRoomService';

const ContactsScreen = ({}) => {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);

  // List user contact
  useEffect(() => {
    API.graphql(graphqlOperation(listUsers)).then(result => {
      setUsers(result.data?.listUsers?.items);
    });
  });

  const createAChatRoomWithTheUser = async user => {
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
    <FlatList
      data={users}
      renderItem={({item}) => (
        <ContactListItem
          user={item}
          onPress={() => {
            createAChatRoomWithTheUser(item);
          }}
        />
      )}
      ListHeaderComponent={() => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('New Group');
          }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 15,
            paddingHorizontal: 20,
          }}>
          <View
            style={{
              height: 40,
              width: 40,
              marginRight: 20,
              backgroundColor: 'gainsboro',
              padding: 7,
              borderRadius: 20,
              overflow: 'hidden',
            }}
          />
          <Text style={{color: 'royalblue', fontSize: 16}}>New Group</Text>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
    color: 'gray',
  },
  image: {
    width: '80%',
    aspectRatio: 2 / 1,
  },
});

export default ContactsScreen;
