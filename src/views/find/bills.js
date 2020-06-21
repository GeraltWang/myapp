import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import { Avatar, Icon, ListItem, Header } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import { Picker } from '@react-native-community/picker';


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
        }
    }
    componentDidMount() {
        this.login();
        this.unFocusListen = this.props.navigation.addListener('focus', () => {
            this.login();
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

    render() {
        return (
            <View>
                <View style={styles.flex}>
                    {
                        this.state.loginstatus ?
                            (<View style={styles.containertop}>
                                <View style={styles.center}>
                                    <Text style={styles.title}>结余</Text>
                                    <Text style={styles.font}>123</Text>
                                </View>
                                <View>
                                    <Text style={styles.title}>收入</Text>
                                    <Text style={styles.font}>123</Text>
                                </View>
                                <View>
                                    <Text style={styles.title}>支出</Text>
                                    <Text style={styles.font}>123</Text>
                                </View>
                                <Picker
                                    selectedValue={this.state.year}
                                    style={{ height: 50, width: 100 }}
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({ year: itemValue })
                                    }>
                                    <Picker.Item label="2020" value="2020" />
                                    <Picker.Item label="2019" value="2019" />
                                </Picker>
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
                                <Picker
                                    selectedValue={this.state.year}
                                    style={{ height: 50, width: 110, color: '#fff' }}
                                    mode='dropdown'
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({ year: itemValue })
                                    }>
                                    <Picker.Item label="2020年" value="2020" />
                                    <Picker.Item label="2019年" value="2019" />
                                </Picker>
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
                <View>
                    
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
        alignItems: 'center'
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
        justifyContent: 'center',
        alignItems: 'center'
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
    titleitem:{
        flex: 1,
        height: 22,
        alignItems: 'center'
    },
    listtitle: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
        flex: 1,
    }
})
export default bills;