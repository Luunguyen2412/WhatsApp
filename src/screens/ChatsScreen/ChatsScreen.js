import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ChatListItem from '../../components/ChatListItem';
import {API, graphqlOperation, Auth} from 'aws-amplify';
import {listChatRooms} from './queries';
import {SwipeListView} from 'react-native-swipe-list-view';
// import chats from '../../../assets/data/chats.json';

const chats = [
  {
    id: '1',
    user: {
      id: 'u2',
      name: 'Lukas',
      image:
        'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/lukas.jpeg',
      status: 'Hey there!',
    },
    lastMessage: {
      id: 'm1',
      text: 'Well done this sprint, guys!',
      createdAt: '2022-10-14T13:30:00.000Z',
    },
  },
  {
    id: '2',
    user: {
      id: 'u3',
      name: 'Daniil Top',
      image:
        'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/1.jpg',
    },
    lastMessage: {
      id: 'm2',
      text: "How are you doing? Did you get any chance to look at what I've sent you?",
      createdAt: '2022-10-14T10:48:00.000Z',
    },
  },
  {
    id: '3',
    user: {
      id: 'u4',
      name: 'Alex',
      image:
        'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/8.png',
    },
    lastMessage: {
      id: 'm3',
      text: 'Hi, Vadim. I hope the plans for to night are still on.',
      createdAt: '2022-10-13T20:48:00.000Z',
    },
  },
  {
    id: '4',
    user: {
      id: 'u5',
      name: 'Vlad',
      image:
        'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/jeff.jpeg',
    },
    lastMessage: {
      id: 'm4',
      text: 'Could you please review my last merge?',
      createdAt: '2022-10-12T14:48:00.000Z',
    },
  },
  {
    id: '5',
    user: {
      id: 'u6',
      name: 'Elon Musk',
      image:
        'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/elon.png',
    },
    lastMessage: {
      id: 'm5',
      text: 'I would be happy meeting you',
      createdAt: '2022-10-11T14:48:00.000Z',
    },
  },
  {
    id: '6',
    user: {
      id: 'u7',
      name: 'Adrian',
      image:
        'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/graham.jpg',
    },
    lastMessage: {
      id: 'm6',
      text: 'I think I have a solution for tha.',
      createdAt: '2022-10-10T14:48:00.000Z',
    },
  },
  {
    id: '7',
    user: {
      id: 'u8',
      name: 'Borja',
      image:
        'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/zuck.jpeg',
    },
    lastMessage: {
      id: 'm7',
      text: 'How are you doing?',
      createdAt: '2022-10-09T14:30:00.000Z',
    },
  },
  {
    id: '8',
    user: {
      id: 'u9',
      name: 'Mom',
      image:
        'https://image.shutterstock.com/image-vector/super-mom-hero-superhero-cartoon-600w-720015928.jpg',
    },
    lastMessage: {
      id: 'm8',
      text: 'Dear, what did you eat, today?',
      createdAt: '2020-09-27T15:40:00.000Z',
    },
  },
  {
    id: '9',
    user: {
      id: 'u9',
      name: 'Andrei',
      image:
        'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/4.jpg',
    },
    lastMessage: {
      id: 'm8',
      text: 'What about our podcast?',
      createdAt: '2020-09-27T15:40:00.000Z',
    },
  },
  {
    id: '10',
    user: {
      id: 'u9',
      name: 'Misha',
      image:
        'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/biahaze.jpg',
    },
    lastMessage: {
      id: 'm8',
      text: 'Do I have to send you any more details?',
      createdAt: '2020-09-27T15:40:00.000Z',
    },
  },
  {
    id: '11',
    user: {
      id: 'u9',
      name: 'Alina',
      image:
        'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/7.png',
    },
    lastMessage: {
      id: 'm8',
      text: 'Here is a picture of Mark.',
      createdAt: '2020-09-27T15:40:00.000Z',
    },
  },
];

const ChatsScreen = () => {
  const [chatRoom, setChatRooms] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const renderHiddenItem = (data, rowMap) => (
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
        // onPress={() => deleteRow(rowMap, data.item.key)}
      >
        <Text style={styles.backTextWhite}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SwipeListView
      refreshing={loading}
      onRefresh={fetchChatRooms}
      // data={chats}
      // renderItem={renderItem}
      data={chatRoom}
      renderItem={({item}) => <ChatListItem chat={item.chatRoom} />}
      renderHiddenItem={renderHiddenItem}
      leftOpenValue={75}
      rightOpenValue={-150}
      previewRowKey={'0'}
      previewOpenValue={-40}
      previewOpenDelay={3000}
    />

    // <FlatList
    //   data={chatRoom}
    //   renderItem={({item}) => <ChatListItem chat={item.chatRoom} />}
    //   refreshing={loading}
    //   onRefresh={fetchChatRooms}
    // />
  );
};

const styles = StyleSheet.create({
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
