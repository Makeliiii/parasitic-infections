import React, { Component } from 'react'
import { Text, View, TextInput, Button, StyleSheet } from 'react-native'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
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

export default Login