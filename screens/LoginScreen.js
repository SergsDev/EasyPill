import { StyleSheet, Text, View, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, Image} from 'react-native'
import React, {useState, useEffect} from 'react'
import { useNavigation } from '@react-navigation/native'
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth'
import {initializeApp} from 'firebase/app'
import {firebaseConfig} from '../firebase-config'

    //inicializacion de firebase
    export const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

const LoginScreen = () => {
    //hooks para los manejar datos del usuario
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    //metodo para usar la navegacion
    const navigation = useNavigation();

    //metodo para crear cuenta de usuario
    const handleCreateAccount = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then ((userCredential) => {
            console.log('Cuenta creada');
            const user = userCredential.user;
            console.log(user);
        })
        .catch(error => {
            console.log(error);
        })
    }
    //metodo para iniciar sesion
    const handleSignIn = () => {
        signInWithEmailAndPassword(auth,email, password)
        .then((userCredential) => {
            console.log('Sesion Iniciada');
            const user = userCredential.user;
            console.log(user);
            navigation.navigate('HomeScreen')
        })
        .catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {
        const user = auth.currentUser;
        if (!user) {
            navigation.navigate('HomeScreen')
        }
    },[])

    const handleRestorePassword = () =>{
        navigation.replace('ForgotPasswordScreen')
    }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? "padding" : "height"}>

        <View style={styles.inputContainer}>

            <Image 
            style={styles.logo}
            source={{uri: 'https://i.imgur.com/PFb2AAo.png'}}>
            </Image>
            <Text style={styles.label}>Ingresa tu correo Electronico</Text>
            <TextInput placeholder='nombre@correo.com' placeholderTextColor={'#a6a6a6'} style={styles.input}
            onChangeText={(text) => setEmail(text)}/>

            <Text style={styles.label}>Ingresa tu contraseña</Text>
            <TextInput placeholder='Contraseña' placeholderTextColor={'#a6a6a6'} style={styles.input} secureTextEntry
            onChangeText={(text) => setPassword(text)}/>

        </View>
        <View style={styles.buttonContainer}>

            <TouchableOpacity onPress={handleSignIn} style={styles.button}>
                <Text style={styles.buttonText}>Iniciar Sesion</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleCreateAccount} style={[styles.button, styles.buttonOutline]}>
                <Text style={styles.buttonOutlineText}>Registrarse</Text>
            </TouchableOpacity>    

            <TouchableOpacity onPress={handleRestorePassword} style={styles.buttonOutlineText}>
                <Text style={[styles.buttonOutlineText, styles.passwordText]}>olvidaste tu contraseña?</Text>
            </TouchableOpacity>
        </View>

    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({

    container: {
        backgroundColor: '#FFFF',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: '80%',
    },
    input: {
        backgroundColor: '#FFFF',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 30,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#F2F2F2'
    },
    
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
    },

    button: {
        backgroundColor: '#44bd6c',
        width: '100%',
        padding: 15,
        margin: 5,
        borderRadius: 30,
        alignItems: 'center'
    },
    
    buttonOutline: {
        backgroundColor: '#FFFF',
        marginTop: 10,
        borderColor: '#44bd6c',
        borderWidth: 2,
        
    },
    buttonText:{
        color: '#FFFF',
        fontWeight: 'bold',
        fontSize: 18,
    },
    buttonOutlineText: {
        color: '#44bd6c',
        fontWeight: 'bold',
        fontSize: 18,
    },

    passwordText:{
        margin: 15
    },

    logo:{
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        height: 300,
    },

    label:{
        fontSize: 16,
        fontWeight:'bold',
        color: '#161f30',
    }

})