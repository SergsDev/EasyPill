import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { cartContext } from "../App";

const DetailsScreen = ({ route }) => {
  const [showButton, setShowButton] = useState(false);

  const navigation = useNavigation();

  const { cart, setCart, currencyFormat } = React.useContext(cartContext);

  const addToCart = () => {
    const newCart = cart
    const founded = newCart.find(pill=>pill.id === route.params.pill.id)
    const indexFounded = newCart.findIndex(pill=>pill.id === route.params.pill.id)
    if (founded) {
      
      const editedPill = {...founded,count: founded.count+1}

      
      newCart.splice(indexFounded,1,editedPill)
      
    } else{
      newCart.push({...route.params.pill,count:1})
    }
    setCart(newCart);
    setShowButton(true);
  };

  const goCart = () =>{
    setShowButton(false)
    navigation.navigate('CartScreen')
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: route.params.pill.image }}
        style={styles.detailsImg}
      />

      <View style={styles.textContainer}>
        <Text style={styles.pillName}>{route.params.pill.name}</Text>
        <Text style={styles.pillShortDesc}>lorem ipsum dolor sit</Text>
        <Text style={styles.pillPrice}>{currencyFormat(route.params.pill.price)}</Text>
        <Text style={styles.pillDesc}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Text>
      </View>


      {
        showButton
        ?
        <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={goCart}>
          <Ionicons
            name="cart-outline"
            size={30}
            color="#FFF"
            style={styles.cartIcon}
          />
          <Text style={styles.buttonText}>Ir al carrito</Text>
        </TouchableOpacity>
      </View>
      :
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={addToCart}>
          <Ionicons
            name="cart-outline"
            size={30}
            color="#FFF"
            style={styles.cartIcon}
          />
          <Text style={styles.buttonText}>Agregar al carrito</Text>
        </TouchableOpacity>
      </View>
      }


    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    paddingBottom: 200,
  },
  detailsImg: {
    width: "100%",
    height: "60%",
  },
  pillName: {
    color: "#0d0d0d",
    fontSize: 24,
    fontWeight: "bold",
    margin: 10,
    fontFamily: "Roboto",
  },

  pillShortDesc: {
    color: "#a6a6a6",
    fontSize: 14,
    marginLeft: 10,
  },

  pillPrice: {
    color: "#0d0d0d",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
    marginTop: 5,
  },

  pillDesc: {
    margin: 10,
    fontSize: 16,
  },

  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },

  button: {
    marginLeft: 150,
    backgroundColor: "#012030",
    width: "100%",
    padding: 15,
    margin: 5,
    marginTop: 25,
    borderRadius: 30,
    alignItems: "center",
  },

  cartIcon: {
    position: "absolute",
    left: 10,
    top: 10,
  },

  buttonText: {
    width: "80%",
    fontFamily: "Roboto",
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 20,
    marginLeft: 10,
  },
});
