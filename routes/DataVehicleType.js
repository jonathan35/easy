import React, { useEffect, useState } from 'react';
import { View } from 'react-native';


const DataVehicleType = () => {

    const [data, setData] = useState([]);
  
    fetch('https://easymovenpick.com/api/vehicle_types.php')//wphp.hopto.org not working
        .then((response) => response.json())
        .then((json) => setData(json.types))
        .catch((error) => console.error(error));


    global.realTimeData = data;

    return (
        <View style={{width: 0, height: 0}}></View>
    )
  

}



export default DataVehicleType;