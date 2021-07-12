import React, { useState, useEffect } from 'react';
import { Button, Image, View, Text, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImagePickerExample() {


    const [postMsg, setPostMsg] = useState(null);
    const [image, setImage] = useState(null);
    const name = 'Jon';

    
    //----------------------Api post Application - Start ----------------------    
    async function applyApi() {

        const fileToUpload = image;
        const data = new FormData();
        data.append('name', 'Image Upload');
        data.append('file_attachment', fileToUpload);
        
        try {
          let response = await fetch('https://easymovenpick.com/images/driver_photos', {
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data; '
                //'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: data
          })
          .then((response) => response.json())
          .then((json) => {//JSON.stringify
            //if (json.status == 1) {
                setPostMsg('Upload Successful');
            //}
          })
        } catch (error) {
          setPostMsg('Failed to 3.');
          //console.error(error);
        }
    };
    //----------------------Api post Application - End ----------------------

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
          {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
          
          <Text>image: {image}</Text>
          <Text>post: {postMsg}</Text>
          <Button title="POST" onPress={applyApi} />
          
    </View>
  );
}
