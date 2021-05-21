import React, { useEffect, useContext } from 'react';
import { View, Text} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Context } from './Store';


function LogoutScreen({ navigation }) {

    const { state, dispatch } = useContext(Context);    

    useEffect(() => {
        async function cleanSession() {

            await SecureStore.deleteItemAsync('auth_user');
            
            dispatch({ type: 'SIGN_OUT'});
            dispatch({ type: 'SIGN_IN', token: null });
            
        }
        cleanSession();
    }, []);


     return (
        <View style={{flex:1, justifyContent: 'center'}}>
            <Text style={{textAlign: 'center', fontSize: 36, color: 'black'}}>THANK YOU</Text>
        </View>
    )
}
export default LogoutScreen;