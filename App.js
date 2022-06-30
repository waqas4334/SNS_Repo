import { Provider } from 'react-redux';
import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet,Text } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { colors } from './src/styles';
import { store, persistor } from './src/redux/store';
import SocketIOClient from 'socket.io-client';
import 'react-native-gesture-handler';
import Navigation from './src/modules/navigation/RootNavigation';


const App: () => React$Node = () => {
  // eslint-disable-next-line no-undef
  window.navigator.userAgent = 'react-native';
  // useEffect ( () => {
  //  // https://hybrid.testserver.rubitronlabs.org
  //   // this.socket = SocketIOClient('https://0c02-2400-adc5-1d9-3400-18ae-9040-28b1-9abf.in.ngrok.io');
   
  //   // this.socket.on('connection', () => console.log('connected'));
  //   // this.socket.on('disconnect', () => console.log('disconnected'));

  //   // this.socket.on("60361cc210b0e615272d992a-update", (roomId)=>{
  //   //   console.log("message form socket.io:"+roomId)
  // //  })
  // // var socket = SocketIOClient('https://rtl.in.ngrok.io');
  // // console.log(socket);
  // // socket.on('connection', () => console.log('connected'));
  // },[])
  // var socket = SocketIOClient('https://rtl.in.ngrok.io');
  // console.log(socket);
  // socket.on('connection', () => console.log('connected'));
  return (
    <Provider store={store}>
      {/* <Text>Socket.io</Text> */}
      <PersistGate
        loading={(
          <View style={styles.container}>
            <ActivityIndicator color={colors.red} />
          </View>
        )}
        persistor={persistor}
      >
        <Navigation />
      </PersistGate>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
