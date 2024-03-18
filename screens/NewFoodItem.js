import React, { useEffect, useState } from 'react'
import { Alert, BackHandler, Dimensions, Image, Pressable, ScrollView, StatusBar, StyleSheet, Text, View , ActivityIndicator, TextInput } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import  storage from "@react-native-firebase/storage";
import firestore from "@react-native-firebase/firestore";

const { width , height } = Dimensions.get("window");
const imageWidth = width * 0.7 ;

const NewFoodItem = ({navigation}) => {
 // handle backpress
 useEffect(() => { 
  const backAction = () => {
    Alert.alert("Are you finished ? ","Ready to exit",[{text:"cancel"},{text:"Exit",onPress:navigation.goBack()}] )
    return ;
  }
  const backhandler = BackHandler.addEventListener("hardwareBackPress",backAction);
  return () => backhandler.remove() ;
  } ,[])

  // data to upload to firestore 
const initialData = {
  imageUrl:null,
  name:"",
  id:"",
  price:"",
  category:""
} 


  const [imageUrl,setImageUrl] = useState(null); // downloadUrl to upload 
  const [url,setUrl] = useState(null) // chose image url
  const [itemName,setItemName] = useState(null);
  const [loading,setLoading] = useState(true);
  const [data,setData] = useState(initialData);
  const [price,setPrice] = useState(0);
  const [category,setCategory] = useState(null);
  const id = new Date().getTime();
  const [btnState,setBtnState] = useState({
    loading:false,
    btnBg:"#87aade"
  }) ;
  const [show,setShow] = useState(true);


  const onChangeItemName = (val) => { setItemName(val) } ;
  const onChangePrice = (val) => {setPrice(val)} ;
  const onChangeCategory = (val) => { setCategory(val) } ;



// choose image 
const chooseImage = () => {
  launchImageLibrary({
    mediaType:"photo",
    presentationStyle:"popover"
  },(res) => {
    if(res.didCancel || res.errorCode || res.errorMessage) return;
    if(res.assets){
      const imageData = res.assets[0];
      setUrl(imageData.uri)
       
    }
  })
}


// uploading image to storage and get url 
const onImageUploadToStorage = async () => {
  if(!url){
    Alert.alert("No Data","Please choose a photo",[{text:"Okay"}]);
    return ;
  }
  setBtnState({...btnState,loading:true});
  try {
    await storage().ref(id).putFile(url);
    const downloadUrl = await storage().ref(id).getDownloadURL() ;
    setData({...data,imageUrl:downloadUrl}) ;
    setBtnState({loading:false,btnBg:"green"}) ;

  } catch (error) {
    Alert.alert("Upload Failed","Something went wrong or connection error",[{text:"Okay"}])
  }
}


const uploadData = () => {
  console.log(itemName,price,id,category)
}


  return (
    <View style={styles.container} >
     <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom:20}} style={{flex:1}} >
        <View style={styles.uploadImageContainer} >
            {
              imageUrl ? <Image /> : <Text style={styles.btnText} > Choose Photo </Text>
            }
        </View>

        <Pressable style={[styles.btnOne,{backgroundColor:btnState.btnBg}]} onPress={onImageUploadToStorage} >
          {
          (btnState.loading) ? <ActivityIndicator  /> : <Text style={{textAlign:"center",fontWeight:"700",color:"#fff"}} > Upload Photo </Text>
          }
        </Pressable>

        <View style={styles.textItem} >
          <TextInput placeholder='Item Name' style={styles.textInput} onChangeText={(val) => onChangeItemName(val.trim())} />
        </View>
        <View style={styles.textItem} >
          <TextInput placeholder='Price' keyboardType="number-pad" style={styles.textInput} onChangeText={(val) => onChangePrice(val)}  />
        </View>
        <View style={styles.textItem} >
          <TextInput placeholder='category' style={styles.textInput} onChangeText={(val) => onChangeCategory(val.trim())}  />
        </View>
        
        <Pressable style={styles.btnTwo} onPress={uploadData} >
          <Text> Upload Data </Text>
        </Pressable>
     </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"gold",
        paddingTop:StatusBar.currentHeight
    },
    uploadImageContainer:{
      width: width -10,
      height:imageWidth,
      backgroundColor:"green"
    },
    btnText:{
      paddingHorizontal:15,
      paddingVertical:12,
      borderRadius:10,
      backgroundColor:"#87aade",
      color:"#fff",
      textAlign:"center"
    },
    btnOne:{
       paddingVertical:12,
       marginVertical:5,
      //  backgroundColor:"#87aade",
      width:width*0.6,
      borderRadius:10
    },
    textItem:{
      marginVertical:5,
      paddingHorizontal:5,
      backgroundColor:"#f1f1f1",
      borderRadius:3
    },
    textInput:{
      fontSize:18,
      color:"black"
    },
    btnTwo:{
      backgroundColor:"#87aade",
      marginVertical:10,
      borderRadius:3,
      elevation:2
    }
})

export default NewFoodItem