import {StyleSheet,Text,View,TouchableOpacity,Image,TextInput,ScrollView,} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { app } from "./LoginScreen";
import { getDocs, collection, getFirestore } from "firebase/firestore";
import Card from "./card";
const firestore = getFirestore(app);

const HomeScreen = () => {
  const [pills, setPills] = useState([]);


  const navigation = useNavigation();

  //se consulta la informacion a firestore
  function queryFirestore() {
    getDocs(collection(firestore, "pills")).then((pillsQuery) => {
      pillsQuery.forEach((pill) => {
        setPills((lastPills) => [
          ...lastPills,
          { id: pill.id, ...pill.data() },
        ])
      });
    });
  }

  useEffect(() => {
    queryFirestore();
  }, []);

  const goCart = () =>{
    navigation.navigate('CartScreen')
  }

  return (
      <ScrollView showsHorizontalScrollIndicator={false}>
        <View style={styles.container}>
        <Ionicons
            onPress={goCart}
            name="cart-outline"
            size={40}
            color="#161f30"
            style={styles.cartIcon}
          />
        <Text style={styles.textGreet}>Tus medicamentos, Faciles!</Text>

        <View>
          <TextInput
            placeholder="Buscar medicinas"
            placeholderTextColor={"#a6a6a6"}
            style={styles.search}
          ></TextInput>
          <Ionicons
            name="search-outline"
            size={24}
            color="#44bd6c"
            style={styles.searchIcon}
          />
        </View>

        <View style={styles.flyerContainer}>
        <Image
          style={styles.flyer}
          source={{ uri: "https://i.imgur.com/ORsJOT3.png" }}
        ></Image>

        </View>
        <Text style={styles.subText}>Populares</Text>
        <View style={styles.cardContainer}>
          {pills.map((pill) => (
            <Card key={pill.id} pill={pill} />
          ))}
        </View>
        </View>
      </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFF'
  },

  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 18,
  },
  
  textGreet: {
    paddingTop: 40,
    width: "80%",
    fontFamily: "Roboto",
    color: "#161f30",
    fontWeight: "bold",
    fontSize: 26,
    margin: 15,
  },
  search: {
    padding: 10,
    backgroundColor: "#FFFF",
    borderRadius: 30,
    margin: 15,
    borderWidth: 1,
    borderColor: '#F2F2F2'
  },

  flyer: {
    width: "95%",
    margin: 10,
    height: 150,
    borderRadius: 10,
    
  },

  searchIcon: {
    position: "absolute",
    right: 30,
    top: 28,
  },

  cartIcon:{
    position: "absolute",
    right: 30,
    top: 60
  },

  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    padding: 5,
  },

  subText:{
    width: '80%',
    fontFamily: 'Roboto',
    color: '#012030',
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft:10,
  },

  flyerContainer:{
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  }
});
