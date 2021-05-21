import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

const Fetcher = () => {
  
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
    <View style={{ flex: 1, padding: 24 }}>
      <Text>Sample here</Text>
      {isLoading ? (
        <ActivityIndicator /> 
        ) : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <Text>
              {item.id},
              {item.vehicle_type}
            </Text>
          )}
        />
      )}
    </View>
  );
};

export default Fetcher;