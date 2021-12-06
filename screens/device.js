import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useFonts } from 'expo-font';
import { Center } from "@builderx/utils";

export default function device(){
  const [loaded] = useFonts({
    "roboto-regular": require('../assets/fonts/roboto-regular.ttf'),
    "roboto-300": require('../assets/fonts/roboto-300.ttf'),
  });

  if (!loaded) {
    return null;
  }
return(
  <View style={styles.container}>
   <Center horizontal>
  <View style={styles.rect1}>
    <Icon name="devices-other" style={styles.icon}></Icon>
    <View style={styles.mac2Stack}>
      <Text style={styles.mac2}>MAC:</Text>
      <Text style={styles.mac1}>7C:9E:BD:4B:37:F0</Text>
    </View>
    <View style={styles.deviceName8Stack}>
      <Text style={styles.deviceName8}>Device Name :</Text>
      <Text style={styles.spaceX}>SpaceX</Text>
    </View>
    <View style={styles.timeIntervalStack}>
      <Text style={styles.timeInterval}>Time interval :</Text>
      <Text style={styles.timeInterval1}>5000 ms</Text>
    </View>
  </View>
  <View style={styles.rect2}>
    <Text style={styles.myDevice}>My Device</Text>
  </View>
  </Center>
</View>
)
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    rect1: {
      width: 362,
      height: 283,
      backgroundColor: "rgba(255,255,255,1)",
      borderRadius: 40,
      shadowColor: "rgba(0,0,0,1)",
      shadowOffset: {
        width: 0,
        height: 0
      },
      elevation: 30,
      shadowOpacity: 0.33,
      shadowRadius: 10,
      marginTop: 138,
      marginLeft: 7
    },
    icon: {
      color: "rgba(9,141,214,1)",
      fontSize: 74,
      height: 74,
      width: 74,
      marginTop: 27,
      marginLeft: 144
    },
    mac2: {
      top: 0,
      left: 0,
      position: "absolute",
      fontFamily: "roboto-regular",
      color: "#121212",
      fontSize: 16,
      width: 147,
      height: 18,
      textAlign: "left"
    },
    mac1: {
      top: 0,
      left: 119,
      position: "absolute",
      fontFamily: "roboto-regular",
      color: "#121212",
      fontSize: 16,
      width: 147,
      height: 18,
      textAlign: "left"
    },
    mac2Stack: {
      width: 266,
      height: 18,
      marginTop: 23,
      marginLeft: 34
    },
    deviceName8: {
      top: 0,
      left: 0,
      position: "absolute",
      fontFamily: "roboto-regular",
      color: "#121212",
      fontSize: 16,
      width: 147,
      height: 18,
      textAlign: "left"
    },
    spaceX: {
      top: 0,
      left: 119,
      position: "absolute",
      fontFamily: "roboto-300",
      color: "#121212",
      fontSize: 16,
      width: 147,
      height: 18,
      textAlign: "left"
    },
    deviceName8Stack: {
      width: 266,
      height: 18,
      marginTop: 14,
      marginLeft: 35
    },
    timeInterval: {
      top: 0,
      left: 0,
      position: "absolute",
      fontFamily: "roboto-regular",
      color: "#121212",
      fontSize: 16,
      width: 147,
      height: 18,
      textAlign: "left"
    },
    timeInterval1: {
      top: 0,
      left: 119,
      position: "absolute",
      fontFamily: "roboto-300",
      color: "#121212",
      fontSize: 16,
      width: 147,
      height: 18,
      textAlign: "left"
    },
    timeIntervalStack: {
      width: 266,
      height: 18,
      marginTop: 14,
      marginLeft: 34
    },
    rect2: {
      width: 375,
      height: 93,
      backgroundColor: "rgba(9,141,214,1)",
      borderBottomRightRadius: 40,
      borderBottomLeftRadius: 40,
      shadowColor: "rgba(0,0,0,1)",
      shadowOffset: {
        width: 0,
        height: 0
      },
      elevation: 30,
      shadowOpacity: 0.44,
      shadowRadius: 10,
      marginTop: -391
    },
    myDevice: {
      fontFamily: "roboto-regular",
      color: "rgba(255,255,255,1)",
      fontSize: 28,
      width: 260,
      height: 34,
      textAlign: "center",
      marginTop: 43,
      marginLeft: 58
    }
  });