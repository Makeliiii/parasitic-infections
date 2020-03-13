import React, { Component } from 'react'
import { View, StyleSheet, TextInput, Button, Text, Alert } from 'react-native'
import * as SecureStore from 'expo-secure-store'

class CreatePost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description: '',
            category: '',
            country: '',
            city: '',
            price: '',
            token: this.props.token
        }
    }

    onPost = () => {
        const {
            title,
            description,
            category,
            country,
            city,
            price
        } = this.state

        const newItem = {
            title,
            description,
            category,
            country,
            city,
            price
        }

        console.log(this.state.token)

        fetch('http://54.174.235.204/api/items/add', {
            method: 'post',
            mode: 'cors',
            headers: new Headers({
                Authorization: 'Bearer ' + this.state.token,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify(newItem)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (data.success) {
                this.props.navigation.navigate('Main')
            } else {
                Alert.alert('Something went wrong')
            }
        })
        .catch(err => console.log(err))
    }

    render() {
        return (
            <View style={styles.screen}>
                <Text style={styles.text}>Create a posting</Text>
                <TextInput
                    style={styles.input}
                    value={ this.state.title }
                    onChangeText={ title => this.setState({ title })}
                    placeholder='Title'
                />
                <TextInput
                    style={styles.input}
                    value={ this.state.description }
                    onChangeText={ description => this.setState({ description })}
                    placeholder='Description'
                />
                <TextInput
                    style={styles.input}
                    value={ this.state.category }
                    onChangeText={ category => this.setState({ category })}
                    placeholder='Category'
                />
                <TextInput
                    style={styles.input}
                    value={ this.state.country }
                    onChangeText={ country => this.setState({ country })}
                    placeholder='Country'
                />
                <TextInput
                    style={styles.input}
                    value={ this.state.city }
                    onChangeText={ city => this.setState({ city })}
                    placeholder='City'
                />
                <TextInput
                    style={styles.input}
                    value={ this.state.price }
                    onChangeText={ price => this.setState({ price })}
                    placeholder='Price'
                />
                <Button
                    title="Post item"
                    onPress={ this.onPost }
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    screen: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '25%'
    },
    text: {
        marginBottom: 25,
        fontSize: 26,

    },
    input: {
        borderWidth: 1,
        borderRadius: 2,
        height: 40,
        width: '90%',
        backgroundColor: 'white',
        textAlign: 'center',
        fontSize: 16,
        marginBottom: 15,
    }
})

export default CreatePost