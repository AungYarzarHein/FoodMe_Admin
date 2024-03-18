import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const TodaySpecials = () => {
  return (
    <View style={styles.container} >
      <Text> TodaySpecials </Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"gold"
    }
})

export default TodaySpecials