import React, { useState, useEffect, useContext } from 'react';
import { Context } from './Store';
import * as Location from 'expo-location';


export const LocationComponent = () => {

    const { state, dispatch } = useContext(Context);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            dispatch({ type: 'SET_LOCATION', value: location });
        })();
    }, []);


    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
        console.log(text);
    } else if (location) {
        let myInterval = setInterval(() => {
            sendLocationApi(location);
        }, 60000);//1 minute
    }

    const sendLocationApi = async (location) => {

        location = JSON.stringify(location);
        

        if (state.user.id) {
            
            let data = new FormData();
            data.append('uid', state.user.id)
            data.append('location', location)
                
            try {
                let response = await fetch('http://165.22.240.44/easymovenpick.com/api/location.php', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'multipart/form-data; '
                    },
                    body: data
                })
                    .then((response) => response.json())
                    .then((json) => {
                        let message = json.message;
                        console.log('Loaded>>>>'+location);
                    })
            } catch (error) {
                console.log(error);
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