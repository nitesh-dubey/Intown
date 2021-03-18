import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import FormButton from '../components/FormButton';
import {AuthContext} from '../navigation/AuthProvider';

//width, height
import {windowWidth, windowHeight} from '../utils/Dimensions';

//dummy data
import eventsData from '../data/eventsData.json';

const Item = ({item}) => {
  return (
    <View style={styles.listItem}>
      <View style={styles.thumbnailStyle}>
        <Image
          source={{uri: item.photo}}
          style={{width: '100%', height: windowWidth, borderRadius: 2}}
        />
      </View>

      <View style={{alignItems: 'center', flex: 1}}>
        <Text style={{fontWeight: 'bold', fontSize: 20, marginTop: 5}}>
          {item.name}
        </Text>
        <Text style={{fontWeight: '100', fontSize: 18, marginTop: 5}}>
          {item.place}
        </Text>
        <Text style={{fontWeight: '500', fontSize: 15, marginTop: 5}}>
          {item.date}
        </Text>
        <Text>{item.position}</Text>
      </View>
      <TouchableOpacity
        style={{
          height: 50,
          width: 50,
          marginBottom: 10,
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: 'green'}}>View</Text>
      </TouchableOpacity>
    </View>
  );
};

const EventScreen = () => {
  const [data, setData] = useState(eventsData);

  return (
    <View style={styles.container}>
      <FlatList
        style={{flex: 1}}
        data={data}
        renderItem={({item}) => <Item item={item} />}
        keyExtractor={(item) => item.eventId}
      />
    </View>
  );
};

export default EventScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    marginTop: 60,
  },
  listItem: {
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: '#FFF',
    width: '100%',
    flex: 1,
    alignSelf: 'center',
    flexDirection: 'column',
    borderRadius: 5,
  },
  thumbnailStyle: {
    alignSelf: 'center',
    resizeMode: 'contain',
    height: windowWidth,
    width: '100%',
  },
});
