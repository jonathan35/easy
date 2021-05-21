import { useBackButton } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Animated, ActivityIndicator, ScrollView } from 'react-native';
import myStyle from "../assets/Style";



function Register3({ navigation }) {

  

  const [ic, setIc] = useState('');
  const [license, setLicense] = useState('');
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false); 



  //----------------------Api post Registration - Start ----------------------
  const applyDriverApi = async (name, time, username, password, mobile, emergency, type, region, plate, owner, ic, license, front, back) => {
    
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
          owner: owner,
          ic: ic,
          license: license,
          front: front,
          back: back
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
  const fadeIc = useRef(new Animated.Value(0)).current;
  const fadeLicense = useRef(new Animated.Value(0)).current;
  const fadeFront = useRef(new Animated.Value(0)).current;
  const fadeBack = useRef(new Animated.Value(0)).current;
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
  
  

  const validate = (ic, license, front, back) => {
    
    var err = 0;

    if(name == 0){
      fadeIn(fadeName);
      err++;
    } else {
      fadeOut(fadeName);
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
    if(region == 0){
      fadeIn(fadeRegion);
      err++;
    } else {
      fadeOut(fadeRegion);
    }
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
    if(ic == 0){
      fadeIn(fadeIc);
      err++;
    } else {
      fadeOut(fadeIc);
    }
    if(license == 0){
      fadeIn(fadeLicense);
      err++;
    } else {
      fadeOut(fadeLicense);
    }
    if(front == 0){
      fadeIn(fadeFront);
      err++;
    } else {
      fadeOut(fadeFront);
    }
    if(back == 0){
      fadeIn(fadeBack);
      err++;
    } else {
      fadeOut(fadeBack);
    }


    if (err <= 0) {
      applyDriverApi(username, password);
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
          <TextInput
            placeholder="Driver Name"
            /*onChangeText={(val) => { setName(val); fadeOut(fadeName) }}*/
            style={myStyle.input}
          />
          <Animated.View style={{opacity: fadeName}}>
            <Text style={myStyle.errorMsg}>Driver name is required.</Text>
          </Animated.View>
        </View>


        <View style={myStyle.inputBlock}>
          <View style={myStyle.selectOutter}>
            <View style={myStyle.selectInner}>
              <RNPickerSelect
                  placeholder={{}}
                  onValueChange={(val) => { setTime(val) }}
                  items={global.timeOptions}
              />
            </View>
          </View>
          <Text></Text>
        </View>


        <View style={myStyle.inputBlock}>
          <TextInput
            placeholder="Mobile Number" keyboardType="phone-pad"
            /*onChangeText={(val) => { setMobile(val)}}*/
            style={myStyle.input}
          />
          <Animated.View style={{opacity: fadeMobile}}>
            <Text style={myStyle.errorMsg}>Mobile number is required.</Text>
          </Animated.View>
        </View>

        
        <View style={myStyle.inputBlock}>
          <TextInput
            placeholder="Emergency Contact Number" keyboardType="phone-pad"
            /*onChangeText={(val) => { setEmergency(val) }}*/
            style={myStyle.input}
          />
          <Animated.View style={{opacity: fadeEmergency}}>
            <Text style={myStyle.errorMsg}>Emergency Contact number is required.</Text>
          </Animated.View>
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


        <View style={myStyle.inputBlock}>
          <TextInput
            placeholder="Plate Number"
            onChangeText={(val) => { setPlate(val); fadeOut(fadePlate) }}
            style={myStyle.input}
          />
          <Animated.View style={{opacity: fadePlate}}>
            <Text style={myStyle.errorMsg}>Plate number is required.</Text>
          </Animated.View>
        </View>


        <View style={myStyle.inputBlock}>
          <TextInput
            placeholder="Vehicle Owner"
            onChangeText={(val) => { setOwner(val); fadeOut(fadeOwner) }}
            style={myStyle.input}
          />
          <Animated.View style={{opacity: fadeOwner}}>
            <Text style={myStyle.errorMsg}>Vehicle owner is required.</Text>
          </Animated.View>
        </View>

        
        <View style={myStyle.inputBlock}>
          <TextInput
            placeholder="Photo of IC"
            onChangeText={(val) => { setIc(val); fadeOut(fadeIc) }}
            style={myStyle.input}
          />
          <Animated.View style={{opacity: fadeIc}}>
            <Text style={myStyle.errorMsg}>IC is required.</Text>
          </Animated.View>
        </View>


        <View style={myStyle.inputBlock}>
          <TextInput
            placeholder="Photo of Driving License"
            onChangeText={(val) => { setLicense(val); fadeOut(fadeLicense) }}
            style={myStyle.input}
          />
          <Animated.View style={{opacity: fadeLicense}}>
            <Text style={myStyle.errorMsg}>License is required.</Text>
          </Animated.View>
        </View>


        <View style={myStyle.inputBlock}>
          <TextInput
            placeholder="Vehicle Front View"
            onChangeText={(val) => { setFront(val); fadeOut(fadeFront) }}
            style={myStyle.input}
          />
          <Animated.View style={{opacity: fadeFront}}>
            <Text style={myStyle.errorMsg}>Vehicle back view is required.</Text>
          </Animated.View>
        </View>


        <View style={myStyle.inputBlock}>
          <TextInput
            placeholder="Vehicle Front View"
            onChangeText={(val) => { setBack(val); fadeOut(fadeBack) }}
            style={myStyle.input}
          />
          <Animated.View style={{opacity: fadeBack}}>
            <Text style={myStyle.errorMsg}>Vehicle Front view is required.</Text>
          </Animated.View>
        </View>

          
        <View style={myStyle.inputBlock}>
          <TextInput
            placeholder="Username"
            onChangeText={(val) => { setUsername(val); fadeOut(fadeUsername) }}
            style={myStyle.input}
          />
          <Animated.View style={{opacity: fadeUsername}}>
            <Text style={myStyle.errorMsg}>Username is required.</Text>
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
            <Text style={myStyle.errorMsg}>Password is required.</Text>
          </Animated.View>
        </View>

      
        <View style={myStyle.inputBlock}>
          <TouchableOpacity
            style={myStyle.button}
            title="Register"
            onPress={() => {validate(name, username, password, mobile, emergency, region, plate, owner, ic, license, front, back)}}
          ><Text style={myStyle.buttonText}>APPLY NOW</Text></TouchableOpacity>
          <View style={myStyle.inputBlock}>
            {isLoading ? <ActivityIndicator /> : <Text style={{height:0}}></Text>}
          </View>
        </View>

     
 
      </ScrollView>
    </View>
  )
}

/*fadeLicense, fadeFront, fadeBack, fadeMobile, fadeUsername, fadePassword */

export default Register3;