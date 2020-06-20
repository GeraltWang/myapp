import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Button, Alert } from 'react-native';
import { Text, Avatar, Icon, ListItem } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';

const MyStack = createStackNavigator();
class Me extends Component {
    constructor() {
        super();
        this.state = {
            account: "",
            loginstatus: false
        };
        this.toScreen = this.toScreen.bind(this);
    }
    componentDidMount() {
        this.login();
        this.unFocusListen = this.props.navigation.addListener('focus', () => {
            this.login();
        });
    }
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
    toScreen(routeName) {
        this.props.navigation.navigate(routeName);
    }
    render() {
        return (
            <View>
                <View style={styles.container}>
                    <View style={styles.avbox}>
                        {
                            this.state.loginstatus ?
                                (<View style={styles.avbox}>
                                    <Avatar
                                        size="medium"
                                        rounded
                                        icon={{ name: "user", type: "antdesign" }}
                                        activeOpacity={0.7}
                                    />
                                    <Text style={styles.login}>{this.state.account}</Text>
                                </View>)
                                :
                                (<View style={styles.avbox}>
                                    <Avatar
                                        size="medium"
                                        rounded
                                        icon={{ name: "user", type: "antdesign" }}
                                        onPress={() => this.toScreen('登录')}
                                        activeOpacity={0.7}
                                    />
                                    <Text style={styles.login}>{this.state.account}</Text>
                                </View>)}

                    </View>

                    <View style={styles.box}>
                        <View style={styles.whitebox}>
                            <Text style={styles.white2}>15天</Text>
                            <Text style={styles.white}>已连续打卡</Text>
                        </View>
                        <View style={styles.whitebox}>
                            <Text style={styles.white2}>15天</Text>
                            <Text style={styles.white}>已记录天数</Text>
                        </View>
                        <View style={styles.whitebox}>
                            <Text style={styles.white2}>1笔</Text><Text style={styles.white}>总笔数</Text>
                        </View>
                    </View>
                </View>
                <ScrollView>
                    <ListItem title="勋章" chevron bottomDivider leftIcon={{ name: 'github', type: "antdesign", color: '#F5DE19' }} />
                    <ListItem title="类别设置" chevron bottomDivider leftIcon={{ name: 'setting', type: "antdesign", color: '#3198F0' }}
                        onPress={() => this.toScreen('类别设置')} />
                    <ListItem title="定时提醒" chevron bottomDivider leftIcon={{ name: 'clockcircleo', type: "antdesign", color: '#4433E7' }} />
                    <ListItem title="声音开关" chevron bottomDivider leftIcon={{ name: 'sound', type: "antdesign", color: '#D22E2E' }} />
                    <ListItem title="明细详情" chevron bottomDivider leftIcon={{ name: 'menuunfold', type: "antdesign", color: '#6190D5' }} />
                    <ListItem title="升级至专业版" chevron bottomDivider leftIcon={{ name: 'diamond', type: 'font-awesome', color: '#0AC775' }} />
                    <ListItem title="推荐给好友" chevron bottomDivider leftIcon={{ name: 'export', type: 'antdesign', color: '#F27A9C' }} />
                    <Button
                        title="退出登录"
                        color="lightgray"
                        onPress={async () => {
                            await AsyncStorage.removeItem('account');
                            Alert.alert('提示', '注销成功');
                            this.login();
                        }}
                    />
                </ScrollView>
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
    avbox: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    Avatar: {
        backgroundColor: 'lightgray'
    },
    login: {
        color: '#fff',
    },
    white: {
        color: '#fff',
        marginLeft: 35,
        marginRight: 35
    },
    white2: {
        color: '#fff'
    },
    box: {
        flexDirection: 'row',
        height: 65
    },
    whitebox: {
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: 'center',

    }
});
export default Me;