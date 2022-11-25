import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableWithoutFeedback } from "react-native";
import { cartContext } from "../App";
const Card = ({ pill }) => {

  const {currencyFormat}= React.useContext(cartContext)

  const navigation = useNavigation();

  const goDetails =() => {
    navigation.navigate('DetailsScreen', {pill})
  }
  return (
    <TouchableWithoutFeedback onPress={goDetails}>

      <View style={styles.cardContainer}>
        <Image source={{ uri: pill.image }} style={styles.cardImg} />
        <Text style={styles.cardText}>{pill.name}</Text>
        <Text style={styles.cardPrice}>{currencyFormat(pill.price)}</Text>
      </View>
        
    </TouchableWithoutFeedback>
  );
};

export default Card;

const styles = StyleSheet.create({
  cardImg: {
    width: 160,
    height: 100,
  },

  cardContainer: {
    width: 160,
    height: 170,
    elevation: 4,
    backgroundColor: '#fff',
    marginLeft: 10,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
  },

  cardText:{
    fontWeight: 'bold',
    color: '#0d0d0d',
    marginLeft: 5,
    marginTop: 5,
    fontSize: 16
  },

  cardPrice:{
    marginLeft: 5,
    marginTop: 10,
    fontWeight: 'bold',

  },
  buttonContainer:{
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },

});
