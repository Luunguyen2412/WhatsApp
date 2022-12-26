import {Text, View, Image, StyleSheet, Pressable, Button} from 'react-native';
import React, {useEffect, useState} from 'react';
import {API, graphqlOperation, Auth} from 'aws-amplify';
import {getUser} from '../graphql/queries';

const SettingScreen = () => {
  const [name, setName] = useState(null);
  const [user, setUser] = useState();

  useEffect(() => {
    API.graphql(
      graphqlOperation(getInfoUser, {
        id: 'cc8323ad-3494-46eb-a723-d7877a737509',
      }),
    ).then(result => {
      // setName(result.data?.getUser?.name);
      // console.log(result);
      setUser(result.data?.getUser);
    });
  }, []);

  // console.log(user?.name);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color: 'black'}}>SettingScreen</Text>

      <Text style={{color: 'black'}}>Name: {user?.name}</Text>
      <Text style={{color: 'black'}}>Status: {user?.status}</Text>
      <Image
        style={{
          width: 60,
          height: 60,
          backgroundColor: 'gray',
          borderRadius: 30,
        }}
        source={{uri: user?.image}}
      />

      <Button
        onPress={() => {
          Auth.signOut();
        }}
        title="Sign out"
      />
    </View>
  );
};
export default SettingScreen;

export const getInfoUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      image
      name
      status
    }
  }
`;
