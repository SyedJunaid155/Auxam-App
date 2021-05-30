import React,{useState} from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    ToastAndroid, 
    AlertIOS
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from '@react-navigation/native';

import auth, { firebase } from '@react-native-firebase/auth';

import database from '@react-native-firebase/database';
import { Value } from 'react-native-reanimated';


const create_class_drawer=({navigation})=>{
    const { colors } = useTheme();
    const [data,setData]=useState({
        name:'',
        ValidName:false,
        description:null,
        

    });
    

    const searchtext=(val)=>{
        //implement soon
    }
    const textInputChange=(val)=>{
        if(val.trim().length>=4)
        {
            setData({
                ...data,
                name:val,
                ValidName:true
            })
        }
        else{
            setData({
                ...data,
                name:val,
                ValidName:false
            })
        }

    }
    const showmsg=(msg)=>{
        if (Platform.OS === 'android') {    
            ToastAndroid.show(msg, ToastAndroid.SHORT)   
        } else {
            AlertIOS.alert(msg);
        }
    }
    const descriptionchange=(val)=>{
        setData({
            ...data,
            description:val

        })
    }

    const createclass=()=>{
        if (Platform.OS === 'android') {
            if(data.ValidName)
            {
                let classID=database().ref('/class').push();
                let userID=auth().currentUser.uid;
                let classuserID=database().ref('/users').child(userID).child("class").push();
                classID.set({
                    classid:classID.key,
                    userid:userID,
                    classname:data.name,
                    description:data.description

                }).then(()=>{
                    classuserID.set({
                        classid:classID.key
                    })
                    showmsg("Class Created")
                    
                }).catch(error=>{
                    showmsg(error.code)
                })
                

            }
            else{
                showmsg("Please Enter Class Name")
            }
        }else {
            // implementation for IOS
        }
    }
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text_header}>Create Class</Text>
            </View>

            <View style={[styles.footer, {
                    backgroundColor: colors.background
                }]}>

                <Text style={[styles.text_footer, { color: colors.text }]}>Class Name</Text>
                <View style={styles.action}>
                    <FontAwesome 
                        name="user-o"
                        color={colors.text}
                        size={20}
                    />
                    <TextInput 
                        placeholder="Class Name"
                        placeholderTextColor="#666666"
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        autoCapitalize="none"
                        onChangeText={(val) => textInputChange(val)}  
                    />
                    {data.ValidName ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
                    
                </View>
                {data.name.trim().length>=1 && data.name.trim().length<4  ? 
                    <Animatable.View
                        animation="fadeInLeft" duration={500}
                    >
                        <Text style={styles.errorMsg}>Username must be 4 characters long.</Text>
                    </Animatable.View>
                    : null}
                <Text style={[styles.text_footer, { color: colors.text }]}>Description</Text>
                <View style={styles.action}>
                    <TextInput 
                            placeholder="Description"
                            multiline={true}
                            maxLength={50}
                            placeholderTextColor="#666666"
                            style={[styles.textInput, {
                                color: colors.text
                            }]}
                            autoCapitalize="none"
                        
                            onChangeText={(val) => descriptionchange(val)}
                             
                        />
                </View>
                
                <TouchableOpacity >
                    <View style={styles.action}>
                        <TextInput 
                            placeholder="Search Student"
                            placeholderTextColor="#666666"
                            style={[styles.textInput, {
                                color: colors.text
                            }]}
                            autoCapitalize="none"
                            onChangeText={(val) => searchtext(val)} />
                        <Feather 
                            name="search"
                            color="green"
                            size={20}
                        />
                     </View>
                    
    
                </TouchableOpacity>
                
            </View>
            

            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => createclass()}
                >
                <LinearGradient
                    colors={['#08d4c4', '#01ab9d']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Create Class</Text>
                </LinearGradient>
                </TouchableOpacity>
                </View>


        </View>

    )
    
}
export default create_class_drawer;


const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#009387'
    },
    header: {
        flex: 2,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 2,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
  });