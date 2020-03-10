import React from 'react'
import { Text, View, Image, Button } from 'react-native';

function Main() {
    return (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Image 
                style={{ width: 256, height: 256, }}
                source={require('../../img/logo.png')}
            />
        </View>
    )
}

export default Main