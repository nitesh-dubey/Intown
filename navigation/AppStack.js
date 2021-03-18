import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { View } from 'react-native';

//screens
import EventScreen from '../screens/EventScreen';
import ProfileScreen from '../screens/ProfileScreen';
import BottomTabNavigator from './BottomTabNavigator';
import NewEventScreen from '../screens/NewEventScreen';


const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomTabNavigator"
        component={BottomTabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen name="EventScreen" component={EventScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen 
        name="NewEventScreen" 
        component={NewEventScreen} 
        options={{
          title : "New Event",
          headerTitleAlign : 'center',
          headerStyle : {
            elevation : 1,
          }
        }}/>
    </Stack.Navigator>
  );
};

export default AppStack;
