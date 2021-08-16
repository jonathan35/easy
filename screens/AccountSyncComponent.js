import React, { useContext, useState } from 'react';
import { View, Text } from 'react-native';
import { Context } from './Store';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';



export const AccountSyncComponent = () => {

    const navigation = useNavigation();
    const [loggedin, setLoggedin] = useState(true);
    const { state, dispatch } = useContext(Context);


    const synAccApi = async (onoff) => {
        if (state.user.id) {
            let data = new FormData();
            data.append('uid', state.user.id)
                try {
                    let response = await fetch('https://easymovenpick.com/api/activation_checker.php', {
                        method: 'post',
                        headers: {
                            'Content-Type': 'multipart/form-data; '
                        },
                        body: data
                    })
                    .then((response) => response.json())
                    .then((json) => {
                        let result = json.result;
                        let message = json.message;

                        if (result == false) {
                            SecureStore.deleteItemAsync('auth_user');
                            dispatch({ type: 'SIGN_OUT'});
                            //dispatch({ type: 'SIGN_IN', token: null });
                            //console.log('result false');
                        } else {
                            //console.log('result true');
                        }
                        
                    })
                } catch (error) {
                    console.log(error);
                }
           
        } else {
            //console.log('No user for account activation check.');
        }
    }
 
    

    //synAccApi('on');

    let myInterval = setInterval(() => {
        if (state.user.id) {
            if(loggedin){
                synAccApi('on');
            }
            //console.log('calling synAccApi');
        //} else {
            //console.log('Not calling synAccApi');
        }
    }, 5000);//60000 = 1 minute

 

    return (
        <></>
    )
}


export default { AccountSyncComponent };