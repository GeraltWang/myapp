import React, { Component } from 'react';
import { Text, Avatar, Icon, ListItem, Header } from 'react-native-elements';
import { StyleSheet, View, ScrollView, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

class detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        }
    }
    showDatepicker = () => {
        showMode('date');
      };
    
    showTimepicker = () => {
        showMode('time');
      };

    render() {
        return (
            <View>
                <Header
                    placement="center"
                    centerComponent={{ text: '个人记账', style: { color: '#fff', fontSize: 20 } }}
                    backgroundColor='#0AC775'
                />
                <View style={styles.containertop}>
                    {/* <DateTimePicker
                        value={this.state.date}
                        mode='default'
                        display='default'
                        onChange={date => this.setState({ date })} /> */}
                    <View>
                        <Button onPress={showDatepicker()} title="Show date picker!" />
                    </View>
                    <View>
                        <Button onPress={showTimepicker()} title="Show time picker!" />
                    </View>
                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            display="default"
                            onChange={onChange}
                        />
                    )}
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

    }
});

export default detail;