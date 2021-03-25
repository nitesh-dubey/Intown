import {PermissionsAndroid} from 'react-native';

export function requestLocationPermission(isLocationPermissionGranted, setIsLocationPermissionGranted) {
    return new Promise((resolve, reject) => {

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