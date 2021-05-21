import { useBackButton } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import React, { useRef, useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Animated, ActivityIndicator, ScrollView } from 'react-native';
import myStyle from "../assets/Style";
import * as SecureStore from 'expo-secure-store';
import GlobalVar from "../routes/GlobalVar";
import { ImagePickLibrary, fileUploading } from './ImageComponent';
import { Context } from './Store';



function Register({ navigation }) {

  const { state, dispatch } = useContext(Context);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [emergency, setEmergency] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [time, setTime] = useState('');
  const [type, setType] = useState('');
  const [region, setRegion] = useState('');
  const [plate, setPlate] = useState('');
  const [owner, setOwner] = useState('');
  const [ic, setIc] = useState(state.photoIc);
  const [license, setLicense] = useState('');
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [postMsg, setPostMsg] = useState('');
  const times = timeOptions;



  //----------------Api get Vehicle Type - Start ----------------
  const [types, setTypes] = useState([]);
  useEffect(() => {
    async function apiTypes() {
      await fetch('https://mingmingtravel.com/easyapi/api/vehicle_types.php')//wphp.hopto.org not working
        .then((response) => response.json())
        .then((json) => setTypes(json.options))
        .catch((error) => console.error(error));
    }
    apiTypes();
  }, []);
  //----------------Api get Vehicle Type End ----------------



  //----------------Api get Region - Start ----------------
  const [regions, setRegions] = useState([]);
  useEffect(() => {
    async function apiRegions() {
      await fetch('https://mingmingtravel.com/easyapi/api/regions.php')//wphp.hopto.org not working
        .then((response) => response.json())
        .then((json) => setRegions(json.options))
        .catch((error) => console.error(error));
    }
    apiRegions();
  }, []);
  //----------------Api get Region Type End ----------------



  //----------------------Api post Application - Start ----------------------
  //const applyApi = async () => {
  async function applyApi() {
    
    var details = {
      name: name,
      time: time,
      username: username,
      password: password,
      mobile: mobile,
      emergency: emergency,
      type: type,
      region: region,
      plate: plate,
      owner: owner
      
    };
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    
    try {
      let response = await fetch('https://mingmingtravel.com/easyapi/api/driver_apply.php', {
        method: 'post',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
      })
      .then((response) => response.json())
        .then((json) => {

          setPostMsg(json.application.message);
          fileUploading('register', username, { ic: state.photoIc, license: state.photoLicense, front: state.photoFront, back: state.photoBack });
          setLoading(false);
          
        })
    } catch (error) {
      setPostMsg('Failed to submit.');
      console.error(error);
    }

  };
  //----------------------Api post Application - End ----------------------



  // ------ Validation's Animation ------ 
  const fadeName = useRef(new Animated.Value(0)).current;
  const fadeMobile = useRef(new Animated.Value(0)).current;
  const fadeEmergency = useRef(new Animated.Value(0)).current;
  const fadeUsername = useRef(new Animated.Value(0)).current;
  const fadePassword = useRef(new Animated.Value(0)).current;
  const fadePlate = useRef(new Animated.Value(0)).current;
  const fadeOwner = useRef(new Animated.Value(0)).current;
  const fadeIc = useRef(new Animated.Value(0)).current;
  const fadeLicense = useRef(new Animated.Value(0)).current;
  const fadeFront = useRef(new Animated.Value(0)).current;
  const fadeBack = useRef(new Animated.Value(0)).current;
  
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
    
    setLoading(true);
    var err = 0;

    name == 0 ? (fadeIn(fadeName), err++) : (fadeOut(fadeName))
    mobile == 0 ? (fadeIn(fadeMobile), err++) : (fadeOut(fadeMobile))
    emergency == 0 ? (fadeIn(fadeEmergency), err++) : (fadeOut(fadeEmergency))
    username == 0 ? (fadeIn(fadeUsername), err++) : (fadeOut(fadeUsername))
    password == 0 ? (fadeIn(fadePassword), err++) : (fadeOut(fadePassword))
    plate == 0 ? (fadeIn(fadePlate), err++) : (fadeOut(fadePlate))
    owner == 0 ? (fadeIn(fadeOwner), err++) : (fadeOut(fadeOwner))
    
    if (err <= 0) {

      applyApi();

      /*dispatch({ type: 'SET_IC', value: null });
      dispatch({ type: 'SET_', value: null });
      dispatch({ type: 'SET_IC', value: null });
      dispatch({ type: 'SET_IC', value: null });
      */

    }

  };



  return (
    <View style={myStyle.body}>
      <ScrollView style={myStyle.mycontainer}>
      
        <View style={myStyle.inputBlock}>
          <Text style={[myStyle.h1, {textAlign: 'center'}]}>Driver Application</Text>
          <Text style={{textAlign: 'center'}}>
            <Text style={myStyle.textMuted}>Apply your driver account.</Text>
          </Text>
        </View>
        
        <Text style={{ paddingBottom: 10 }}></Text>

        <View style={myStyle.inputBlock}>
          <Text style={myStyle.label}>Driver Name</Text>
          <TextInput style={myStyle.input}
            placeholder="Driver Name"
            onChangeText={(val) => { setName(val); fadeOut(fadeName) }}
          />
          <Animated.View style={{opacity: fadeName}}>
            <Text style={myStyle.errorMsg}>Driver name is required.</Text>
          </Animated.View>
        </View>
        
        <View style={myStyle.inputBlock}>
          <Text style={myStyle.label}>Mobile Number</Text>
          <TextInput style={myStyle.input}
            placeholder="Mobile Number" keyboardType="phone-pad"
            onChangeText={(val) => { setMobile(val); fadeOut(fadeMobile)}}
          />
          <Animated.View style={{opacity: fadeMobile}}>
            <Text style={myStyle.errorMsg}>Mobile number is required.</Text>
          </Animated.View>
        </View>
        
        <View style={myStyle.inputBlock}>
          <Text style={myStyle.label}>Emergency Contact Number</Text>
          <TextInput style={myStyle.input}
            placeholder="Emergency Contact Number" keyboardType="phone-pad"
            onChangeText={(val) => { setEmergency(val); fadeOut(fadeEmergency) }}
          />
          <Animated.View style={{opacity: fadeEmergency}}>
            <Text style={myStyle.errorMsg}>Emergency Contact number is required.</Text>
          </Animated.View>
        </View>
          
        <View style={myStyle.inputBlock}>
          <Text style={myStyle.label}>Username</Text>
          <TextInput style={myStyle.input}
            placeholder="Username"
            value={username}
            onChangeText={(val) => { setUsername(val); fadeOut(fadeUsername); setUsername(val.trim()) }}
          />
          <Animated.View style={{opacity: fadeUsername}}>
            <Text style={myStyle.errorMsg}>Username is required.</Text>
          </Animated.View>
        </View>
        
        <View style={myStyle.inputBlock}>
          <Text style={myStyle.label}>Password</Text>
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
          <Text style={myStyle.label}>Plate Number</Text>
          <TextInput style={myStyle.input}
            placeholder="Plate Number"
            onChangeText={(val) => { setPlate(val); fadeOut(fadePlate) }}
          />
          <Animated.View style={{opacity: fadePlate}}>
            <Text style={myStyle.errorMsg}>Plate number is required.</Text>
          </Animated.View>
        </View>

        <View style={myStyle.inputBlock}>
          <Text style={myStyle.label}>Vehicle Owner</Text>
          <TextInput style={myStyle.input}
            placeholder="Vehicle Owner"
            onChangeText={(val) => { setOwner(val); fadeOut(fadeOwner) }}
          />
          <Animated.View style={{opacity: fadeOwner}}>
            <Text style={myStyle.errorMsg}>Vehicle owner is required.</Text>
          </Animated.View>
        </View>

        <View style={myStyle.inputBlock}>
          <Text style={myStyle.label}>Work Time</Text>
          <View style={myStyle.selectOutter}>
            <View style={myStyle.selectInner}>
              <RNPickerSelect
                  placeholder={{}}
                  onValueChange={(val) => { setTime(val) }}
                  items={times}
              />
            </View>
          </View>
          <Text></Text>
        </View>
       
        <View style={myStyle.inputBlock}>
          <Text style={myStyle.label}>Vehicle Type</Text>
          <View style={myStyle.selectOutter}>
            <View style={myStyle.selectInner}>
              <RNPickerSelect 
                  placeholder={{}}
                  onValueChange={(val) => { setType(val) }}
                  items={types}
              />
            </View>
          </View>
          <Text></Text>
        </View>

        <View style={myStyle.inputBlock}>
          <Text style={myStyle.label}>Region</Text>
          <View style={myStyle.selectOutter}>
            <View style={myStyle.selectInner}>
              <RNPickerSelect 
                  placeholder={{}}
                  onValueChange={(val) => { setRegion(val) }}
                  items={regions}
              />
            </View>
          </View>
          <Text></Text>
        </View>
        
        <View style={myStyle.inputBlock}>
          <Text style={myStyle.label}>Identity Card (IC)</Text>
          <ImagePickLibrary store_target='SET_IC' />
          <Animated.View style={{opacity: fadeIc}}>
            <Text style={myStyle.errorMsg}>IC is required.</Text>
          </Animated.View>
        </View>

        <View style={myStyle.inputBlock}>
          <Text style={myStyle.label}>Driving License</Text>
          <ImagePickLibrary store_target='SET_LICENSE' />
          <Animated.View style={{opacity: fadeLicense}}>
            <Text style={myStyle.errorMsg}>License is required.</Text>
          </Animated.View>
        </View>

        <View style={myStyle.inputBlock}>
          <Text style={myStyle.label}>Vehicle Front View</Text>
          <ImagePickLibrary store_target='SET_FRONT' />
          <Animated.View style={{opacity: fadeFront}}>
            <Text style={myStyle.errorMsg}>Vehicle front view is required.</Text>
          </Animated.View>
        </View>

        <View style={myStyle.inputBlock}>
          <Text style={myStyle.label}>Vehicle Back View</Text>
          <ImagePickLibrary store_target='SET_BACK' />
          <Animated.View style={{opacity: fadeBack}}>
            <Text style={myStyle.errorMsg}>Vehicle back view is required.</Text>
          </Animated.View>
        </View>

        <View style={myStyle.inputBlock}>
          <TouchableOpacity
            style={myStyle.button}
            onPress={() => {validate()}}
          ><Text style={myStyle.buttonText}>APPLY NOW</Text></TouchableOpacity>
        </View>

        <View style={myStyle.inputBlock}>
          <Text style={{textAlign:'center'}}>{postMsg}</Text>
          <View style={{ paddingBottom: 80 }}></View>
        </View>
 
      </ScrollView>
    </View>
  )
}

/*fadeLicense, fadeFront, fadeBack, fadeMobile, fadeUsername, fadePassword */

export default Register;