import React, { Component } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Echarts } from 'react-native-secharts';
import AsyncStorage from '@react-native-community/async-storage';


class withdrawpic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            outlist: [],
            outlist2: [],
            option: {
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
                    // data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                    // data: ['出行', '学费'],

                    data: []
                },
                series: [{
                    name: '支出',
                    type: 'pie',
                    data: []
                }]
            }
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
        let data = await AsyncStorage.getItem("expendpic");
        let data2 = await AsyncStorage.getItem("expendData");
        console.log(data,data2);

        if (data) {
            this.setState({
                outlist: JSON.parse(data),
                outlist2: JSON.parse(data2),
            });
            

            let seriesdata = this.state.option;
            seriesdata.series.data = this.state.outlist;
            seriesdata.legend.data = this.state.outlist2;
            // this.setState({...this.state.option.series, data: this.state.inlist});
            this.setState({
                option: seriesdata
            })
            console.log(this.state.option.legend.data);

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
                // data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                // data: ['出行', '学费'],

                data: this.state.option.legend.data
            },
            series: [{
                name: '支出',
                type: 'pie',
                data: this.state.option.series.data,
                // data:[{}]
            }]
        }
        return (
            <View style={styles.page}>
                <Echarts option={option} height={300} />
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