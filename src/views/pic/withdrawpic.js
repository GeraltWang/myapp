import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Echarts } from 'react-native-secharts';
import { Slider } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import { FlatList } from 'react-native-gesture-handler';

class withdrawpic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            outlist: [],
            outlist2: [],
            allexpend: 100,
            data11: [],
            data22: []
        }
    }
    componentDidMount() {

        this.showdata();
        this.unFocusListen = this.props.navigation.addListener('focus', () => {

            this.showdata();


        });


    }
    showdata = async () => {
        let data = await AsyncStorage.getItem("expendpic");
        let data2 = await AsyncStorage.getItem("expendData");
        console.log(data, data2);

        if (data) {
            let outlist = JSON.parse(data)
            let outlist2 = JSON.parse(data2)
            var newJrr = [];
            outlist2.forEach(item => {
                var dataItem = item;
                if (newJrr.length > 0) {
                    var filterValue = newJrr.filter(v => {
                        return v.name == dataItem.name
                    })
                    if (filterValue.length > 0) {
                        outlist2.forEach(n => {
                            if (n.name == filterValue[0].name) {
                                n.value = Number(filterValue[0].value) + Number(dataItem.value)
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
                data11: outlist,
                data22: newJrr,
                outlist: outlist,
                allexpend: JSON.parse(data).reduce((p, e) => p + parseFloat(e.value), 0)
            })

        } else {
            this.setState({
                outlist: [
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
                // x: deviceWidth * 0.5,
                y: 'center',
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
                name: '支出',
                type: 'pie',
                data: this.state.data22
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
                                    maximumValue={this.state.allexpend}
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
export default withdrawpic;