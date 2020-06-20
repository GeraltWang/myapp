import React, { Component } from 'react';
import { Text, Avatar, Icon, ListItem, Header, Button } from 'react-native-elements';
import { StyleSheet, View, ScrollView, FlatList } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import user from './user';

const MyStack = createStackNavigator();
class inkinddd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inlist: []
        };
        this.toScreen = this.toScreen.bind(this);
    }
    componentDidMount() {
        this.showtag();
        this.unFocusListen = this.props.navigation.addListener('focus', () => {
            this.showtag();
        });
    }
    showtag = async () => {
        let data = await AsyncStorage.getItem("tags");
        if (data) {
            this.setState({
                inlist: JSON.parse(data)
            });
        } else {
            this.setState({
                inlist: [
                    { name: '暂无数据请点击下方按钮添加' }
                ]
            });
        }
    };
    toScreen(routeName) {
        this.props.navigation.navigate(routeName);
    }
    del = async (index) => {
        try {
            let list=this.state.inlist
            list.splice(index,1)
            this.setState({ inlist: list })
            await AsyncStorage.setItem("tags", JSON.stringify(this.state.inlist));
        } catch (e) {
            console.log('error:', e);
        }


    }

    render() {
        return (

            <View>
                <FlatList
                    data={this.state.inlist}
                    renderItem={({ item, index }) => {
                        return (
                            <ListItem title={item.name}
                                rightIcon={<Icon
                                    name="minuscircle"
                                    type='antdesign'
                                    color='red'
                                    onPress={() => this.del(index)}
                                />
                                } chevron bottomDivider />
                        )
                    }}
                    keyExtractor={item => item.index}

                />
                <View style={styles.bbox}>
                    <Button
                        title="添加新的类别"
                        buttonStyle={styles.button}
                        onPress={() => this.toScreen('添加收入类别')}
                    />
                </View>
            </View>


        );
    }
}


const styles = StyleSheet.create({
    bbox: {
        height: 100,
        alignItems: 'center',
        flexDirection: 'row'
    },
    button: {
        width: 340,
        backgroundColor: '#0AC775',
        marginHorizontal: 35,

    },
});
export default inkinddd;