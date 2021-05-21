import React from 'react';
import { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';



export const Header = ({ title }) => {

    //const { state, dispatch } = useContext(Context);
    
    const [subTitle, setSubTitle] = useState('');
    

    return (
        <View style={{}}>
            <TouchableOpacity
                onPress={() => {setSubTitle('New')}}
            >
                
                <Text style={{ fontSize: 18, fontWeight: 'bold', }}>
                   
                        <Image
                        style={{resizeMode: "contain"}}
                        source={require('../assets/images/menu.png')}
                        />
                  
                    <Text style={{}}>  {title} {subTitle}</Text>
                </Text>
            </TouchableOpacity>
        </View>
    )


}
    
export default { Header };