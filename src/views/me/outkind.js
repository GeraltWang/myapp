import React, { Component } from 'react';
import { Text, Avatar, Icon, ListItem, Header, Button } from 'react-native-elements';
import { StyleSheet, View, ScrollView, FlatList } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import outkinddd from './outkinddd'
import addout from './addout'


const MyStack = createStackNavigator();
class outkind extends Component {

    render() {
        return (
            <MyStack.Navigator initialRouteName="outinddd">
                <MyStack.Screen name="outkinddd" component={outkinddd} options={{ headerShown: false }} />
                <MyStack.Screen name="添加支出类别" component={addout} options={{ headerShown: false }} />
            </MyStack.Navigator>
        );
    }
}

const styles = StyleSheet.create({
    bbox: {
        height: 100,
        alignItems: 'center',
        flexDirection: 'row'
    },
    button: {
        width: 340,
        backgroundColor: '#0AC775',
        marginHorizontal: 35,


    },
});

export default outkind;