import 'react-native-gesture-handler';
import React, { useState, useEffect, useRef, useContext} from 'react';
import { View, Text, TextInput, TouchableOpacity, Animated, ActivityIndicator, ScrollView, Linking } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import myStyle from "../assets/Style";
import GlobalVar from "../routes/GlobalVar";
import { Context } from './Store';



function Header({ navigation }) {

  return (
    <View style={myStyle.body}>

      
        <View style={myStyle.inputBlock}>
          <View style={{ height: 10}}></View>
          <TouchableOpacity
            style={myStyle.button2}
            onPress={() => navigation.navigate('Register')}
          ><Text style={myStyle.buttonText2}>REGISTER NOW</Text></TouchableOpacity>
        </View>


    </View>
  )
}

export default Header;