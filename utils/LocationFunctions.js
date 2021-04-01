import {PermissionsAndroid} from 'react-native';
import geohash from 'ngeohash';

export function requestLocationPermission(isLocationPermissionGranted, setIsLocationPermissionGranted) {
    return new Promise((resolve, reject) => {

        if(isLocationPermissionGranted) resolve();

        (async function (){
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title : 'InTown Location Permission',
                        message : 'InTown needs Location Permission to get Current Location',
                        buttonPositive : 'OK',
                        buttonNegative : 'Cancel',
                    }
                );
                if(granted === PermissionsAndroid.RESULTS.GRANTED) {
                    setIsLocationPermissionGranted(true);
                    resolve();
                }
                else {
                    alert('Location Permission Denied');
                    reject();
                }
            }
            catch(err) {
                console.warn(err);
            }
        })()

    })
}


export function getGeoHashRange(latitude, longitude, distance) {
    
    const lat = 0.0144927536231884; // degrees latitude per mile
    const lon = 0.0181818181818182; // degrees longitude per mile

    const lowerLat = latitude - lat * distance;
    const lowerLon = longitude - lon * distance;
  
    const upperLat = latitude + lat * distance;
    const upperLon = longitude + lon * distance;
  
    const lower = geohash.encode(lowerLat, lowerLon);
    const upper = geohash.encode(upperLat, upperLon);
  
    return {
      lower,
      upper
    };
}