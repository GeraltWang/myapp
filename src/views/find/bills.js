import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView,Button } from 'react-native';
import { Avatar, Icon, ListItem, Header } from 'react-native-elements';

class bills extends Component {
    render() {
        return (
            <ScrollView>
                <ListItem title="勋章" chevron bottomDivider leftIcon={{ name: 'github', type: "antdesign", color: '#F5DE19' }} />
                <ListItem title="类别设置" chevron bottomDivider leftIcon={{ name: 'setting', type: "antdesign", color: '#3198F0' }} />
                <ListItem title="定时提醒" chevron bottomDivider leftIcon={{ name: 'clockcircleo', type: "antdesign", color: '#4433E7' }} />
                <ListItem title="声音开关" chevron bottomDivider leftIcon={{ name: 'sound', type: "antdesign", color: '#D22E2E' }} />
                <ListItem title="明细详情" chevron bottomDivider leftIcon={{ name: 'menuunfold', type: "antdesign", color: '#6190D5' }} />
                <ListItem title="升级至专业版" chevron bottomDivider leftIcon={{ name: 'diamond', type: 'font-awesome', color: '#0AC775' }} />
                <ListItem title="推荐给好友" chevron bottomDivider leftIcon={{ name: 'export', type: 'antdesign', color: '#F27A9C' }} />
                <Button
                    title="退出登录"
                    color="lightgray"
                />
            </ScrollView>
        );
    }
}

export default bills;