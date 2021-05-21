import { useBackButton } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Animated, ActivityIndicator, ScrollView } from 'react-native';
import myStyle from "../assets/Style";

 

function Register({ navigation }) {
  
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [emergency, setEmergency] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);


  //----------------------Api post Registration - Start ----------------------
  const applyDriverApi = async (name, mobile, emergency, username, password) => {
    
    setLoading(true);

    try {
      let response = await fetch('https://webhook.site/cabd6425-a86e-495b-a041-a4228a09fb77', {
        method: 'post',
        mode: 'no-cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          time: mobile,
          emergency: emergency,
          username: username,
          password: password,
          
        })
      })
      .then((response) => response.json())
      //.then((json) => setData(json.movies))
      .then(setTimeout(function() {setLoading(false); setLoading(true);}.bind(this), 1000))
    } catch (error) {
      console.error(error);
    }

  };
  //----------------------Api post Registration - End ----------------------




  // ------ Validation's Animation ------ 
  const fadeName = useRef(new Animated.Value(0)).current;
  const fadeMobile = useRef(new Animated.Value(0)).current;
  const fadeEmergency = useRef(new Animated.Value(0)).current;
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
  
  

  const validate = (step, name, mobile, emergency, username, password) => {
    
    var err = 0;

    if(name == 0){
      fadeIn(fadeName);
      err++;
    } else {
      fadeOut(fadeName);
    }  
    if(mobile == 0){
      fadeIn(fadeMobile);
      err++;
    } else {
      fadeOut(fadeMobile);
    }
    if(emergency == 0){
      fadeIn(fadeEmergency);
      err++;
    } else {
      fadeOut(fadeEmergency);
    }
    if(username == 0){
      fadeIn(fadeUsername);
      err++;
    } else {
      fadeOut(fadeUsername);
    }
    if(password == 0){
      fadeIn(fadePassword);
      err++;
    } else {
      fadeOut(fadePassword);
    }

    if (err <= 0) {
      if (step == 1) {
        navigation.navigate('Register2')
      } else {        
          applyDriverApi(name, mobile, emergency, username, password);
      }
    }
    

  };


  return (
    <View style={myStyle.body}>
      <ScrollView style={myStyle.mycontainer}>
        
      
        <View style={myStyle.inputBlock}>
          <Text style={{textAlign: 'center'}}>
            <Text style={myStyle.h1}>Driver Application</Text>
          </Text>
          <Text style={{textAlign: 'center'}}>
            <Text style={myStyle.textMuted}>
                Apply a driver account.
            </Text>
          </Text>
        </View>
        
        <Text style={{ paddingBottom: 10 }}></Text>

        <View style={myStyle.inputBlock}>
          <TextInput style={myStyle.input}
            placeholder="Driver Name"
            onChangeText={(val) => { setName(val); fadeOut(fadeName) }}
          />
          <Animated.View style={{opacity: fadeName}}>
            <Text style={myStyle.errorMsg}>Driver name is required.</Text>
          </Animated.View>
        </View>


        <View style={myStyle.inputBlock}>
          <TextInput style={myStyle.input}
            placeholder="Mobile Number" keyboardType="phone-pad"
            onChangeText={(val) => { setMobile(val); fadeOut(fadeMobile)}}
          />
          <Animated.View style={{opacity: fadeMobile}}>
            <Text style={myStyle.errorMsg}>Mobile number is required.</Text>
          </Animated.View>
        </View>

        
        <View style={myStyle.inputBlock}>
          <TextInput style={myStyle.input}
            placeholder="Emergency Contact Number" keyboardType="phone-pad"
            onChangeText={(val) => { setEmergency(val); fadeOut(fadeEmergency) }}
          />
          <Animated.View style={{opacity: fadeEmergency}}>
            <Text style={myStyle.errorMsg}>Emergency Contact number is required.</Text>
          </Animated.View>
        </View>


          
        <View style={myStyle.inputBlock}>
          <TextInput style={myStyle.input}
            placeholder="Username"
            onChangeText={(val) => { setUsername(val); fadeOut(fadeUsername) }}
          />
          <Animated.View style={{opacity: fadeUsername}}>
            <Text style={myStyle.errorMsg}>Username is required.</Text>
          </Animated.View>
        </View>

        
        <View style={myStyle.inputBlock}>
          <TextInput style={myStyle.input}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(val) => { setPassword(val); fadeOut(fadePassword) }}
          />
          <Animated.View style={{opacity: fadePassword}}>
            <Text style={myStyle.errorMsg}>Password is required.</Text>
          </Animated.View>
        </View>

      
        <View style={myStyle.inputBlock}>
          <TouchableOpacity 
            style={myStyle.button}
            title="Register"
            onPress={() => {
              validate(step = 1, name, mobile, emergency, username, password)
            }}
          ><Text style={myStyle.buttonText}>NEXT</Text></TouchableOpacity>
          <View style={myStyle.inputBlock}>
            {isLoading ? <ActivityIndicator /> : <Text style={{height:0}}></Text>}
          </View>
        </View>

        

     
 
      </ScrollView>
    </View>
  )
}

/*fadeLicense, fadeFront, fadeBack, fadeMobile, fadeUsername, fadePassword */

export default Register;