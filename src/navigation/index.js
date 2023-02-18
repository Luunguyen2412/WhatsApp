import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ChatScreen from '../screens/ChatScreen';
import ChatsScreen from '../screens/ChatsScreen/ChatsScreen';
import MainTabNavigator from './mainTabNavigator';
import ContactsScreen from '../screens/ContactsScreen';
import NewGroupScreen from '../screens/NewGroupScreen';
import GroupInfoScreen from '../screens/GroupInfoScreen';
import AddContactsScreen from '../screens/AddContactsToGroupScreen';
import {createStackNavigator} from '@react-navigation/stack';
import SearchGroupScreen from '../screens/SearchGroupScreen';
import AddNotes from '../screens/ToDoScreen/AddNotes';
import EditNote from '../screens/ToDoScreen/EditNote';

const Stack = createNativeStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerStyle: {backgroundColor: 'whitesmoke'}}}>
        <Stack.Screen
          name="Home"
          component={MainTabNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Search Group" component={SearchGroupScreen} />
        <Stack.Screen name="Edit Note" component={EditNote} />

        <Stack.Screen name="Add Note" component={AddNotes} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Group Info" component={GroupInfoScreen} />

        <Stack.Screen name="Contacts" component={ContactsScreen} />
        <Stack.Screen name="New Group" component={NewGroupScreen} />
        <Stack.Screen name="Add Contacts" component={AddContactsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
