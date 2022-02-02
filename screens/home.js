import React, { useEffect, useState, setState  } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Center } from "@builderx/utils";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import EntypoIcon from "react-native-vector-icons/Entypo";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import { globalStyles } from "../styles/global";
import { firebase } from "../db/firebase";
import * as Notifications from "expo-notifications"
// import Constants from "expo-constants"
// import * as Permissions from "expo-permissions"

//Go to about
const pressHandlerHome = () => {
  navigation.navigate('Home')
}
const pressHandlerDevice = () => {
  navigation.navigate('Device')
}
const pressHandlerProfile = () => {
  navigation.navigate('Account')
}

//App Notification config
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


export default function Home({ route, navigation }) {
  const userdata =  route.params; 

  //  const userdata = {
  //    user: {
  //      id: 'NSyKcq4kiFREn14XZpS2BTDhx703',
  //      username: 'testusername',
  //    }
  //  }
 
  const [activeDevice, setActiveDevice] = useState('124567890');
  const [newestData, setnewestData] = useState('');
  console.log("Route data : " + userdata.user.id)

  const [expoPushToken, setExpoPushToken] = useState('');


  const fetchUserdata = async () => {
    try {
      firebase.firestore()
      .collection('users')
      .doc(userdata.user.id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log("user data:", doc.data());
          const udata = doc.data()
    
          console.log((udata.device).length)
          if ((udata.device) != null && (udata.device).length > 0) {

            // {udata.device.map((device, index) => (  
            //   console.log(device.device_mac)
            // ))}  
            //   const i = 0;
            // while ((udata.device).length > i) {
            //   item => val === item.name
            // }

            for (var i = 0; i < (udata.device).length; i++) {
              console.log("For loop" + udata.device[i])
              if (udata.device[i].status == true) {
                console.log("If " + udata.device[i].device_mac)
                // const ad = udata.device[i].device_mac
                setActiveDevice(udata.device[i].device_mac)
                console.log("Active device " + activeDevice)
                // this.forceUpdate();
              }
            }

          }

          else {
            console.log("No devices added yet!");
          }

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
 
const fetchNewdata = async () => {
  try {
 //const actDev =  getActiveDevice(userdata.user.id);
 console.log("got active device "+ activeDevice)
 firebase.firestore()
   .collection('newest_data')
   .doc(activeDevice)
   .get()
   .then((doc) => {
     if (doc.exists) {
       const data = doc.data()
       console.log("device data:", data);
       setnewestData(data)
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


// const checkAlerts = async () => {
//   try {
    
//     if(fetchNewdata.pulserate > 120)
//       console.log("High pulse rate")
//   } catch (error) {
    
//   }
// }

    useEffect(() => {
      const interval = setInterval(() => {
        fetchUserdata();
        fetchNewdata();
      }, 10000);
      return () => clearInterval(interval);
    }, [fetchUserdata]);




    async function ImmediatePushNotification() {
      await Notifications.presentNotificationAsync({
        title: 'Look at that notification',
        body: "I'm so proud of myself!",
      });
    }
    
    const registerForPushNotificationsAsync = async() => {
        let token;
        if (Constants.isDevice) {
          const { status: existingStatus } = await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
          }
          token = (await Notifications.getExpoPushTokenAsync()).data;
          console.log(token);
        } else {
          alert('Must use physical device for Push Notifications');
        }
      
        if (Platform.OS === 'android') {
          Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          });
        }
      
        return token;
      }
    

  return (
    <View style={globalStyles.container}>
      <View style={styles.rect2}></View>
      <Center horizontal>
        <View style={styles.rect2}></View>
        <View style={styles.rect}></View>
        <View style={styles.rect10}>
          <View style={styles.icon10Row}>
            <TouchableOpacity
              onPress={(pressHandlerHome) => navigation.navigate("Home")}
            >
              <IoniconsIcon name="home" style={styles.icon10}></IoniconsIcon>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={(pressHandlerDevice) => navigation.navigate("Device")}
            >
              <IoniconsIcon name="watch" style={styles.icon11}></IoniconsIcon>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={(pressHandlerProfile) => navigation.navigate("Account")}
            >
              <IoniconsIcon name="person" style={styles.icon12}></IoniconsIcon>
            </TouchableOpacity>

          </View>
        </View>

        {/* body */}
        <View style={styles.rect6}>
          <Text style={styles.cardTitle}>Badge Center</Text>
          <View style={styles.rect7Row}>
            <View style={styles.rect7}>
              <Text style={styles.labelHr}>Heart Rate</Text>
              <View style={styles.valHrRow}>
                <Text style={styles.valHr}>{newestData.pulserate}</Text>
                <MaterialCommunityIconsIcon
                  name="cards-heart"
                  style={styles.icon5}
                ></MaterialCommunityIconsIcon>
              </View>
            </View>
            <View style={styles.rect4}>
              <Text style={styles.labelSp}>SpO2</Text>
              <View style={styles.icon6Stack}>
                <EntypoIcon name="drop" style={styles.icon6}></EntypoIcon>
                <Text style={styles.valSpo}>{newestData.spo}</Text>
              </View>
            </View>
          </View>
          <View style={styles.rect8Row}>
            <View style={styles.rect8}>
              <Text style={styles.labelTemp}>Temperature</Text>
              <View style={styles.valTempStack}>
                <Text style={styles.valTemp}>{newestData.bodytemp}</Text>
                <MaterialCommunityIconsIcon
                  name="oil-temperature"
                  style={styles.icon4}
                ></MaterialCommunityIconsIcon>
              </View>
            </View>
            <View style={styles.rect9}>
              <Text style={styles.labelHmovement}>Hand Movement</Text>
              <View style={styles.valHmovementRow}>
                <Text style={styles.valHmovement}>Yes</Text>
                <EntypoIcon name="drop" style={styles.icon3}></EntypoIcon>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.rect5}>
          <Text style={styles.hederTitle}>Hello,</Text>
          <Text style={styles.headerName}> {userdata.user.username} </Text>
          <Text style={styles.headerPlaceHolder}>How does he feel?</Text>
        </View>
      </Center>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
  },
  rect2: {
    flex: 0.5
  },
  rect6: {
    top: 218,
    width: 362,
    height: 500,
    position: "absolute",
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 40,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 0,
      height: 0
    },
    elevation: 30,
    shadowOpacity: 0.33,
    shadowRadius: 10
  },
  cardTitle: {

    color: "#121212",
    marginTop: 24,
    marginLeft: 140
  },
  rect7: {
    width: 160,
    height: 150,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 40,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 0,
      height: 0
    },
    elevation: 30,
    shadowOpacity: 0.1,
    shadowRadius: 10
  },
  labelHr: {
    color: "#121212",
    fontSize: 16,
    width: 76,
    height: 19,
    textAlign: "center",
    marginTop: 32,
    marginLeft: 42
  },
  valHr: {
    color: "#121212",
    fontSize: 35,
    width: 63,
    height: 42
  },
  icon5: {
    color: "rgba(255,3,3,1)",
    fontSize: 38,
    width: 38,
    height: 41,
    marginTop: 1
  },
  valHrRow: {
    height: 42,
    flexDirection: "row",
    marginTop: 18,
    marginLeft: 23,
    marginRight: 36
  },
  rect4: {
    width: 160,
    height: 150,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 40,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 0,
      height: 0
    },
    elevation: 30,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    marginLeft: 23
  },
  labelSp: {

    color: "#121212",
    fontSize: 16,
    width: 68,
    height: 19,
    textAlign: "center",
    marginTop: 32,
    marginLeft: 46
  },
  icon6: {
    top: 1,
    left: 64,
    position: "absolute",
    color: "rgba(255,3,3,1)",
    fontSize: 38,
    height: 41,
    width: 38
  },
  valSpo: {
    top: 0,
    left: 0,
    position: "absolute",

    color: "#121212",
    fontSize: 35,
    width: 66,
    height: 42
  },
  icon6Stack: {
    width: 102,
    height: 42,
    marginTop: 18,
    marginLeft: 27
  },
  rect7Row: {
    height: 150,
    flexDirection: "row",
    marginTop: 37,
    marginLeft: 9,
    marginRight: 10
  },
  rect8: {
    width: 160,
    height: 150,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 40,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 0,
      height: 0
    },
    elevation: 30,
    shadowOpacity: 0.1,
    shadowRadius: 10
  },
  labelTemp: {

    color: "#121212",
    fontSize: 16,
    width: 98,
    height: 19,
    textAlign: "center",
    marginTop: 36,
    marginLeft: 31
  },
  valTemp: {
    top: 0,
    left: 0,
    position: "absolute",

    color: "#121212",
    fontSize: 35,
    width: 66,
    height: 42
  },
  icon4: {
    top: 1,
    left: 73,
    position: "absolute",
    color: "rgba(255,3,3,1)",
    fontSize: 38,
    width: 38,
    height: 41
  },
  valTempStack: {
    width: 111,
    height: 42,
    marginTop: 16,
    marginLeft: 23
  },
  rect9: {
    width: 160,
    height: 150,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 40,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 0,
      height: 0
    },
    elevation: 30,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    marginLeft: 23
  },
  labelHmovement: {

    color: "#121212",
    fontSize: 16,
    textAlign: "center",
    width: 118,
    height: 19,
    marginTop: 36,
    marginLeft: 21
  },
  valHmovement: {

    color: "#121212",
    fontSize: 35,
    width: 57,
    height: 42
  },
  icon3: {
    color: "rgba(255,3,3,1)",
    fontSize: 38,
    height: 41,
    width: 38,
    marginLeft: 7,
    marginTop: 1
  },
  valHmovementRow: {
    height: 42,
    flexDirection: "row",
    marginTop: 16,
    marginLeft: 27,
    marginRight: 31
  },
  rect8Row: {
    height: 150,
    flexDirection: "row",
    marginTop: 54,
    marginLeft: 9,
    marginRight: 10
  },
  rect: {
    flex: 0.5
  },
  rect5: {
    top: 30,
    left: 0,
    width: '100%',
    height: 173,
    position: "absolute",
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
    shadowRadius: 10
  },
  hederTitle: {

    color: "rgba(255,255,255,1)",
    fontSize: 28,
    width: 260,
    height: 34,
    marginTop: 41,
    marginLeft: 48
  },
  headerName: {

    color: "rgba(255,255,255,1)",
    fontSize: 20,
    width: 264,
    height: 24,
    marginLeft: 48
  },
  headerPlaceHolder: {

    color: "rgba(255,255,255,1)",
    fontSize: 21,
    width: 264,
    height: 25,
    marginTop: 20,
    marginLeft: 48
  },
  container: {
    width: 375,
    height: 62
  },
  rect10: {
    top: 719,
    left: 0,
    width: 375,
    height: 62,
    position: "absolute",
    backgroundColor: "rgba(9,141,214,1)",

    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 0,
      height: 0
    },
    elevation: 30,
    shadowOpacity: 0.44,
    shadowRadius: 10,
    borderRadius: 95,
    flexDirection: "row",
    marginLeft: 10,
    marginTop: 30,
  },
  icon10: {
    color: "rgba(255,255,255,1)",
    fontSize: 38,
    width: 38,
    height: 41,
  },
  icon11: {
    color: "rgba(255,255,255,1)",
    fontSize: 38,
    width: 38,
    height: 41,
    marginLeft: 100
  },
  icon12: {
    marginLeft: 90,
    color: "rgba(255,255,255,1)",
    fontSize: 38,
    width: 38,
    height: 41,

  },
  icon10Row: {
    height: 44,
    flexDirection: "row",
    flex: 1,
    marginRight: 38,
    marginLeft: 39,
    marginTop: 9
  },
});

