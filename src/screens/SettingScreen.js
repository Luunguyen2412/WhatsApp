import {Text, View, Image, StyleSheet, Pressable, Button} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Auth} from 'aws-amplify';

const SettingScreen = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color: 'black'}}>SettingScreen</Text>
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
