import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, View } from 'react-native';


export default function App() {
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cityContainer}>
        <Text>Vallauris</Text>
      </View>
      <View style={styles.weatherContainer}>
      <Text></Text>
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

  cityContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  weatherContainer: {
    flex: 2,
    backgroundColor: "#E8E4DF",
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15,
    marginVertical: 50,
    borderRadius: 20,
  }
});
