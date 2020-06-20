import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Me from './Me'
import user from './user'
import kind from './kind'

const MyStack = createStackNavigator();
class My extends Component {
    render() {
        return (
            <MyStack.Navigator initialRouteName="Me">
                <MyStack.Screen name="Me" component={Me} options={{ headerShown: false }} />
                <MyStack.Screen name="登录" component={user} options={{ headerShown: true }} />
                <MyStack.Screen name="类别设置" component={kind} options={{ headerShown: true }} />
            </MyStack.Navigator>
        );
    }
}




export default My;