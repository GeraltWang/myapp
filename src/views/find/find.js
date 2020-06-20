import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Discovery from './Discovery'
import bills from './bills'

const MyStack = createStackNavigator();
class find extends Component {
    render() {
        return (
            <MyStack.Navigator initialRouteName="发现">
                <MyStack.Screen name="发现" component={Discovery} options={{ headerShown: false }} />
                <MyStack.Screen name="账单" component={bills} options={{ headerShown: true }} />
            </MyStack.Navigator>
        );
    }
}

export default find;