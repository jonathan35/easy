import { useBackButton } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Animated, ActivityIndicator, ScrollView } from 'react-native';
import myStyle from "../assets/Style";




function Register2({ navigation }) {

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
  const [isLoading, setLoading] = useState(false); 

  const times = [
    {label: 'Full Time', value: 'full'},
    {label: 'Part Time', value: 'part'}
  ];

  //----------------Api get Vehicle Type - Start ----------------
  const [types, setTypes] = useState([]);

  const apiTypes = () => {
    fetch('https://easymovenpick.com/api/vehicle_types.php')//wphp.hopto.org not working
      .then((response) => response.json())
      .then((json) => setTypes(json.options))
      .catch((error) => console.error(error));
  }
  apiTypes();
  //----------------Api get Vehicle Type End ----------------


  //----------------Api get Region - Start ----------------
  const [regions, setRegions] = useState([]);

  const apiRegions = () => {
    fetch('https://easymovenpick.com/api/regions.php')//wphp.hopto.org not working
      .then((response) => response.json())
      .then((json) => setRegions(json.options))
      .catch((error) => console.error(error));
  }
  apiRegions();
  //----------------Api get Region Type End ----------------




  //----------------------Api post Registration - Start ----------------------
  const PostApplication = async (name, mobile, emergency, username, password, time, type, region, plate, owner) => {
    name = '111';

    /*

    */
    
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
          time: time,
          username: username,
          password: password,
          mobile: mobile,
          emergency: emergency,
          type: type,
          region: region,
          plate: plate,
          owner: owner
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
  const fadePlate = useRef(new Animated.Value(0)).current;
  const fadeOwner = useRef(new Animated.Value(0)).current;
  
  
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
    
    var err = 0;

    if(plate == 0){
      fadeIn(fadePlate);
      err++;
    } else {
      fadeOut(fadePlate);
    }
    if(owner == 0){
      fadeIn(fadeOwner);
      err++;
    } else {
      fadeOut(fadeOwner);
    }
    

    if (err <= 0) {
      //if (step == 1) {
      //  navigation.navigate('Register3')
      //} else {        
          PostApplication(type, time, region, plate, owner);
      //}
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
            placeholder="Plate Number"
            
          />
          <Animated.View style={{opacity: fadePlate}}>
            <Text style={myStyle.errorMsg}>Plate number is required.</Text>
          </Animated.View>
        </View>

        { /*
        onChangeText={(val) => { setPlate(val); fadeOut(fadePlate) }}
        onChangeText={(val) => { setOwner(val); fadeOut(fadeOwner) }}
        */}

        <View style={myStyle.inputBlock}>
          <TextInput style={myStyle.input}
            placeholder="Vehicle Owner"
            
          />
          <Animated.View style={{opacity: fadeOwner}}>
            <Text style={myStyle.errorMsg}>Vehicle owner is required.</Text>
          </Animated.View>
        </View>
      

        <View style={myStyle.inputBlock}>
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

        { /*<View style={myStyle.inputBlock}>
          <TouchableOpacity
            style={myStyle.button}            
            onPress={() => {
              validate(plate, owner)
            }}
          ><Text style={myStyle.buttonText}>NEXT</Text></TouchableOpacity>
          <View style={myStyle.inputBlock}>
            {isLoading ? <ActivityIndicator /> : <Text style={{height:0}}></Text>}
          </View>
        </View>*/}
              
        <View style={myStyle.inputBlock}>
          <TouchableOpacity
            style={myStyle.button}
            onPress={() => {PostApplication(name, mobile, emergency, username, password, time, type, region, plate, owner)}}
          ><Text style={myStyle.buttonText}>POST NOW</Text></TouchableOpacity>
          <View style={myStyle.inputBlock}>
            {isLoading ? <ActivityIndicator /> : <Text style={{height:0}}></Text>}
          </View>
        </View>

     
 
      </ScrollView>
    </View>
  )
}

/*fadeLicense, fadeFront, fadeBack, fadeMobile, fadeUsername, fadePassword */

export default Register2;