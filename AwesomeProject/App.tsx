/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  Alert,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import ScanbotSDK, { DocumentScannerConfiguration, InitializationOptions } from 'react-native-scanbot-sdk';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

const initScanbotSdk = async () => {
  const options: InitializationOptions = {
    licenseKey: '',
    loggingEnabled: true, // Consider switching logging OFF in production builds for security and performance reasons!
    documentDetectorMode: 'ML_BASED',
  };
  
  try {
    const result = await ScanbotSDK.initializeSDK(options);
    console.log(result);
  } catch (e: any) {
    console.error('Error initializing Scanbot SDK:', e.message);
  }
}

const startDocumentScanner = async () => {
  const config: DocumentScannerConfiguration = {
    // Customize colors, text resources, etc..
    polygonColor: '#00ffff',
    bottomBarBackgroundColor: Colors.SCANBOT_RED,
    topBarBackgroundColor: Colors.SCANBOT_RED,
    cameraBackgroundColor: Colors.SCANBOT_RED,
    orientationLockMode: 'PORTRAIT',
    pageCounterButtonTitle: '%d Page(s)',
    multiPageEnabled: true,
    ignoreBadAspectRatio: true,
    // documentImageSizeLimit: { width: 2000, height: 3000 },
    // maxNumberOfPages: 3,
    // See further config properties ...
  };

  const result = await ScanbotSDK.UI.startDocumentScanner(config);
  if (result.status === 'OK') {
    console.log(JSON.stringify(result));
  }
}

function App(): JSX.Element {

  initScanbotSdk();

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Button
            title="Press me"
            onPress={
              startDocumentScanner
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
