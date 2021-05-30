import React from 'react';
import { useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';
import { useTheme } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    StyleSheet,
    TextInput,    
} from 'react-native';
const join_class =()=>{
  const[data,setData]=useState({
    classcode:'',
    classlink:'',
    arrow_request:true
  })
  const { colors } = useTheme();

  const classcodeinput=(val)=>{
    setData({
      ...data,
      classcode:val
    })

  }
  const classlinkinput=(val)=>{
    setData({
      ...data,
      classlink:val
    })
  }
  const displayrequest=()=>{
    setData({
      ...data,
      arrow_request:!data.arrow_request
    })
  }
    return (
        <View style={styles.container}>
          <Text style={[styles.text_footer, {
                color: colors.text,
                marginTop: 35
            }]}>Join Class with Code</Text>
          <View style={styles.button}>
            <TextInput
              placeholder="Enter Class Code"
              placeholderTextColor="#666666"
              style={[styles.textInput, {
                  color: colors.text
              }]}
              autoCapitalize="none"
            
              onChangeText={(val) => classcodeinput(val)}
              />
              <LinearGradient
                    colors={['#08d4c4', '#01ab9d']}
                    style={styles.signIn}
                >
                    <Text style={{fontSize: 25}}>Join Class</Text>
                </LinearGradient>
          </View>
          <Text style={[styles.text_footer, {
                color: colors.text,
                marginTop: 35
            }]}>Join Class with link</Text>
          <View style={styles.button}>
            <TextInput
              placeholder="Enter Class link"
              placeholderTextColor="#666666"
              style={[styles.textInput, {
                  color: colors.text
              }]}
              autoCapitalize="none"
            
              onChangeText={(val) => classlinkinput(val)}
              />
              <LinearGradient
                    colors={['#08d4c4', '#01ab9d']}
                    style={styles.signIn}
                >
                    <Text style={{fontSize: 25}}>Join Class</Text>
                </LinearGradient>
          </View>
          <TouchableOpacity onPress={()=>displayrequest()}>
              <View style={styles.button}> 
                <MaterialIcons
                    name={data.arrow_request? "keyboard-arrow-right" : "keyboard-arrow-down"}
                    color="#000000"
                    size={35}
                />
                <Text style={styles.request_style }>Requests</Text>
            </View>
          </TouchableOpacity>
          {data.arrow_request?null:
            <Animatable.View
            animation="slideInLeft" >
              <Text style={styles.textassign}>No Request</Text>
            </Animatable.View>
          }
          
        </View>
      );

}
export default join_class;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#ffffff',
    paddingRight:20
  },
  
  textassign:{
    fontSize: 20,
    paddingLeft:50,
    paddingTop:10,
    borderBottomWidth:1,
    borderRadius:50,
    borderColor:"#ECECEC",
    paddingBottom:10
   
    

  },
  button: {
      alignItems: 'flex-start',
      marginTop: 50,
      flexDirection:'row',
      paddingLeft:10
  },
  
  request_style:{
    fontSize: 25,
    fontWeight: 'bold'
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
},
signIn: {
  width: 150,
  height: 40,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 50,
  flexDirection: 'row'
},
text_footer: {
  color: '#05375a',
  fontSize: 25,
  paddingLeft:20,
  fontStyle:'italic',
  fontWeight: 'bold',
},
});