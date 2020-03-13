import 'react-native-gesture-handler'
import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import * as SecureStore from 'expo-secure-store'

import Register from './components/Views/Auth/Register'
import Login from './components/Views/Auth/Login'
import Loading from './components/Loading'

import Main from './components/Views/Main'
import CreatePost from './components/Views/Post/CreatePost'

const tokenName = 'JWT'
const Tab = createBottomTabNavigator()

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            token: null,
            isChecking: true
        }
    }

    componentDidMount() {
        SecureStore.getItemAsync(tokenName)
            .then(res => {
                this.setState({ token: res, isChecking: false })
            })
            .catch(err => console.log(err))
    }

    getLoginJWT = token => {
        SecureStore.setItemAsync(tokenName, token)
            .then(res => {
                this.setState({ token, isChecking: false })
            })
            .catch(err => console.log(err))
    }

    logout = () => {
        this.setState({ token: null })
        SecureStore.deleteItemAsync(tokenName)
    }

    auth = () => {
        return (
            <>
                <Tab.Screen
                    name="Register"
                >
                    {props => (
                        <Register
                            {...props}
                        />
                    )}
                </Tab.Screen>
                <Tab.Screen
                    name="Login"
                >
                    {props => (
                        <Login
                            {...props}
                            getLoginJWT={ this.getLoginJWT }
                        />
                    )}
                </Tab.Screen>
            </>
        )
    }

    main = () => {
        return (
            <>
                <Tab.Screen 
                    name="Main"
                >
                    {props => (
                        <Main
                            {...props}
                            logout={ this.logout }
                        />
                    )}
                </ Tab.Screen>
                <Tab.Screen 
                    name="CreatePost"
                >
                    {props => (
                        <CreatePost
                            {...props}
                        />
                    )}
                </ Tab.Screen>
            </>
        )
    }

    logic = () => {
        const { isChecking, token } = this.state

        if (isChecking) {
            return <Tab.Screen name="Loading" component={ Loading } />
        } else {
            if (token != null) {
                return this.main()
            } else {
                return this.auth()
            }
        }
    }

    render() {
        return (
            <NavigationContainer>
                <Tab.Navigator>
                    { this.logic() }
                </Tab.Navigator>
            </NavigationContainer>
        )
    }
}

export default App