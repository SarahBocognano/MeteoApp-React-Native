import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, View, Image } from 'react-native';
import {useState, useEffect} from 'react';
import Atelier1 from "./components/Atelier1";
import Atelier2 from './components/Atelier2';
import Atelier3 from './components/Atelier3';


export default function App(){
  
  return (
      <Atelier1 />
      //<Atelier2 />
      //<Atelier3 />
  )
  }