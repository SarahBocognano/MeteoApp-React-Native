import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, View, Image, Button } from 'react-native';
import {useState, useEffect} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from 'expo-location';

export default function Atelier2() {

//-----------------LOCALISATION-----------------//

const [location, setLocation] = useState({});

useEffect(() => {
    (async () => {
        let status = await Location.requestForegroundPermissionsAsync();

        if (status.granted === false) {
            console.log("permission denied");
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        console.log(location);
        setLocation(location);
    })();
}, []);


//-----------------FETCH API-----------------//

    const [weather, setWeather] = useState({})

    useEffect(async() => {

        if (location.coords == undefined) {
            return
        }
        try {
        //----------------- RECUPERATION ASYNC STORAGE-----------------//
            const data = JSON.parse(await AsyncStorage.getItem("@weatherData"));
        //------------------------------------------------------------//   
            if(data) {
                setWeather(data);
            } else {
                getWeather();
            }
        } catch(e) {
            console.log(e)
        }
    }, [location]);
    

    const getWeather = async ()=>{
      try {
      const response = await fetch(
        'https://api.openweathermap.org/data/2.5/forecast?lat=' + location.coords.latitude + '&lon=' + location.coords.longitude + '&cnt=6&appid=yourAPIID&units=metric'
        );
      const data = await response.json();

      if(!data) {
          throw new Error();
      }
      //----------------- ASYNC STORAGE-----------------//
      await AsyncStorage.setItem('@weatherData', JSON.stringify(data))
      //-----------------------------------------------//

      setWeather(data)
    }
      catch (error) {
        console.log(error)
      }
    }


          



//-----------------MAP DU FETCH/API-----------------//

    const weatherList = () => {
        if (Array.isArray(weather.list)) {
            const content = weather.list.map((element, index) => {
            return (
                <View key={index}>
                    <View>
                    <View style={styles.previsionTop}> 
                        <Text style={styles.Text2}>Ville: {location.timestamp}</Text>
                        <Text>Descriptif: {element.weather[0].description}</Text>
                        <Text>Température: {element.main.temp} °c
                            <Image source={{uri:"http://openweathermap.org/img/wn/" + element.weather[0].icon + "@2x.png"}} style={{width: 40, height: 20}} />
                        </Text> 
                    </View>
                    </View>
                </View>
                );
            });

            return content;
        }
    };



    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.weatherContainer}>
                <Text style={styles.Text3}>PREVISION SUR 5 JOURS</Text>
                <View>{weatherList()}</View>
                <View style={{marginVertical: 10,}}><Button onPress={getWeather} title="Refresh" /></View>
            </View>
        </SafeAreaView>
    )
}

//--------------------------STYLE--------------------------//

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
    },
  
    Text: {
      fontSize: 40,
    },
  
    Text2: {
      fontSize: 25,
    },
  
    Text3: {
      fontSize: 20,
      textAlign: "center",
      marginVertical: 50,
      borderBottomColor: "black",
    },
  
    cityContainer: {
      flex: 1,
      backgroundColor: "#E8E4DF",
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 15,
      marginTop: 15,
      borderRadius: 20,
    },
  
    weatherContainer: {
      flex: 2,
      backgroundColor: "#E8E4DF",
      marginHorizontal: 15,
      marginVertical: 30,
      borderRadius: 20,
    },
  
    previsionTop: {
      padding: 10,
      borderColor: "black",
      borderBottomWidth: 1,
    },
  
    previsionStyle: {
      flex: 1,
      marginVertical: 15,
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderColor: "black",
      borderBottomWidth: 1,
    },
  
  });
  
