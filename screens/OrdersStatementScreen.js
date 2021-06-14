import React, { useState, useEffect, useContext, useRef } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, ScrollView } from 'react-native';
import { Context } from './Store';
import Loading from './LoadingScreen';
import myStyle from "../assets/Style";
import { PushToken } from './PushToken';
import RNPickerSelect from 'react-native-picker-select';



export const OrdersStatementScreen = ({navigation}) => {

    
    var currentYear = new Date().getFullYear();
    var currentMonth = new Date().getMonth() + 1;
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const { state, dispatch } = useContext(Context);
    const [isLoading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const [count, setCount] = useState(0);
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


    
    const getOrdersApi = async (year, month) => {
        if (state.user.id) {
            let data = new FormData();

            console.log('uid:' + state.user.id + ' year: ' + year + ' month: ' + month);
            
            data.append('uid', state.user.id)
            data.append('year', year)
            data.append('month', month)
            
            setLoading(false);

            try {
                let response = await fetch('https://mingmingtravel.com/easyapi/api/orders_statement.php', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'multipart/form-data; '
                    },
                    body: data
                })
                .then((response) => response.json())
                .then((json) => {
                    setOrders(json.orders);
                    setCount(json.count);
                    
                })
            } catch (error) {
                console.log('Failed to get orders statement');
            }
        } else {
            console.log('No user id to get orders statement');
        }
    }

    useEffect(() => {
        getOrdersApi(currentYear, currentMonth);
    }, []);

    
    return (
    <View style={myStyle.body}>
    {isLoading ? (
        <Loading />
    ) : (
        <ScrollView style={{flex:1, width:'100%'}}>
            <PushToken />
            <View style={{ flex:1, flexDirection: 'row', padding: 5, backgroundColor: '#56aaff' }}>
                <View style={{ flex:1, padding: 10 }}>
                    <View style={myStyle.selectOutter}>
                        <View style={myStyle.selectInner}>
                            <RNPickerSelect
                                placeholder={{}}
                                onValueChange={(val) => { setYear(val), getOrdersApi(val, month) }}
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
                                onValueChange={(val) => { setMonth(val), getOrdersApi(year, val) }}
                                items={months}
                                value={month}
                            />
                        </View>
                    </View>
                </View>
            </View>
        
            
            <View style={{ padding: 10, borderBottomColor: '#DDD', borderBottomWidth: 1, paddingVertical: 12 }}>
                <Text style={{ fontSize: 20, textAlign: 'center' }}>
                                Order History ({year} {monthNames[month-1]})
                </Text>
            </View>



            {!orders ? (
            <View style={{ padding: 10 }} >
                <Text>No order found..</Text>
            </View>
            ) : (
                <>
                    {orders.map((item, key) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Order', { oid: item.id })}
                        key={'new' + key}
                        style={myStyle.meritStatement}>
                        <View style={{ flex: 1 }}>
                            <Text style={myStyle.Font}>{key + 1}.</Text>
                        </View>
                        <View style={{ flex: 7 }}>
                            <Text style={myStyle.Font}>
                                {item.sid} 
                                <Text style={myStyle.FontGreenS}>   {item.status}</Text>
                            </Text>
                            <Text style={myStyle.FontS}>{item.date}</Text>
                        </View>
                        <View style={{ flex: 4, }}>
                            <Text style={[myStyle.Font, { textAlign: 'right' }]}>
                                {item.distance}KM
                            </Text>
                        </View>
                    </TouchableOpacity>
                    ))}
                </>
            )}
        </ScrollView>
    )}
    </View>
    )

}

export default OrdersStatementScreen;


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