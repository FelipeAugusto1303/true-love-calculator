import React from 'react';
import {
  StyleSheet
} from 'react-native';
import {
  SafeAreaView
} from 'react-native-safe-area-context'
import {
  AdMobBanner
} from 'expo-ads-admob'

import LoveCalculator from './components/LoveCalculator';

const App = () => {
  return(
    <SafeAreaView style={styles.container}>
      <LoveCalculator/>
      <AdMobBanner
        bannerSize="fullBanner"
        adUnitID="ca-app-pub-4472696892557860/7507150193" // Test ID, Replace with your-admob-unit-id
        servePersonalizedAds // true or false
        onDidFailToReceiveAdWithError={(error) => console.log(error)} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor:'#c71e72'
  }
})

export default App;