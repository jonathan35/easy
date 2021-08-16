import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Animated, TouchableOpacity, Alert } from 'react-native';
import { Context } from './Store';
import Loading from './LoadingScreen';
import myStyle from "../assets/Style";
import { PushToken } from './PushToken';
import RNPickerSelect from 'react-native-picker-select';
import { AccountSyncComponent } from './AccountSyncComponent';
import { LinearGradient } from "expo-linear-gradient";



export const CommissionStatementScreen = ({navigation}) => {

    
    var currentYear = new Date().getFullYear();
    var currentMonth = new Date().getMonth() + 1;
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const { state, dispatch } = useContext(Context);
    const [isLoading, setLoading] = useState(true);
    const [commissions, setCommissions] = useState([]);
    //const [total, setTotal] = useState(0);
    const [year, setYear] = useState(currentYear);
    const [month, setMonth] = useState(currentMonth);
    const [comissionBonus, setCommissionBonus] = useState(0);
    const [withdrawMerit, setWithdrawMerit] = useState(0);
    const [maxWithdrawMerit, setMaxWithdrawMerit] = useState(0);
    const [submitResult, setSubmitResult] = useState('');
    


    //----------------------Api request withdraw - Start ----------------------
    const requestWithdrawApi = async (action) => {
        
        setLoading(true);
        let data = new FormData();
        data.append('withdraw_merit', withdrawMerit)
        data.append('uid', state.user.id)

        try {
            let response = await fetch('https://easymovenpick.com/api/request_withdraw.php', {
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data; '
            },
            body: data
            })
            .then((response) => response.json())
            .then((json) => {
                setLoading(false);
                if (json.result) {
                    setSubmitResult(json.message);
                    //console.log(json.message);
                }
            })
        } catch (error) {
            console.log('Failed to connect.');
            setLoading(false);
        }
    }
    //----------------------Api request withdraw - End ----------------------



    const fadeWithdrawMerit = useRef(new Animated.Value(0)).current;
    const fadeIn = (e) => {
        Animated.timing(e, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true
        }).start();
    };
    
    const fadeOut = (e) => {
        Animated.timing(e, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true
        }).start();
    };

    const validate = () => {
    
        var err = 0;        
        withdrawMerit > maxWithdrawMerit ? (
            fadeIn(fadeWithdrawMerit),
            err++,
            alert('Maximum '+maxWithdrawMerit+' points')
        ) : (
            fadeOut(fadeWithdrawMerit)
        )    
        if (err <= 0) {
            requestWithdrawApi(); 
        }    
      };


    var years = [];
    for(let y = 2021; y <= currentYear; y++){
        years.push(
            { label: '' + y, value: y }
        )
    }    
    
    var months = [];
    for(let m = 1; m <= 12; m++){
        months.push(
            { label: '' + monthNames[m-1], value: m }
        )
    }

    
    const getCommissionsApi = async (getYear, getMonth) => {
        if (state.user.id) {
            let data = new FormData();

            console.log('uid:' + state.user.id + ' year: ' + getYear + ' month: ' + getMonth);
            
            data.append('uid', state.user.id)
            data.append('year', getYear)
            data.append('month', getMonth)

            setLoading(false);
            try {
                let response = await fetch('https://easymovenpick.com/api/commission_statement.php', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'multipart/form-data; '
                    },
                    body: data
                })
                .then((response) => response.json())
                .then((json) => {
                    setCommissions(json.commissions);
                    //setTotal(json.total);
                    setCommissionBonus(json.commission_bonus);
                    setMaxWithdrawMerit(json.withdrawable_merit);
                })
            } catch (error) {
                console.log('Failed to get commissions statement');
            }
        } else {
            console.log('No user id to get commissions statement');
        }
    }

    useEffect(() => {
        getCommissionsApi(currentYear, currentMonth);
    }, []);

    
    return (
    <View style={myStyle.body}>
        <AccountSyncComponent />
    {isLoading ? (
        <Loading />
    ) : (
        <ScrollView style={{flex:1, width:'100%'}}>
            <PushToken />
          
                        
            <LinearGradient colors={["rgba(230,230,230,1)", "rgba(177,177,177,1)"]}>

                <View style={{ padding: 15 }}></View>
                <Text style={{ fontSize: 46, textAlign: 'center' }}>RM{comissionBonus}</Text>
                <Text style={[myStyle.FontGray, { textAlign: 'center' }]}>Commission + Bonus</Text>
                <View style={{ padding: 15 }}></View>

                <Text style={{ fontSize: 14, textAlign: 'center', paddingHorizontal: 12 }}>
                    How much merit to withdraw? (Max. {maxWithdrawMerit} points).
                </Text>
                <Text style={{ fontSize: 14, textAlign: 'center', paddingHorizontal: 12, paddingBottom: 4 }}>
                    Leave empty for withdraw without consume merit.
                </Text>
                <TextInput style={[myStyle.input, { width: '30%', marginHorizontal: '35%' }]}
                    placeholder="points" keyboardType="numeric" maxLength={3} 
                    onChangeText={(val) => { setWithdrawMerit(val); fadeOut(fadeWithdrawMerit)}}/>
            
                <Animated.View style={{opacity: fadeWithdrawMerit}}>
                    <Text style={[myStyle.errorMsg, { textAlign: 'center' }]}>
                        Maximum {maxWithdrawMerit} points.
                    </Text>
                </Animated.View>
                
                <View style={{paddingBottom:40}}>
                    <View style={myStyle.inputBlock} >
                        <TouchableOpacity
                        style={[myStyle.button, {width: '70%', marginHorizontal: '15%'}]}
                        onPress={() => {validate()}}
                        ><Text style={myStyle.buttonText}>REQUEST WITHDRAW</Text></TouchableOpacity>
                    </View>
                    <Text style={{ textAlign: 'center' }}>{submitResult}</Text>
                  
                </View>

            </LinearGradient>


                            
            <View style={{ flex:1, flexDirection: 'row', padding: 5, backgroundColor: '#5be5b0' }}>
                <View style={{ flex:1, padding: 10 }}>
                    <View style={myStyle.selectOutter}>
                        <View style={myStyle.selectInner}>
                            <RNPickerSelect
                                placeholder={{}}
                                onValueChange={(val) => { setYear(val), getCommissionsApi(val, month) }}
                                items={years}
                            />
                        </View>
                    </View>
                </View>
                <View style={{ flex:1, padding: 10 }}>
                    <View style={myStyle.selectOutter}>
                        <View style={myStyle.selectInner}>
                            <RNPickerSelect
                                placeholder={{}}
                                onValueChange={(val) => { setMonth(val), getCommissionsApi(year, val) }}
                                items={months}
                                value={month}
                            />
                        </View>
                    </View>
                </View>
            </View>
        
            
            <View style={{ padding: 10, borderBottomColor: '#DDD', borderBottomWidth: 1, paddingVertical: 12 }}>
                <Text style={{ fontSize: 20, textAlign: 'center' }}>
                Commission ({year} {monthNames[month-1]})
                </Text>
            </View>



            {!commissions ? (
            <View style={{ padding: 10 }} >
                <Text>No commission statement found..</Text>
            </View>
            ) : (
                <>
                    {commissions.map((item, key) => (
                    <View
                        key={'new' + key}
                        style={myStyle.meritStatement}>
                        <View style={{flex:1}}>
                            <Text style={myStyle.Font}>{key+1}.</Text>
                        </View>
                        <View style={{flex:3}}>
                            <Text style={{fontSize:20}}>
                                RM{item.commission}
                            </Text>
                        </View>
                        <View style={{ flex: 4 }}>
                            <Text style={[myStyle.FontS]}>
                                {item.sid}
                            </Text>
                        </View>
                        <View style={{flex:4}}>
                            <Text style={[myStyle.FontS, { textAlign: 'right' }]}>
                                {item.date}
                            </Text>
                        </View>
                    </View>
                    ))}
                </>
            )}
        </ScrollView>
    )}
    </View>
    )

}

export default CommissionStatementScreen;


const styles = StyleSheet.create({

  block: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  
  FontL: {
    textAlign: 'center',
    fontSize: 34,
    color: 'black',
  },
  Font: {
    fontSize: 18,
    color: 'black',
  },
  FontS: {
    fontSize: 14,
    color: 'black',
    textAlign: 'center',
  },
  FontWhite: {
    fontSize: 18,
    color: 'white',
  },
  FontGray: {
    fontSize: 18,
    color: 'gray',
  },
  FontWhiteS: {
    textAlign: 'center',
    fontSize: 14,
    color: 'white',
  },
  mapStyle: {
    width: '100%',
    height: 280,
    /*
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    */
  },

})