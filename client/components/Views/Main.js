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
        this.getItemsAllItems()
    }

    getItemsAllItems = () => {
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
                <Post items={ this.state.items } />
                {
                    this.props.token === null ? 
                    <></> : 
                    <Button
                        title='Logout'
                        onPress={ this.props.logout }
                    /> 
                }
                </ScrollView>
            </View>
        )
    }
}

export default Main