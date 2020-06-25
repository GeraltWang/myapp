import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert, TextInput } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements'
import AsyncStorage from '@react-native-community/async-storage';
import { Picker } from '@react-native-community/picker';
import picker from 'react-native-picker';

class deposit extends Component {
    constructor() {
        super();
        this.state = {
            account: "",
            loginstatus: false,
            inlist: [],
            paytype: 'income',
            value: '',
            name: '',
            date: '',
            mark: '',
            key: new Date().getMilliseconds()

        };
    }
    componentDidMount() {
        this.login();
        this.showtag();
        this.unFocusListen = this.props.navigation.addListener('focus', () => {
            this.login();
            this.showtag();


        });


    }
    showtag = async () => {
        let data = await AsyncStorage.getItem("tags");
        if (data) {
            this.setState({
                inlist: JSON.parse(data)
            });
        } else {
            this.setState({
                inlist: [
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
        this.setState({ value: value });
    }
    handleChangeDate = (value) => {
        console.log('输入的值：', value);
        this.setState({ date: value });
    }
    handleChangeMark = (value) => {
        console.log('输入的值：', value);
        this.setState({ mark: value });
    }
    submitincome = async () => {
        let incomeData = [];
        let incomepic = []
        try {
            const value = await AsyncStorage.getItem('incomeData');
            const value2 = await AsyncStorage.getItem('incomepic');
            if (value !== null && value2 !== null) {
                incomeData = JSON.parse(value);
                incomepic = JSON.parse(value2)
                console.log(value);
            }
            var key = new Date()
            var kd = key.getTime()
            incomeData.push({ paytype: this.state.paytype, value: this.state.value, name: this.state.name, date: this.state.date, mark: this.state.mark, key: kd });
            incomepic.push({ value: this.state.value, name: this.state.name })
            await AsyncStorage.setItem('incomeData', JSON.stringify(incomeData));
            await AsyncStorage.setItem('incomepic', JSON.stringify(incomepic));
            console.log(incomeData);
            console.log(incomepic);
            Alert.alert('提示', '新增收入单成功');
        } catch (e) {
            console.log('error:', e);
        }
    }
    test = async () => {
        // const tt = await AsyncStorage.getItem('incomeData');
        // console.log(tt);
        await AsyncStorage.removeItem('incomeData');
        await AsyncStorage.removeItem('incomepic');

    }
    selectPicker = () => {
        let data = []
        var currDate = new Date()
        var year = currDate.getFullYear()
        let dateyear = []
        for (let i = 2018; i <= year; i++) {
            dateyear.push(i)
        }
        let dateday=[]
        for(let i=31; i>0; i--){
            dateday.push(i)
        }
        data = [
            dateyear,
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            dateday
        ]
        picker.init({
            pickerData: data,
            selectedValue: [2020, 6],
            pickerConfirmBtnText: '确定',
            pickerCancelBtnText: '取消',
            pickerTitleText: '请选择',
            onPickerConfirm: data => {if(data[1]<10)
                {var d='0'+data[1]
                this.setState({ date: data[0] + '-' + d +'-'+data[2]})
                
            }
                

            },
            onPickerCancel: () => {
                console.log('取消');
            }
        });

        picker.show();
    }
    render() {
        return (
            <ScrollView>
                <Input
                    keyboardType='number-pad'

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
                            selectedValue={this.state.name}
                            style={{ height: 50, width: 360, color: 'black' }}
                            mode='dropdown'
                            onValueChange={(itemValue, itemIndex) =>
                                // this.setState({ type: itemValue }depositdata: {...depositdata, type:itemValue})
                                this.setState({ name: itemValue })

                            }
                        >
                            <Picker.Item label={'请选择'} value={'请选择'} />
                            {this.state.inlist.map((item) => <Picker.Item label={item.name} value={item.name} />)}
                        </Picker>

                    }
                />
                <Input
                    onFocus={this.selectPicker}
                    value={this.state.date}
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
                        onPress={() => this.submitincome()}
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
export default deposit;