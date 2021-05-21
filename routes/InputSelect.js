import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import myStyle from "../assets/Style";



const InputSelect = () => {

    return (
        <View style={myStyle.selectOutter}>
            <View style={myStyle.selectInner}>
                <RNPickerSelect 
                    placeholder={{}}
                    onValueChange={(value) => console.log(value)}
                    items={realTimeData}
                />
            </View>
        </View>
    )
  

}



export default InputSelect;