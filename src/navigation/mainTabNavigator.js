import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import ChatsScreen from '../screens/ChatsScreen/ChatsScreen';
import NotImplementedScreen from '../screens/NotImplementedScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import SettingScreen from '../screens/SettingScreen';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Chats"
      screenOptions={{
        tabBarStyle: {backgroundColor: 'whitesmoke'},
        headerStyle: {backgroundColor: 'whitesmoke'},
      }}>
      <Tab.Screen
        name="Status"
        component={NotImplementedScreen}
        // options={{
        //   tabBarIcon: ({color, size}) => (
        //     <Ionicons name="logo-whatsapp" size={size} color={color} />
        //   ),
        // }}
      />
      <Tab.Screen name="Calls" component={NotImplementedScreen} />
      <Tab.Screen name="Camera" component={NotImplementedScreen} />
      <Tab.Screen
        name="Chats"
        component={ChatsScreen}
        options={({navigation}) => ({
          // tabBarIcon: ({color, size}) => (
          //   <Ionicons name="ios-chatbubbles-sharp" size={size} color={color} />
          // ),
          headerRight: () => (
            <FontAwesome
              style={{paddingRight: 20}}
              onPress={() => navigation.navigate('Contacts')}
              size={30}
              name="home"
              color="black"
            />
          ),
        })}
      />
      <Tab.Screen name="Settings" component={SettingScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
