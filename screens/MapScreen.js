import React, { Component } from 'react';
import { View, Text, StyleSheet,Button } from 'react-native';
import MapView , {Marker} from 'react-native-maps';

class MapScreen extends Component {

  

    render() {
        const paramsMap = this.props.route.params
        return (
            <View style={styles.container}>
               <MapView style={styles.map} initialRegion={{latitude:parseFloat(paramsMap.latitude), longitude:parseFloat(paramsMap.longitude), latitudeDelta:0.09, longitudeDelta:0.0921 }}  >
                   <Marker coordinate={{latitude:parseFloat(paramsMap.latitude), longitude:parseFloat(paramsMap.longitude) }} title={paramsMap.eventName} />
               </MapView>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject
    },
    map:{
        ...StyleSheet.absoluteFillObject
    }
});

//make this component available to the app
export default MapScreen;