import 'react-native-gesture-handler';
import React, { useState, useEffect, useRef} from 'react';
import { View, Text, TextInput, TouchableOpacity, Animated, ActivityIndicator, ScrollView, Linking } from 'react-native';

//import { State } from 'react-native-gesture-handler';

import * as SecureStore from 'expo-secure-store';
import useAuth from "../screens/useAuth";
import myStyle from "../assets/Style";
import GlobalVar from "../routes/GlobalVar";

//import reducer from "./Reducer";

function LoginScreen({ navigation, route }) {


  const {state, authContext} = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [authMsg, setAuthMsg] = useState('');
  const [loginMsg, setLoginMsg] = useState('');
  
  

  useEffect(() => {

    setAuthMsg('');
  
    async function getAuthMsg() {
      let session_str = await SecureStore.getItemAsync('auth_user');
      
      if(session_str!=null){
        let auth_arr = session_str.split(",");
        
        if (auth_arr[0]) {//user id found
          setAuthMsg('Welcome ' + auth_arr[3].replace(/"/g, '').replace('name:', ''));
        }
      }
    }
    getAuthMsg();
    
  }, []);



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
    if(username == 0){  fadeIn(fadeUsername); err++;  } else {fadeOut(fadeUsername);}
    if(password == 0){  fadeIn(fadePassword); err++; } else {fadeOut(fadePassword);}
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
      let response = await fetch('https://easymovenpick.com/api/driver_login.php', {
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
            authContext.signIn(JSON.stringify(json_data));
            

            //reload entire app, inside app check auth and show navigation accordingly
            
            navigation.navigate('Login');
            
          } else {
            authContext.signIn(null);//dont call this when failed
          }
          
          
        })
    } catch (error) {
      console.log(error);
    }
  };

  


  return (
    <View style={myStyle.body}>
      <ScrollView style={myStyle.mycontainer}>
        
        <View style={myStyle.inputBlock}>
          <Text style={{textAlign: 'center'}}>
            <Text style={myStyle.h1}>LOGIN</Text>
          </Text>
          <Text style={{textAlign: 'center'}}>
            <Text>{authMsg}</Text>
          </Text>
        
        </View>

        <Text style={{ paddingBottom: 20 }}></Text>

        
        <View style={myStyle.inputBlock}>
          <TextInput
            placeholder="Username"
            onChangeText={(val) => { setUsername(val); fadeOut(fadeUsername) }}
            style={myStyle.input}
          />
          <Animated.View style={{opacity: fadeUsername}}>
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
          <Animated.View style={{opacity: fadePassword}}>
            <Text style={myStyle.errorMsg}>Password minimum 4 characters.</Text>
          </Animated.View>
        </View>
      
        <View style={myStyle.inputBlock}>
          <TouchableOpacity
            style={myStyle.button}
            title="Login"
            onPress={() => {validate()}}
          ><Text style={myStyle.buttonText}>LOGIN</Text></TouchableOpacity>
          <View style={myStyle.inputBlock}>
            {isLoading ? <ActivityIndicator /> : <Text style={{ textAlign: 'center' }}>{loginMsg}{state.userToken}</Text>}
          </View>

        </View>
            
        <Text style={{ padding: 15, textAlign:'center'}}>
          <Text style={myStyle.textMuted}>OR</Text>
        </Text>
      
        <View style={myStyle.inputBlock}>
          <View style={{ height: 10}}></View>
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
      
    </View>
  )
}



export default LoginScreen;