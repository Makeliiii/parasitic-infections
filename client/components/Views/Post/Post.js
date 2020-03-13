import React, { Component } from 'react'
import { View, Image, StyleSheet } from 'react-native'

import PostItem from './components/PostItem'

class Post extends Component {
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
                console.log(data)
                this.setState({ items: data })
            })
    }

    render() {
        return (
            <View>
                
            </View>
        )
    }
}

export default Post