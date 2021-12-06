import React, { Component } from "react";
import { StyleSheet, View, ImageBackground, Text } from "react-native";

export default function spalshscreen(){

    return(
        <View style={styles.container}>
        <ImageBackground
          style={styles.rect}
          imageStyle={styles.rect_imageStyle}
          source={require("../assets/images/splash_screen.png")}
        >
          <View style={styles.textStackStack}>
            <View style={styles.textStack}>
              <Text style={styles.text}></Text>
              <Text style={styles.splashScreen}>Splash{"\n"}Screen</Text>
            </View>
            <Text style={styles.text2}></Text>
            <Text style={styles.text3}></Text>
          </View>
        </ImageBackground>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "rgba(255,255,255,1)"
    },
    rect: {
      width: 375,
      height: 812
    },
    rect_imageStyle: {},
    text: {
      top: 67,
      left: 95,
      position: "absolute",
      fontFamily: "roboto-regular",
      color: "#121212"
    },
    splashScreen: {
      top: 0,
      left: 0,
      position: "absolute",
      fontFamily: "roboto-regular",
      color: "rgba(255,255,255,1)",
      height: 134,
      width: 188,
      fontSize: 45,
      textAlign: "center"
    },
    textStack: {
      top: 0,
      left: 0,
      width: 188,
      height: 134,
      position: "absolute"
    },
    text2: {
      top: 67,
      left: 95,
      position: "absolute",
      fontFamily: "roboto-regular",
      color: "#121212"
    },
    text3: {
      top: 67,
      left: 95,
      position: "absolute",
      fontFamily: "roboto-regular",
      color: "#121212"
    },
    textStackStack: {
      width: 188,
      height: 134,
      marginTop: 339,
      marginLeft: 93
    }
  });