import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Slider } from 'react-native-elements';
import { Echarts } from 'react-native-secharts';
import AsyncStorage from '@react-native-community/async-storage';
import { FlatList } from 'react-native-gesture-handler';


class depositpic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inlist: [],
            inlist2: [],
            allin: 100,
            data11: [],
            data22: []
        }
    }
    componentDidMount() {
        // this.login();
        this.showdata();
        this.unFocusListen = this.props.navigation.addListener('focus', () => {
            // this.login();
            this.showdata();


        });


    }
    showdata = async () => {
        let data = await AsyncStorage.getItem("incomepic");
        let data2 = await AsyncStorage.getItem("incomeData");
        console.log(data);

        if (data) {
            let inlist = JSON.parse(data)
            let inlist2 = JSON.parse(data2)
            var newJrr = [];
            inlist2.forEach(item => {
                var dataItem = item;
                if (newJrr.length > 0) {
                    var filterValue = newJrr.filter(v => {
                        return v.name == dataItem.name
                    })
                    if (filterValue.length > 0) {
                        inlist2.forEach(n => {
                            if (n.name == filterValue[0].name) {
                                let zz=0
                                zz= Number(filterValue[0].value) + Number(dataItem.value)
                                n.value=zz
                            }
                        })
                    } else {
                        newJrr.push(dataItem)
                    }
                } else {
                    newJrr.push(dataItem)
                }
            })
            console.log(newJrr);

            this.setState({
                data11: inlist,
                data22: newJrr,
                inlist: inlist,
                allin: JSON.parse(data).reduce((p, e) => p + parseFloat(e.value), 0)
            })
            // this.setState({ allin: JSON.parse(data).reduce((p, e) => p + parseFloat(e.value), 0) })
            console.log(this.state.allin);

        } else {
            this.setState({
                inlist: [
                    { name: '暂无数据请点击下方按钮添加' }
                ]
            });
        }
    };

    render() {
        const option = {
            title: {
                text: 'demo'
            },
            tooltip: {},
            legend: {
                orient: 'vertical',
                top: 220,
                left: 10,
                width: 90,
                itemGap: 4.50,
                color: '#666666',
                itemWidth: 12,
                itemHeight: 12,
                data: this.state.data11
            },
            series: [{
                name: '收入',
                type: 'pie',
                data: this.state.data22,
                // data:[{}]
            }]
        }
        return (
            <View style={styles.page}>
                <Echarts option={option} height={300} />
                <FlatList
                    data={this.state.data22}
                    keyExtractor={item => item.name}
                    renderItem={({ item, index }) => {
                        return (
                            <View>
                                <Slider style={{ width: 280, marginLeft: 66 }}
                                    disabled
                                    minimumValue={0}
                                    maximumValue={this.state.allin}
                                    value={Number(item.value)}
                                    key={index + ''}
                                />
                                <Text style={{ marginLeft: 66 }}>
                                    类别：{item.name} 金额：{item.value}
                                </Text>
                            </View>
                        )
                    }}
                />

            </View>

        );
    }
}

const styles = StyleSheet.create({
    page: {
        height: 600

    },
});

export default depositpic;