import React, { useState, useEffect, useContext, useRef } from 'react';
import { TouchableOpacity, Image, View, Text, StyleSheet, ScrollView, Animated } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { Context } from './Store';
import Loading from './LoadingScreen';
import myStyle from "../assets/Style";
import MapView, { Marker } from 'react-native-maps';
import { ImagePickLibrary, fileUploading } from './ImageComponent';
import GlobalVar from '../routes/GlobalVar';




export const OrderScreen = ({ route, navigation }) => {

  const { state, dispatch } = useContext(Context);
  const [order, setOrder] = useState([]);
  const [status, setStatus] = useState('');//Accepted Collected Delivering Delivered
  const [isLoading, setLoading] = useState(true);
  const fadeBack = useRef(new Animated.Value(0)).current;
  const oid = route.params.oid;
  
  //---------- MAP -------------
  const lat = 1.5597964;
  const lon = 110.3110226;
  const [markOrigin, setMarkOrigin] = useState({latitude: lat, longitude: lon});
  const [markDes, setMarkDes] = useState({latitude: lat, longitude: lon});
  const [center, setCenter] = useState({latitude: lat, longitude: lon, latitudeDelta: 0.1, longitudeDelta: 0.1,});
  
  
  const updateOrderApi = async (action) => {

    setLoading(true);
    let data = new FormData();
    data.append('oid', oid)
    data.append('uid', state.user.id)
    data.append('action', action)

    try {
      let response = await fetch('https://mingmingtravel.com/easyapi/api/update_order.php', {
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data; '
        },
        body: data
      })
        .then((response) => response.json())
        .then((json) => {
          setLoading(false);
          if (action == 'accept') {
            setStatus('Accepted');
          } else if (action == 'collect') {
            setStatus('Collected');
          } else if (action == 'pod') {
            setStatus('Delivered');
            fileUploading('pod', oid, { pod: state.photoPod });
            //dispatch({ type: 'SET_POD', value: null });
          }
          
          //console.log(json.result + '--message： ' + json.message + '--deadline： ' + json.deadline);
        })
    } catch (error) {
      console.log('Failed to connect.');
      setLoading(false);
    }
  }



  useEffect(() => {
    const getOrderApi = async () => {

      dispatch({ type: 'SET_POD', value: null });

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
            
            let o = json.order;

            if (o.id != '') {
              setOrder(o);
              setLoading(false);
              setStatus(o.status);
              
              
              //console.log(JSON.stringify(json.message));
              
              
              if (o.diff != 'undefined' && o.c_lat != 'undefined' && o.c_lon != 'undefined' && o.o_lat != 'undefined' && o.o_lon != 'undefined' && o.d_lat != 'undefined' && o.d_lon != 'undefined') {
                

                //console.log(JSON.stringify(o));

                setCenter({
                  latitude: Number(o.c_lat),
                  longitude: Number(o.c_lon),
                  latitudeDelta: Number(o.diff),
                  longitudeDelta: Number(o.diff)
                });
                setMarkOrigin({latitude: Number(o.o_lat), longitude: Number(o.o_lon)});
                setMarkDes({latitude: Number(o.d_lat), longitude: Number(o.d_lon)});

                /*console.log({
                  c_lat: o.c_lat,
                  c_lon: o.c_lon,
                  o_lat: o.o_lat,
                  o_lon: o.o_lon,
                  d_lat: o.d_lat,
                  d_lon: o.d_lon
                });*/
              }
              
            }
          })
      } catch (error) {
        console.log('Failed to connect order');
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
        <ScrollView style={{flex:1, width:'100%'}}>

          <LinearGradient
            style={{ paddingVertical: 10, justifyContent: 'center' }}
            colors={["rgba(255, 255, 255, 1)", "rgba(211, 211, 211, 1)"]}>
            <Text style={styles.FontL}>{status}</Text>
            {order.deadline != 'expired' ? (
                  <View style={{ backgroundColor: 'green', width: '60%', marginLeft: '20%', borderRadius: 10, paddingBottom: 2 }}>
                    <Text style={styles.FontWhiteS}>Fast pick before {order.deadline}</Text>
                  </View>
            ) : (
              <></>
            )}
          </LinearGradient>

              
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
            {order.time && (
              <View style={styles.inlineblock}>
                <View style={{flex:1}}><Text style={styles.FontGray}>TIME </Text></View>
                <View style={{flex:2}}>
                  <Text style={styles.Font}>{order.time}
                    {order.scheduled &&
                      <Text style={{ color: 'red', fontSize: 15 }}>
                        <Text>     </Text>
                        <Image 
                            style={{ resizeMode: "contain", padding: 2}}
                        source={require('../assets/images/time-20.png')}
                        />SCHEDULED!
                      </Text>
                    }
                  </Text>
                </View>
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
            {order.admin_name && (
              <View style={styles.block}>
                <Text style={styles.FontL}>{order.admin_name}</Text>
              </View>
            )}    
            {order.merit && (
              <View style={styles.block}>
                <Text style={styles.FontL}>{order.merit}</Text>
              </View>
            )}
            <View style={{ borderBottomColor: '#CCC', borderBottomWidth: 1 }}></View>
                
            {order.origin && (
              <View style={styles.block}>
                <Text style={styles.FontGray}>
                  <Image
                    style={{resizeMode: "contain"}}
                    source={require('../assets/images/origin-24.png')}
                    />ORIGIN 
                </Text>
                <Text style={styles.Font}>{order.origin}</Text>
                
              </View>
            )}
            {order.destination && (
              <View style={styles.block}>
                <Text style={styles.FontGray}>
                  <Image
                    style={{resizeMode: "contain"}}
                    source={require('../assets/images/des-24.png')}
                      />DESTINATION
                </Text>
                <Text style={styles.Font}>{order.destination}</Text>
              </View>
            )}
                
            <View style={styles.block}>
              <MapView style={styles.mapStyle} initialRegion={center}>
                <Marker
                  title="Origin"
                  coordinate={markOrigin}
                  image={require('../assets/images/origin_pin.png')}
                />
                <Marker
                  title="Destination"
                  coordinate={markDes}
                  image={require('../assets/images/des_pin.png')}
                />
              </MapView>
            </View>
             
            {order.address !='-' && (
              <View style={styles.block}>
                <Text style={styles.FontGray}>PROPERTY NUMBER (floor/lot/sublot/etc) </Text>
                <Text style={styles.Font}>{order.address}</Text>
              </View>
            )}
            {order.requirement !='-' && (
              <View style={styles.block}>
                <Text style={styles.FontGray}>VEHICLE REQUIREMENT </Text>
                <Text style={styles.Font}>{order.requirement}</Text>
              </View>
            )}
            {order.message !='-' && (
              <View style={styles.block}>
                <Text style={styles.FontGray}>MESSAGE </Text>
                <Text style={styles.Font}>{order.message}</Text>
              </View>
            )}
            {order.pod !='-' && (
              <View style={{padding: 10, paddingTop: 40, width: '100%'}}>
                <Text style={[styles.Font, { textAlign: 'center' }]}>PROOF OF DELIVERY</Text>
                <Image
                  style={{ resizeMode: "contain", width:'100%', height: 500 }}
                  source={{ uri: serverImageRoot+order.pod }} />
              </View>
            )}
            
            
            {status == 'Ordered' ? (
              
              <View style={myStyle.inputBlock}>
                <TouchableOpacity
                  style={myStyle.button}
                  onPress={() => {updateOrderApi('accpet')}}
                ><Text style={myStyle.buttonText}>ACCEPT ORDER</Text></TouchableOpacity>
              </View>
              
            ) : status == 'Accepted' ? (
              
              <View style={myStyle.inputBlock}>
                <TouchableOpacity
                  style={myStyle.button}
                  onPress={() => {updateOrderApi('collect')}}
                ><Text style={myStyle.buttonText}>COLLECTED GOODS</Text></TouchableOpacity>
              </View>
              
            ) : status == 'Collected' ? (
              
              <View style={myStyle.inputBlock}>
                <View style={{height: 20}}></View>
                <ImagePickLibrary style={myStyle.button} store_target='SET_POD' />
                <View style={{height: 20}}></View>
                {state.photoPod && (
                <TouchableOpacity
                    style={[myStyle.button]}
                    onPress={() => {updateOrderApi('pod')}}>
                    <Text style={myStyle.buttonText}>CONFIRM</Text>
                </TouchableOpacity>
                )}
              </View>
  
            ) : (
              <View></View>
            )}
            
         
            
          </View>
            
          <View style={{ height: 100, paddingTop: 40 }}>
            <Text style={{ textAlign: 'center', color: '#666' }}>--------- END ---------</Text>
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
    flexDirection: 'row',    paddingHorizontal: 10,
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