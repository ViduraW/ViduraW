import React, { Component , useState } from 'react';
import { Center } from "@builderx/utils";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/global';
import { firebase } from '../db/firebase';
import Spinner from 'react-native-loading-spinner-overlay'

export default function adduser({ navigation }) {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [spinner, setSpinner] = useState(false);

  const onSubmitHandler = () => {
    if(password !== confirmPassword){
      alert("Password not match!");
      return
    }
    setSpinner(true)
    firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((response)=>{
      const uid = response.user.uid
      console.log(uid);
      const data = {
        id: uid,
        username: username,
        email: email,
        password: password,
      };
      const userRererence = firebase.firestore().collection('users');
      console.log(userRererence);

      userRererence
      .doc(uid)
      .set(data)
      .then(() => {navigation.navigate("Home", {user: data})
      })
      .catch((error) => {
        setSpinner(false)
        alert(error)
      });
    })
    .catch((error) => {
      setSpinner(false)
      alert(error)
    })
    
    setTimeout(() => {
      setSpinner(false);
    },3000)
  }

  return (
    <View style={styles.container}>
      <Center horizontal>
      <View style={styles.rect1}>
        <Text style={styles.signup}>Signup</Text>
        <Text style={styles.username}>Username</Text>
        <TextInput placeholder="" 
          style={styles.addUsername}
          onChangeText = {(un) => setUsername(un)}
          value={username}
          ></TextInput>
        <Text style={styles.eMail2}>E mail</Text>
        <TextInput 
          placeholder="" 
          style={styles.addEmail}
          onChangeText={(em) => setEmail(em)}
          value={email}
          ></TextInput>
        <Text style={styles.pass}>Password</Text>
        <TextInput 
          placeholder="" 
          style={styles.addPassword}
          onChangeText={(pw) => setPassword(pw)}
          value={password}
          ></TextInput>
        <Text style={styles.confirmPassword}>Confirm password</Text>
        <TextInput 
          placeholder="" 
          style={styles.addConfPassword}
          onChangeText={(cpw) => setConfirmPassword(cpw)}
          value={confirmPassword}
          ></TextInput>
        <TouchableOpacity
          onPress={() => onSubmitHandler()}
          style={styles.signupButton}
        >
          <Text style={styles.submit}>Submit</Text>
        </TouchableOpacity>
      </View>
      </Center>
      <Spinner
        visible={spinner}
        textStyle={{ color: "#fff" }}
        overlayColor="rgba(0,0,0,0.5)"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:
    { flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center' 
    },
    rect1: {
      width: 334,
      height: 538,
      backgroundColor: "rgba(9,141,214,1)",
      shadowColor: "rgba(0,0,0,1)",
      shadowOffset: {
        width: 0,
        height: 0
      },
      elevation: 30,
      shadowOpacity: 0.44,
      shadowRadius: 10,
      borderRadius: 40,
      marginTop: 132,
    },
    signup: {
      fontFamily: "roboto-regular",
      color: "rgba(255,255,255,1)",
      fontSize: 28,
      width: 260,
      height: 34,
      textAlign: "center",
      marginTop: 26,
      marginLeft: 36
    },
    username: {
      fontFamily: "roboto-regular",
      color: "rgba(255,255,255,1)",
      fontSize: 20,
      marginTop: 38,
      marginLeft: 57
    },
    addUsername: {
      fontFamily: "roboto-regular",
      color: "#121212",
      height: 30,
      width: 237,
      backgroundColor: "rgba(255,255,255,1)",
      borderRadius: 5,
      marginTop: 16,
      marginLeft: 48
    },
    eMail2: {
      fontFamily: "roboto-regular",
      color: "rgba(255,255,255,1)",
      fontSize: 20,
      marginTop: 14,
      marginLeft: 57
    },
    addEmail: {
      fontFamily: "roboto-regular",
      color: "#121212",
      height: 30,
      width: 237,
      backgroundColor: "rgba(255,255,255,1)",
      borderRadius: 5,
      marginTop: 16,
      marginLeft: 48
    },
    pass: {
      fontFamily: "roboto-regular",
      color: "rgba(255,255,255,1)",
      fontSize: 20,
      marginTop: 12,
      marginLeft: 57
    },
    addPassword: {
      fontFamily: "roboto-regular",
      color: "#121212",
      height: 30,
      width: 237,
      backgroundColor: "rgba(255,255,255,1)",
      borderRadius: 5,
      marginTop: 16,
      marginLeft: 48
    },
    confirmPassword: {
      fontFamily: "roboto-regular",
      color: "rgba(255,255,255,1)",
      fontSize: 20,
      marginTop: 10,
      marginLeft: 57
    },
    addConfPassword: {
      fontFamily: "roboto-regular",
      color: "#121212",
      height: 30,
      width: 237,
      backgroundColor: "rgba(255,255,255,1)",
      borderRadius: 5,
      marginTop: 16,
      marginLeft: 48
    },
    signupButton: {
      width: 199,
      height: 39,
      backgroundColor: "rgba(255,255,255,1)",
      borderRadius: 30,
      shadowColor: "rgba(0,0,0,1)",
      shadowOffset: {
        width: 0,
        height: 0
      },
      elevation: 30,
      shadowOpacity: 0.32,
      shadowRadius: 10,
      marginTop: 36,
      marginLeft: 67
    },
    submit: {
      fontFamily: "roboto-regular",
      color: "rgba(0,0,0,1)",
      fontSize: 20,
      marginTop: 8,
      marginLeft: 68
    }
})