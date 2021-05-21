import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect, useMemo, useReducer } from 'react';
import * as SecureStore from 'expo-secure-store';
import NavigationContainerStack from "./screens/NavigationContainerStack";
import { Store } from './screens/Store';



const Stack = createStackNavigator();


export default function App({ navigation }) {


  return (
    <Store>
      <NavigationContainerStack />
    </Store>
  );

}
