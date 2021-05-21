import React, { useState, useEffect, useContext } from 'react';
import { TouchableOpacity, Image, View, Text, Platform, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Context } from './Store';




export const fileUploading = async (type, username_oid, files) => {
    
    //const { state, dispatch } = useContext(Context);//Cause invalid hook

    if (username_oid) {

        let data = new FormData();
        data.append('submit', 'ok')
        if (type == 'pod') {
            data.append('oid', username_oid)
        }else{
            data.append('username', username_oid)
        }

        Object.keys(files).forEach(function(key) {
            if (files[key]) {
                data.append(key, { type: 'image/jpg', uri: files[key], name: 'uploadimage.jpg' })
            }
        });

        console.log('fileUploading>>>>: ' + JSON.stringify(data));
        
        try {
            let response = await fetch('https://mingmingtravel.com/easyapi/api/post_photo.php', {
                method: 'post',
                headers: {
                    'Content-Type': 'multipart/form-data; '
                },
                body: data
            })
            .then((response) => response.json())
                .then((json) => {
                //console.log(json.message);
                
            })
        } catch (error) {
            console.log('Failed to upload.');
        }
    } else {
        console.log('Upload requirement not met.');
    }
};



export const ImagePickLibrary = ({ store_target }) => {

    const { state, dispatch } = useContext(Context);
    const [image, setImage] = useState(state.photoPod);//null
    const [width, setWidth] = useState(300);
    const [height, setHeight] = useState(300);
    
    
    useEffect(() => {
          
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need media access permissions to make this work!');
                }
            }
        })();
            
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestCameraPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera permissions to make this work!');
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

        dispatch({ type: store_target, value: result.uri });
        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
            setHeight(result.height);
            setWidth(result.width);
        }
    };


    const pickCamera = async () => {
        
        let result = await ImagePicker.launchCameraAsync({
            quality: 0.2
        });

        dispatch({ type: store_target, value: result.uri });
        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
            setHeight(result.height);
            setWidth(result.width);
        }
    };


        
    return (
        <View>
        {store_target == 'SET_POD' ? (
           
            <TouchableOpacity
                onPress={pickCamera}
                style={{ paddingVertical: 14, borderColor: '#999', borderWidth:1, backgroundColor: '#CCC' }}>
                <Text style={{textAlign: 'center'}}>
                    <Image source={require('../assets/images/camera-16.png')}/>
                    <Text style={{ fontSize: 14, color: '#333' }}> PROOF OF DELIVERY</Text>
                </Text>
            </TouchableOpacity>
            
        ) : (
            
            <TouchableOpacity
                onPress={pickImage} 
                style={{ padding: 6, paddingBottom:9, borderColor: '#CCC', borderWidth:1, backgroundColor: '#EFEFEF' }}>
                <Text>
                    <Image source={require('../assets/images/folder20x20.png')}/>
                    <Text style={{ fontSize: 16, color: '#999' }}> Choose Photo</Text>
                </Text>
            </TouchableOpacity>
            
        )}
        
        {image && <Image source={{ uri: image }} style={{ resizeMode: "contain", width: '100%', height: (height * (Dimensions.get('window').width*1.1) / width )}} />}
        
        
        
                    
    </View>
    );
}
export default { ImagePickLibrary, fileUploading};
