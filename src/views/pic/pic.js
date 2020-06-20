import React from 'react';
import {View, Text} from 'react-native';

class Index extends React.Component{
    componentDidMount(){
        console.log('Index did mount');
        this.unFocusListen = this.props.navigation.addListener('focus', ()=>{
            console.log('Index get focus');
        });
    }

    componentWillUnmount(){
        console.log('Index will unmount');
        this.unFocusListen();
    }

    render(){
        return (<View>
            <Text>微信</Text>
        </View>);
    }
}

export default Index;