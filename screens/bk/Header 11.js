import React, { useState, useContext} from 'react';
import { View, Text, Image, Pressable, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Context } from './Store';
import { useNavigation } from '@react-navigation/native';



function Header({ title }) {

  const navigation = Navigation();
  const { state, dispatch } = useContext(Context);
  const [menuModalVisible, setMenuModalVisible] = useState(false);

  function closeMenu(sta) {
      if(sta = true){
          setMenuModalVisible(!menuModalVisible)
      }
  }


  return (
    <View>
        
      <TouchableOpacity
      style={styles.burger}
      onPress={() => setMenuModalVisible(true)}>
        <Text style={{ height: '100%'}}>
            <Image
            style={{resizeMode: "contain"}}
            source={require('../assets/images/menudot-28.png')}
            />
            <Text style={styles.title}>
                {title}
            </Text>
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        onPress={() => navigation.navigate('LoginScreen')}
        style={styles.nav}>
        <Text style={styles.navText}>XXXX</Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={menuModalVisible}
        onRequestClose={() => {
          setMenuModalVisible(!menuModalVisible);
        }}
      >
          
        <View style={styles.centeredView}>
          <View style={styles.modalContainer}
            onPress={() => closeMenu(false)}>
        
            <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={() => closeMenu(true)}>
            <Image
            style={{resizeMode: "contain"}}
            source={require('../assets/images/close-32.png')}
            /></TouchableOpacity>
            
            
            <View style={styles.modalContent} onPress={() => closeMenu(false)}>
                
                {state.userToken == null ? (
                    // No token found, user isn't signed in
                    <>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('LoginScreen')}
                        style={styles.nav}>
                        <Text style={styles.navText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                            onPress={() => { }}
                        style={styles.nav}>
                        <Text style={styles.navText}>Register Z</Text>
                    </TouchableOpacity>
                        
                    </>
                ) : (
                    // User is signed in
                    <>
                    <TouchableOpacity
                        //onPress={() => navigation.navigate('HomeScreen')}
                        style={styles.nav}>
                        <Text style={styles.navText}>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('LogoutScreen')}
                        style={styles.nav}>
                        <Text style={styles.navText}>Logout</Text>
                    </TouchableOpacity>


                    </>
                )}


                
            </View>
          </View>
        </View>
            
      </Modal>
        



    </View>
  )
}


export default Header;



const styles = StyleSheet.create({
    
  title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'black',
  },
  burger: {
      /*
      borderColor: 'orange',
      borderWidth: 1,
      
      backgroundColor: 'orange',
      borderRadius: 25,
      
      paddingHorizontal: 10,
      paddingVertical: 7,*/
      
      height: 40,
      justifyContent: 'flex-start',
  },
  myPadding: {
      paddingLeft: 44,

  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContainer: {
      
      width: '80%',
      backgroundColor: "white",
    alignItems: "center",
    
  },
  modalContent: {
      width: '100%',
      overflow: 'scroll',
      marginBottom: 20,
      borderBottomWidth: 1,
      borderColor: '#CCC',
  },
  nav: {
      width: '100%',
      padding: 10,
      borderColor: '#CCC',
      borderTopWidth: 1,
  },
  navText: {
      fontSize: 16,
      textAlign: 'center',
  },
  button: {
    borderRadius: 0,
    padding: 10,
    //elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
      backgroundColor: "#ff9d96",
      alignSelf: 'flex-start',
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
