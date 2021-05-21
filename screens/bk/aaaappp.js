import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect, useMemo, useReducer, createContext } from 'react';
import * as SecureStore from 'expo-secure-store';

import useAuth from "./screens/useAuth";

import LoadingScreen from "./screens/LoadingScreen";

import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";

import HomeScreen from "./screens/HomeScreen";
import LogoutScreen from "./screens/LogoutScreen";




const AuthContext = createContext();



const RootStackScreen = () => {
  const {state, authContext} = useAuth();
  const Stack = createStackNavigator();
  

  return (
    <Stack.Navigator>
      {state.userToken == null ? (
        // No token found, user isn't signed in
        <>
          <Stack.Screen 
            name="Login"
            component={LoginScreen}
            options={{
              title: 'Login',
              // When logging out, a pop animation feels intuitive
              // You can remove this if you want the default 'push' animation
              //AuthContext: AuthContext,
              
              animationTypeForReplace: state.isSignout ? 'pop' : 'push',
            }}
          />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Logout' }} />
        </>
      ) : (
        // User is signed in
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="LogoutScreen" component={LogoutScreen} options={{ title: 'Logout' }} />
        </>
      )}

    </Stack.Navigator>
  )
}



export default function App({ navigation, route }) {

  const {state, authContext} = useAuth();
  const Stack = createStackNavigator();
  



  if (state.isLoading) {
    return <LoadingScreen />;
  }
  
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
      <RootStackScreen />
      
      </NavigationContainer>
    </AuthContext.Provider>
    
  );




}
