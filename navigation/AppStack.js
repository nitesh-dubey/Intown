import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import { View } from 'react-native';

//screens
import EventScreen from '../screens/EventScreen';
import ProfileScreen from '../screens/ProfileScreen';
import BottomTabNavigator from './BottomTabNavigator';
import NewEventScreen from '../screens/NewEventScreen';
import EventDetailScreen from '../screens/EventDetailScreen';
import MapScreen from '../screens/MapScreen';
import EventsCreatedScreen from '../screens/EventsCreatedScreen';


const Stack = createStackNavigator();

//It's App stack navigator which wraps BottomTabNavigator and all the screens of the app. 
const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{...TransitionPresets.SlideFromRightIOS}}>
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
      <Stack.Screen
        name="EventDetailScreen"
        component={EventDetailScreen}
        options={{
          title : "Event Details",
          headerTitleAlign : 'center',
          headerStyle : {
            elevation : 1
          }
        }}
      />
      <Stack.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          title : "location",
          headerTitleAlign : 'center',
          headerStyle : {
            elevation : 1
          }
        }}
      />
      <Stack.Screen
        name="EventsCreatedScreen"
        component={EventsCreatedScreen}
        options={{
          title : "Events By Me",
          headerTitleAlign : 'center',
          headerStyle : {
            elevation : 1
          }
        }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
