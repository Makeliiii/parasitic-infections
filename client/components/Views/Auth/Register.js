import React, { Component } from 'react'
import { Text, View, TextInput, Button, StyleSheet, Alert } from 'react-native'

import Input from './components/Input'

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: ''
        }
    }

    onRegister = () => {
        const {
            username,
            password,
            firstName,
            lastName,
            phoneNumber,
            email
        } = this.state

        const newUser = {
            username,
            password,
            firstName,
            lastName,
            phoneNumber,
            email
        }

        fetch('http://54.174.235.204/api/users/register', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
        .then(res => {
            return res.json()
        })
        .then(data => {
            console.log(data)
            if (data.success) {
                this.props.navigation.navigate('Login')
            } else {
                console.log(data.status)
                Alert.alert(data.status)
            }
        })
        .catch(err => console.log(err))
    }

    render() {
        return (
            <View style={styles.screen}>
                <Text style={styles.text}>Register</Text>
                <TextInput
                    style={styles.input}
                    value={ this.state.username }
                    onChangeText={ username => this.setState({ username })}
                    placeholder='Username'
                />
                <TextInput
                    style={styles.input}
                    value={ this.state.firstName }
                    onChangeText={ firstName => this.setState({ firstName })}
                    placeholder='First Name'
                />
                <TextInput
                    style={styles.input}
                    value={ this.state.lastName }
                    onChangeText={ lastName => this.setState({ lastName })}
                    placeholder='Last Name'
                />
                <TextInput
                    style={styles.input}
                    value={ this.state.phoneNumber }
                    onChangeText={ phoneNumber => this.setState({ phoneNumber })}
                    placeholder='Phone Number'
                />
                <TextInput
                    style={styles.input}
                    value={ this.state.email }
                    onChangeText={ email => this.setState({ email })}
                    placeholder='Email'
                />
                <TextInput
                    style={styles.input}
                    value={ this.state.password }
                    textContentType='password'
                    secureTextEntry={ true }
                    onChangeText={ password => this.setState({ password })}
                    placeholder='Password'
                />
                <Button
                    title="Register"
                    style={styles.button}
                    onPress={ this.onRegister }
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
        marginBottom: 10,
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
        marginTop: 15,
    },
    button: {
        marginTop: 15,
        width: '90%',
    }
})

export default Register