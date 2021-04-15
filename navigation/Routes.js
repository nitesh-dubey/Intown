import React, {useContext, useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from './AuthProvider';

import AuthStack from './AuthStack';
import AppStack from './AppStack';

const Routes = () => {
  const {user, setUser, likedEventSet, setLikedEventSet} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = (user) => {

    if(user) {
      console.log(user);
      firestore()
      .collection('Users')
      .doc(user.uid)
      .get()
      .then(usr => {
        console.log(usr._data);
        setUser(usr._data);
        setLikedEventSet(new Set(usr._data.likedEventList));
      })
    }
    else {
      setUser(user);
    };

    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return <ActivityIndicator style={StyleSheet.activityIndicatorStyles} />; //or Provide a loader

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;

const styles = StyleSheet.create({
  activityIndicatorStyles : {
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center'
  }
})