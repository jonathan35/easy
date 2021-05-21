import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import myStyle from "../assets/Style";


function Footer() {
  
  return (
    <View style={styles.footer}>
      
        <TouchableOpacity style={styles.blockColumn} title="Home" onPress={() => Navigator.navigate('Home')}>
            <Text>Home</Text>
        </TouchableOpacity>
        <View style={styles.blockColumn}><Text>2</Text></View>
        <View style={styles.blockColumn}><Text>3</Text></View>
      

    </View>
  )
}


const styles = StyleSheet.create({
    footer: {
        flex: 1,
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'orange',
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    blockColumn: {
        flex: 1,
    }
  
});

export default Footer;