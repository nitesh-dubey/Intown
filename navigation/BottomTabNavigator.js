import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {windowWidth} from '../utils/Dimensions';
const size = windowWidth * 0.07;

//Icons
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

//Screens
import EventScreen from '../screens/EventScreen';
import ProfileDrawer from './ProfileDrawer';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          backgroundColor: '#fff',
        },
        activeTintColor: '#000',
        showLabel: false,
      }}>
      <Tab.Screen
        name="Events"
        component={EventScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Entypo name={'home'} size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileDrawer}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialIcons name={'person-outline'} size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
