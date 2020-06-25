import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements'
import AsyncStorage from '@react-native-community/async-storage';
import { Picker } from '@react-native-community/picker';

class withdraw extends Component {
    constructor() {
        super();
        this.state = {
            account: "",
            loginstatus: false,
            outlist: [],
            paytype: 'expend',
            money: '',
            type: '',
            date: '',
            mark: '',
            key:new Date().getMilliseconds()

        }
    };
    componentDidMount() {
        this.login();
        this.showtag();
        this.unFocusListen = this.props.navigation.addListener('focus', () => {
            this.login();
            this.showtag();


        });


    }
    showtag = async () => {
        let data = await AsyncStorage.getItem("outtags");
        if (data) {
            this.setState({
                outlist: JSON.parse(data)
            });
        } else {
            this.setState({
                outlist: [
                    { name: '暂无数据请点击下方按钮添加' }
                ]
            });
        }
    };
    login = async () => {
        let na = await AsyncStorage.getItem("account");
        if (na) {
            this.setState({
                account: na,
                loginstatus: true
            });
        } else {
            this.setState({
                account: '请登录',
                loginstatus: false
            });
        }
    };
    handleChangeMoney = (value) => {
        console.log('输入的值：', value);
        this.setState({ money: value });
    }
    handleChangeDate = (value) => {
        console.log('输入的值：', value);
        this.setState({ date: value });
    }
    handleChangeMark = (value) => {
        console.log('输入的值：', value);
        this.setState({ mark: value });
    }
    submitexpend = async () => {
        let expendData = [];
        let expendpic = []
        try {
            const value = await AsyncStorage.getItem('expendData');
            const value2 = await AsyncStorage.getItem('expendpic');
            if (value !== null&&value2 !== null) {
                expendData = JSON.parse(value);
                expendpic = JSON.parse(value2)
                console.log(value);
            }
            var key=new Date()
            var kd=key.getTime()
            expendData.push({ paytype: this.state.paytype, value: this.state.money, name: this.state.type, date: this.state.date, mark: this.state.mark ,key:kd});
            expendpic.push({ value: this.state.money, name: this.state.type })
            await AsyncStorage.setItem('expendData', JSON.stringify(expendData));
            await AsyncStorage.setItem('expendpic', JSON.stringify(expendpic));
            console.log(expendData);
            Alert.alert('提示', '新增支出单成功');
        } catch (e) {
            console.log('error:', e);
        }
    }
    test = async () => {
        // const tt = await AsyncStorage.getItem('expendData');
        // console.log(tt);
        await AsyncStorage.removeItem('expendData');
        await AsyncStorage.removeItem('expendpic');

    }

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
                onChangeText={this.handleChangeMoney}
            />
            <Input
                label='类别'
                leftIcon={
                    <Icon
                        name='appstore-o'
                        type='antdesign'
                        size={24}
                        color='#8CCFE9'
                    />
                }
                rightIcon={
                    <Picker
                        selectedValue={this.state.type}
                        style={{ height: 50, width: 360, color: 'black' }}
                        mode='dropdown'
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({  type: itemValue  })

                        }
                    >
                        <Picker.Item label={'请选择'} value={'请选择'} />
                        {this.state.outlist.map((item) => <Picker.Item label={item.name} value={item.name} />)}
                    </Picker>

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
                onChangeText={this.handleChangeDate}
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
                onChangeText={this.handleChangeMark}
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
                    onPress={() => this.submitexpend()}
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
                    onPress={() => this.test()}
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