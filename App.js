/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Navigator from './src/navigation/index';
import {Amplify, Auth, API, graphqlOperation} from 'aws-amplify';
import {withAuthenticator} from 'aws-amplify-react-native';
import awsconfig from './src/aws-exports';
import {getUser} from './src/graphql/queries';
import {createUser} from './src/graphql/mutations';

Amplify.configure({...awsconfig, Analytics: {disabled: true}});

const App = () => {
  useEffect(() => {
    const syncUser = async () => {
      // get Auth User
      const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
      // console.log('authUser', authUser);

      //query the DB using Auth user id (sub)
      const userData = await API.graphql(
        graphqlOperation(getUser, {id: authUser.attributes.sub}),
      );
      // console.log('userData', userData);

      if (userData.data.getUser) {
        console.log('User already exists in DB');
        return;
      }

      //if no user in DB, create one
      const newUser = {
        id: authUser.attributes.sub,
        name: authUser.attributes.phone_number,
        status: 'hey, i am using WhatsApp',
      };

      console.log('newUser', newUser);

      await API.graphql(graphqlOperation(createUser, {input: newUser}));
    };
    syncUser();
  }, []);

  return (
    <View
      style={{
        backgroundColor: 'whitesmoke',
        justifyContent: 'center',
        flex: 1,
      }}>
      <Navigator />
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({});

export default withAuthenticator(App);
