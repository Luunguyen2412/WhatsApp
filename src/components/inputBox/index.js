import {
  Text,
  View,
  Image,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {SafeAreaView} from 'react-native-safe-area-context';

const InputBox = ({}) => {
  const [newMessage, setNewMessage] = useState('');

  const onSend = () => {};

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <TouchableOpacity>
        <Text
          style={{
            color: 'black',
            fontSize: 30,
            paddingLeft: 10,
            overflow: 'hidden',
          }}>
          +
        </Text>
      </TouchableOpacity>
      {/* <FontAwesome size={24} name="home" color="black" /> */}
      <TextInput
        style={styles.input}
        placeholder="Type your message"
        placeholderTextColor="gray"
        // onChange={newMessage}
      />
      <TouchableOpacity>
        <Text style={{color: 'black', overflow: 'hidden', paddingRight: 5}}>
          send
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'whiteSmoke',
    padding: 5,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    color: 'black',
    padding: 5,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    borderColor: 'lightgray',
    borderWidth: StyleSheet.hairlineWidth,
  },
});

export default InputBox;
