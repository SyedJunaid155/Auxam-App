import React, { useState } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    StyleSheet,
    
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';
import create_class_drawer from '../components/create_class_drawer'
const classroom =({navigation})=>{
  const [data,setData]=useState({
    mad:true,
    web:true,
    sec:true,
    python:true

  })
  const displaymad=()=>{
    setData({
      ...data,
      mad:!data.mad
    })
  }
  const displayweb=()=>{
    setData({
      ...data,
      web:!data.web
    })
  }
  const displaysec=()=>{
    setData({
      ...data,
      sec:!data.sec
    })
  }
  const displayphy=()=>{
    setData({
      ...data,
      python:!data.python
        })
  }
    return (
      <View style={styles.container}>
       
       <TouchableOpacity onPress={()=>displaymad()}>
              <View style={styles.button}> 
                <MaterialIcons
                    name={data.mad ? "keyboard-arrow-right" : "keyboard-arrow-down"}
                    color="#000000"
                    size={35}
                />
                <Text style={styles.textSign}>Mobile Development</Text>
            </View>
          </TouchableOpacity>
          {data.mad?null:
            <Animatable.View
            animation="slideInLeft" >
              <Text style={styles.textassign}>General</Text>

            </Animatable.View>
          }
          <TouchableOpacity onPress={()=>displayweb()}>
              <View style={styles.button}> 
                <MaterialIcons
                    name={data.web ? "keyboard-arrow-right" : "keyboard-arrow-down"}
                    color="#000000"
                    size={35}
                />
                <Text style={styles.textSign}>Web Development SP21</Text>
            </View>
          </TouchableOpacity>
          {data.web?null:
            <Animatable.View
            animation="slideInLeft" >
              <Text style={styles.textassign}>General</Text>

            </Animatable.View>
          }
          <TouchableOpacity onPress={()=>displaysec()}>
              <View style={styles.button}> 
                <MaterialIcons
                    name={data.sec ? "keyboard-arrow-right" : "keyboard-arrow-down"}
                    color="#000000"
                    size={35}
                />
                <Text style={styles.textSign}>Software Engineering Concept SP20</Text>
            </View>
          </TouchableOpacity>
          {data.sec?null:
            <Animatable.View
            animation="slideInLeft" >
              <Text style={styles.textassign}>General</Text>

            </Animatable.View>
          }
          
          

          <TouchableOpacity onPress={()=>displayphy()}>
              <View style={styles.button}> 
                <MaterialIcons
                    name={data.python ? "keyboard-arrow-right" : "keyboard-arrow-down"}
                    color="#000000"
                    size={35}
                />
                <Text style={styles.textSign}>Introduction to ICT SP20</Text>
            </View>
          </TouchableOpacity>
          {data.python ? null:
            <Animatable.View
            animation="slideInLeft" >
              <Text style={styles.textassign}>General</Text>

            </Animatable.View>
          }

          <TouchableOpacity>
              <View style={styles.create_classbtn}> 
                <MaterialIcons
                    name="add"
                    color="#000000"
                    size={60}
                />
              
            </View>
          </TouchableOpacity>
        

      </View>
      );

}
export default classroom;

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
    marginTop: 35,
    flexDirection:'row',
    paddingLeft:10,
    borderBottomWidth:1,
    borderRadius:50,
    borderColor:"#ECECEC",
},
create_classbtn: {
  alignItems: 'flex-end',
  alignSelf:'flex-end',
  marginTop: 200,
  
  paddingRight:40,
  
},
textSign: {
    fontSize: 20,
    fontWeight: 'bold',
    
}
});