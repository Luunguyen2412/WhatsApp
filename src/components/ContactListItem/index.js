import {Text, View, Image, StyleSheet, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import relativeTime from 'dayjs/plugin/relativeTime';
import {useNavigation} from '@react-navigation/native';

import dayjs from 'dayjs';
dayjs.extend(relativeTime);

const ContactListItem = ({user}) => {
  const navigation = useNavigation();
  return (
    <Pressable onPress={() => {}} style={styles.container}>
      <Image
        style={{
          width: 60,
          height: 60,
          backgroundColor: 'gray',
          borderRadius: 30,
          marginRight: 10,
        }}
        source={{uri: user.image}}
      />
      <Text
        style={{color: 'black', flex: 1, fontWeight: 'bold'}}
        numberOfLines={1}>
        {user.name}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 5,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    borderBottomColor: 'lightgray',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default ContactListItem;
