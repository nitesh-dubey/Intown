import React, {useContext} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import FormButton from '../components/FormButton';
import {AuthContext} from '../navigation/AuthProvider';

const EventScreen = () => {
  // return (
  //   <View style={styles.container}>
  //     <Text style={styles.text}>HomeScreen</Text>
  //     <FormButton buttonTitle="Logout" onPress={() => logout()} />
  //   </View>
  // );

  return (
    <View style={styles.container}>
      <Text>Events Screen</Text>
    </View>
  );
};

export default EventScreen;

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#f9fafd',
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   text: {
//     fontSize: 20,
//     color: '#333333',
//   },
// });

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafd',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
