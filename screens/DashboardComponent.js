import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import myStyle from "../assets/Style";
import { Context } from './Store';
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from '@react-navigation/native';


export const DashboardComponent = () => {

    
    const navigation = useNavigation();
    const { state, dispatch } = useContext(Context);
    const [onOffTab, setOnOffTab] = useState(true);
    const [todayDuration, setTodayDuration] = useState(0);
    const [timer, setTimer] = useState('..');
    const [caller, setCaller] = useState(true);
    const [confirmOff, setConfirmOff] = useState(0);
    

    const showConfirmDialog = () => {
        return Alert.alert(
            "Are your sure?",
            "Are you sure you want to turn off?",
            [
                // The "Yes" button
                {
                    text: "Yes",
                    onPress: () => {
                        onOffApi('off')
                    },
                },
                // The "No" button
                // Does nothing but dismiss the dialog when tapped
                {
                    text: "No",
                },
            ]
        );
    };


    const onOffApi = async (onoff) => {

        var pass = true;

        if (state.user.id) {
            
            setCaller(false);            
            
            let data = new FormData();
            data.append('uid', state.user.id)

            if (onoff == 'off') {
                data.append('onoff', 'off')
            } else if (onoff == 'on') {
                data.append('onoff', 'on')                
            }

            if (pass == true) {
                if (onoff != '') {
                    try {
                        let response = await fetch('https://easymovenpick.com/api/driver_on_off.php', {
                            method: 'post',
                            headers: {
                                'Content-Type': 'multipart/form-data; '
                            },
                            body: data
                        })
                            .then((response) => response.json())
                            .then((json) => {
                        
                                let message = json.message;
                                let result = json.result;
                                let today_duration = json.duration;
                                let start_time = json.start_time;
                                let onoff = '';//global onoff undefined here
                                //console.log('DashboardC('+state.user.id+')'+'-->'+result + message );
                        
                                let user = state.user;
                                user['merit'] = json.merit;
                                dispatch({ type: 'SET_USER', user: user });

                                if (result == 'started') {
                                    console.log('turn on liao');
                                    setOnOffTab(true)
                                    setTodayDuration(today_duration);
                                    onlineTime(today_duration);
                                } else if (result == 'ended') {
                                    console.log('turn off liao');
                                    setOnOffTab(false)
                                    setTodayDuration(today_duration);
                                    onlineTime(today_duration);
                                }
                            })
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
        } else {
            console.log('No user for on/off.');
        }
    }
    /*useEffect(() => {
        onOffApi('on');
    }, []);*/


    
    if (caller) {
        let myInterval = setInterval(() => {
            if (state.user.id) {
                onOffApi('on');
            }
        }, 60000);//60000 = 1 minute
        //console.log('myInterval');
    }

  
    function onlineTime(today_duration) {
            
        let timerStr = '';
        let diff = today_duration;
 
        let daysDif = Math.floor(diff/60/60/24);
        diff -= daysDif * 1000 * 60 * 60 * 24;

        let hoursDif = Math.floor(diff/60/60);
        diff -= hoursDif * 1000 * 60 * 60;

        let minutesDif = Math.floor(diff/60);
        diff -= minutesDif * 1000 * 60;
        
        if (daysDif >= 1) timerStr = timerStr+daysDif + 'd ';
        if (hoursDif >= 1) timerStr = timerStr+hoursDif + 'hrs ';
        if (minutesDif >= 1) timerStr = timerStr+minutesDif + 'm ';

        //console.log('onlineTime: ' + today_duration);

        setTimer(timerStr);

    }



    return (
        <LinearGradient 
            style={{ flexDirection: 'row', paddingVertical: 5}}
            colors={["rgba(77,77,77,1)", "rgba(22,22,22,1)"]}>
        
            {onOffTab ? (
                <TouchableOpacity
                    onPress={() => showConfirmDialog()}
                    style={myStyle.onOff1}>
                    <Text style={myStyle.onOffContent}>
                        <Text style={myStyle.onOffTitle1}>ON </Text>
                        <Image
                            style={{ resizeMode: "contain" }}
                            source={require('../assets/images/tick-24.png')} />
                    </Text>
                    <Text style={myStyle.onOffLabel1}>
                        ONLINE: {timer}{/* todayDuration*/}
                    </Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    onPress={() => onOffApi('on')}
                    style={myStyle.onOff1}>
                    <Text style={myStyle.onOffContent}>
                        <Text style={myStyle.onOffTitle1Off}>OFF </Text>
                        <Image
                            style={{ resizeMode: "contain", width: 12, height: 12 }}
                            source={require('../assets/images/round-24.png')} />
                    </Text>
                    <Text style={myStyle.onOffLabel1Off}>
                        ONLINE: {timer}
                    </Text>
                </TouchableOpacity>
            )}
            <TouchableOpacity
                onPress={() => navigation.navigate('MeritStatement')}
                style={myStyle.onOff2}>
                <Text style={myStyle.onOffContent}>
                    <Text style={myStyle.onOffTitle2}>{state.user.merit} </Text>
                    <Image
                        style={{ resizeMode: "contain", width: 14, height: 14 }}
                        source={require('../assets/images/star-20.png')} />
                </Text>
                <Text style={myStyle.onOffLabel2}>
                    MERIT SCORE
                </Text>
            </TouchableOpacity>
        </LinearGradient>
    )
}


export default { DashboardComponent };