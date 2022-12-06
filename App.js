/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
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
import {Amplify} from 'aws-amplify';
import {withAuthenticator} from 'aws-amplify-react-native';
import awsconfig from './src/aws-exports';

Amplify.configure({...awsconfig, Analytics: {disabled: true}});

const App = () => {
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
