import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ForgotPassword from './screens/ForgotPassword';
import MapScreen from './screens/MapScreen';
import DetailsScreen from './screens/DetailsScreen';
import CartScreen from './screens/CartScreen';
import * as React from 'react';
import { formatCurrency } from 'react-native-format-currency';


const Stack = createNativeStackNavigator();

export const cartContext = React.createContext();

const CartProvider = ({children}) => {
  const [cart, setCart] = React.useState([]);

  const currencyFormat = (number) =>{
    const finalNumber = formatCurrency({amount:number,code:"COP"})
    return `${finalNumber[0]} COP `
  }


  return <cartContext.Provider value={{cart, setCart, currencyFormat}}>{children}</cartContext.Provider>
}
export default function App() {
  return (
    <CartProvider>      
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
        <Stack.Screen options={{headerShown: true, title:''}} name="CartScreen" component={CartScreen} />
        <Stack.Screen options={{headerShown: true, title:''}} name="DetailsScreen" component={DetailsScreen} />
        <Stack.Screen options={{headerShown: true, title:''}} name="MapScreen" component={MapScreen} />
        <Stack.Screen options={{headerShown: false}} name="ForgotPasswordScreen" component={ForgotPassword} />
        <Stack.Screen options={{headerShown: false}} name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
