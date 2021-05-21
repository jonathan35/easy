import React from 'react';
import { View, Text, Image} from 'react-native';



function Loading() {

    return (
        <View style={{ flex: 1, width: '100%', backgroundColor: '#FFA901', justifyContent: 'center'}}>
            
            <View style={{alignItems:'center'}}>
                <Image
                    style={{resizeMode: "contain", width: 120, height: 120}}
                    source={require('../assets/images/logo120x120.jpg')}
                    />
            </View>
            <Text style={{width: '100%', textAlign: 'center', color: 'white', fontSize: 16}}>
                E A S Y   D E L I V E R Y
            </Text>
            <Text style={{width: '100%', textAlign: 'center', paddingTop: 30, color: 'white', fontSize: 16}}>
                Loading..
            </Text>
    
        </View>
    )
}



export default Loading;