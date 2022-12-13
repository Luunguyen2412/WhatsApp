import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  Button,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import ContactListItem from '../components/ContactListItem';
import {useNavigation} from '@react-navigation/native';
import {listUsers} from '../graphql/queries';
import {API, graphqlOperation, Auth} from 'aws-amplify';
import {createChatRoom, createUserChatRoom} from '../graphql/mutations';

const NewGroupScreen = () => {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [selectedUserIds, setSelectedUserIds] = useState([]);

  // List user contact
  useEffect(() => {
    API.graphql(graphqlOperation(listUsers)).then(result => {
      setUsers(result.data?.listUsers?.items);
    });
  });

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="Create"
          disabled={!name || selectedUserIds.length < 1}
          onPress={onCreateGroupPress}
        />
      ),
    });
  }, [name, selectedUserIds]);

  const onCreateGroupPress = async () => {
    // create a new chatRoom
    const newChatRoomData = await API.graphql(
      graphqlOperation(createChatRoom, {input: {}}),
    );
    console.log('newChatRoomData', newChatRoomData);

    if (!newChatRoomData.data?.createChatRoom) {
      console.log('Error creating the chat');
    }

    const newChatRoom = newChatRoomData.data?.createChatRoom;

    // add the selected user to the chatRoom
    await Promise.all(
      selectedUserIds.map(userID =>
        API.graphql(
          graphqlOperation(createUserChatRoom, {
            input: {chatRoomId: newChatRoom.id, userId: userID},
          }),
        ),
      ),
    );

    // add the Auth User to the chatRoom
    const authUser = await Auth.currentAuthenticatedUser();
    await API.graphql(
      graphqlOperation(createUserChatRoom, {
        input: {
          chatRoomId: newChatRoom.id,
          userId: authUser.attributes.sub,
        },
      }),
    );

    setSelectedUserIds([]);
    setName('');

    // navigate to the new chatRoom screen
    navigation.navigate('Chat', {id: newChatRoom.id});
  };

  // select user to group chat -- change color status when you press
  const onContactPress = id => {
    setSelectedUserIds(userIds => {
      if (userIds.includes(id)) {
        // remove id from selecetd
        return [...userIds].filter(uid => uid !== id);
      } else {
        // add id to selected
        return [...userIds, id];
      }
    });
  };

  return (
    <View style={{backgroundColor: 'white'}}>
      <TextInput
        placeholder="Group name"
        value={name}
        onChangeText={setName}
        style={styles.input}
        placeholderTextColor="gray"
      />
      <FlatList
        data={users}
        renderItem={({item}) => (
          <ContactListItem
            user={item}
            selectable
            onPress={() => onContactPress(item.id)}
            isSelected={selectedUserIds.includes(item.id)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'lightgray',
    padding: 10,
    margin: 10,
    color: 'black',
  },
});

export default NewGroupScreen;
