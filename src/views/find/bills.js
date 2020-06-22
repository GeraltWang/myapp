import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, FlatList } from 'react-native';
import { Avatar, Icon, ListItem, Header } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import { Picker } from '@react-native-community/picker';
import picker from 'react-native-picker';

class bills extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginstatus: false,
            info: '登陆后显示',
            balance: '',
            income: '',
            expend: '',
            year: '2020',
            incomelist: [],
            expendlist: [],
            month: [],
            monthkey: []
        }
    }
    componentDidMount() {
        this.login();
        this.data();
        // this.in()
        this.unFocusListen = this.props.navigation.addListener('focus', () => {
            this.login();
            this.data();
        });
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
        let income = await AsyncStorage.getItem("incomeData");
        let expend = await AsyncStorage.getItem("expendData")
        let ii = JSON.parse(income)
        let ee = JSON.parse(expend)
        let iie = ii.filter(item =>
            item.date.startsWith(this.state.year)
        )
        let eee=ee.filter(item =>
            item.date.startsWith(this.state.year)
        )
        // console.log(ee);
        //加载收入数据
        if (ii.length > 0) {
            this.setState({
                incomelist: ii.filter(item =>
                    item.date.startsWith(this.state.year)
                ),
                income: iie.reduce((p, e) => p + parseFloat(e.value), 0)
            })
        } else {
            this.setState({
                incomelist: '暂无数据',
                income: '暂无数据'
            })
        }
        //加载支出数据
        if (ee.length > 0) {
            this.setState({
                expendlist: ee.filter(item =>
                    item.date.startsWith(this.state.year)
                ),
                expend: eee.reduce((p, e) => p + parseFloat(e.value), 0)

            })
        } else {
            this.setState({
                expendlist: '暂无数据',
                expend: '暂无数据'
            })
        }
        //计算结余
        if (ee.length > 0 && ii.length > 0) {
            this.setState({
                balance: ii.filter(item =>
                    item.date.startsWith(this.state.year)
                ).reduce((p, e) => p + parseFloat(e.value), 0) - ee.filter(item =>
                    item.date.startsWith(this.state.year)
                ).reduce((p, e) => p + parseFloat(e.value), 0)
            })
        }
        //计算月数据
        // let monthdata = ii.concat(ee)
        // console.log(monthdata);
        // let new_month = {}
        // for (var i = 0; i < monthdata.length; i++) {
        //     var Month_index = monthdata[i].date.lastIndexOf('-');
            
        //     var needdate = monthdata[i].date.substr(0, Month_index);
        //     if (!new_month[needdate]) {
        //         new_month[needdate] = [];
        //         new_month[needdate].push(monthdata[i])
        //     } else {
        //         new_month[needdate].push(monthdata[i])
        //     }
        // }
        
        // this.setState({ month: new_month })
        // console.log(this.state.month);
        // let monthkey = []
        // for (let index in new_month) {
        //     monthkey[monthkey.length] = index
        // }
        // console.log(monthkey);
        // this.setState({ monthkey: monthkey })
        let monthdata = ii.concat(ee)
        console.log(monthdata);
        let new_month = {}
        // let month_key=monthdata.map(item=>item.date.substring(0,7))
        let month_key=Array.from(new Set(monthdata.map(item=>item.date.substring(0,7))))
        
        // month_key=monthdata.map(item=>item.date.substring(0,7))
        console.log(month_key);
        
        // for (var i = 0; i < monthdata.length; i++) {
        //     var Month_index = monthdata[i].date.lastIndexOf('-');
            
        //     var needdate = monthdata[i].date.substr(0, Month_index);
        //     if (!new_month[needdate]) {
        //         new_month[needdate] = [];
        //         new_month[needdate].push(monthdata[i])
        //     } else {
        //         new_month[needdate].push(monthdata[i])
        //     }
        // }
        
        // this.setState({ month: new_month })
        // console.log(this.state.month);
        // let monthkey = []
        // for (let index in new_month) {
        //     monthkey[monthkey.length] = index
        // }
        // console.log(monthkey);
        // this.setState({ monthkey: monthkey })
    }
    in = () => {

    }
    selectPicker = () => {
        let data = [];
        // one wheel
        for (let i = 2020; i >= 2000; i--) {
            data.push(i);
        }
        picker.init({
            pickerData: data,
            selectedValue: [this.state.year],
            pickerConfirmBtnText: '确定',
            pickerCancelBtnText: '取消',
            pickerTitleText: '请选择年',
            onPickerConfirm: data => {
                this.setState({ year: data })
                this.data()
                console.log(this.state.year);
            },
            onPickerCancel: () => {
                console.log('取消');
            }
        });
        picker.show();
    }
    render() {
        return (
            <View>
                <View style={styles.flex}>
                    {
                        this.state.loginstatus ?
                            (<View style={styles.containertop}>
                                <View style={styles.center}>
                                    <Text style={styles.title}>结余</Text>
                                    <Text style={styles.font}>{this.state.balance}</Text>
                                </View>
                                <View>
                                    <Text style={styles.title}>收入</Text>
                                    <Text style={styles.font}>{this.state.income}</Text>
                                </View>
                                <View>
                                    <Text style={styles.title}>支出</Text>
                                    <Text style={styles.font}>{this.state.expend}</Text>
                                </View>
                                <View>
                                    <Button title='请选择' onPress={this.selectPicker}></Button>
                                    <Text>{this.state.year}</Text>
                                </View>
                            </View>)
                            :
                            (<View style={styles.containertop}>
                                <View style={styles.item}>
                                    <Text style={styles.title}>结余</Text>
                                    <Text style={styles.font}>{this.state.info}</Text>
                                </View>
                                <View style={styles.item}>
                                    <Text style={styles.title}>收入</Text>
                                    <Text style={styles.font}>{this.state.info}</Text>
                                </View>
                                <View style={styles.item}>
                                    <Text style={styles.title}>支出</Text>
                                    <Text style={styles.font}>{this.state.info}</Text>
                                </View>
                                <Button title='请选择' onPress={this.selectPicker}></Button>
                                {/* <Picker
                                    selectedValue={this.state.year}
                                    style={{ height: 50, width: 110, color: '#fff' }}
                                    mode='dropdown'
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({ year: itemValue })
                                    }>
                                    <Picker.Item label="2020年" value="2020" />
                                    <Picker.Item label="2019年" value="2019" />
                                </Picker> */}
                            </View>)}
                </View>
                <View style={styles.containersec}>
                    <View style={styles.titleitem}>
                        <Text style={styles.listtitle}>月份</Text>
                    </View>
                    <View style={styles.titleitem}>
                        <Text style={styles.listtitle}>收入</Text>
                    </View>
                    <View style={styles.titleitem}>
                        <Text style={styles.listtitle}>支出</Text>
                    </View>
                    <View style={styles.titleitem}>
                        <Text style={styles.listtitle}>结余</Text>
                    </View>
                </View>
                <View style={styles.containersec}>
                    {/* {
                        this.state.monthkey.map((item) => {
                            return (
                                <View style={styles.listit}>
                                    <View style={styles.titleitem}>
                                        <Text style={styles.listtitle}>{item}</Text>
                                    </View>
                                    <View style={styles.titleitem}>
                                        <Text style={styles.listtitle}>收入</Text>
                                    </View>
                                    <View style={styles.titleitem}>
                                        <Text style={styles.listtitle}>支出</Text>
                                    </View>
                                    <View style={styles.titleitem}>
                                        <Text style={styles.listtitle}>结余</Text>
                                    </View>
                                </View>
                            )
                        })
                    } */}
                    <FlatList
                        data={this.state.monthkey}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={styles.listit}>
                                    <View style={styles.titleitem}>
                                        <Text style={styles.listtitle}>{item}</Text>
                                    </View>
                                    <View style={styles.titleitem}>
                                        <Text style={styles.listtitle}>收入</Text>
                                    </View>
                                    <View style={styles.titleitem}>
                                        <Text style={styles.listtitle}>支出</Text>
                                    </View>
                                    <View style={styles.titleitem}>
                                        <Text style={styles.listtitle}>结余</Text>
                                    </View>
                                </View>
                            )
                        }}
                        keyExtractor={item => item.index}

                    />

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containertop: {
        marginTop: 15,
        marginLeft: 5,
        marginRight: 5,
        height: 100,
        flexDirection: 'row',
        borderRadius: 5,
        backgroundColor: '#0AC775',
        alignItems: 'center',
        justifyContent: "space-evenly"
    },
    containersec: {
        marginTop: 15,
        marginLeft: 5,
        marginRight: 5,
        flexDirection: 'row',
        borderRadius: 5,
        backgroundColor: 'lightgray',
        alignItems: 'center'

    },
    item: {
        flex: 1,
        height: 80,
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    flex: {
        // flex: 1
    },
    font: {
        color: '#fff',
        fontSize: 18,
        marginTop: 10
    },
    title: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold'
    },
    titleitem: {
        flex: 1,
        height: 22,
        alignItems: 'center'
    },
    listtitle: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
        flex: 1,
    },
    listit: {
        // marginTop: 15,
        marginLeft: 5,
        marginRight: 5,
        flexDirection: 'row',
        borderRadius: 5,
        backgroundColor: 'lightgray',
        alignItems: 'center'
    }
})
export default bills;