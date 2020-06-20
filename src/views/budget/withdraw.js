import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Input, Icon,Button } from 'react-native-elements'

class withdraw extends Component {
    render() {
        return (
            <ScrollView>
                <Input
                    placeholder='请输入金额'
                    label='金额'
                    leftIcon={
                        <Icon
                            name='bank'
                            type='antdesign'
                            size={24}
                            color='gold'
                        />
                    }
                />
                <Input
                    placeholder='请选择类别'
                    label='类别'
                    leftIcon={
                        <Icon
                            name='appstore-o'
                            type='antdesign'
                            size={24}
                            color='#8CCFE9'
                        />
                    }
                />
                <Input
                    placeholder='请输入日期'
                    label='日期'
                    leftIcon={
                        <Icon
                            name='calendar'
                            type='antdesign'
                            size={24}
                            color='#E7A1AC'
                        />
                    }
                />
                <Input
                    placeholder='备注'
                    label='说明'
                    leftIcon={
                        <Icon
                            name='form'
                            type='antdesign'
                            size={24}
                            color='#F73957'
                        />
                    }
                />
                <View style={styles.buttoncontainer}>
                    <Button
                        icon={
                            <Icon
                                name="check"
                                type='antdesign'
                                size={15}
                                color="white"
                            />
                        }
                        title="确定"
                        buttonStyle={styles.button}
                    />
                    <Button
                        icon={
                            <Icon
                                name="sync"
                                type='antdesign'
                                size={15}
                                color="white"
                            />
                        }
                        title="取消"
                        buttonStyle={styles.button2}
                    />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    buttoncontainer: {
        marginTop: 15,
        marginLeft: 5,
        marginRight: 5,
        height: 84,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    button: {
        marginLeft: 20,
        marginRight: 20,
        width: 140,
        backgroundColor: '#0AC775'
    },
    button2: {
        marginLeft: 20,
        marginRight: 20,
        width: 140,
        backgroundColor: '#F51D3F'
    }
});
export default withdraw;