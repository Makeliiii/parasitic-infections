import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet } from 'react-native'

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

    onChangeText = (e) => {
        this.setState({ value: e.target.value })
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
                    value={ this.state.username }
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
    }
})

export default Register