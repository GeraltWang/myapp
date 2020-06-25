import React, { Component } from 'react';
import { Text, Avatar, Icon, ListItem, Header } from 'react-native-elements';
import { StyleSheet, View, ScrollView, Button, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import Picker from 'react-native-picker';
import Swipeout from 'react-native-swipeout';
import AsyncStorage from '@react-native-community/async-storage';
class detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            year: this._getyear(),
            month: this._getmonth(),
            income: 0,
            expend: 0,
            loginstatus: false,
            bill: ''
        }
    }
    componentDidMount() {
        this.login();
        this.data();
        this.unFocusListen = this.props.navigation.addListener('focus', () => {
            this.login();
            this.data();
        });
    }
    _getyear() {
        var currDate = new Date()
        var year = currDate.getFullYear()
        return year
    }
    _getmonth() {
        var currDate = new Date()
        var year = currDate.getMonth() + 1
        return year
    }
    login = async () => {
        let na = await AsyncStorage.getItem("account");
        console.log(na);
        if (na) {
            this.setState({
                loginstatus: true
            });
        } else {
            this.setState({
                loginstatus: false
            });
        }
    };
    data = async () => {
        try {
            let income = await AsyncStorage.getItem("incomeData");
            let expend = await AsyncStorage.getItem("expendData")
            let ii = JSON.parse(income)
            let ee = JSON.parse(expend)
            let monthdata = ii.concat(ee)
            let allpay = 0
            let allincome = 0
            console.log(monthdata);
            if (this.state.month < 10) {
                var list = this.state.year + '-0' + this.state.month
            }
            var a = monthdata.filter(x => {
                if (x.date.substring(0, 7) == list) {
                    console.log(x, 123)
                    return x
                }
            })
            a.filter(x => {
                if (x.paytype == 'income') {
                    allpay += Number(x.value)
                } else {
                    allincome += Number(x.value)
                }
            })
            console.log(allincome)
            this.setState({ bill: a })
            this.setState({ expend: allincome })
            this.setState({ income: allpay })
        } catch (e) {
            console.log('error:', e);
        }

    }
    selectPicker = () => {
        let data = []
        var currDate = new Date()
        var year = currDate.getFullYear()
        let dateyear = []
        for (let i = 2018; i <= year; i++) {
            dateyear.push(i)
        }
        data = [
            dateyear,
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        ]
        Picker.init({
            pickerData: data,
            selectedValue: [2020, 6],
            pickerConfirmBtnText: '确定',
            pickerCancelBtnText: '取消',
            pickerTitleText: '请选择',
            onPickerConfirm: data => {
                this.setState({ year: data[0] })
                this.setState({ month: data[1] })
                this.data()
            },
            onPickerCancel: () => {
                console.log('取消');
            }
        });

        Picker.show();
    }
    deleteItem = async (e) => {
        let income = await AsyncStorage.getItem("incomeData");
        let expend = await AsyncStorage.getItem("expendData")
        let ii = JSON.parse(income)
        let ee = JSON.parse(expend)
        let monthdata = ii.concat(ee)
        let i = 0
        var a = monthdata.filter(x =>
            x.key !== e
        )
        let ex = a.filter(item => item.paytype == 'expend')
        let com = a.filter(item => item.paytype == 'income')
        await AsyncStorage.setItem('expendData', JSON.stringify(ex))
        await AsyncStorage.setItem('incomeData', JSON.stringify(com))
        this.data()
    }
    render() {
        return (
            <View>
                <View style={styles.heard}>
                    <View style={styles.user}>
                        <Text style={{ lineHeight: 50, fontSize: 25, color: '#fff', marginLeft: 10 }}>个人记账</Text>
                    </View>
                    {this.state.loginstatus ? (<View style={styles.hearddown}>
                        <TouchableOpacity onPress={this.selectPicker}>
                            <View>
                                <Text style={styles.grey}>{this.state.year}年</Text>
                                <View style={{ flexDirection: 'row', }}>
                                    <Text style={{ color: '#fff' }}>{this.state.month}月</Text>
                                    <   Icon size={20} name="caretdown" type="antdesign" color='#fff' style={{ marginLeft: 10 }} />
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View><Text style={styles.grey}>支出</Text><Text style={{ color: 'black', textAlign: 'center', color: '#fff' }}>{this.state.expend}</Text></View>
                        <View><Text style={styles.grey}>收入</Text><Text style={{ color: 'black', textAlign: 'center', color: '#fff' }}>{this.state.income}</Text></View>

                    </View>) : (<View style={styles.hearddown}>
                        <TouchableOpacity onPress={this.selectPicker}>
                            <View>
                                <Text style={styles.grey}>亲先登录</Text>
                                <View style={{ flexDirection: 'row', }}>
                                    <Text>{this.state.month}月</Text>
                                    <   Icon size={20} name="caretdown" type="antdesign" color='black' style={{ marginLeft: 10 }} />
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View><Text style={styles.grey}>支出</Text><Text style={{ color: 'black', textAlign: 'center' }}>亲先登录</Text></View>
                        <View><Text style={styles.grey}>收入</Text><Text style={{ color: 'black', textAlign: 'center' }}>亲先登录</Text></View>

                    </View>)}
                </View>
                <View style={{ height: 600 }}>
                    {this.state.loginstatus ? (
                        
                            <FlatList
                            style={{marginBottom:150}}
                                data={this.state.bill}
                                keyExtractor={item => item.key}
                                renderItem={({ item, index }) => {
                                    return (
                                        <Swipeout right={[{
                                            text: '删除',
                                            backgroundColor: 'red',
                                            onPress: () => {
                                                this.deleteItem(item.key);
                                            },
                                        }]} style={{ borderRadius: 5, margin: 5, }}>
                                            <View>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10, }}>
                                                    <Text style={{ lineHeight: 20, fontSize: 15, marginLeft: 10, width: 240 }}>{item.date}</Text>
                                                    <Text style={{ lineHeight: 20, fontSize: 15, marginLeft: 10 }}>{item.paytype == 'income' ? '收入' : '支出'}</Text>
                                                </View>
                                                <View style={{ height: 1, backgroundColor: '#ccc' }}></View>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10 }}  >
                                                    <Text style={{ lineHeight: 50, fontSize: 15, marginLeft: 10, width: 100 }}>{item.name}</Text>
                                                    <Text style={{ lineHeight: 50, fontSize: 15, marginLeft: 10, width: 150 }}>{item.mark}</Text>
                                                    <Text style={{ lineHeight: 50, fontSize: 15, marginLeft: 10, width: 50 }}>{item.paytype == "income" ? item.value : -item.value}</Text>
                                                </View>
                                            </View>
                                            <Text></Text>
                                        </Swipeout>

                                    )
                                }}
                            />) : (<View><Text>请先登录</Text></View>)}

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0AC775',
        justifyContent: 'center',
        alignItems: 'center',
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
    login: {
        color: 'black',
    },
    white: {
        color: 'black',
        marginLeft: 35,
        marginRight: 35
    },
    white2: {
        color: 'black'
    },
    box: {
        flexDirection: 'row',
        height: 65,
    },
    whitebox: {
        height: 80,
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: 'center',

    },
    heard: {
        backgroundColor: '#0DCC7E',
        height: 200,
    },
    white: {
        color: '#FFF',
        width: 150,
        lineHeight: 50,
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    grey: {
        color: '#fff',
        lineHeight: 20,
        textAlign: 'center'
    },
    user: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 50,
        color: '#FFFFFF'
    },
    hearddown: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 40,

    },
    separator: {
        height: 1,
        backgroundColor: 'black'
    },

});

export default detail;