import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import myStyle from "../assets/Style";

//import { DashboardComponent } from './DashboardComponent';
import { OrdersComponent } from './OrdersComponent';
import Loading from './LoadingScreen';




function HomeScreen({ navigation }) {

    const [isLoading, setLoading] = useState(false);


    return (
        
    <View style={myStyle.body}>
    {isLoading ? (
        <Loading />
    ) : (
 
        <ScrollView style={{flex:1, width:'100%'}}>
        
            <View style={{ width: '100%', }}>
                            
                            { /*
                <DashboardComponent />
             */}
                <OrdersComponent />
            </View>

        </ScrollView>
    )}

    </View>
    )
}



export default HomeScreen;

