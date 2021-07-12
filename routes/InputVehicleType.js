import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import myStyle from "../assets/Style";



const InputVehicleType = () => {
    const [data, setData] = useState([]);
  
    
    fetch('https://easymovenpick.com/api/vehicle_types.php')//wphp.hopto.org not working
        .then((response) => response.json())
        .then((json) => setData(json.types))
        .catch((error) => console.error(error));

    return (
        <Text style={myStyle.selectOutter}>
            <View style={myStyle.selectInner}>
                <RNPickerSelect 
                    placeholder={{}}
                    onValueChange={(value) => console.log(value)}
                    items={data}
                />
            </View>
        </Text>
    )
  

}



export default InputVehicleType;