import React, { Component } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react/cjs/react.development";
import { globalStyles } from "../styles/global";
import { firebase } from "../db/firebase";
import Spinner from 'react-native-loading-spinner-overlay'


export default function Login({ navigation }) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [spinner, setSpinner] = useState(false)

    //  const data = {
    //      id: '123',
    //      username: 'testusername',
    //    }

    const pressHandler = () => {

        setSpinner(true);
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid
                console.log("uid : " + uid)
                console.log("response " + response.user.email)
                const userRererence = firebase.firestore().collection('users')
                userRererence
                    .doc(uid)
                    .get()
                    .then(firestoreDocument => {
                        console.log("Login user data ", firestoreDocument.data())
                        const data = firestoreDocument.data();
                        if (!firestoreDocument.exists) {
                            setSpinner(false)
                            alert("User not exist!")
                            return;
                        }
                        else {
                             navigation.navigate("Home", { user: data })
                        }
                    })
                    .catch(error => {
                        setSpinner(false)
                        alert(error)
                    });
            })
            .catch(error => {
                setSpinner(false)
                alert(error)
            })
        setTimeout(() => {
            setSpinner(false);
        }, 3000)
    }

    return (

        <View style={globalStyles.container}>
            <View style={styles.rect1}>
                <Text style={styles.username}>Email</Text>
                <TextInput
                    placeholder=""
                    style={styles.placeholder}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                ></TextInput>
                <Text style={styles.password}>Password</Text>
                <TextInput
                    secureTextEntry={true}
                    placeholder=""
                    style={styles.passInput}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                ></TextInput>
                <TouchableOpacity
                    onPress={() => pressHandler()}
                    style={styles.loginButton}
                >
                    <Text style={styles.login2}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate("AddUser")}
                    style={styles.signUp}
                >
                    <Text style={styles.signup}>Signup</Text>
                </TouchableOpacity>
            </View>
            <Spinner
                visible={spinner}
                textStyle={{ color: "#fff" }}
                overlayColor="rgba(0,0,0,0.5)"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    rect1: {
        width: 334,
        height: 365,
        backgroundColor: "rgba(9,141,214,1)",
        shadowColor: "rgba(0,0,0,1)",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        elevation: 30,
        shadowOpacity: 0.44,
        shadowRadius: 10,
        borderRadius: 40,
        marginTop: 214,
    },
    username: {

        color: "rgba(255,255,255,1)",
        fontSize: 20,
        marginTop: 30,
        marginLeft: 57
    },
    placeholder: {

        color: "#121212",
        height: 30,
        width: 237,
        backgroundColor: "rgba(255,255,255,1)",
        borderRadius: 5,
        marginTop: 14,
        marginLeft: 48
    },
    passInput: {

        color: "#121212",
        height: 30,
        width: 237,
        backgroundColor: "rgba(255,255,255,1)",
        borderRadius: 5,
        marginTop: 14,
        marginLeft: 48
    },
    password: {

        color: "rgba(255,255,255,1)",
        fontSize: 20,
        marginTop: 16,
        marginLeft: 57
    },
    signUp: {
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
        marginTop: 33,
        marginLeft: 67
    },
    signup: {
        fontFamily: "roboto-regular",
        color: "rgba(0,0,0,1)",
        fontSize: 20,
        marginTop: 8,
        marginLeft: 69
    },
    loginButton: {
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
        marginTop: 33,
        marginLeft: 67
    },
    login2: {

        color: "rgba(0,0,0,1)",
        fontSize: 20,
        marginTop: 8,
        marginLeft: 75
    }
});