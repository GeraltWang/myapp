import React, { Component } from 'react';
import { Text, Avatar, Icon, ListItem, Header, Button } from 'react-native-elements';
import { StyleSheet, View, ScrollView, FlatList } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class outkinddd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            outlist: []
        };
    }
    componentDidMount() {
        this.showtag();
        this.unFocusListen = this.props.navigation.addListener('focus', () => {
            this.showtag();
        });
    }
    showtag = async () => {
        let data = await AsyncStorage.getItem("outtags");
        if (data) {
            this.setState({
                outlist: JSON.parse(data)
            });
        } else {
            this.setState({
                outlist: [
                    { name: '暂无数据请点击下方按钮添加' }
                ]
            });
        }
    };
    del = async (index) => {
        try {
            let list = this.state.outlist
            list.splice(index, 1)
            this.setState({ outlist: list })
            await AsyncStorage.setItem("outtags", JSON.stringify(this.state.outlist));
        } catch (e) {
            console.log('error:', e);
        }


    }
    toScreen = (routeName) => {
        this.props.navigation.navigate(routeName);
    }
    render() {
        return (
            <ScrollView>
                <FlatList
                    data={this.state.outlist}
                    renderItem={({ item, index }) => {
                        return (<ListItem title={item.name}
                            rightIcon={<Icon
                                name="minuscircle"
                                type='antdesign'
                                color='red'
                                onPress={() => this.del(index)}
                            />
                            } chevron bottomDivider />)
                    }}
                    keyExtractor={item => item.id}

                />
                <View style={styles.bbox}>
                    <Button
                        title="添加新的类别"
                        buttonStyle={styles.button}
                        onPress={() => this.toScreen('添加支出类别')}
                    />
                </View>

            </ScrollView>
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

export default outkinddd;