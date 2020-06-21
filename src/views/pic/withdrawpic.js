import React, { Component } from 'react';
import {View, Text} from 'react-native';
import { Echarts } from 'react-native-secharts';
import AsyncStorage from '@react-native-community/async-storage';


class withdrawpic extends Component {
    render() {
        const option={
            title:{
                text:'demo'
            },
            tooltip:{},
            legend:{
                data:['销量']
            },
            xAxis:{
                data:["1","2","3","4","5","6"]
            },
            yAxis:{},
            series:[{
                name:'销量',
                type:'bar',
                data:[5,20,36,10,10,20]
            }]
        }
        return (
            <Echarts option={option} height={300} />
        );
    }
}

export default withdrawpic;