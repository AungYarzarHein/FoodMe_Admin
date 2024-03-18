import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View , Alert , BackHandler , TouchableOpacity , ActivityIndicator } from 'react-native'
import AdminContext from '../routes/AdminAppState';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from "@react-native-firebase/auth";


GoogleSignin.configure({
  webClientId:"51633224609-b9ovr5c96q2qq027r5dl12b152uvba79.apps.googleusercontent.com"
});

const Login = ({navigation}) => {
 const [userSignedIn,setUserSignedIn] = useState(false);
 const {  setUser } = useContext(AdminContext);
 const [infoShow,setInfoShow] = useState({
  loading:false,
  message:"Hello User , Login Please ! "
})


const onPressHandler = () => {
  signUpNewUser();
}


const signInWithGoogle = async () => {
  const isSignedIn = await GoogleSignin.isSignedIn() ;
 
  try {
    if(isSignedIn){
      setInfoShow({
        loading:true,
        message:"Sign in with Gmail..."
      })
      const userInfo = await GoogleSignin.signInSilently();
      setUser(userInfo.user);
      setInfoShow({
        loading:false,
        message:"Welcome To FoodMe "
      })
      navigation.navigate("home");

    }else{
      setUserSignedIn(true);
    }
  } catch (error) {
    Alert.alert("Bad connection or Timeout","Please close the app and try again!",[
      {
         text:"Exit App",
         onPress:BackHandler.exitApp
      },
    {
        text:"Try Again",
        onPress:signInWithGoogle
    }
    ])
  }
}


const signUpNewUser = async () => {
  setInfoShow({
    loading:true,
    message:"Sign In with your Gmail"
  })

  const {idToken,user} = await GoogleSignin.signIn();
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  auth().signInWithCredential(googleCredential);
  setUser(user);
  setInfoShow({
    loading:false,
    message:"Welcome Back"
  })
  
  navigation.navigate("home");

}

useEffect(() => { 
  setTimeout(() => { 
    signInWithGoogle();
   } , 500)
 } , [])




  return (
   <View  style={styles.container} >

     

    <Text style={{marginBottom:100,fontSize:32,color:"#333",fontFamily:"modera"}} >
       Football Geek Admin
   </Text>

   <Text style={{marginBottom:16,fontSize:14,color:"#333",fontFamily:"banana"}} >
      {infoShow.message}
   </Text>

   <TouchableOpacity onPress={onPressHandler} style={styles.btn} disabled={!userSignedIn} >
  
  {(infoShow.loading) ? (<ActivityIndicator color="black"  />) : ( null)}
  <Text style={{fontSize:16,color:"white",marginLeft:10,fontWeight:"700"}} >
         Sign In with Google
     </Text>
     </TouchableOpacity> 

  </View>
  )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#fff"
        
    },
    linearStyle:{
         flex:1,
         justifyContent:"center",
        alignItems:"center"
    },
    btn:{
        width:300,
        paddingVertical:12,
        // backgroundColor:"#08ab71",
        backgroundColor:"#00903aac",
        justifyContent:"center",
        alignItems:"center",
        gap:10,
        borderRadius:5,
        flexDirection:"row",
        // elevation:1,
        borderWidth:2,
        borderColor:"#ffffff67"
    }
})



export default Login