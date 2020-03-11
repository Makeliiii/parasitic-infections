import 'react-native-gesture-handler'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Main from './components/Views/Main'
import Register from './components/Views/Auth/Register'
import Login from './components/Views/Auth/Login'

const Tab = createBottomTabNavigator()

function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen 
                    name="Main"
                >
                    {props => (
                        <Main
                            {...props}
                        />
                    )}
                </ Tab.Screen>
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
                        />
                    )}
                </Tab.Screen>
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default App