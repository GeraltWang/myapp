import React, { Component } from 'react';
import { Text, Icon, ListItem, Header, Button, Input } from 'react-native-elements';
import { StyleSheet, View, ScrollView,Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


class addout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addouttag: ""
        };
        this.addCart = this.addCart.bind(this);
    }
    handleChangeText=(value) =>{
        console.log('输入的值：', value);
        this.setState({ addouttag: value });
    }

    async addCart(){
        let tagData = [];
        try{
          const value = await AsyncStorage.getItem('outtags');
          if(value !== null){
            tagData = JSON.parse(value);
            console.log(value);
          }
          tagData.push({name:this.state.addouttag});
          await AsyncStorage.setItem('outtags', JSON.stringify(tagData));
          console.log(tagData);
          Alert.alert('提示', '新增支出分类成功成功');
        }catch(e){
          console.log('error:',e);
        }
      }
    render() {
        return (
            <View>
                <Input
                    placeholder='请输入支出类别名称'
                    onChangeText={this.handleChangeText}
                />
                <Button
                    title="完成添加"
                    buttonStyle={styles.button}
                    icon={
                        <Icon
                            name="check"
                            type='antdesign'
                            size={15}
                            color="white"
                        />
                    }
                    onPress={() => this.addCart()}
                    
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        width: 360,
        backgroundColor: '#0AC775',
        marginHorizontal: 27,

    },
});

export default addout;