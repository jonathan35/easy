import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Context } from './Store';
import Header from './HeaderComponent';

import LoadingScreen from "./LoadingScreen";
import LogoutScreen from "./LogoutScreen";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import HomeScreen from "./HomeScreen";
import NotifyScreen from "./NotifyScreen";
import OrderScreen from "./OrderScreen";
import { HeaderBackButton } from '@react-navigation/stack';



const Stack = createStackNavigator();



const RootStackScreen = ({ navigation }) => {


  const { state, dispatch } = useContext(Context);


  return (
    <NavigationContainer>
    <Stack.Navigator>
      {state.userToken == null ? (
        <>
  
            
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen}/>
        </>
      ) : (
        <>
          <Stack.Screen name="Home" component={HomeScreen}
            options={{
              headerTitle: props => <Header title="Dashboard" />,
              headerLeft: () => { },
              headerBack: props => <HeaderBackButton 
                {...props}
                onPress={() => {
                  console.log('zzzzz')
                }}
              />,
              headerBackTitleStyle: { color: 'red'}
            }} />
          <Stack.Screen name="Order" component={OrderScreen}
            options={{
              headerTitle: props => <Header title="Order" />,
              headerBack: props => <HeaderBackButton 
              {...props}
              onPress={() => {
                console.log('zzzzz')
              }}
            />,
            headerBackTitleStyle: { color: 'red'}
          }} />
          <Stack.Screen name="Logout" component={LogoutScreen} 
            options={{
              headerTitle: props => <Header title="Logout" />,
              headerLeft: () => { }
          }} />
          
        </>
      )}
    </Stack.Navigator>
    </NavigationContainer>
  )
}



export default function NavigationContainerStack({ navigation }) {
  
  const { state, dispatch } = useContext(Context);

  /*
  if (state.isLoading) {
    return <LoadingScreen />;
  }*/

  return (
    <RootStackScreen />
  );
  
}
  