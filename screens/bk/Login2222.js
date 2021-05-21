import React, { useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Animated} from 'react-native';
import myStyle from "../assets/Style";
import Register from "./Register";
/*import Footer from "./Footer";*/



export function loginApi(username = null, password = null) {

  
  const getLoginApi = async () => {
    try {
      let login_api_url = 'https://wphp.hopto.org/easymove/api/login.php';
      //'https://webhook.site/cabd6425-a86e-495b-a041-a4228a09fb77';
      
      let response = await fetch(login_api_url, {
        method: 'post',
        mode: 'no-cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      })
      let json = await response.json();
      return json.movie;
 
    } catch (error) {
      return error;
      //console.error(error);
    }
  };

  if (username != null && password != null) {  
    let msg = getLoginApi();
    console.log('msg'+msg[0]+'msg'+msg[1]);
  }

}


function Login({ navigation }) {
  
  const [username, changeUsername] = React.useState('');
  const [password, changePassword] = React.useState('');

  // ------ Validation's Animation ------ 
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim2 = useRef(new Animated.Value(0)).current;

  const fadeIn = (e) => {
    Animated.timing(e, {
      toValue: 1,
      duration: 500
    }).start();
  };

  const fadeOut = (e) => {
    Animated.timing(e, {
      toValue: 0,
      duration: 500
    }).start();
  };

  const validate = (username, password) => {
    
    var err = 0;

    if(username == 0){
      fadeIn(fadeAnim);
      err++;
    } else {
      fadeOut(fadeAnim);
    }
    if(password == 0){
      fadeIn(fadeAnim2);
      err++;
    } else {
      fadeOut(fadeAnim2);
    }

    if (err <= 0) {
      loginApi(username, password);
    }

  };

  return (
    <View style={myStyle.body}>
      <View style={myStyle.container}>
      
        <View style={myStyle.inpuBlock}>
          <Text style={{textAlign: 'center'}}>
            <Text style={myStyle.h1}>Driver Login</Text>
          </Text>
          <Text style={{textAlign: 'center'}}>
            <Text style={myStyle.textMuted}>
                Please login using given username & password.
            </Text>
          </Text>
        </View>
        
        <Text style={{ paddingBottom: 20 }}></Text>
        
        <View style={myStyle.inpuBlock}>
          <TextInput
            placeholder="Username"
            onChangeText={(val) => { changeUsername(val); fadeOut(fadeAnim) }}
            style={myStyle.input}
          />
          <Animated.View style={{opacity: fadeAnim}}>
            <Text style={myStyle.errorMsg}>Username minimum 4 characters.</Text>
          </Animated.View>
        </View>
        
        <View style={myStyle.inpuBlock}>
          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(val) => { changePassword(val); fadeOut(fadeAnim2) }}
            style={myStyle.input}
          />          
          <Animated.View style={{opacity: fadeAnim2}}>
            <Text style={myStyle.errorMsg}>Password minimum 4 characters.</Text>
          </Animated.View>
        </View>
      
        <View style={myStyle.inpuBlock}>
          <TouchableOpacity
            style={myStyle.button}
            title="Login"
            onPress={() => {validate(username, password)}}
          ><Text style={myStyle.buttonText}>LOGIN</Text></TouchableOpacity>
        </View>
        
        <Text style={{ padding: 20, paddingTop:26, textAlign:'center'}}>
          <Text style={myStyle.textMuted}>OR</Text>
        </Text>
       
        
        <View style={myStyle.inpuBlock}>
        <View style={{ height: 10}}></View>
        <TouchableOpacity
          style={myStyle.button2}
          title="Register Now"
          onPress={() => navigation.navigate('Register')}
        ><Text style={myStyle.buttonText2}>REGISTER NOW</Text></TouchableOpacity>
      </View>
      </View>

    </View>
  )
}



export default Login;