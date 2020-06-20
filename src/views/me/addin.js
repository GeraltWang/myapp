import React, { Component } from 'react';
import { Text, Avatar, Icon, ListItem, Header, Button, Input } from 'react-native-elements';
import { StyleSheet, View, ScrollView, FlatList,Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


class addin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addintag: "",
            id:Math.round(Math.random()*1000)
        };
        this.addCart = this.addCart.bind(this);
    }
    handleChangeText=(value) =>{
        console.log('输入的值：', value);
        this.setState({ addintag: value });
    }

    async addCart(){
        let tagData = [];
        try{
          const value = await AsyncStorage.getItem('tags');
          if(value !== null){
            tagData = JSON.parse(value);
            console.log(value);
          }
          tagData.push({name:this.state.addintag,id:this.state.id});
          await AsyncStorage.setItem('tags', JSON.stringify(tagData));
          console.log(tagData);
          Alert.alert('提示', '新增收入分类成功成功');
        }catch(e){
          console.log('error:',e);
        }
      }

    render() {
        return (
            <View>
                <Input
                    placeholder='请输入收入类别名称'
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

export default addin;