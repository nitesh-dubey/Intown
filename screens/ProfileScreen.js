import React, {useContext} from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {Text, Divider} from 'react-native-elements';
import {AuthContext} from '../navigation/AuthProvider';
import { useNavigation } from '@react-navigation/native';


const ProfileScreen = () => {
  const {logout, user} = useContext(AuthContext);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <Image
        style={styles.avatar}
        source={{
          uri : "https://randomuser.me/api/portraits/men/86.jpg",
        }}
      />
      <View style={styles.body}>
        <View style={styles.bodyContent}>
          <Text style={styles.name}>{user.name}</Text>

          <Divider style={styles.divider} />

          {/* <TouchableOpacity style={styles.buttonContainer}>
            <Text>Events Registered</Text>
          </TouchableOpacity> */}

          <View style = {styles.eventsCreatedCount}>
            <Text style={{fontSize : 20}}>Events Created : {user.eventsCreatedCount}</Text>
          </View>

          <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate("EventsCreatedScreen")}>
            <Text>Events Created</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};


export default ProfileScreen;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#00BFFF',
    height: 200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130,
  },
  name: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: '#696969',
    fontWeight: '600',
  },
  info: {
    fontSize: 16,
    color: '#00BFFF',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: '#696969',
    marginTop: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: '#00BFFF',
  },
  eventsCreatedCount : {
    marginTop : 20,
    marginBottom : 50,
  },
  divider : {
    width : '100%',
    height : 1,
    backgroundColor : 'black',
    marginTop : 15,
  }
});
