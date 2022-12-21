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
import {API, graphqlOperation, Auth} from 'aws-amplify';
import {createMessage, updateChatRoom} from '../../graphql/mutations';

const InputBox = ({chatroom}) => {
  const [text, setText] = useState('');
  const [files, setFiles] = useState([]);
  const [image, setImage] = useState(null);

  const onSend = async () => {
    const authUser = await Auth.currentAuthenticatedUser();

    const newMessage = {
      chatroomID: chatroom.id,
      text,
      userID: authUser.attributes.sub,
    };
    const newMessageData = await API.graphql(
      graphqlOperation(createMessage, {input: newMessage}),
    );

    setText('');

    //set the new message
    await API.graphql(
      graphqlOperation(updateChatRoom, {
        input: {
          _version: chatroom._version,
          chatRoomLastMessageId: newMessageData.data.createMessage.id,
          id: chatroom.id,
        },
      }),
    );
  };

  const pickImage = async () => {};

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        <FontAwesome size={24} name="images" color="black" />
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Type your message"
        placeholderTextColor="gray"
        onChangeText={setText}
        value={text}
      />
      {text.length > 0 ? (
        <View
          style={{padding: 8, borderRadius: 60, backgroundColor: 'royalblue'}}>
          <FontAwesome
            // onPress={onSend}
            onPress={onSend}
            size={20}
            name="paper-plane"
            color="white"
          />
        </View>
      ) : (
        <TouchableOpacity onPress={() => {}}>
          <Text style={{color: 'black', overflow: 'hidden', paddingRight: 5}}>
            send
          </Text>
        </TouchableOpacity>
      )}
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
