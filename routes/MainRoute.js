import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useContext, useState } from 'react';
import Home from '../screens/Home';
import Login from '../screens/Login';
import NewFoodItem from '../screens/NewFoodItem';
import TodaySpecials from '../screens/TodaySpecials';
import AdminContext from './AdminAppState';



const Stack = createNativeStackNavigator();




const MainRoute = () => {
 const [user,setUser] = useState({});


  return (
   <AdminContext.Provider value={{user,setUser}} >
    <NavigationContainer >
    <Stack.Navigator 
     screenOptions={{
      headerShown:false,
      animation:"fade",
      animationTypeForReplace:"push",
      presentation:"transparentModal"
    }}
     >
        <Stack.Screen name='login' component={Login} />
        <Stack.Screen name='home' component={Home} />
        <Stack.Screen name='newfooditem' component={NewFoodItem} />
        <Stack.Screen name='todayspecials' component={TodaySpecials} />
    </Stack.Navigator>
   </NavigationContainer>
    </AdminContext.Provider>
  )
}

export default MainRoute