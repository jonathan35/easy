import React, { useState, useEffect, useContext } from 'react';
import { Context } from './Store';
import * as Location from 'expo-location';
import { addNotificationsDroppedListener } from 'expo-notifications';


export const LocationComponent = () => {

    const { state, dispatch } = useContext(Context);
    const [gpsLocation, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    


    //useEffect(() => {
    let locInterval = setInterval(() => {
        (async () => {
            
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            } else {
                //console.log('GPS Granted');
            }
            
            let loc = await Location.getCurrentPositionAsync({});
            //console.log('after getCurrentPositionAsync'+loc);

            if (loc) {

                //console.log('Sync:' + JSON.stringify(loc));

                dispatch({ type: 'SET_LOCATION', value: loc });

                setLocation(loc);
                sendLocationApi(loc);//hopping call to syncronise every minute
                
            } else {
                //console.log('Set new GPS Location:NONE');
            }
        })();
    }, 10000);//60000 = 1 minute
    //}, []);

    /*

    useEffect(() => {
        console.log('First:'+gpsLocation);
        sendLocationApi(gpsLocation);//hoping call for the first time
    }, []);*/
    
    //let text = 'Waiting..';
    //if (errorMsg) {
        //text = errorMsg;
    //} else if (gpsLocation) {
        //let myInterval = setInterval(() => {
            //console.log('Sync:'+gpsLocation);
            //sendLocationApi(gpsLocation);//hopping call to syncronise every minute
        //}, 6000);//60000 = 1 minute
    //}

    const sendLocationApi = async (locationInput) => {

        var locationInput = JSON.stringify(locationInput);
        
        if (state.user.id) {
            
            let data = new FormData();
            data.append('uid', state.user.id)
            data.append('location', locationInput)
                
            try {
                let response = await fetch('https://easymovenpick.com/api/location.php', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'multipart/form-data; '
                    },
                    body: data
                })
                    .then((response) => response.json())
                    .then((json) => {
                        let message = json.message;
                        //console.log('Loaded>>>>'+locationInput);
                    })
            } catch (error) {
                console.log('Location component: '+error);
            }
        } else {
            console.log('No driver id for send location.');
        }
    }

    return (
        <></>
    )

}


export default { LocationComponent };