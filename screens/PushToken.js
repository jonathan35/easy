import { Context } from './Store';
import React, { useState, useEffect, useRef, useContext } from 'react';
import { Platform } from 'react-native';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';



//------- Notification - Start --------------------
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});



async function registerForPushNotificationsAsync(driver_id) {

  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;

    let data = new FormData();
    data.append('uid', driver_id)
    data.append('token', token)

    try {
      let response = await fetch('https://easymovenpick.com/api/insert_token.php', {
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data; '
        },
        body: data
      })
        .then((response) => response.json())
        .then((json) => {
          //console.log('Success to insert token. driver_id: '+driver_id+' token: '+token);
        })
    } catch (error) {
      console.log('Failed to insert token. driver_id: '+driver_id+' token: '+token+' error: '+error);
    }
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}



export const PushToken = () => {

  const {state, dispatch } = useContext(Context);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  

  const synToken = async () => {
        
    if (state.user.id) {

      //console.log('c' + state.user.id);
      registerForPushNotificationsAsync(state.user.id).then(token => setExpoPushToken(token));

      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
      });

      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
      });

      return () => {
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
      };
      //console.log('Your expo push token:' + expoPushToken);
      
    } else {
      //console.log('no user for push token');
    }
  }


  synToken();
  

  return (
    <></>
  );
}
export default { PushToken };