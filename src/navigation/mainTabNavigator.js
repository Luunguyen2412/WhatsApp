import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import ChatsScreen from '../screens/ChatsScreen/ChatsScreen';
import NotImplementedScreen from '../screens/NotImplementedScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import SettingScreen from '../screens/SettingScreen';
import {View} from 'react-native';
import CameraScreen from '../screens/CameraScreen';
import ImagePicker from 'react-native-image-crop-picker';
import ToDoView from '../screens/ToDoScreen';
import StatisticScreen from '../screens/Statistic';

const Tab = createBottomTabNavigator();

const openCamera = () => {
  ImagePicker.openCamera({
    width: 300,
    height: 400,
    cropping: true,
  }).then(image => {
    console.log(image);
  });
};

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
        component={StatisticScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <FontAwesome size={size} name="home" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Notes"
        component={ToDoView}
        options={{
          tabBarIcon: ({color, size}) => (
            <FontAwesome size={size} name="pencil" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Camera"
        onPress={openCamera}
        component={CameraScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <FontAwesome size={size} name="camera" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Chats"
        component={ChatsScreen}
        options={({navigation}) => ({
          tabBarIcon: ({color, size}) => (
            <FontAwesome size={size} name="comments" color={color} />
          ),
          headerRight: () => (
            <View
              style={{
                height: 40,
                width: 40,
                marginRight: 15,
                backgroundColor: 'gainsboro',
                padding: 7,
                borderRadius: 20,
                overflow: 'hidden',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <FontAwesome
                onPress={() => navigation.navigate('Contacts')}
                size={20}
                name="comment-medical"
                color={'royalblue'}
              />
            </View>
          ),
        })}
      />
      <Tab.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <FontAwesome size={size} name="cog" color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
