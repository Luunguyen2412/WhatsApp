import {View, Text, Image, StyleSheet, FlatList} from 'react-native';
import chats from '../../assets/data/chats.json';
import React, {useEffect, useState} from 'react';
import ContactListItem from '../components/ContactListItem';
import {API, graphqlOperation, Auth} from 'aws-amplify';
import {listUsers} from '../graphql/queries';

const ContactsScreen = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.graphql(graphqlOperation(listUsers)).then(result => {
      setUsers(result.data?.listUsers?.items);
    });
  });

  return (
    <FlatList
      data={users}
      renderItem={({item}) => <ContactListItem user={item} />}
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
