import React from 'react';
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
import SocialButton from '../components/SocialButton';
import auth, { firebase } from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import database from '@react-native-firebase/database';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure();



const SignInScreen = ({navigation}) => {
    const { colors } = useTheme();

    const [data, setData] = React.useState({
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidPassword: true,
        isValidUser:true
    });



    const textInputChange = (val) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

        if( reg.test(val)===true) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
                isValidUser:true
                
            });
        }
        else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false,
                isValidUser:false
               
            });
        }
        if(val.trim().length<1)
        {setData({
            ...data,
            isValidUser:true
           
        });
        }
    }
    const showmsg=(msg)=>{
        if (Platform.OS === 'android') {    
            ToastAndroid.show(msg, ToastAndroid.SHORT)   
        } else {
            AlertIOS.alert(msg);
        }
    }

    const handlePasswordChange = (val) => {
        if( val.trim().length >= 6 ) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }
    const SignInWithemail=()=>{
        if(data.username.trim().length<1)
        {
            showmsg('Please Enter Username')

        }else if(data.isValidUser===false)
        {
            showmsg('Please Enter Valid Username')
        }
        else if(data.password.trim().length<1)
        {
            showmsg('Please Enter Password')

        }else if(data.isValidPassword===false )
        {
            showmsg('Please Enter Valid Password')
        }

         else{
                if (Platform.OS === 'android') {
                    firebase.auth().signInWithEmailAndPassword(data.username,data.password)
                        .then(()=>{
                            showmsg('User signed in!')
                            navigation.navigate('home')
                        }).catch(error=>{
                            showmsg(error.code)

                        })
                } else {
                    // implementation for IOS
                }
            }

    }

    
     const fbLogin= async() => {
        try {
          // Attempt login with permissions
          const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

          if (result.isCancelled) {
            throw 'User cancelled the login process';
          }

          // Once signed in, get the users AccesToken
          const fbdata = await AccessToken.getCurrentAccessToken();

          if (!fbdata) {
            throw 'Something went wrong obtaining access token';
          }

          // Create a Firebase credential with the AccessToken
          const facebookCredential = auth.FacebookAuthProvider.credential(fbdata.accessToken);
          

          // Sign-in the user with the credential
          await auth().signInWithCredential(facebookCredential)

          .then(()=>{
            database()
            .ref('/users').child(firebase.auth().currentUser.uid).set({
                
                email:"Facebook",
                name: "FaceBook",
                uid:firebase.auth().currentUser.uid
                
  
            })
            showmsg('Signed In')
            navigation.navigate('home')
    
          }).catch(error=>{
              showmsg(error.code)

          })
          // Use it only when user Sign's up, 
          // so create different social signup function
          // .then(() => {
          //   //Once the user creation has happened successfully, we can add the currentUser into firestore
          //   //with the appropriate details.
          //   console.log('current User', auth().currentUser);
         
          //   firestore().collection('users').doc(auth().currentUser.uid)
          //   .set({
          //       fname: '',
          //       lname: '',
          //       email: auth().currentUser.email,
          //       createdAt: firestore.Timestamp.fromDate(new Date()),
          //       userImg: null,
          //   })
          //   //ensure we catch any errors at this stage to advise us if something does go wrong
          //   .catch(error => {
          //       console.log('Something went wrong with added user to firestore: ', error);
          //   })
          // })
          //we need to catch the whole sign up process if it fails too.
          .catch(error => {
              showmsg('Something went wrong with sign up: ', error);
    
          });
        } catch(error) {
            showmsg({error});
        }
      }

      const googleLogin=async()=>{
        try {
            
           // Get the users ID token
            const { idToken } = await GoogleSignin.signIn();

            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            // Sign-in the user with the credential
            await auth().signInWithCredential(googleCredential)
            // Use it only when user Sign's up, 
            // so create different social signup function
            // .then(() => {
            //   //Once the user creation has happened successfully, we can add the currentUser into firestore
            //   //with the appropriate details.
            //   // console.log('current User', auth().currentUser);
            //   firestore().collection('users').doc(auth().currentUser.uid)
            //   .set({
            //       fname: '',
            //       lname: '',
            //       email: auth().currentUser.email,
            //       createdAt: firestore.Timestamp.fromDate(new Date()),
            //       userImg: null,
            //   })
            //   //ensure we catch any errors at this stage to advise us if something does go wrong
            //   .catch(error => {
            //       console.log('Something went wrong with added user to firestore: ', error);
            //   })
            // })
            //we need to catch the whole sign up process if it fails too.
            .catch(error => {
                showmsg('Something went wrong with sign up: ', error)
                
            });
          } catch(error) {
              showmsg({error});
          }
        
      }
    
    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#009387' barStyle="light-content"/>
        <Animatable.View style={styles.header} animation="fadeInDownBig">
            <Text style={styles.text_header}>Welcome!</Text>
        </Animatable.View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
        >
            <Text style={[styles.text_footer, {
                color: colors.text
            }]}>Username</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Your Username"
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val)}
                    
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
            { data.isValidUser ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Username is not Valid.</Text>
            </Animatable.View>
            }
            <Text style={[styles.text_footer, {
                color: colors.text,
                marginTop: 35
            }]}>Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Your Password"
                    placeholderTextColor="#666666"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
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
            { data.isValidPassword ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Password must be 6 characters long.</Text>
            </Animatable.View>
            }
            
            
           
            <TouchableOpacity>
                <Text style={{color: '#009387', marginTop:15}}>Forgot password?</Text>

            </TouchableOpacity>
            
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => SignInWithemail()}
      
                >
                <LinearGradient
                    colors={['#08d4c4', '#01ab9d']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Sign In</Text>
                </LinearGradient>
                </TouchableOpacity>
            

                <TouchableOpacity
                    onPress={() => navigation.navigate('SignupScreen')}
                    style={[styles.signIn, {
                        borderColor: '#009387',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#009387'
                    }]}>Sign Up</Text>
                </TouchableOpacity>
            </View>
            {Platform.OS === 'android' ? (
        <View>
          <SocialButton
            buttonTitle="Sign In with Facebook"
            btnType="facebook"
            color="#4867aa"
            backgroundColor="#e6eaf4"
            onPress={() => fbLogin()}
          />

          <SocialButton
            buttonTitle="Sign In with Google"
            btnType="google"
            color="#de4d41"
            backgroundColor="#f5e7ea"
            onPress={() => googleLogin()}
          />
        </View>
      ) : null}
        
        </Animatable.View>

    
      </View>
    );
};

export default SignInScreen;

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
        flex: 3,
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
    }
  });