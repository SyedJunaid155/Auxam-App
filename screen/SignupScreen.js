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
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import auth, { firebase } from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const SignupScreen = ({navigation}) => {

    const [data, setData] = React.useState({
        username: '',
        password: '',
        email:'',
        confirm_password: '',
        check_textInputChange: false,
        check_email:false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
        match_password:true
    });

    const changeusername = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false
            });
        }
    }
    const createuser=()=>{
        if(data.username.trim().length<1){
            showmsg('Please Enter Username')
        }
        else if(data.email.trim().length<1)
        {
            showmsg('Please Enter Email')
        }else if(data.check_email===false)
        {
            showmsg('Please Enter Valid Email')
        }else if(data.password.trim().length<1 || data.confirm_password.trim().length<1){
            showmsg('Please enter password')
        }

        else if(data.match_password===false){
            showmsg('Please check You entered correct password')
        }
        else {
            if (Platform.OS === 'android') {
                auth()
                .createUserWithEmailAndPassword(data.email, data.password)
                .then(() => {
                
                        
                        database()
                        .ref('/users').child(firebase.auth().currentUser.uid).set({
                            
                            email:data.email,
                            name: data.username,
                            uid:firebase.auth().currentUser.uid

                        }).then(() => ToastAndroid.show('User account created', ToastAndroid.SHORT))
                        .then(()=>navigation.goBack());
                        
                
                    
                })
                .catch(error => {
                    if (error.code === 'auth/email-already-in-use') {
                        showmsg('That email address is already in use!')
                    }
                    else if (error.code === 'auth/invalid-email') {
                        showmsg('That email address is invalid!')
                    }
                    else {
                        showmsg(error.code)
                    }
                });
            } else {
                // implementation for IOS
            }
        }

    }
    const changeemail =(val)=>{

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        
        if (reg.test(val) === true) { 
            setData({
                ...data,
                email:val,
                check_email:true
            });
        }
        else{
            setData({
                ...data,
                email:val,
                check_email:false
            });
        }
    }

    const handlePasswordChange = (val) => {
        if(data.confirm_password===val)
        {
            setData({
            ...data,
            match_password:true,
            password: val
           
        })
        }
        else{
            setData({
                ...data,
                match_password:false,
                password: val
               
            })   
        }
    }

    const handleConfirmPasswordChange = (val) => {
        if(data.password===val)
        {
            setData({
            ...data,
            match_password:true,
            confirm_password: val,
           
        })
        }
        else{
            setData({
                ...data,
                match_password:false,
                confirm_password: val,
               
            })
            
        }
    
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        });
    }
    const showmsg=(msg)=>{
        if (Platform.OS === 'android') {    
            ToastAndroid.show(msg, ToastAndroid.SHORT)   
        } else {
            AlertIOS.alert(msg);
        }
    }

    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#009387' barStyle="light-content"/>
        <Animatable.View style={styles.header} animation="fadeInDownBig">
            <Text style={styles.text_header}>Register Now!</Text>
        </Animatable.View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={styles.footer}
        >
            <ScrollView>
            <Text style={styles.text_footer}>Username</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Username"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => changeusername(val)}
                />
                {data.check_textInputChange ? 
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
            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Email</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Email"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => changeemail(val)}
                />
                 {data.check_email ? 
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

            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Password"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => handlePasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>

            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Confirm Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Confirm Your Password"
                    secureTextEntry={data.confirm_secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => handleConfirmPasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateConfirmSecureTextEntry}
                >
                    {data.confirm_secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>
            {data.password.trim().length>1 && data.confirm_password.trim().length>1 && data.match_password ? 
                <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.msg}>Password Match.</Text>
                </Animatable.View> 
                : data.password.trim().length>1 && data.confirm_password.trim().length>1 && 
                <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>Password not match.</Text>
                </Animatable.View>
            }
            
            
            
            <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>
                    By signing up you agree to our
                </Text>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Terms of service</Text>
                <Text style={styles.color_textPrivate}>{" "}and</Text>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Privacy policy</Text>
            </View>
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => createuser()}
                >
                <LinearGradient
                    colors={['#08d4c4', '#01ab9d']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Sign Up</Text>
                </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={[styles.signIn, {
                        borderColor: '#009387',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#009387'
                    }]}>Sign In</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </Animatable.View>
      </View>
    );
};

export default SignupScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: Platform.OS === 'ios' ? 3 : 5,
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
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    button: {
        alignItems: 'center',
        marginTop: 50
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
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    msg: {
        color: '#00FF00',
        fontSize: 14,
    },
    color_textPrivate: {
        color: 'grey'
    }
  });