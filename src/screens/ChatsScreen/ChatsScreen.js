import {
  Text,
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ChatListItem from '../../components/ChatListItem';
import {API, graphqlOperation, Auth} from 'aws-amplify';
import {listChatRooms} from './queries';
import {SwipeListView} from 'react-native-swipe-list-view';
import {deleteChatRoom} from '../../graphql/mutations';
import {useNavigation} from '@react-navigation/native';

const ChatsScreen = () => {
  const [chatRoom, setChatRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const fetchChatRooms = async () => {
    setLoading(true);
    const authUser = await Auth.currentAuthenticatedUser();

    const response = await API.graphql(
      graphqlOperation(listChatRooms, {id: authUser.attributes.sub}),
    );

    const rooms = response.data.getUser.ChatRooms.items || [];

    const sortedRooms = rooms.sort((r1, r2) => {
      new Date(r2.chatRoom.updatedAt) - new Date(r1.chatRoom.updatedAt);
    });

    setChatRooms(sortedRooms);
    setLoading(false);
  };

  useEffect(() => {
    fetchChatRooms();
  }, []);

  const removeChatRoom = async chatRoom => {
    console.log(chatRoom);
    await API.graphql(
      graphqlOperation(deleteChatRoom, {
        input: {_version: 1, id: chatRoom.id},
      }),
    );
    console.log('delete succesfully');
    fetchChatRooms();
  };

  const onRemovePress = item => {
    Alert.alert(
      'Removing the Room',
      `Are you sure you want to remove ${item.chatRoom?.name} ?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => removeChatRoom(item.chatRoom),
        },
      ],
    );
  };

  const renderHiddenItem = data => {
    return (
      <View style={styles.rowBack}>
        <TouchableOpacity>
          <Text style={{color: 'black'}}>Left</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.backRightBtn, styles.backRightBtnLeft]}
          // onPress={() => closeRow(rowMap, data.item.key)}
        >
          <Text style={styles.backTextWhite}>Close</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.backRightBtn, styles.backRightBtnRight]}
          onPress={() => onRemovePress(data)}>
          <Text style={styles.backTextWhite}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      <TextInput
        placeholder="Group name"
        style={styles.input}
        placeholderTextColor="gray"
        onPressIn={() => {
          console.log('searchhh');
          navigation.navigate('Search Group');
        }}
      />
      <SwipeListView
        refreshing={loading}
        onRefresh={fetchChatRooms}
        data={chatRoom}
        renderItem={({item}) => <ChatListItem chat={item.chatRoom} />}
        renderHiddenItem={({item}) => renderHiddenItem(item)}
        leftOpenValue={75}
        rightOpenValue={-150}
        previewRowKey={'0'}
        previewOpenValue={-40}
        previewOpenDelay={3000}
      />
    </View>

    // <FlatList
    //   data={chatRoom}
    //   renderItem={({item}) => <ChatListItem chat={item.chatRoom} />}
    //   refreshing={loading}
    //   onRefresh={fetchChatRooms}
    // />
  );
};

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'lightgray',
    padding: 10,
    margin: 10,
    color: 'black',
    backgroundColor: 'white',
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
  },
  rowBack: {
    alignItems: 'center',
    // backgroundColor: '',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
});

export default ChatsScreen;
