import React, { useContext, useEffect } from 'react'
import { BackHandler, StatusBar, StyleSheet, Text, View , Alert } from 'react-native'
import AdminContext from '../routes/AdminAppState'

const Home = ({navigation}) => {

  const { user } = useContext(AdminContext);
  

  //handling hardwarebackpress
// useEffect(()=>{
//   const backAction=()=>{
//     Alert.alert("!Have you checked ?","Please check if you are not sure",[
//       {
//        text:"Cancel"
//       },
//       {
//       text:"Exit",
//       onPress:()=>BackHandler.exitApp()
//     }]);
//     return true;
//       };
// const backHandler=BackHandler.addEventListener("hardwareBackPress",backAction);

// return ()=>backHandler.remove();
  
// },[]);

useEffect(() => { 
  const backAction = () => { BackHandler.exitApp() } ;
  const backhandler = BackHandler.addEventListener("hardwareBackPress",backAction);
  return () => backhandler.remove();
} ,[])


   const onGoToScreens = (name) => { navigation.navigate(name); } 


   return (
    <View style={styles.container} >
      <Text> Home </Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"gold",
        paddingTop:StatusBar.currentHeight
    }
})

export default Home