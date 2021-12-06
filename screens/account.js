import React, { Component } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { Center } from "@builderx/utils";

export default function account({navigation}){
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
        <Text style={styles.account}>Account</Text>
      </View>
      <View style={styles.rect2}>
        <Text style={styles.text1}>Mayura Wickramaarachchi</Text>
        <View style={styles.viduraStack}>
          <Text style={styles.vidura}>Vidura</Text>
          <Text style={styles.nickname}>Nickname</Text>
        </View>
        <View style={styles.eMailRow}>
          <Text style={styles.eMail}>E mail</Text>
          <Text style={styles.male}>mayura77viduranga@gmail.com</Text>
        </View>
        <View style={styles.gender2Row}>
          <Text style={styles.gender2}>Gender</Text>
          <Text style={styles.male2}>Male</Text>
        </View>
        <View style={styles.birthday3Row}>
          <Text style={styles.birthday3}>Birthday</Text>
          <Text style={styles.timeInterval2}>1995.08.19</Text>
        </View>
      </View>
</Center>
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rect1: {
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
    marginTop: 31
  },
  account: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    fontSize: 28,
    width: 260,
    height: 34,
    textAlign: "center",
    marginTop: 42,
    marginLeft: 57
  },
  rect2: {
    width: 362,
    height: 429,
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
    marginTop: 14,
    marginLeft: 6
  },
  text1: {
    fontFamily: "roboto-regular",
    color: "rgba(0,0,0,1)",
    fontSize: 23,
    width: 317,
    height: 34,
    textAlign: "left",
    marginTop: 53,
    marginLeft: 35
  },
  vidura: {
    top: 0,
    left: 98,
    position: "absolute",
    fontFamily: "roboto-300",
    color: "#121212",
    fontSize: 14,
    width: 147,
    height: 18,
    textAlign: "left"
  },
  nickname: {
    top: 0,
    left: 0,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 16,
    width: 99,
    height: 18,
    textAlign: "left"
  },
  viduraStack: {
    width: 245,
    height: 18,
    marginTop: 37,
    marginLeft: 35
  },
  eMail: {
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 16,
    width: 98,
    height: 18,
    textAlign: "left"
  },
  male: {
    fontFamily: "roboto-300",
    color: "#121212",
    fontSize: 14,
    width: 202,
    height: 18,
    textAlign: "left"
  },
  eMailRow: {
    height: 18,
    flexDirection: "row",
    marginTop: 14,
    marginLeft: 36,
    marginRight: 26
  },
  gender2: {
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 16,
    width: 99,
    height: 18,
    textAlign: "left"
  },
  male2: {
    fontFamily: "roboto-300",
    color: "#121212",
    fontSize: 16,
    width: 147,
    height: 18,
    textAlign: "left"
  },
  gender2Row: {
    height: 18,
    flexDirection: "row",
    marginTop: 14,
    marginLeft: 35,
    marginRight: 81
  },
  birthday3: {
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 16,
    width: 99,
    height: 18,
    textAlign: "left"
  },
  timeInterval2: {
    fontFamily: "roboto-300",
    color: "#121212",
    fontSize: 16,
    width: 147,
    height: 18,
    textAlign: "left"
  },
  birthday3Row: {
    height: 18,
    flexDirection: "row",
    marginTop: 13,
    marginLeft: 35,
    marginRight: 81
  }
});