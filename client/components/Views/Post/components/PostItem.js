import React, { Component } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'

class PostItem extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <View>
                <Image
                    source={{ uri: this.props.imgURI }}
                />
                <Text>
                    { this.props.title }
                </Text>
                <Text>
                    { this.props.description }
                </Text>
                <Text>
                    { this.props.location }
                </Text>
                <Text>
                    { this.props.price }
                </Text>
            </View>
        )
    }
}

export default PostItem