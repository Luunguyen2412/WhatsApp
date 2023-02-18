import {View, Text, StyleSheet, TextInput, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import {API, graphqlOperation, Auth} from 'aws-amplify';
import {listChatRooms} from './ChatsScreen/queries';

const SearchGroupScreen = () => {
  const [name, setName] = useState();
  const [chatRoom, setChatRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  console.log('search', filteredDataSource);

  const a = [
    {
      LastMessage: {
        createdAt: '2022-12-21T08:51:09.622Z',
        id: 'ba26b670-faca-4dde-a7b9-ed10d89aea55',
        text: 'Upppp',
      },
      id: '5c95a489-8f19-4f83-be54-34874d83d5e7',
      image: null,
      name: null,
      updatedAt: '2022-12-21T08:51:09.972Z',
      users: {items: [Array]},
    },
    {
      LastMessage: null,
      id: '74b76fb9-e384-4f15-8965-e28c26970df5',
      image: null,
      name: null,
      updatedAt: '2022-12-13T07:03:13.925Z',
      users: {items: [Array]},
    },
    {
      LastMessage: null,
      id: 'b406fdbd-f2eb-4896-8e32-803bfc8145bf',
      image: null,
      name: null,
      updatedAt: '2022-12-28T03:58:45.639Z',
      users: {items: [Array]},
    },
  ];

  const fetchChatRooms = async () => {
    const authUser = await Auth.currentAuthenticatedUser();

    // const response = await API.graphql(
    //   graphqlOperation(listChatRooms, {id: authUser.attributes.sub}),
    // );

    await API.graphql(
      graphqlOperation(listChatRooms, {id: authUser.attributes.sub}),
    )
      .then(res => res)
      .then(resJson => {
        setChatRooms(resJson.data.getUser.ChatRooms.items);
        setFilteredDataSource(resJson.data.getUser.ChatRooms.items);
        setMasterDataSource(resJson.data.getUser.ChatRooms.items);
      });

    // const rooms = response.data.getUser.ChatRooms.items || [];

    // setChatRooms(rooms);
  };

  useEffect(() => {
    fetchChatRooms();
  }, []);

  //   useEffect(() => {
  //     fetch('https://jsonplaceholder.typicode.com/posts')
  //       .then(response => response.json())
  //       .then(responseJson => {
  //         // setFilteredDataSource(responseJson);
  //         // setMasterDataSource(responseJson);
  //       })
  //       .catch(error => {
  //         console.error(error);
  //       });
  //   }, []);

  const searchFilterFunction = text => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      //   const newData = masterDataSource.filter(function (item) {
      //     const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
      //     const textData = text.toUpperCase();
      //     return itemData.indexOf(textData) > -1;
      //   });
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.name ? item.name : '';
        const textData = text;
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({item}) => {
    return (
      // Flat List Item
      <Text style={styles.itemStyle} onPress={() => getItem(item)}>
        {/* {item.id}
        {'.'}
        {item.title.toUpperCase()} */}
        {item.name !== 0 ? item.name : 'abc'}
      </Text>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  const getItem = item => {
    // Function for click on an item
    // alert('Id : ' + item.id + ' Title : ' + item.title);
  };

  return (
    <View>
      <TextInput
        placeholder="Group name"
        onChangeText={text => searchFilterFunction(text)}
        value={search}
        underlineColorAndroid="transparent"
        style={styles.input}
        placeholderTextColor="gray"
      />
      <FlatList
        data={filteredDataSource}
        // data={data}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={ItemView}
      />
    </View>
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
  itemStyle: {
    padding: 10,
    color: 'black',
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
  },
});

export default SearchGroupScreen;
