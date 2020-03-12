import React from 'react'
import { Text, View, Image, Button } from 'react-native';

function Main() {
    return (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Image 
                style={{ width: 256, height: 256, marginTop: '25%' }}
                source={{ uri: 'https://agony.s-ul.eu/6RLsganS' }}
            />
        </View>
    )
}

export default Main