/*import 'react-native-gesture-handler';*/
import { createStackNavigator } from '@react-navigation/stack';
import NavigationContainerStack from "./screens/NavigationContainerStack";
import { Store } from './screens/Store';
import React from 'react';



const Stack = createStackNavigator();



export default function App({ navigation }) {
 
  return (
    <Store>
      
      <NavigationContainerStack />
    </Store>
  );
}