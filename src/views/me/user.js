import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Avatar, Icon, Input, Button } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

class user extends Component {
    constructor() {
        super();
        this.state = {
            account: '',
            password: ''
        };

        this.handleChangeText = this.handleChangeText.bind(this);
        this.handleChangepswd = this.handleChangepswd.bind(this);
    }
    handleChangeText(value) {
        console.log('输入的值：', value);
        this.setState({ account: value });
    }
    handleChangepswd(value) {
        console.log('输入的值：', value);
        this.setState({ password: value });
    }

    render() {
        return (
            <ScrollView >
                <Text h3 style={styles.text}>
                    亲,欢迎登录
                </Text>

                <Input
                    placeholder='请输入账号'
                    inputContainerStyle={styles.input}
                    onChangeText={this.handleChangeText}
                />
                <Input
                    placeholder='请输入密码'
                    onChangeText={this.handleChangepswd}
                />
                <Button
                    title="登录"
                    buttonStyle={styles.button}
                    onPress={async () => {
                        await AsyncStorage.setItem("account", this.state.account);
                        console.log('登陆成功：', this.state.account);
                        this.props.navigation.navigate("Me");
                    }}

                />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        marginTop: 50,
        marginLeft: 10
    },
    input: {
        marginTop: 50
    },
    button: {
        width: 340,
        backgroundColor: '#0AC775',
        marginHorizontal: 35
    },
});

export default user;