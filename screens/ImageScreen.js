import React, { useState, useEffect } from 'react';
import { Button, Image, View, Text, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';


export default function ImageComponent() {

  const [image, setImage] = useState(null);
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(200);
  const [postMsg, setPostMsg] = useState(null);
    


  async function applyApi() {
  
    const image_uri = image;
    let data = new FormData();
    data.append('submit', 'ok');
    data.append('file', {type:'image/jpg', uri:image_uri, name:'uploadimage.jpg'})

      try {
        let response = await fetch('https://easymovenpick.com/api/post_photo.php', {
          method: 'post',
          headers: {
            'Content-Type': 'multipart/form-data; '
          },
          body: data
        })
        .then((response) => response.json())
          .then((json) => {
            setPostMsg(json.application.message);
          })
      } catch (error) {
        setPostMsg('Failed to submit.');
        console.error(error);
      }
  };
  

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
      //allowsEditing: true,
      //aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      setHeight(result.height);
      setWidth(result.width);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Choose Photo" onPress={pickImage} />
          {image && <Image source={{ uri: image }} style={{ resizeMode: "contain", width: 300, height: (300/width*height) }} />}
          
      <Text>image: {image}</Text>
      <Text>post: {postMsg}</Text>
      <Button title="POST" onPress={applyApi} />
    </View>
  );
}
