import React, { useState, useEffect, useContext } from 'react';
import { TouchableOpacity, Image, View, Text, BackHandler, Alert } from 'react-native';
import myStyle from "../assets/Style";
import { Context } from './Store';
import { useNavigation } from '@react-navigation/native';



export const OrdersComponent = () => {
    

    const { state, dispatch } = useContext(Context);
    const navigation = useNavigation();
    const [newCount, setNewCount] = useState(0);
    const [delCount, setDelCount] = useState(0);
    const [hisCount, setHisCount] = useState(0);
    const [news, setNews] = useState([]);
    const [delivers, setDelivers] = useState([]);
    const [delivereds, setDelivereds] = useState([]);
    const [userFound, setUserFound] = useState(false);

    
    const getOrderApi = async () => {
        
        if (state.user.id) {
            setUserFound(true)
            let data = new FormData();
            data.append('uid', state.user.id)
            try {
                let response = await fetch('http://165.22.240.44/easymovenpick.com/api/driver_orders.php', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'multipart/form-data; '
                    },
                    body: data
                })
                    .then((response) => response.json())
                    .then((json) => {
                        let msg = json.driver_orders.message;
                        setNewCount(JSON.stringify(json.driver_orders.orders.new_count));
                        setDelCount(JSON.stringify(json.driver_orders.orders.del_count));
                        setHisCount(JSON.stringify(json.driver_orders.orders.his_count));
                        setNews(json.driver_orders.orders.news);
                        setDelivers(json.driver_orders.orders.delivers);
                        setDelivereds(json.driver_orders.orders.delivereds);
                    })
            } catch (error) {
                console.log('Failed to connect.');
            }
        } else {
            console.log('No user info.');
        }
        
    }
    

    if (!userFound) {
        getOrderApi();
    }

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getOrderApi();
        });
        return unsubscribe;
    }, [navigation]);




    const [newShow, setNewShow] = useState(true);
    const [delShow, setDelShow] = useState(false);
    const [hisShow, setHisShow] = useState(false);
    const [newTab, setNewTab] = useState(true);
    const [delTab, setDelTab] = useState(false);
    const [hisTab, setHisTab] = useState(false);
    
    function showNew() {
        setNewShow(true);
        setDelShow(false);
        setHisShow(false);
        setNewTab(true);
        setDelTab(false);
        setHisTab(false);
    }
    function showDel() {
        setNewShow(false);
        setDelShow(true);
        setHisShow(false);
        setNewTab(false);
        setDelTab(true);
        setHisTab(false);
    }
    function showHis() {
        setNewShow(false);
        setDelShow(false);
        setHisShow(true);
        setNewTab(false);
        setDelTab(false);
        setHisTab(true);
    }
   

    return (
    <View style={{}}>
        <View style={{flexDirection: 'row'}}>
        
            <TouchableOpacity
                onPress={() => { showNew(); getOrderApi() }}
                style={newTab ? myStyle.tabActive : myStyle.tab}>
                <Text style={myStyle.tabContent}>
                    { /*<Image
                    style={{resizeMode: "contain"}}
                    source={require('../assets/images/298875-16.png')} /> */}
                    NEW
                </Text>
                <Text style={myStyle.tabLabel}>{newCount}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => { showDel(); getOrderApi() }}
                style={delTab ? myStyle.tabActive : myStyle.tab}>
                <Text style={myStyle.tabContent}>DOING</Text>
                <Text style={myStyle.tabLabel}>{delCount}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => { showHis(); getOrderApi() }}
                style={hisTab ? myStyle.tabActive : myStyle.tab}>
                <Text style={myStyle.tabContent}>DONE</Text>
                <Text style={myStyle.tabLabel}>{hisCount}</Text>
            </TouchableOpacity>
        </View>

        
        <View>
        {newShow && (newCount <= 0 ? (
            <View style={{ padding: 10 }} >
                <Text>No new order yet..</Text>
            </View>
        ) : (news.map((item, key) => (
            <TouchableOpacity
                onPress={() => navigation.navigate('Order', { oid: item.id }, getOrderApi())}
                key={'new' + key}
                style={myStyle.order}>
                <View style={{flex:1}}>
                    <Text style={myStyle.Font}>{key+1}.</Text>
                </View>
                <View style={{flex:7}}>
                    <Text style={myStyle.Font}>
                        {item.sid} 
                        <Text style={myStyle.FontGreenS}>  New</Text>
                        {item.assign && (
                            <Text style={myStyle.FontGreenS}>  Assigned</Text>
                        )}
                    </Text>
                    <Text style={myStyle.FontS}>{item.date}</Text>
                </View>
                <View style={{flex:4, }}>
                    <Text style={[myStyle.Font, {textAlign: 'right'}]}>
                        {item.dis}KM
                    </Text>
                </View>
            </TouchableOpacity>
            
        ))))}
        
        {delShow && (delCount <= 0 ? (
            <View style={{ padding: 10 }} >
                <Text>No order under delivering yet..</Text>
            </View>
        ) : (delivers.map((item, key) => (
            <TouchableOpacity
                onPress={() => navigation.navigate('Order', { oid: item.id })}
                key={'deliver' + key}
                style={myStyle.order}>
                <View style={{flex:1}}>
                    <Text style={myStyle.Font}>{key+1}.</Text>
                </View>
                <View style={{flex:7}}>
                    <Text style={myStyle.Font}>
                        {item.sid} 
                        <Text style={myStyle.FontGreenS}>   {item.status}</Text>
                    </Text>
                    <Text style={myStyle.FontS}>{item.date}</Text>
                </View>
                <View style={{flex:4, }}>
                    <Text style={[myStyle.Font, {textAlign: 'right'}]}>
                        {item.dis}KM
                    </Text>
                </View>
            </TouchableOpacity>
        ))))}
        
        {hisShow && (hisCount <= 0 ? (
            <View style={{ padding: 10 }} >
                <Text>No delivered order yet..</Text>
            </View>
        ) : (delivereds.map((item, key) => (
            <TouchableOpacity
                onPress={() => navigation.navigate('Order', { oid: item.id })}
                key={'history' + key}
                style={myStyle.order}>
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
                        {item.dis}KM
                    </Text>
                </View>
            </TouchableOpacity>
        ))))}
        </View>

        {/*
        <View style={{ width: '100%', height: 300, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity
                onPress={() => { showNew(); getOrderApi() }}
                style={[ {width: '70%' }]}>
                <Text style={{textAlign: 'center'}}>
                    <Image
                        style={{resizeMode: "contain"}}
                        source={require('../assets/images/3994399-20.png')} />
                        <Text style={[myStyle.buttonText2, {fontSize: 20}]}> SYNC ORDER</Text>
                </Text>
                
            </TouchableOpacity>
        </View> */}
        
    </View>

    )


}

export default { OrdersComponent };