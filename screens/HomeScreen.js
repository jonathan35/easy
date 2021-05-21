import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet, ImageBackground} from 'react-native';
import myStyle from "../assets/Style";
import { Context } from './Store';
import { LinearGradient } from "expo-linear-gradient";
import { DashboardComponent } from './DashboardComponent';
import { OrdersComponent } from './OrdersComponent';
import Loading from './LoadingScreen';
import { LocationComponent } from './LocationComponent';



function HomeScreen({ navigation }) {
   
    const [isLoading, setLoading] = useState(false);
    

    useEffect(() => {
        setLoading(false);
    }, []);


    return (
        
    <View style={myStyle.body}>
    {isLoading ? (
        <Loading />
    ) : (
 
        <ScrollView style={{flex:1, width:'100%'}}>
            <LocationComponent />
            <DashboardComponent />
            <OrdersComponent />
        </ScrollView>
    )}
        
        
    
        
    </View>
    )
}



export default HomeScreen;

