import {Text, View, Image, StyleSheet, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import {API, graphqlOperation, Auth} from 'aws-amplify';
import {getChatRoom} from '../../graphql/queries';
dayjs.extend(relativeTime);

const Message = ({message}) => {
  const [isMe, setIsMe] = useState(false);
  const [user, setUser] = useState([]);

  console.log('authUser', message.userID);

  // console.log('user', user);

  useEffect(() => {
    const isMyMessage = async () => {
      const authUser = await Auth.currentAuthenticatedUser();

      setIsMe(message.userID === authUser.attributes.sub);
    };

    isMyMessage();
  }, []);

  // console.log(message);

  // fetch List Users in chatRoom
  useEffect(() => {
    API.graphql(
      graphqlOperation(getListUserInChatRoom, {
        id: '121daa96-1c08-423c-a446-2acff4bb9261',
      }),
    ).then(result => {
      setUser(result.data?.getChatRoom?.users?.items);
    });
  }, []);

  const mapUser = user.find(c => c.user.id === message.userID);

  // console.log(mapUser?.user?.name);

  return (
    // <View
    //   style={[
    //     styles.container,
    //     {
    //       backgroundColor: isMe ? '#DCF8C5' : 'white',
    //       alignSelf: isMe ? 'flex-end' : 'flex-start',
    //     },
    //   ]}>
    //   <Text style={{color: 'black'}}>{message.text}</Text>
    //   <Text style={{color: 'gray', alignSelf: 'flex-end'}}>
    //     {dayjs(message.createdAt).fromNow(true)}
    //   </Text>
    // </View>
    <View style={{flexDirection: 'column'}}>
      {/* {!isMe && <Text style={{color: 'black'}}>{mapUser.user.name}</Text>} */}
      {/* {!isMe && <Text style={{color: 'black'}}>{user?.user?.name}</Text>} */}
      <View
        style={{
          flexDirection: 'row',
          alignSelf: isMe ? 'flex-end' : 'flex-start',
        }}>
        {!isMe && (
          <Image
            style={{
              width: 40,
              height: 40,
              backgroundColor: 'gray',
              borderRadius: 30,
            }}
            // source={{uri: user?.image}}
          />
        )}

        <View
          style={[
            styles.container,
            {
              backgroundColor: isMe ? '#DCF8C5' : 'white',
              // alignSelf: isMe ? 'flex-end' : 'flex-start',
            },
          ]}>
          <Text style={{color: 'black'}}>{message.text}</Text>
          <Text style={{color: 'gray', alignSelf: 'flex-end'}}>
            {dayjs(message.createdAt).fromNow(true)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
    padding: 10,
    borderRadius: 10,
    width: '60%',

    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
});

export default Message;

export const getListUserInChatRoom = /* GraphQL */ `
  query getChatRoom($id: ID!) {
    getChatRoom(id: $id) {
      users {
        items {
          user {
            id
            name
          }
        }
      }
    }
  }
`;
