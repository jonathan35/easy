import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Context } from './Store';
import Loading from './LoadingScreen';
import myStyle from "../assets/Style";
import { PushToken } from './PushToken';
import RNPickerSelect from 'react-native-picker-select';



export const CommissionStatementScreen = ({navigation}) => {

    
    var currentYear = new Date().getFullYear();
    var currentMonth = new Date().getMonth() + 1;
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const { state, dispatch } = useContext(Context);
    const [isLoading, setLoading] = useState(true);
    const [commissions, setCommissions] = useState([]);
    const [total, setTotal] = useState(0);
    const [year, setYear] = useState(currentYear);
    const [month, setMonth] = useState(currentMonth);
    
    
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
                let response = await fetch('http://165.22.240.44/easymovenpick.com/api/commission_statement.php', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'multipart/form-data; '
                    },
                    body: data
                })
                .then((response) => response.json())
                .then((json) => {
                    setCommissions(json.commissions);
                    setTotal(json.total);
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
    {isLoading ? (
        <Loading />
    ) : (
        <ScrollView style={{flex:1, width:'100%'}}>
            <PushToken />
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
                <View>
                    <Text style={{fontSize: 16, textAlign: 'center', color: 'gray'}}>
                        Total: RM{total}
                    </Text>
                </View>
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