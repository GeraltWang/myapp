import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Avatar, Icon, ListItem, Header } from 'react-native-elements';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import deposit from './deposit'
import withdraw from './withdraw'


const Tab = createMaterialTopTabNavigator();

class budget extends Component {
    render() {
        return (
            <Tab.Navigator
                initialRouteName="deposit"
                tabBarOptions={{
                    activeTintColor: '#fff',
                    indicatorStyle: { color: '#0AC775' },
                    labelStyle: { fontSize: 16 },
                    style: { backgroundColor: '#0AC775' },
                    indicatorStyle: {backgroundColor: 'lightgray'}
                }}
            >
                <Tab.Screen
                    name="deposit"
                    component={deposit}
                    options={{ tabBarLabel: '收入' }}
                />
                <Tab.Screen
                    name="withdraw"
                    component={withdraw}
                    options={{ tabBarLabel: '支出' }}
                />

            </Tab.Navigator>
        );
    }
}

export default budget;