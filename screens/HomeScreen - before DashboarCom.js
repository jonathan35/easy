import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet, ImageBackground} from 'react-native';
import myStyle from "../assets/Style";
import { Context } from './Store';
import { LinearGradient } from "expo-linear-gradient";
import { OrdersComponent } from './OrdersComponent';
import Loading from './LoadingScreen';




function HomeScreen({ navigation }) {

    
    const { state, dispatch } = useContext(Context);
    const [onOff, setOnOff] = useState(true);
    const [isLoading, setLoading] = useState(true);
    const [todayDuration, setTodayDuration] = useState(0);
    const [closedDuration, setClosedDuration] = useState(0);


    const onOffApi = async (onoff) => {
        
        setLoading(false);
        
        console.log('onOffApi called');
        
        if (state.user.id) {

            let data = new FormData();
            data.append('uid', state.user.id)

            if (onoff == 'off') {
                data.append('onoff', 'off')
            } else if (onoff == 'on') {
                data.append('onoff', 'on')
            }

            if (onoff!='') {
                try {
                    let response = await fetch('http://165.22.240.44/easymovenpick.com/api/driver_on_off.php', {
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
                        let closed_duration = json.duration;
                        let start_time = json.start_time;

                        console.log('api done: ' + state.user.id);

                        //let onoff = '';
/*
                        if (result == 'started') {
                            setOnOff(true)
                            console.log('started: ' + message);
                            onoff = 'on';
                        } else if (result == 'ended') {
                            setOnOff(false)
                            console.log('ended: ' + message);
                            onoff = 'off';
                        }

                        //if(onoff!=''){
                            clearInterval(myInterval);
                            let myInterval = setInterval(() => {
                                onlineTime(onoff, closed_duration, start_time);
                            }, 10000);//a minute

                            setClosedDuration(closed_duration);
                        //}*/
                    })
                } catch (error) {
                    console.log(error);
                }
            }
        } else {
            console.log('No user for on/off.');
        }
    }


    
    useEffect(() => {
    
        //onOffApi('on');

       
        
        async function iniOnOff() {
            try {
                const user_id = await state.user.id;
                onOffApi('on');
            } catch (error) {
                console.log(error);
            }
        };
        iniOnOff(); /**/
    
    }, []);




    function onlineTime(onoff, closedDiff, startTime) {
            
        let duStr = '';
        let different = 0;
        let now = new Date().getTime()/1000;
        let lastDiff = now - startTime;
        let allDiff = lastDiff + closedDiff;

        console.log('onlineTime1: '+onoff+'>'+closedDiff+'>'+startTime)


        if (onoff == 'off') {
            different = closedDiff;
        } else if (onoff == 'on') {
            different = allDiff;
        }

        let daysDif = Math.floor(different/60/60/24);
        different -= daysDif * 1000 * 60 * 60 * 24;

        let hoursDif = Math.floor(different/60/60);
        different -= hoursDif * 1000 * 60 * 60;

        let minutesDif = Math.floor(different/60);
        different -= minutesDif * 1000 * 60;
        
        //let duStr = '<' + lastDiff + '+' + closedDiff + '=' + allDiff + '>';
        if (daysDif >= 1) duStr = duStr+daysDif + 'd ';
        if (hoursDif >= 1) duStr = duStr+hoursDif + 'hrs ';
        if (minutesDif >= 1) duStr = duStr+minutesDif + 'm ';
            
        

        let xxx = new Date().getTime();
        console.log('onlineTime2: '+xxx+'-->'+duStr);

        setTodayDuration(duStr);
    }




    /*
        const getClosedDuration = async () => {
            
            let closedSesDuration = 0;
            if (state.user.id) {

                let data = new FormData();
                data.append('uid', state.user.id)
                
                try {
                    let response = await fetch('http://165.22.240.44/easymovenpick.com/api/driver_onoff_duration.php', {
                        method: 'post',
                        headers: {
                            'Content-Type': 'multipart/form-data; '
                        },
                        body: data
                    })
                    .then((response) => response.json())
                    .then((json) => {
                        
                        closedSesDuration = json.duration;
                        onlineTime(closedSesDuration);
                        setClosedDuration(closedSesDuration);
                        consolel.log(json.message);
                        //onOffApi('on');
                    })
                } catch (error) {
                    console.log('Failed to get closed duration.'+error);
                }
            }
        }
    */



    return (
        
    <View style={myStyle.body}>
    {isLoading ? (
        <Loading />
    ) : (
 
        <ScrollView style={{flex:1, width:'100%'}}>
        <LinearGradient 
            style={{ flexDirection: 'row', paddingVertical: 5}}
            colors={["rgba(77,77,77,1)", "rgba(22,22,22,1)"]}>
        
            {onOff ? (
                <TouchableOpacity
                    onPress={() => onOffApi('off')}
                    style={myStyle.onOff1}>
                    <Text style={myStyle.onOffContent}>
                        <Text style={myStyle.onOffTitle1}>ON </Text>
                        <Image
                            style={{ resizeMode: "contain" }}
                            source={require('../assets/images/tick-24.png')} />
                    </Text>
                    <Text style={myStyle.onOffLabel1}>
                        ONLINE: {todayDuration}
                       
                        { /*4hrs 30m */}
                        {/*state.user.id}{state.user.name}{state.user.mobile_number}{state.user.region*/}
                    </Text>
                    <Text style={myStyle.onOffLabel1}>
                        closedDuration: { closedDuration}
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
                        ONLINE: {todayDuration}
                        { /*4hrs 30m */}
                </Text>
                </TouchableOpacity>
            )}
            <TouchableOpacity style={myStyle.onOff2}>
                <Text style={myStyle.onOffContent}>
                    <Text style={myStyle.onOffTitle2}>135 </Text>
                    <Image
                        style={{ resizeMode: "contain", width: 14, height: 14 }}
                        source={require('../assets/images/star-20.png')} />
                </Text>
                <Text style={myStyle.onOffLabel2}>
                    MERIT SCORE
            </Text>
            </TouchableOpacity>
        </LinearGradient>
        

        <View style={{width: '100%',}}>
            <OrdersComponent />
        </View>

        </ScrollView>
    )}
        
        
    
        
    </View>
    )
}



export default HomeScreen;

