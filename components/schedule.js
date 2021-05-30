import React from 'react';
import { useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    StyleSheet,    
} from 'react-native';
const schedule =()=>{
  const [data, setData]=useState({
    arrow_assigment:true,
    arrow_quiz:true


  })
  const displayassignment=()=>{
    setData({
      ...data,
      arrow_assigment:!data.arrow_assigment
    })
  }
  const displayquiz=()=>{
    setData({
      ...data,
      arrow_quiz:!data.arrow_quiz
    })
  }
    return (
     
        <View style={styles.container}>
          
          <TouchableOpacity onPress={()=>displayassignment()}>
              <View style={styles.button}> 
                <MaterialIcons
                    name={data.arrow_assigment ? "keyboard-arrow-right" : "keyboard-arrow-down"}
                    color="#000000"
                    size={35}
                />
                <Text style={styles.textSign}>Assignments</Text>
            </View>
          </TouchableOpacity>
          {data.arrow_assigment?null:
            <Animatable.View
            animation="slideInLeft" >
              <Text style={styles.textassign}>Assignment 1</Text>
             
              <Text style={styles.textassign}>Assignment 2</Text>
              <Text style={styles.textassign}>Assignment 3</Text>
            </Animatable.View>
          }
          
         
              <TouchableOpacity onPress={()=>displayquiz()}>
                  <View style={styles.button}> 
                    <MaterialIcons
                        name={data.arrow_quiz?"keyboard-arrow-right" : "keyboard-arrow-down"}
                        color="#000000"
                        size={35}
                    />
                    <Text style={styles.textSign}>Quizez</Text>
                </View>
              </TouchableOpacity>
              {data.arrow_quiz ? null:
                <Animatable.View
                  animation="slideInLeft">
                  <Text style={styles.textassign}>Quiz 1</Text>
                  <Text style={styles.textassign}>Quiz 2</Text>
                  <Text style={styles.textassign}>Quiz 3</Text>
                </Animatable.View>
              }
          


        </View>
        
        
      );
}
export default schedule;
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#ffffff'
  },
  
  textassign:{
    fontSize: 20,
    paddingLeft:50,
    paddingTop:10,
    paddingBottom:10,
    borderBottomWidth:1,
    borderRadius:50,
    borderColor:"#ECECEC",
   
    

  },
  button: {
      alignItems: 'flex-start',
      marginTop: 50,
      flexDirection:'row',
      paddingLeft:10
  },
  
  textSign: {
      fontSize: 25,
      fontWeight: 'bold',
      
  }
});