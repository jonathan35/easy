import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet, ImageBackground} from 'react-native';
import myStyle from "../assets/Style";
import GlobalVar from "../routes/GlobalVar";
import * as SecureStore from 'expo-secure-store';
import { Context } from './Store';
//import LinearGradient from 'react-native-linear-gradient';
import { LinearGradient } from "expo-linear-gradient";
import { OrdersComponent } from './OrdersComponent';



function NotifyScreen({ navigation }) {


    const { state, dispatch } = useContext(Context);
    const [dashBox, setDashBox] = useState(true);
    

    return (
        <View style={myStyle.body}>
            <View style={{width: '100%',}}>
            </View>
            <Text style={{ paddingBottom: 80 }}></Text>
            
        </View>
    )
}



export default NotifyScreen;


const styles = StyleSheet.create({

})