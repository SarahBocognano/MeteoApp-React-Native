import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, View, Image } from 'react-native';
import {useState, useEffect} from 'react';

export default function Atelier1 () {
    const [weather, setWeather] = useState({})

  useEffect(() => {
    getWeather();
  }, []);
    
  const getWeather = async ()=>{
    try {
    const response = await fetch(
      'https://api.openweathermap.org/data/2.5/weather?q=vallauris&appid=yourApiID&units=metric'
      );
    const data = await response.json();
    console.log(data)
    setWeather(data)
  }
    catch (error) {
      console.log(error)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cityContainer}>
        <Text style={styles.Text}>{weather.name}</Text>
        <Text style={styles.Text2}>{weather.main?.temp} °</Text>
        <Text style={styles.Text3}>Ressenti {weather.main?.feels_like} °</Text>
        <Image source={{uri:"http://openweathermap.org/img/wn/01d@2x.png"}} style={{width: 50, height: 50}} />
        <Text style={styles.Text2}>{weather.weather?.[0]?.description}</Text>
      </View>
      <View style={styles.weatherContainer}>
        <View style={styles.previsionTop}>
          <Text>PREVISION SUR 10 JOURS</Text>
        </View>
        <View style={styles.previsionStyle}>
          <View style={{flex:1, flexDirection: "row"}}>
          <Text style={styles.Text3}>Aujourd'hui</Text>
          <Image source={{uri:"http://openweathermap.org/img/wn/01d@2x.png"}} style={{width: 40, height: 20}} />
          </View>
          <Text style={styles.Text2}>{weather.main?.temp} °</Text>
        </View>
        <View style={styles.previsionStyle}>
          <View style={{flex:1, flexDirection: "row"}}>
          <Text style={styles.Text3}>Jeudi</Text>
          <Image source={{uri:"http://openweathermap.org/img/wn/09d@2x.png"}} style={{width: 40, height: 20}} />
          </View>
          <Text style={styles.Text2}>{weather.main?.temp} °</Text>
        </View>
        <View style={styles.previsionStyle}>
        <View style={{flex:1, flexDirection: "row"}}>
          <Text style={styles.Text3}>Vendredi</Text>
          <Image source={{uri:"http://openweathermap.org/img/wn/10d@2x.png"}} style={{width: 40, height: 20}} />
        </View>
            <Text style={styles.Text2}>{weather.main?.temp} °</Text>
        </View>
        <View style={styles.previsionStyle}>
        <View style={{flex:1, flexDirection: "row"}}>
          <Text style={styles.Text3}>Samedi</Text>
          <Image source={{uri:"http://openweathermap.org/img/wn/01d@2x.png"}} style={{width: 40, height: 20}} />
          </View>
          <Text style={styles.Text2}>{weather.main?.temp} °</Text>
        </View>
        <View style={styles.previsionStyle}>
        <View style={{flex:1, flexDirection: "row"}}>
          <Text style={styles.Text3}>Dimanche</Text>
          <Image source={{uri:"http://openweathermap.org/img/wn/02d@2x.png"}} style={{width: 40, height: 20}} />
        </View>
          <Text style={styles.Text2}>{weather.main?.temp} °</Text>
        </View>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}


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
    marginVertical: 50,
    borderRadius: 20,
  },

  previsionTop: {
    padding: 10,
    borderColor: "black",
    borderBottomWidth: 1,
  },

  previsionStyle: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 15,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderColor: "black",
    borderBottomWidth: 1,
  },

});
