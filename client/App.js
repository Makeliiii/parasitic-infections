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
            <Tab.Navigator style={{ position: 'absolute' }}>
                <Tab.Screen name="Home" component={Main} />
                <Tab.Screen name="Register" component={Register} />
                <Tab.Screen name="Login" component={Login} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default App