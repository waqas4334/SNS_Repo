/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-shadow */
import React from 'react';
import { View, Platform, AppState, StatusBar } from 'react-native';
import Pusher from 'pusher-js/react-native';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { Bars } from 'react-native-loader';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withNavigation } from 'react-navigation';
import { colors } from '../../styles';
import { addNotification } from '../../redux/actions/notificationActions';
import { updateFuelSensors } from '../../redux/actions/fuelActions';
import { updateLmsSensors } from '../../redux/actions/lmsActions';
import { updateTemperature } from '../../redux/actions/temperatureActions';
import { updateColdChainSensors } from '../../redux/actions/coldChainActions';
import { updateEmSensors } from '../../redux/actions/energyActions';
import { updateTankSensors } from '../../redux/actions/tankActions';
import { updateEnvSensors } from '../../redux/actions/envActions';
import { updateTubeWellSensors } from '../../redux/actions/tubewellAction';
import { updateStreetLightSegment } from '../../redux/actions/streetLightAction';
import { updateHumidityAndTemperature } from '../../redux/actions/humidity';
import { updateSecuritySystem } from '../../redux/actions/securityAction';
import { updateRectifier } from '../../redux/actions/rectifierAction';
import { updateGeyserSensor } from '../../redux/actions/geyserAction';
import { updateGeyserHybridSensor } from '../../redux/actions/hybridgeyserAction';
import { updateTemperatureSensor } from '../../redux/actions/tempAction';
import { updateGasSensor } from '../../redux/actions/gasAction';
import { url } from '../../redux/actions/types';
import SocketIOClient from 'socket.io-client';

let socket = null;

