import React, { useRef, useState } from 'react';
import { View, Text, Animated } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import myStyle from "../assets/Style";
import GlobalVar from '../routes/GlobalVar';


const InputFullPartTime = () => {

    const [time, setTime] = useState('');


    return (
        <View>
            <View style={myStyle.selectOutter}>
                <View style={myStyle.selectInner}>
                    <RNPickerSelect
                        placeholder={{}}
                        /*onValueChange={(value) => console.log(value)}*/
                        onValueChange={(val) => { setTime(val) }}
                        items={global.timeOptions}
                    />
                </View>

            </View>
            <Animated.View style={{opacity: fadeTime}}>
                <Text style={myStyle.errorMsg}>Driver name is required.</Text>
            </Animated.View>
        </View>
    )
}

export default InputFullPartTime;