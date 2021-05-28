import 'react-native-gesture-handler';
import React, { useState, useEffect, useRef, useContext} from 'react';
import { View, Text, TextInput, TouchableOpacity, Animated, Platform, ScrollView, Linking } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import myStyle from "../assets/Style";
import GlobalVar from "../routes/GlobalVar";
import { Context } from './Store';
import Loading from './LoadingScreen';


function LoginScreen({ navigation }) {


  const {state, dispatch } = useContext(Context);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [loginMsg, setLoginMsg] = useState('');


  const forgetPassword = async () => {
    Linking.openURL('whatsapp://send?text=Please reset driver password for username: &phone=' + supportNumber);
  };


  // ------ Validation's Animation ------ 
  const fadeUsername = useRef(new Animated.Value(0)).current;
  const fadePassword = useRef(new Animated.Value(0)).current;

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


  function validate() {

    setLoading(true);

    var err = 0;
    username == 0 ? (fadeIn(fadeUsername), err++) : (fadeOut(fadeUsername))
    password == 0 ? (fadeIn(fadePassword), err++) : (fadeOut(fadePassword))
    
    if (err <= 0) {
      loginApi();
    }
  };



    
  const loginApi = async () => {

    var details = {
      username: username,
      password: password
    };
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    try {
      let response = await fetch('https://mingmingtravel.com/easyapi/api/driver_login.php', {
        method: 'post',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
      })
        .then((response) => response.json())
        .then((json) => {
          let json_data = json.auth_user;
          let json_message = json_data.message;
          let json_result = json_data.result;

          setLoading(false);
          setLoginMsg(json_message);

          if (json_result == true) {
            SecureStore.setItemAsync('auth_user', JSON.stringify(json_data));
            
            dispatch({ type: 'SIGN_IN', token: JSON.stringify(json_data) });
            storeUser(JSON.stringify(json_data));
            
          } else {
            dispatch({ type: 'SIGN_IN', token: null });
          }
        })
    } catch (error) {
      console.log(error);
    }
  };


    

  function storeUser(json_str) {

    let user = [];

    if (json_str != null && json_str != 'undefined' && json_str != '') {
 
      let ar = json_str.replace(/"/g, '').replace(/{/g, '').replace(/}/g, '')
        .replace('id:', '')
        .replace('region:', '')
        .replace('vehicle_type:', '')
        .replace('name:', '')
        .replace('working_time:', '')
        .replace('mobile_number:', '')
        .replace('emergency_contact_number:', '')
        .replace('branch_location_coordinate:', '')
        .replace('vehicle_belonging:', '')
        .replace('photo_of_ic:', '')
        .replace('photo_of_driving_license:', '')
        .replace('vehicle_front_view:', '')
        .replace('vehicle_back_view:', '')
        .replace('username:', '')
        .replace('status:', '')
        .replace('merit:', '')
        .split(",");
      
      user = {
        id: ar[0], region: ar[1], vehicle_type: ar[2], name: ar[3], working_time: ar[4], mobile_number: ar[5], emergency_contact_number: ar[6], plate_number: ar[7], branch_location_coordinate: ar[8], vehicle_belonging: ar[9], photo_of_ic: ar[10], photo_of_driving_license: ar[11], vehicle_front_view: ar[12], vehicle_back_view: ar[13], username: ar[14], status: ar[15], merit: ar[16]
      };
    }
    dispatch({ type: 'SET_USER', user: user});
  }



  return (

    <View style={myStyle.body}>
    {isLoading ? (
      <Loading />
    ) : (

      <ScrollView style={myStyle.mycontainer}>
      
        <View style={myStyle.inputBlock}>
          <Text style={{ textAlign: 'center' }}>
            <Text style={myStyle.h1}>LOGIN</Text>
          </Text>
        </View>

        <Text style={{ paddingBottom: 20 }}></Text>

      
        <View style={myStyle.inputBlock}>
          <TextInput
            placeholder="Username"
            onChangeText={(val) => { setUsername(val); fadeOut(fadeUsername) }}
            style={myStyle.input}
          />
          <Animated.View style={{ opacity: fadeUsername }}>
            <Text style={myStyle.errorMsg}>Username minimum 4 characters.</Text>
          </Animated.View>
        </View>
      
        <View style={myStyle.inputBlock}>
          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(val) => { setPassword(val); fadeOut(fadePassword) }}
            style={myStyle.input}
          />
          <Animated.View style={{ opacity: fadePassword }}>
            <Text style={myStyle.errorMsg}>Password minimum 4 characters.</Text>
          </Animated.View>
        </View>
    
        <View style={myStyle.inputBlock}>
          <TouchableOpacity
            style={myStyle.button}
            title="Login"
            onPress={() => { validate() }}
          ><Text style={myStyle.buttonText}>LOGIN</Text></TouchableOpacity>
          <Text style={myStyle.inputBlock}>
            {loginMsg}
          </Text>

        </View>
          
        <Text style={{ padding: 15, textAlign: 'center' }}>
          <Text style={myStyle.textMuted}>OR</Text>
        </Text>
    
        <View style={myStyle.inputBlock}>
          <View style={{ height: 10 }}></View>
          <TouchableOpacity
            style={myStyle.button2}
            onPress={() => navigation.navigate('Register')}
          ><Text style={myStyle.buttonText2}>REGISTER NOW</Text></TouchableOpacity>
        </View>


        <View style={myStyle.inputBlock}>
          <View style={{ height: 50 }}></View>
          <TouchableOpacity
            onPress={() => forgetPassword()}
          ><Text style={myStyle.buttonText2}>FORGET PASSWORD</Text></TouchableOpacity>



        </View>

      </ScrollView>
    )}
    </View>
  )
}



export default LoginScreen;