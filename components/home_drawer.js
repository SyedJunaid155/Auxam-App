import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar,
    ToastAndroid, 
    AlertIOS,
} from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import classroom from '../components/classroom';
import schedule from '../components/schedule';
import result from '../components/result';
import uploadfile from '../components/uploadfile';
import join_class from '../components/join_class';
const Tab = createMaterialBottomTabNavigator();

const home_drawer=({navigation})=>{

    return(
        <Tab.Navigator
        activeColor="#f0edf6"
        inactiveColor="#3e2465"
        shifting={false}
        barStyle={{ backgroundColor: '#009387'}}>
            <Tab.Screen name="Home" component={classroom}  options={{tabBarLabel:'Home',tabBarIcon :({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
        ),tabBarBadge:3}}/>
            <Tab.Screen name="Schedule" component={schedule}options={{tabBarLabel:'Schedule',tabBarIcon :({ color }) => (
            <MaterialCommunityIcons  name="calendar-month" color={color} size={26} />
        )}} />
            <Tab.Screen name="Result" component={result} options={{tabBarLabel:'Result',tabBarIcon :({ color }) => (
            <MaterialCommunityIcons name="text-box-check" color={color} size={26} />
        )}} />
            <Tab.Screen name="File" component={uploadfile} options={{tabBarLabel:'File',tabBarIcon :({ color }) => (
            <MaterialCommunityIcons name="file-check" color={color} size={26} />
        )}}/>
            <Tab.Screen name="Join" component={join_class}options={{tabBarLabel:'Join',tabBarIcon :({ color }) => (
            <MaterialCommunityIcons name="account-group" color={color} size={26} />
        )}} />
        </Tab.Navigator> 
    );

}
export default home_drawer;


