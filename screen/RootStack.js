import React from 'react';
import { createStackNavigator} from '@react-navigation/stack';
import SignInScreen from './SignInScreen.js';
import SignupScreen from './SignupScreen.js';
import SplashScreen from './SplashScreen.js';
import home from './home.js'

const Rootstack=createStackNavigator();

const RootStackScreen=({navigation}) =>(
    <Rootstack.Navigator headerMode="none">
        <Rootstack.Screen name="SplashScreen" component={SplashScreen}/>
        <Rootstack.Screen name="SignInScreen" component={SignInScreen}/>
        <Rootstack.Screen name="SignupScreen" component={SignupScreen}/>
        <Rootstack.Screen name="home"         component={home}/>
    </Rootstack.Navigator>


    
);
export default RootStackScreen;