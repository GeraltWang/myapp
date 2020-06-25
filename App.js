import React, { Component } from 'react';
import 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Icon } from 'react-native-elements';

import pic from './src/views/pic/pic';
import detail from './src/views/detail/detail';
import budget from './src/views/budget/budget'
import Discovery from './src/views/find/Discovery';
import find from './src/views/find/find'
import My from './src/views/me/My';
import { KeyboardAvoidingView } from 'react-native';

const Tab = createBottomTabNavigator();
class App extends Component {
  render() {
    return (

      <NavigationContainer>
          <Tab.Navigator initialRouteName="budget" tabBarOptions={{ activeTintColor: '#0AC775' }}>
            <Tab.Screen name="detail" component={detail}
              options={{ tabBarIcon: ({ color }) => <Icon color={color} name="wallet" type="antdesign" />, tabBarLabel: "明细" }} />
            <Tab.Screen name="pic" component={pic}
              options={{ tabBarIcon: ({ color }) => <Icon color={color} name="dotchart" type="antdesign" />, tabBarLabel: "图表" }} />
            <Tab.Screen name="budget" component={budget}
              options={{ tabBarIcon: ({ color }) => <Icon color={color} name="pay-circle-o1" type="antdesign" />, tabBarLabel: "记账" }} />
            <Tab.Screen name="find" component={find}
              options={{ tabBarIcon: ({ color }) => <Icon color={color} name="find" type="antdesign" />, tabBarLabel: "发现" }} />
            <Tab.Screen name="My" component={My}
              options={{ tabBarIcon: ({ color }) => <Icon color={color} name="user" type="antdesign" />, tabBarLabel: "我的" }} />
          </Tab.Navigator>
        
      </NavigationContainer>

    );
  }
}

export default App;
