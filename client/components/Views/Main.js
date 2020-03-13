import React, { Component } from 'react'
import { Text, View, ScrollView, Image, Button } from 'react-native'

import Post from './Post/Post'

class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: []
        }
    }

    componentDidMount() {
        fetch('http://54.174.235.204/api/items/get')
            .then(res => res.json())
            .then(data => {
                this.setState({ items: data.items })
            })
    }

    render() {
        return (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <ScrollView style={{ width: '100%' }}>
                <Image 
                    style={{ width: 128, height: 128, marginBottom: '10%', marginTop: '25%', alignSelf: 'center' }}
                    source={{ uri: 'https://agony.s-ul.eu/6RLsganS' }}
                />
                <Post items={ this.state.items } />
                <Button
                    title='Logout'
                    onPress={ this.props.logout }
                />
                </ScrollView>
            </View>
        )
    }
}

export default Main