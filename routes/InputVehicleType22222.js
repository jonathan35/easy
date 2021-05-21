import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet } from 'react-native';


import RNPickerSelect from 'react-native-picker-select';


const pickerStyle = {

};



const InputVehicleType = () => {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    
    useEffect(() => {
      fetch('https://mingmingtravel.com/easyapi/api/vehicle_types.php')//wphp.hopto.org not working
        .then((response) => response.json())
        .then((json) => setData(json.types))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }, []);


    return (
        <RNPickerSelect style={styles.inputAndroid}
            onValueChange={(value) => console.log(value)}
            items={[
                { label: 'Football', value: 'football' },
                { label: 'Baseball', value: 'baseball' },
                { label: 'Hockey', value: 'hockey' },
            ]}
        />
    );
    return (
<View style={styles.inputAndroid}><Text>123</Text></View>
    )
        
    
    

}



const styles = StyleSheet.create({
    asdasd: {
        flex: 1,
        borderColor: 'black',
        borderWidth: 1,
        color: 'red'
    },

    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
        borderColor: 'black',
        borderWidth: 1,
        color: 'red'
    },
});

export default InputVehicleType;