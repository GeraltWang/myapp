import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Avatar, Icon, ListItem, Header } from 'react-native-elements';

class Discovery extends Component {
    constructor() {
        super();
        this.toScreen = this.toScreen.bind(this);
    }

    toScreen(routeName) {
        this.props.navigation.navigate(routeName);
    }
    
    render() {
        return (
            <View>
                <Header
                    placement="center"
                    centerComponent={{ text: '发现', style: { color: '#fff', fontSize: 20 } }}
                    backgroundColor='#0AC775'
                />
                <ScrollView>
                    <ListItem title="账单" chevron bottomDivider 
                    leftIcon={{ name: 'barschart', type: "antdesign", color: '#F5DE19' }} 
                    onPress={() => this.toScreen('账单')}/>
                </ScrollView>
                <View style={styles.flex}>
                    <View style={styles.containertop}>
                        <View style={[styles.item, styles.center]}>
                            <Icon
                                name='trademark'
                                type='antdesign'
                                color='#3198F0'
                                onPress={() => console.log('hello')} />
                            <Text style={styles.font}>二手交易</Text>
                        </View>
                        <View style={[styles.item, styles.center]}>
                            <Icon
                                name='car'
                                type='antdesign'
                                color='#f50'
                                onPress={() => console.log('hello')} />
                            <Text style={styles.font}>二手车</Text>
                        </View>
                        <View style={[styles.item, styles.center]}>
                            <Icon
                                name='pets'
                                type='material'
                                color='#0AC775'
                                onPress={() => console.log('hello')} />
                            <Text style={styles.font}>宠物</Text>
                        </View>
                        <View style={[styles.item, styles.center]}>
                            <Icon
                                name='home'
                                type='antdesign'
                                color='#0AC775'
                                onPress={() => console.log('hello')} />
                            <Text style={styles.font}>家政</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#0AC775',
    },
    containertop: {
        marginTop: 15,
        marginLeft: 5,
        marginRight: 5,
        height: 84,
        flexDirection: 'row',
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    item: {
        flex: 1,
        height: 80,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    flex: {
        flex: 1
    },
    font: {
        color: 'black',
        fontSize: 16,
        marginTop: 13

    }
});

export default Discovery;