PushNotification.createChannel(
  {
    channelId: "0", // (required)
    channelName: "My channel", // (required)
    channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
    playSound: false, // (optional) default: true
    soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
    importance: 4, // (optional) default: 4. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
  },
  (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
);

class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      appState: AppState.currentState,
    };
  }

  // eslint-disable-next-line react/sort-comp
  _onNotification() {
    // console.log(notification._alert);
  }

  async componentDidMount() {
    const {
      user,
      updateFuelSensors,
      addNotification,
      updateLmsSensors,
      updateTemperature,
      updateColdChainSensors,
      updateEmSensors,
      updateTankSensors,
      updateEnvSensors,
      updateTubeWellSensors,
      updateStreetLightSegment,
      updateHumidityAndTemperature,
      updateSecuritySystem,
      updateRectifier,
      updateGeyserSensor,
      updateGeyserHybridSensor,
      updateTemperatureSensor,
      updateGasSensor,
    } = this.props;
    AppState.addEventListener('change', this.handleAppStateChange);

    if (Platform.OS === 'ios') {
      PushNotificationIOS.addEventListener(
        'localNotification',
        this._onNotification,
      );
      // console.log('ios');
      PushNotificationIOS.requestPermissions();
    }
    //'9b2217a70e82d611972f'
    // 755d7aff214536e830c6
    // const pusher = new Pusher('755d7aff214536e830c6', {
    //   cluster: 'ap2',
    //   forceTLS: true,
    // });

    // console.log('userid',user.id)
    // channel = pusher.subscribe(`${user.id}`);
    
     socket = SocketIOClient(`${url}`);
  //   socket.on(`${user.id}-update`, (res)=>{

  //     console.log("MESSAGE-SOCKET:",res)
  //  })

   socket.on(`${user.id}-update`, data => {
      // console.log('pusherrrr', data);
      console.log("SOCKET-STATUS-------------",socket)
      if (data.type === 'fuel') {
        updateFuelSensors(data);

        if (AppState.currentState === 'background') {
          updateFuelSensors(data);
        } else {
          console.log(data);
        }
      }

      if (data.type === 'lms') {
        updateLmsSensors(data);

        if (AppState.currentState === 'background') {
          updateLmsSensors(data);
        } else {
          console.log(data);
        }
      }

      if (data.type === 'temperature') {
        updateTemperature(data);

        if (AppState.currentState === 'background') {
          updateTemperature(data);
        } else {
          console.log(data);
        }
      }

      if (data.type === 'coldChain') {
        updateColdChainSensors(data);

        if (AppState.currentState === 'background') {
          updateColdChainSensors(data);
        } else {
          console.log(data);
        }
      }
      if (data.type === 'em') {
        updateEmSensors(data);

        if (AppState.currentState === 'background') {
          updateEmSensors(data);
        } else {
          console.log(data);
        }
      }

      if (data.type === 'tank') {
        updateTankSensors(data);

        if (AppState.currentState === 'background') {
          updateTankSensors(data);
        } else {
          console.log(data);
        }
      }

      if (data.type === 'env') {
        updateEnvSensors(data);

        if (AppState.currentState === 'background') {
          updateEnvSensors(data);
        } else {
          console.log(data);
        }
      }

      if (data.type === 'tubewell') {
        updateTubeWellSensors(data);

        if (AppState.currentState === 'background') {
          updateTubeWellSensors(data);
        } else {
          console.log('data', data);
        }
      }

      if (data.type === 'st_light') {
        updateStreetLightSegment(data);

        if (AppState.currentState === 'background') {
          updateStreetLightSegment(data);
        } else {
          console.log('data', data);
        }
      }

      if (data.type === 'humidity') {
        updateHumidityAndTemperature(data);

        if (AppState.currentState === 'background') {
          updateHumidityAndTemperature(data);
        } else {
          console.log('data', data);
        }
      }

      if (data.type === 'security') {
        updateSecuritySystem(data);

        if (AppState.currentState === 'background') {
          updateSecuritySystem(data);
        } else {
          console.log('data', data);
        }
      }

      if (data.type === 'rectifier') {
        updateRectifier(data);

        if (AppState.currentState === 'background') {
          updateRectifier(data);
        } else {
          console.log('rectifer Pusher', data);
        }
      }

      if (data.type == 'geyser_system') {
        updateGeyserSensor(data);

        if (AppState.currentState === 'background') {
          updateGeyserSensor(data);
        } else {
          console.log('Geyser Pusher', data);
        }
      }
      if (data.type == 'hybrid_geyser_system') {
        updateGeyserHybridSensor(data);
        console.log('Hybrid Geyser Pusher', data);

        if (AppState.currentState === 'background') {
          updateGeyserHybridSensor(data);
         
        } else {
          console.log('Hybrid Geyser Pusher', data);
        }
      }

      if (data.type === 'tempsys') {
        updateTemperatureSensor(data);

        if (AppState.currentState === 'background') {
          updateTemperatureSensor(data);
        } else {
          console.log('Temperature System', data);
        }
      }

      if (data.type === 'gassys') {
        updateGasSensor(data);

        if (AppState.currentState === 'background') {
          updateGasSensor(data);
        } else {
          console.log('Gas System', data);
        }
      }
    });
   
    socket.on(`${user.id}-notification`, data => {
      addNotification(data);
      if (AppState.currentState === 'background'){
      if (Platform.OS === 'android') {
        PushNotification.localNotification({
          /* Android Only Properties */
          channelId:'0',
          id: '0', // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
          ticker: 'Notification', // (optional)
          autoCancel: true, // (optional) default: true
          largeIcon: 'ic_launcher', // (optional) default: "ic_launcher"
          smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher"
          bigText: data.title, // (optional) default: "message" prop
          // subText: "This is a subText", // (optional) default: none
          color: '#ffffff', // (optional) default: system default
          vibrate: true, // (optional) default: true
          vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
          tag: 'some_tag', // (optional) add tag to message
          group: 'group', // (optional) add group to message
          ongoing: false, // (optional) set whether this is an "ongoing" notification
          priority: 'high', // (optional) set notification priority, default: high
          visibility: 'private', // (optional) set notification visibility, default: private
          importance: 'high', // (optional) set notification importance, default: high

          /* iOS and Android properties */
          title: 'Notification', // (optional)
          message: data.title, // (required)
          playSound: true, // (optional) default: true
          soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
          number: '10', // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
          // repeatType: 'day', // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
          // actions: '["Yes", "No"]',  // (Android only) See the doc for notification actions to know more
        });
      } else if (Platform.OS === 'ios') {
        PushNotificationIOS.presentLocalNotification({
          alertTitle: 'Notification', // (optional)
          alertBody: data.title, // (required)
          soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
          // number: '10', // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
        });
      }
      
  }});

   

    this.setState({
      loading: false,
    });
    this.props.navigation.navigate('Home Page');
    // this.props.navigation.navigate(user.dashboards[0].title);
  }

  // componentWillUnmount() {
  //   AppState.removeEventListener('change', this.handleAppStateChange);

  //   channel.unbind();
  //   channel.unbind('notification');
  // }

  handleAppStateChange = appState => {
    console.log(appState);
    if (appState === 'background') {
      console.log('app is in background');
    } else {
      console.log('app is in foreground');
    }
  };

  render() {
    const { loading } = this.state;
    if (loading === true) {
      return (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Bars size={15} color={colors.primary} />
        </View>
      );
    }

    return (
      <View>
        <StatusBar backgroundColor="#3b35ac" barStyle="light-content" />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  notification: state.notification.notifications,
});

export default compose(
  connect(mapStateToProps, {
    updateFuelSensors,
    addNotification,
    updateLmsSensors,
    updateTemperature,
    updateColdChainSensors,
    updateEmSensors,
    updateTankSensors,
    updateEnvSensors,
    updateTubeWellSensors,
    updateStreetLightSegment,
    updateHumidityAndTemperature,
    updateSecuritySystem,
    updateRectifier,
    updateGeyserSensor,
    updateGeyserHybridSensor,
    updateTemperatureSensor,
    updateGasSensor,
  }),
  withNavigation,
)(Notification);
