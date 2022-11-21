import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  Image,
} from "react-native";
import { TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const navigation = useNavigation();
  const auth = getAuth();

  const handleRestorePassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("El correo de reestablecimiento se ha enviado!");
        console.log("correo de restablecimiento enviado!");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  const goBack = () => {
    navigation.navigate("Login");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.inputContainer}>
        <Image
          style={styles.logo}
          source={{ uri: "https://i.imgur.com/DHh30E6.png" }}
        ></Image>
        <Text style={styles.text}>
          Ingresa tu correo para restaurar tu contraseña!
        </Text>
        <TextInput
          placeholder="Correo Electronico"
          placeholderTextColor={"#a6a6a6"}
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
        />
      </View>

      <TouchableOpacity onPress={handleRestorePassword} style={styles.button}>
        <Text style={styles.buttonText}>enviar correo</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={goBack}
        style={[styles.button, styles.buttonOutline]}
      >
        <Text style={styles.buttonOutlineText}>Volver</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFF",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "#FFFF",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 30,
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#F2F2F2'
  },

  button: {
    backgroundColor: "#44bd6c",
    width: "80%",
    padding: 10,
    borderRadius: 30,
    alignItems: "center",
    margin: 10,
  },

  buttonOutline: {
    backgroundColor: "#FFFF",
    marginTop: 5,
    borderColor: "#44bd6c",
    borderWidth: 2,
  },

  buttonOutlineText: {
    color: "#44bd6c",
    fontWeight: "bold",
    fontSize: 18,
  },

  buttonText: {
    color: "#FFFF",
    fontWeight: "700",
    fontSize: 18,
  },

  logo: {
    justifyContent: "center",
    alignItems: "center",
    width: 300,
    height: 300,
  },

  text: {
    color: "#161f30",
    margin: 5,
    fontWeight: "700",
    fontSize: 18,
  },
});
