import React, { useEffect, useState, setState } from "react";
import { Dimensions, StyleSheet, View, Text } from "react-native";
import { firebase } from "../db/firebase";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph
} from 'react-native-chart-kit';
import Icon from "react-native-vector-icons/MaterialIcons";
import { useFonts } from 'expo-font';
import { Center } from "@builderx/utils";

const screenWidth = Dimensions.get("window").width;

const book = {
  title: 'Ego is the Enemy',
  author: 'Ryan Holiday',
  publisher: {
      name: 'Penguin',
      type: 'private'
  }
};


export default function Analysis() {

  const [dataset, getdataset] = useState('');

  useEffect(() => {
    console.log("Fetch all data after loggin");
    fetchNewdata();
  }, []);
  
  const fetchNewdata = async () => {
    try {
   //const actDev =  getActiveDevice(userdata.user.id);
   console.log("Stat getting data")
   firebase.firestore()
     .collection('a0')
     .doc('7C:9E:BD:4B:37:F0')
     .collection('locationdata')
     .doc('1970-1-1T5:30:33')
     .get()
     .then((doc) => {
       if (doc.exists) {
         const data = doc.data()
         console.log("device data:", data);
        // console.log("device data:", Object.values(data).map(data));
         //data.map((data) => ({data.name}))
         //setnewestData(data);
       } else {
         console.log("No such document!");
       }
     }).catch((error) => {
       console.log("Error getting document:", error);
     });
  
    } catch (e) {
        console.log(e);
        
    }
  };

  return (
    <View style={styles.container}>
    <Center horizontal>
   <View style={styles.rect1}>
<View>
  <Text>Heart rate</Text>
  {data.length?
  <LineChart
    data={{
      labels: ["0", "3", "6", "9", "12", "15", "18", "21", "24"],
      datasets: [
        {
          // data: [
          //   Math.random() * 100,
          //   Math.random() * 100,
          //   Math.random() * 100,
          //   Math.random() * 100,
          //   Math.random() * 100,
          //   Math.random() * 100
          // ]
          data: data.map(el => {return el['1970-1-1T5:30:33'];})
        }

      ]
    }}
    width={360} // from react-native
    height={220}
    yAxisLabel="$"
    yAxisSuffix="k"
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#ffa726",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
  :<Text> no data yet </Text>}
 

</View>
  
   </View>
   <View style={styles.rect2}>
     <Text style={styles.myDevice}>Analysis</Text>
   </View>
   </Center>
 </View>
  )
}


const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};

const data = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
      strokeWidth: 2 // optional
    }
  ],
  legend: ["Rainy Days"] // optional
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rect1: {
    width: 362,
    height: 283,
    //backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 40,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 0,
      height: 0
    },
    elevation: 80,
    shadowOpacity: 0.10,
    shadowRadius: 10,
    marginTop: 138,
    marginLeft: 7
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