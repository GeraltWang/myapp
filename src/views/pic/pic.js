import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Avatar, Icon, ListItem, Header } from 'react-native-elements';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SplashScreen from 'react-native-splash-screen'
import depositpic from './depositpic'
import withdrawpic from './withdrawpic'


const Tab = createMaterialTopTabNavigator();

class pic extends Component {
    componentDidMount() {
        SplashScreen.hide();
    }
    render() {
        return (
            <Tab.Navigator
                initialRouteName="depositpic"
                tabBarOptions={{
                    activeTintColor: '#fff',
                    indicatorStyle: { color: '#0AC775' },
                    labelStyle: { fontSize: 16 },
                    style: { backgroundColor: '#0AC775' },
                    indicatorStyle: {backgroundColor: 'lightgray'}
                }}
            >
                <Tab.Screen
                    name="depositpic"
                    component={depositpic}
                    options={{ tabBarLabel: '收入' }}
                />
                <Tab.Screen
                    name="withdrawpic"
                    component={withdrawpic}
                    options={{ tabBarLabel: '支出' }}
                />

            </Tab.Navigator>
        );
    }
}

export default pic;