import React, { useState, useEffect, useContext } from 'react';
import { TouchableOpacity, Image, View, Text, StyleSheet, ScrollView, Dimensions, BackHandler, Alert } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { Context } from './Store';
import Loading from './LoadingScreen';
import myStyle from "../assets/Style";
import MapView from 'react-native-maps';


export const OrderScreen = ({ route, navigation }) => {

  
  
  const { state, dispatch } = useContext(Context);
  const [order, setOrder] = useState([]);
  const [status, setStatus] = useState('');//Accepted Collected Delivering Delivered
  const [isLoading, setLoading] = useState(true);
  const oid = route.params.oid;
  

  
  const acceptApi = async (reloadOrders) => {


      setLoading(true);
      let data = new FormData();
      data.append('oid', oid)
      data.append('uid', state.user.id)
      try {
        let response = await fetch('https://mingmingtravel.com/easyapi/api/accept.php', {
          method: 'post',
          headers: {
            'Content-Type': 'multipart/form-data; '
          },
          body: data
        })
          .then((response) => response.json())
          .then((json) => {
            
            setLoading(false);
            setStatus('Accepted');
           
            console.log(json.result + '--' + json.message);
          })
      } catch (error) {
        console.log('Failed to connect.');
        setLoading(false);
      }
  }

  useEffect(() => {
    const getOrderApi = async () => {
      let data = new FormData();
      data.append('oid', oid)
      setLoading(false);
      try {
          let response = await fetch('https://mingmingtravel.com/easyapi/api/driver_order.php', {
              method: 'post',
              headers: {
                  'Content-Type': 'multipart/form-data; '
              },
              body: data
          })
          .then((response) => response.json())
          .then((json) => {
            if (json.order.id != '') {
              setOrder(json.order);
              setLoading(false);
              setStatus(json.order.status);
              //console.log(JSON.stringify(json.message));
            }
          })
      } catch (error) {
          console.log('Failed to connect.');
      }
    }
    if (oid) {
      getOrderApi();
    }
  }, []);


  return (
    <View style={myStyle.body}>
      {isLoading ? (
        <Loading />
      ) : (
        order.status && (
        <ScrollView>
          <View><Text>1234</Text></View>
              
          {status == 'Accepted' && order.deadline != 'expired' ? (
            <LinearGradient
              style={{ paddingVertical: 7, justifyContent: 'center' }}
              colors={["rgba(95, 173, 61, 1)", "rgba(75, 135, 49, 1)"]}>
              <Text style={styles.FontWhiteL}>FAST PICK</Text>
              <Text style={styles.FontWhiteS}>
                before {order.deadline}
              </Text>
            </LinearGradient>
          
          ) : status == 'Accepted' && order.deadline == 'expired' ? (
            <LinearGradient
              style={{ paddingVertical: 10, justifyContent: 'center' }}
              colors={["rgba(255, 255, 255, 1)", "rgba(211, 211, 211, 1)"]}>
              <Text style={styles.FontL}>{status}</Text>
            </LinearGradient>
          ) : status == 'Collected' ? (
            <LinearGradient
              style={{ paddingVertical: 10, justifyContent: 'center' }}
              colors={["rgba(255, 255, 255, 1)", "rgba(211, 211, 211, 1)"]}>
              <Text style={styles.FontL}>{status}</Text>
            </LinearGradient>
          ) : (
            <LinearGradient
              style={{ paddingVertical: 10, justifyContent: 'center' }}
              colors={["rgba(255, 255, 255, 1)", "rgba(211, 211, 211, 1)"]}>
              <Text style={styles.FontL}>{status}.</Text>
            </LinearGradient>
          )}
      
          <View>
                
            {order.branch_name && (
              <View style={styles.block}>
                <Text style={styles.FontL}>{order.branch_name}</Text>
              </View>
            )}
            <View style={{borderBottomColor: '#CCC', borderBottomWidth: 1}}></View>
            {order.sid && (
              <View style={styles.inlineblock}>
                <View style={{flex:1}}><Text style={styles.FontGray}>ORDER ID </Text></View>
                <View style={{flex:2}}><Text style={styles.Font}>{order.sid}</Text></View>
              </View>
            )}
            {order.created && (
              <View style={styles.inlineblock}>
                <View style={{flex:1}}><Text style={styles.FontGray}>DATE </Text></View>
                <View style={{flex:2}}><Text style={styles.Font}>{order.created}</Text></View>
              </View>
            )}
            {order.zone && (
              <View style={styles.inlineblock}>
                <View style={{flex:1}}><Text style={styles.FontGray}>ZONE </Text></View>
                <View style={{flex:2}}><Text style={styles.Font}>{order.zone}</Text></View>
              </View>
            )}
            {order.customer_name && (
              <View style={styles.inlineblock}>
                <View style={{flex:1}}><Text style={styles.FontGray}>NAME </Text></View>
                <View style={{flex:2}}><Text style={styles.Font}>{order.customer_name}</Text></View>
              </View>
            )}
            {order.phone && (
              <View style={styles.inlineblock}>
                <View style={{flex:1}}><Text style={styles.FontGray}>PHONE </Text></View>
                <View style={{flex:2}}><Text style={styles.Font}>{order.phone}</Text></View>
              </View>
            )}
            {order.distance && (
              <View style={styles.inlineblock}>
                <View style={{flex:1}}><Text style={styles.FontGray}>DISTANCE </Text></View>
                <View style={{flex:2}}><Text style={styles.Font}>{order.distance}KM</Text></View>
              </View>
            )}
            {/*order.admin_name && (
              <View style={styles.block}>
                <Text style={styles.FontL}>{order.admin_name}</Text>
              </View>
            )}    
            {order.merit && (
              <View style={styles.block}>
                <Text style={styles.FontL}>{order.merit}</Text>
              </View>
            )*/}   
            <View style={{ borderBottomColor: '#CCC', borderBottomWidth: 1 }}></View>
                
            {order.origin && (
              <View style={styles.block}>
                <Text style={styles.FontGray}>ORIGIN </Text>
                <Text style={styles.Font}>{order.origin}</Text>
                    {/*<MapView style={styles.map} /> */}
              </View>
            )}
            {order.destination && (
              <View style={styles.block}>
                <Text style={styles.FontGray}>DESTINATION </Text>
                <Text style={styles.Font}>{order.destination}</Text>
              </View>
            )}  
            {/*order.o_coor && (
              <View style={styles.block}>
                <Text style={styles.FontGray}>ORIGIN COORDINATION </Text>
                <Text style={styles.Font}>{order.o_coor}</Text>
              </View>
            )}
            {order.d_coor && (
              <View style={styles.block}>
                <Text style={styles.FontGray}>DESTINATION COORDINATION </Text>
                <Text style={styles.Font}>{order.d_coor}</Text>
              </View>
            )*/}

            {order.address && (
              <View style={styles.block}>
                <Text style={styles.FontGray}>PROPERTY NUMBER (floor/lot/sublot/etc) </Text>
                <Text style={styles.Font}>{order.address}</Text>
              </View>
            )}
            {order.time && (
              <View style={styles.block}>
                <Text style={styles.FontGray}>TIME </Text>
                <Text style={styles.Font}>{order.time}</Text>
              </View>
            )}
            {order.message && (
              <View style={styles.block}>
                <Text style={styles.FontGray}>MESSAGE </Text>
                <Text style={styles.Font}>{order.message}</Text>
              </View>
            )}
            {order.requirement && (
              <View style={styles.block}>
                <Text style={styles.FontGray}>VEHICLE REQUIREMENT </Text>
                <Text style={styles.Font}>{order.requirement}</Text>
              </View>
            )}
            {order.pod && (
              <View style={styles.block}>
                <Text style={styles.FontGray}>PROOF OF DELIVERY </Text>
                <Text style={styles.Font}>{order.pod}</Text>
              </View>
            )}
            
            {order.status == 'Ordered' ? (
              <View style={myStyle.inputBlock}>
                <TouchableOpacity
                  style={myStyle.button}
                  onPress={() => {acceptApi()}}
                ><Text style={myStyle.buttonText}>ACCEPT ORDER</Text></TouchableOpacity>
              </View>
            ) : (
              <View style={myStyle.inputBlock}>
              <TouchableOpacity
                style={myStyle.button}
                onPress={() => {acceptApi()}}
              ><Text style={myStyle.buttonText}>XXXX ORDER</Text></TouchableOpacity>
            </View>
            )}
          </View>
            
          <View style={{ height: 100, paddingTop: 40 }}>
            <Text style={{ textAlign: 'center' }}>--------- END ---------</Text>
          </View>

        </ScrollView>
      )
    )}
    </View>
  )


}

export default OrderScreen;


const styles = StyleSheet.create({
  inlineblock: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,

  },
  block: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  FontWhiteL: {
    textAlign: 'center',
    fontSize: 28,
    color: 'white',
  },
  FontL: {
    textAlign: 'center',
    fontSize: 28,
    color: 'black',
  },
  Font: {
    fontSize: 18,
    color: 'black',
  },
  FontS: {
    fontSize: 14,
    color: 'black',
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
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  

})