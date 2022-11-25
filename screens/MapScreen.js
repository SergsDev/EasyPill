import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as React from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import MapDirections from "react-native-maps-directions";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
const MapScreen = () => {
  const [origin, setOrigin] = React.useState({
    latitude: 7.110907805138794,
    longitude: -73.10996398145642,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [destination, setDestination] = React.useState({
    latitude: 7.097835507556012,
    longitude: -73.10579917447365,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const navigation = useNavigation();

  const goHomescreen = () => {
    navigation.navigate("HomeScreen");
  };
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker key="Origen" coordinate={origin} />
        <MapDirections
          origin={origin}
          destination={destination}
          apikey="AIzaSyB59bayjzZX86au2BSBbwgHGTz_4s3yOAk"
          strokeWidth={5}
          strokeColor={"#13678A"}
        />
        <Marker key="Destino" coordinate={destination} pinColor={'green'}/>
      </MapView>

      <View style={styles.textContainer}>
        <Text style={styles.textNotif}>Tu pedido esta en camino!</Text>
        <Ionicons
          name="radio-button-on-outline"
          size={20}
          color="#F03E0E"
          style={styles.radioIconRed}
        />
        <Text style={styles.label} >Dir. salida</Text>
        <Text style={styles.textOrigin}>Estacion clinica Bucaramanga</Text>
        <Ionicons
          name="radio-button-on-outline"
          size={20}
          color="#44bd6c"
          style={styles.radioIconGreen}
        />
        <Text style={styles.label}>Dir. llegada</Text>
        <Text style={styles.textDestination}>Calle 93#34A34</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={goHomescreen}>
          <Ionicons
            name="checkmark-outline"
            size={30}
            color="#FFF"
            style={styles.checkIcon}
          />
            <Text style={styles.buttonText}>Recibido</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default MapScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    paddingBottom: 50,
  },
  map: {
    width: "100%",
    height: "65%",
  },
  textNotif: {
    color: "#0d0d0d",
    alignItems: "center",
    fontSize: 24,
    fontWeight: "bold",
    margin: 5,
    marginLeft: 50,
    fontFamily: "Roboto",
  },
  textOrigin: {
    marginLeft: 35,
    marginBottom: 10,
    fontSize: 18,
  },
  textDestination: {
    marginLeft: 35,
    fontSize: 18,
  },
  radioIconRed: {
    position: "absolute",
    left: 10,
    top: 42,
  },
  radioIconGreen: {
    position: "absolute",
    left: 10,
    top: 95,
  },

  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
    paddingBottom: 20,
  },

  button: {
    marginLeft: 150,
    backgroundColor: "#012030",
    width: "100%",
    padding: 15,
    marginTop: 30,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: 'center'
  },

  buttonText: {
    width: "50%",
    fontFamily: "Roboto",
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 20,
    marginLeft: 10,
  },

  checkIcon:{
    position: 'absolute',
    left: 160,
    top: 10,
  },

  label:{
    fontSize: 14,
    fontWeight:'bold',
    color: '#161f30',
    marginLeft: 35,
},

});
