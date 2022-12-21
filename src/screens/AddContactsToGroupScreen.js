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

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  // List user contact
  useEffect(() => {
    API.graphql(graphqlOperation(listUsers)).then(result => {
      setUsers(result.data?.listUsers?.items);
      setFilteredDataSource(result.data?.listUsers?.items);
      setMasterDataSource(result.data?.listUsers?.items);
    });
  });

  // Search filter
  const searchFilterFunction = text => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="Invite"
          disabled={selectedUserIds.length < 1}
          // onPress={onCreateGroupPress}
        />
      ),
    });
  }, [selectedUserIds]);

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
        placeholder="Search here"
        value={search}
        onChangeText={item => searchFilterFunction(item)}
        style={styles.input}
        placeholderTextColor="gray"
      />
      {/* <FlatList
        data={users}
        renderItem={({item}) => (
          <ContactListItem
            user={item}
            selectable
            onPress={() => onContactPress(item.id)}
            isSelected={selectedUserIds.includes(item.id)}
          />
        )}
      /> */}
      <FlatList
        data={filteredDataSource}
        keyExtractor={(item, index) => index.toString()}
        // ItemSeparatorComponent={ItemSeparatorView}
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
