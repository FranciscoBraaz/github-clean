import { SafeAreaView, StyleSheet, StatusBar, LogBox } from 'react-native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/contexts/AuthContext';
import Routes from './src/routes';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#292929',
  },
};

export default function App() {
  LogBox.ignoreLogs(['Remote debugger']);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        marginTop: StatusBar.currentHeight,
      }}
    >
      <StatusBar barStyle="light-content" translucent />
      <NavigationContainer theme={MyTheme}>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
