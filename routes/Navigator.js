import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import LogoutScreen from "../screens/LogoutScreen";
import LoadingScreen from "../screens/LoadingScreen";
//import Register2 from "../screens/Register2";
//import Fetcher from "../screens/Fetcher";



const Stack = createStackNavigator();

const MyStack = () => {


  const [isLogged, setLogged] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function validateAuth() {
      await SecureStore.getItemAsync('auth_user').then(auth_user => {
        if (auth_user != null) {
          let auth_arr = auth_user.split(",");
          if (!auth_arr[0]) {//user id not found
            setLogged(true);
            
          }
        }
        setLoading(false);
      })
    }validateAuth();
  }, []);
  



  if (isLoading) {
    // We haven't finished checking for the token yet
    return <LoadingScreen />;
  }

  return (
    

    <NavigationContainer>
      <Stack.Navigator>

      isLogged ? (
        <>
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Home' }} />    
        <Stack.Screen name="LogoutScreen" component={LogoutScreen} options={{ title: 'Logout' }} />
        </>
      ) : (
        <>
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: 'Login' }} />
        </>
      )
        
        
      </Stack.Navigator>
    </NavigationContainer>
    

    
  );
};


export default MyStack;
