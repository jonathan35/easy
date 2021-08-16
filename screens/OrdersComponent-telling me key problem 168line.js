import React, { useState, useEffect, useContext } from 'react';
import { TouchableOpacity, Image, View, Text, BackHandler, Alert, StyleSheet } from 'react-native';
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
    const [hideList, setHideList] = useState('');

    
    const getOrderApi = async () => {
        
        if (state.user.id) {
            
            setUserFound(true)
            let data = new FormData();
            data.append('uid', state.user.id)

            try {
                let response = await fetch('https://easymovenpick.com/api/driver_orders.php', {
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

                    //console.log(json.driver_orders.orders);

                    setNews(json.driver_orders.orders.news);
                    setDelivers(json.driver_orders.orders.delivers);
                    setDelivereds(json.driver_orders.orders.delivereds);
                })
            } catch (error) {
                console.log('Failed to connect.-->' + JSON.stringify(error));
            }
        } else {
            //console.log('No user id to get orders.');
        }
        
    }


    if (!userFound) {
        getOrderApi();
        let myInterval = setInterval(() => {
            getOrderApi();
        }, 10000);//60000 = 1 minute
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
   

    function hideUnhide(rowkey) {

        let oldList = hideList

        if (oldList == '') {//Empty oldList
            oldList = '|'+rowkey+'|';
        } else if (oldList.includes('|'+rowkey+'|')) {//Key found in oldList before
            oldList = oldList.replace('|'+rowkey+'|','');
        } else {
            oldList = oldList + '|' + rowkey + '|';
        }
        setHideList(oldList)
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
        ) : (news.map((item, newkey) => (
            <View style={[
                styles.row,
                hideList.includes('|new'+newkey+'|') && styles.rowHide
            ]}>
                <TouchableOpacity
                    onPress={() => { hideUnhide('new'+newkey) }}
                    style={[
                        styles.iconPlusMinus,
                        hideList.includes('|new'+newkey+'|') ? styles.iconPlus : styles.iconMinus
                    ]}>
                    <Text style={{ textAlign: 'center', justifyContent: 'center' }}>
                        {hideList.includes('|new'+newkey+'|') ? (
                            <Image
                            style={{resizeMode: "contain"}}
                            source={require('../assets/images/plus-16.png')} />
                        ) : (
                            <Image
                            style={{resizeMode: "contain"}}
                            source={require('../assets/images/minus-16.png')} />
                        )}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        myStyle.order,
                        hideList.includes('|new'+newkey+'|') && styles.colHide,
                        { flex: 20}
                    ]}
                    onPress={() => navigation.navigate('Order', { oid: item.id }, getOrderApi())}
                    key={'new' + newkey}>
                    <View style={{flex:1}}>
                        <Text style={myStyle.Font}>{newkey+1}.</Text>
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
                    <View style={{flex:4}}>
                        <Text style={[myStyle.Font, {textAlign: 'right'}]}>
                            {item.dis}KM
                        </Text>
                    </View>
                </TouchableOpacity>{/*paddingTop: 0, paddingRight: 0 */}
                
            </View>
        ))))}
        {delShow && (delCount <= 0 ? (
            <View style={{ padding: 10 }} >
                <Text>No order under delivering yet..</Text>
            </View>
        ) : (delivers.map((item, doingkey) => (
            <View style={[
                styles.row,
                hideList.includes('|doing'+doingkey+'|') && styles.rowHide
            ]}>
                <TouchableOpacity
                    onPress={() => { hideUnhide('doing'+doingkey) }}
                    style={[
                        styles.iconPlusMinus,
                        hideList.includes('|doing'+doingkey+'|') ? styles.iconPlus : styles.iconMinus
                    ]}>
                    <Text style={{ textAlign: 'center', justifyContent: 'center' }}>
                        {hideList.includes('|doing'+doingkey+'|') ? (
                            <Image
                            style={{resizeMode: "contain"}}
                            source={require('../assets/images/plus-16.png')} />
                        ) : (
                            <Image
                            style={{resizeMode: "contain"}}
                            source={require('../assets/images/minus-16.png')} />
                        )}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        myStyle.order,
                        hideList.includes('|doing'+doingkey+'|') && styles.colHide,
                        { flex: 20}
                    ]}
                    onPress={() => navigation.navigate('Order', { oid: item.id })}
                    key={'deliver' + doingkey}
                    >
                    <View style={{flex:1}}>
                        <Text style={myStyle.Font}>{doingkey+1}.</Text>
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
            </View>
        ))))}
        
        {hisShow && (hisCount <= 0 ? (
            <View style={{ padding: 10 }} >
                <Text>No delivered order yet..</Text>
            </View>
        ) : (delivereds.map((item, donekey) => (
            <View style={[
                styles.row,
                hideList.includes('|done'+donekey+'|') && styles.rowHide
            ]}>
                <TouchableOpacity
                    onPress={() => { hideUnhide('done'+donekey) }}
                    style={[
                        styles.iconPlusMinus,
                        hideList.includes('|done'+donekey+'|') ? styles.iconPlus : styles.iconMinus
                    ]}>
                    <Text style={{ textAlign: 'center', justifyContent: 'center' }}>
                        {hideList.includes('|done'+donekey+'|') ? (
                            <Image
                            style={{resizeMode: "contain"}}
                            source={require('../assets/images/plus-16.png')} />
                        ) : (
                            <Image
                            style={{resizeMode: "contain"}}
                            source={require('../assets/images/minus-16.png')} />
                        )}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        myStyle.order,
                        hideList.includes('|done'+donekey+'|') && styles.colHide,
                        { flex: 20}
                    ]}
                    onPress={() => navigation.navigate('Order', { oid: item.id })}
                    key={'history' + donekey}
                    >
                    <View style={{ flex: 1 }}>
                        <Text style={myStyle.Font}>{donekey + 1}.</Text>
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
            </View>
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




const styles = StyleSheet.create({

    row: {
        flexDirection: 'row',
        display: 'flex',
    },
    rowHide: {
        height: 36,
        paddingTop: 0
    },
    colHide: {
        display: 'none'
    },
    iconPlusMinus: {
        flex: 1, backgroundColor: 'gray', textAlign: 'center', padding: 8, width: '100%', height: 36, borderBottomColor: '#CCC', borderBottomWidth:1
    },
    iconPlus: {
    },
    iconMinus: {
        marginTop:14,
    }
                
  
})