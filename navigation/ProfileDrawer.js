import React, {useContext} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext} from './AuthProvider';

//screens
import ProfileScreen from '../screens/ProfileScreen';

const Drawer = createDrawerNavigator();

const DrawerContent = (props) => {
  const {logout} = useContext(AuthContext);
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        icon={({color, size}) => (
          <Icon
            name="exit-to-app"
            color={color}
            size={size}
            onPress={() => logout()}
          />
        )}
        onPress={() => logout()}
        label="Sign Out"
      />
    </DrawerContentScrollView>
  );
};

const ProfileDrawer = () => {
  //const {logout} = useContext(AuthContext);

  return (
    <Drawer.Navigator
      initialRouteName="Profile"
      drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  appName: {
    fontSize: 20,
    backgroundColor: '#f0f0f0',
  },
});

export default ProfileDrawer;
