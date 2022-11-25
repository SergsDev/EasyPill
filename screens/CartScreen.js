import {ScrollView,StyleSheet,Text,TouchableOpacity,View,} from "react-native";
import React, { useState, useEffect } from "react";
import { cartContext } from "../App";
import Card from "./card";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const CartScreen = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const { cart,setCart, currencyFormat } = React.useContext(cartContext);

  const navigation = useNavigation();

  useEffect(() => {
    let sum = 0;
    cart.forEach((pill) => {
      sum += pill.price * pill.count;
    });
    setTotalPrice(sum);
  }, [cart, totalPrice]);

  const goMapScreen = () => {
    setCart([])
    navigation.navigate("MapScreen");
  };

  return (
    <ScrollView showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        <Text style={styles.textCart}>Carrito de compras</Text>

        <View style={styles.card}>
          {cart.map((pill) => (
            <Card key={pill.id} pill={pill} />
          ))}
        </View>

        <Text style={styles.finalPrice}>
          Total: {currencyFormat(totalPrice)}
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={goMapScreen}>
            <Ionicons
              name="checkmark-done-outline"
              size={30}
              color="#FFF"
              style={styles.checkIcon}
            />
            <Text style={styles.buttonText}>Pedir</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
export default CartScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    padding: 5,
    backgroundColor: "#FFF",
  },

  textCart: {
    backgroundColor: "#FFF",
    width: "100%",
    fontFamily: "Roboto",
    color: "#161f30",
    fontWeight: "bold",
    fontSize: 26,
    marginLeft: 15,
  },

  finalPrice: {
    color: "#0d0d0d",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
    marginTop: 5,
  },

  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
  },

  button: {
    marginLeft: 150,
    backgroundColor: "#012030",
    width: "70%",
    padding: 15,
    margin: 5,
    marginTop: 10,
    borderRadius: 30,
    alignItems: "center",
  },

  buttonText: {
    width: "80%",
    fontFamily: "Roboto",
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 20,
    marginLeft: 10,
  },
  checkIcon: {
    position: "absolute",
    left: 90,
    top: 10,
  },
});
