import { StyleSheet, Text, SafeAreaView, View, Image, Button } from 'react-native';
import {useState, useEffect} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from 'expo-location';
import { LinearGradient } from 'expo-linear-gradient';

export default function Météo () {

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
    }, []);
    

    const getWeather = async ()=>{
      try {
      const response = await fetch(
        'https://api.openweathermap.org/data/2.5/weather?q=vallauris&appid=c4b61289ffdb78e46a0ae0d966caf5b5&units=metric'
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
                        <Text>{weather.name}</Text>
                        <Text>{element.weather.main}</Text>
                        <Text>{element.main.temp} °c</Text>
                        <Text>{element.main.temp_min} °c - {element.main.temp_max} °c</Text>
                        <Text>Vent - Vitesse(km/h) {element.wind.speed} - Direction {element.wind.deg}</Text>
                        <Text>Taux Humidité : {element.main.humidity}</Text>
                    </View>
                </View>
            )
        })
            return content;
        }
    }

    return(
        <SafeAreaView>
            <View style={style.container}>
                <Text>{weatherList()}</Text>
            </View>
        </SafeAreaView>
    )
}

//--------------------STYLE--------------------//

const style = StyleSheet.create({
    container: {
     
    },
})