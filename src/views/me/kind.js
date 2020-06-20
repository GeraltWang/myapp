import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Avatar, Icon, ListItem, Input, Button } from 'react-native-elements';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import inkind from './inkind'
import outkind from './outkind'
const Tab = createMaterialTopTabNavigator();
class kind extends Component {
    render() {
        return (
            <Tab.Navigator
                initialRouteName="inkind"
                tabBarOptions={{
                    activeTintColor: '#fff',
                    indicatorStyle:{color:'#0AC775'},
                    labelStyle: { fontSize: 16 },
                    style: { backgroundColor: '#0AC775' },
                    indicatorStyle: {backgroundColor: 'lightgray'}
                }}
            >
                <Tab.Screen
                    name="inkind"
                    component={inkind}
                    options={{ tabBarLabel: '收入' }}
                />
                <Tab.Screen
                    name="outkind"
                    component={outkind}
                    options={{ tabBarLabel: '支出' }}
                />
            </Tab.Navigator>
        );
    }
}


const styles = StyleSheet.create({
    buttoncontainer: {
        marginTop: 15,
        marginLeft: 5,
        marginRight: 5,
        height: 35,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    button: {
        color:'#fff',
        width: 140,
        backgroundColor: '#0AC775',
        
    },
    button2: {
        color:'#fff',
        width: 140,
        backgroundColor: '#F51D3F'
    }
});
export default kind;