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
    useWindowDimensions
} from 'react-native';

import { createDrawerNavigator } from '@react-navigation/drawer';
import home_drawer from '../components/home_drawer';
import setting_drawer from '../components/setting_drawer';
import create_class_drawer from '../components/create_class_drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomSidebarMenu from '../components/customsidebarmenu';
const Drawer = createDrawerNavigator();


const home =({navigation})=>{
    const dimensions = useWindowDimensions();
    

    return(
        <Drawer.Navigator 
            initialRouteName="Home" 
            drawerType={'back'}
           
            drawerContentOptions={{
            activeTintColor: '#009387',
            itemStyle: {marginVertical: 5},}} 
            drawerContent={(props) => <CustomSidebarMenu {...props} />} >
                <Drawer.Screen name="Home" component={home_drawer} options={{drawerIcon:({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={26}/>)}} />
                <Drawer.Screen name="Create Class" component={create_class_drawer} options={{drawerIcon:({ color }) => (
                <MaterialCommunityIcons name="plus-circle" color={color} size={26}/>)}} />
                <Drawer.Screen name="Setting" component={setting_drawer} options={{drawerIcon:({ color }) => (
                <MaterialCommunityIcons name="account-settings" color={color} size={26}/>)}} />
        </Drawer.Navigator>
    );

}
export default home;

const styles = StyleSheet.create({
    container: {
        height:10, 
        backgroundColor: '#009387'
      },

});