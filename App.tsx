
import React from 'react'
import { StatusBar, View } from 'react-native'
import MainRoute from './routes/MainRoute'

const App = () => {
  return (
    <View style={{flex:1}} >
      <StatusBar hidden />
      <MainRoute />
    </View>
  )
}

export default App