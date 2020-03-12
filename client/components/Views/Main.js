import React, { Component } from 'react'
import { Text, View, Image, Button } from 'react-native';

class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Image 
                    style={{ width: 256, height: 256, marginTop: '25%' }}
                    source={{ uri: 'https://agony.s-ul.eu/6RLsganS' }}
                />
                <Button
                    title='Logout'
                    onPress={ this.props.logout }
                />
            </View>
        )
    }
}

export default Main