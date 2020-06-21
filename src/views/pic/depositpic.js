import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Echarts } from 'react-native-secharts';
import AsyncStorage from '@react-native-community/async-storage';


class depositpic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inlist: [],
            inlist2: [],
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
                    name: '收入',
                    type: 'pie',
                    data: [
                        // { value: 2.00, name: '1月' }, { value: 3.00, name: '2月' }, { value: 3.00, name: '3月' },
                        // { value: 2.00, name: '4月' }, { value: 5.00, name: '5月' }, { value: 7.00, name: '6月' },
                        // { value: 3.00, name: '7月' }, { value: 7.00, name: '8月' }, { value: 25.00, name: '9月' },
                        // { value: 3, name: '10月' }, { value: 3, name: '11月' }, { value: 3, name: '12月' }
                    ],
                    data:[{"value":"123","name":"出行"},{"value":"1234","name":"学费"}]
                }]
            }
        }
    }
    componentDidMount() {
        // this.login();
        this.showdata();
        this.unFocusListen = this.props.navigation.addListener('focus', () => {
            // this.login();
            // this.showdata();


        });


    }
    showdata = async () => {
        let data = await AsyncStorage.getItem("incomepic");
        let data2 = await AsyncStorage.getItem("incomeData");
        console.log(data);
        
        if (data) {
            this.setState({
                inlist: JSON.parse(data),
                inlist2: JSON.parse(data2),
            });
            console.log(this.state.inlist2);
            
            let seriesdata = this.state.option;
            seriesdata.series.data = this.state.inlist;
            seriesdata.legend.data = this.state.inlist2;
            // this.setState({...this.state.option.series, data: this.state.inlist});
            this.setState({
                option: seriesdata
            })
            console.log(this.state.option.legend.data);
            
        } else {
            this.setState({
                inlist: [
                    { name: '暂无数据请点击下方按钮添加' }
                ]
            });
        }
    };

    render() {
        // const option = {
        //     title: {
        //         text: 'demo'
        //     },
        //     tooltip: {},
        //     legend: {
        //         data: ['销量']
        //     },
        //     // xAxis:{
        //     //     data:["1","2","3","4","5","6"]
        //     // },
        //     // yAxis:{},
        //     series: [{
        //         name: '销量',
        //         type: 'pie',
        //         data: [5, 20, 36, 10, 10, 20]
        //     }]
        // }
        return (
            <View style={styles.page}>
                <Echarts option={this.state.option} height={300} />
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