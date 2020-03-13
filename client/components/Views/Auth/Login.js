import React, { Component } from 'react'
import { Text, View, TextInput, Button, Alert, StyleSheet } from 'react-native'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
    }

    onLogin = () => {
        const {
            username,
            password
        } = this.state

        const loginData = {
            username,
            password
        }

        fetch('http://54.174.235.204/api/users/login', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (data.success) {
                this.props.getLoginJWT(data.token)
            } else {
                console.log(data.status)
                Alert.alert(data.status)
            }
        })
    }

    render() {
        return (
            <View style={styles.screen}>
                <Text style={styles.text}>Login</Text>
                <TextInput
                    style={styles.input}
                    value={ this.state.username }
                    onChangeText={ username => this.setState({ username })}
                    placeholder='Username'
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
                    title="Login"
                    style={styles.button}
                    onPress={ this.onLogin }
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

export default Login