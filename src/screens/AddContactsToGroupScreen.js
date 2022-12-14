import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Button,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import ContactListItem from '../components/ContactListItem';
import {useNavigation} from '@react-navigation/native';
import {listUsers} from '../graphql/queries';
import {API, graphqlOperation, Auth} from 'aws-amplify';
import {createChatRoom, createUserChatRoom} from '../graphql/mutations';

const AddContactsScreen = () => {
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
          title="Add"
          disabled={!name || selectedUserIds.length < 1}
          // onPress={onCreateGroupPress}
        />
      ),
    });
  }, [name, selectedUserIds]);

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

export default AddContactsScreen;
