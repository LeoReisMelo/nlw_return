import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { theme } from './src/theme';
import Widget from './src/components/Widget'
import { useFonts, Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter'
import * as SplashScreen from 'expo-splash-screen';

export default function App() {
  const fontsLoaded = useFonts({
    Inter_400Regular, Inter_500Medium
  });

  if (!fontsLoaded) {
   SplashScreen.preventAutoHideAsync();
  } else {
    SplashScreen.hideAsync();
  }

  return (
    <View style={{
      flex: 1,
      backgroundColor: theme.colors.background,
    }}>

      <StatusBar
      style="light"
      backgroundColor="transparent"
      translucent
       />

       <Widget />
    </View>
  );
}
