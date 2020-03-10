import 'react-native-gesture-handler'
import React from 'react'
import { NavigationContainer, StackActions } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Home from './components/Views/Home'
import Register from './components/Views/Home'
import Login from './components/Views/Home'

const Tab = createBottomTabNavigator()

function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="Register" component={Register} />
                <Tab.Screen name="Login" component={Login} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default App