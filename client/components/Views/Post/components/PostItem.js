import React, { Component } from 'react'
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native'

class PostItem extends Component {
    render() {
        return (
            <TouchableOpacity onPress={this.props.displayItem} style={styles.screen}>
                <Image
                    source={{ uri: this.props.imgURI }}
                />
                <Text style={styles.title}>
                    { this.props.title }
                </Text>
                <Text>
                    { this.props.description }
                </Text>
                <Text>
                    { this.props.country }
                </Text>
                <Text>
                    { this.props.city }
                </Text>
                <Text>
                    { this.props.price + '€' }
                </Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    screen: {
        width: '25%',
        margin: 5,
        borderRadius: 1,
        borderWidth: 0.5,
        borderColor: 'black'
    },
    title: {
        marginBottom: 2,
        fontSize: 18,
        fontWeight: 'bold',
    }
})

export default PostItem