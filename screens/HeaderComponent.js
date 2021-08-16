import React, { useState, useContext, useEffect} from 'react';
import { View, Text, Image, Pressable, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Context } from './Store';
import { useNavigation } from '@react-navigation/native';



function HeaderComponent({ title }) {


  const navigation = useNavigation();
  const { state, dispatch } = useContext(Context);
  const [menuModalVisible, setMenuModalVisible] = useState(false);

  
  return (
    <View>
      <View style={styles.header}>
        {/*<TouchableOpacity
          style={styles.burger}
          onPress={() => setMenuModalVisible(!menuModalVisible)}>
              <Image
              style={{resizeMode: "contain"}}
              source={require('../assets/images/menudot-28.png')}
              />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text> */}

        {state.userToken && (

          <View style={{ flex: 9, flexDirection: 'row'}}>
            
            <TouchableOpacity
              onPress={() => navigation.navigate('Home')}
              style={styles.headerCol}>
              <Image
                style={{ resizeMode: "contain", top:3 }}
                source={require('../assets/images/home-20.png')} />
            </TouchableOpacity>
    
            <TouchableOpacity
              onPress={() => navigation.navigate('OrdersStatement')}
              style={styles.headerCol}>
              <Image
                style={{ resizeMode: "contain", top: 4 }}
                source={require('../assets/images/list-20.png')} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('CommissionStatement')}
              style={styles.headerCol}>
              <Image
                style={{ resizeMode: "contain", top:3}}
                source={require('../assets/images/wallet-20.png')} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('MeritStatement')}
              style={styles.headerCol}>
              <Image
                style={{ resizeMode: "contain" }}
                source={require('../assets/images/merit-24.png')} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Notification')}
              style={styles.headerCol}>
              <Image
                style={{ resizeMode: "contain", top:2 }}
                source={require('../assets/images/notification-20.png')} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setMenuModalVisible(!menuModalVisible)}
              style={styles.headerCol}>
              <Image
                style={{ resizeMode: "contain", top: 4 }}
                source={require('../assets/images/out-16.png')} />
            </TouchableOpacity>

          </View>
        )}
      </View>
      
      <Modal
        style={{zIndex:99}}
        animationType="fade"
        transparent={true}
        visible={menuModalVisible}
        onRequestClose={() => {
          setMenuModalVisible(!menuModalVisible);
        }}
      >
          
        <View style={styles.centeredView}>
          <View style={styles.modalContainer}>
        
            <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={() => setMenuModalVisible(!menuModalVisible)}>
            <Image
            style={{resizeMode: "contain"}}
            source={require('../assets/images/close-32.png')}
            /></TouchableOpacity>
            
            
            <View style={styles.modalContent}>
              {/*
                {state.userToken == null ? (
                    // No token found, user isn't signed in
                  <>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Register')}
                      style={styles.nav}>
                      <Text style={styles.navText}>REGISTER</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Login')}
                      style={styles.nav}>
                      <Text style={styles.navText}>Login</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                    // User is signed in
                    <>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Home')}
                        style={styles.nav}>
                        <Text style={styles.navText}>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('CommissionStatement')}
                        style={styles.nav}>
                        <Text style={styles.navText}>Commission</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('MeritStatement')}
                        style={styles.nav}>
                        <Text style={styles.navText}>Merit</Text>
                    </TouchableOpacity>*/}
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Logout')}
                        style={styles.nav}>
                        <Text style={styles.navText}>Logout</Text>
                    </TouchableOpacity>
{/*
                    </>
                )}
                */}
            </View>
          </View>
        </View>
            
      </Modal>
      



    </View>
  )    
    
    
}


export default HeaderComponent;



const styles = StyleSheet.create({
  headerCol: {
    flex: 1,
    alignItems:'center',
  },
  header: {
    flexDirection: 'row'
  },
  burger: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    flex: 9,
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    paddingLeft:10,
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
