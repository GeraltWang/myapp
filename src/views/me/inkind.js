import React, { Component } from 'react';
import { Text, Avatar, Icon, ListItem, Header, Button } from 'react-native-elements';
import { StyleSheet, View, ScrollView, FlatList } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import addin from './addin'
import inkinddd from './inkinddd'

const MyStack = createStackNavigator();
class inkind extends Component {
   
    render() {
        return (

            <MyStack.Navigator initialRouteName="inkinddd">
                <MyStack.Screen name="inkinddd" component={inkinddd} options={{ headerShown: false }} />
                <MyStack.Screen name="添加收入类别" component={addin} options={{ headerShown: false }} />
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
export default inkind;