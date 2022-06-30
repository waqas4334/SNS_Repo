import React from 'react';
import { Image } from 'react-native';
import { createAppContainer, createStackNavigator, createSwitchNavigator,createDrawerNavigator } from 'react-navigation';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import FuelTabNavigator from './FuelTabNavigator';
import LiquidTabNavigator from './LiquidTabNavigator';
import TemperatureTabNavigator from './TemperatureTabNavigator';
import ColdChainTabNavigator from './ColdChainTabNavigator';
import WaterQualityTabNavigator from './WaterQualityTabNavigator';
import AssetTrackingTabNavigator from './AssetTrackingTabNavigator';
import EnergyTabNavigator from './EnergyTabNavigator';
import TankTabNavigator from './TankTabNavigator';
import EnvTabNavigator from './EnvTabNavigator';
import TubeWellTabNavigator from './TubeWellTabNavigator';
import SmartLightTabNavigator from './smartLightTabNavigator';
import HumidityAndTemperatureTabNavigator from './humidityAndTemperatureTabNavigator';
import SecurityTabNavigator from './securityTabNavigator';
import RectifierTabNavigator from './RectifierTabNavigator';
import GeyserTabNavigator from './geyserTabNavigator';
import TemperaTureSysTemTabNavigator from './TemperaTureSysTemTabNavigator';
import GasTabNavigator from './GasTabNavigator';
import hybridGeyserTabNavigator from './hybridGeyserTabNavigator';
import ProfileScreen from '../profile/ProfileViewContainer';
import AuthScreen from '../auth/AuthViewContainer';
import AuthLoadingScreen from '../auth/AuthLoadingScreen';
import HelpScreen from '../help/HelpHomeViewContainer';
import ShareScreen from '../share/ShareHomeViewContainer';
import NotificationScreen from '../notifications/NotificationsViewContainer';
import NavigationDrawerStructure from './NavigationDrawerStructure';
import NotificationIcon from './NotificationIcon';
import Notification from './notification';
import Socketss from './Socket';
import LogsScreen from '../FuelMonitoringSystem/maintananceLogs/LogsViewContainer';
import drawerContentComponents from './drawerContentComponents';
import Test from '../test';
import SignUP from '../auth/SignIn';
import HomeHeaderSturcture from './HomeHeaderSturcture';
import changePassword from '../profile/changePassWord';
const headerBackground = require('../../../assets/images/topBarBg.png');



const AuthStack = createStackNavigator({
  Auth: {
    screen: AuthScreen,
    navigationOptions: {
      header: null,
    },      
  },
 
  
},
{
  defaultNavigationOptions: () => ({
   
  }),
},

);
// eslint-disable-next-line camelcase
const Notification_StackNavigator = createStackNavigator({
  // All the screen from the FuelMonitoring will be indexed here
  Notification: {
    screen: NotificationScreen,
    // eslint-disable-next-line no-unused-vars
    navigationOptions: ({ navigation }) => ({
      header: null
    }),
  },
});

const HomePage_StackNavigator = createStackNavigator({
  // Home Page
  
  HomePage: {
    screen: Test,
    navigationOptions: ({ navigation }) => ({
      // title: 'Systems',
      headerLeft: <HomeHeaderSturcture navigationProps={navigation} />,
      // headerRight: <NotificationIcon 
      // navigationProps={navigation} 
      // />,
      headerStyle: {
        // backgroundColor: '#fff', 
        borderBottomLeftRadius:20,borderBottomRightRadius:20,
        height: hp('30%')
      },
      headerBackground: (
        <Image
          style={{ flex: 1 , width: wp('100%'),
          borderBottomLeftRadius:20,borderBottomRightRadius:20
        }}
        
          source={headerBackground}
          resizeMode="cover"
           

        />
      ),
      headerTintColor: '#fff',
      headerTitleStyle:{
        fontSize: hp('2%'),
        fontWeight: 'bold',
        borderadius:10
      }
    }),
  },

  Notification: {
    screen: Notification_StackNavigator,
    navigationOptions: () => ({
      title: 'Notifications',
      headerStyle: {
        // backgroundColor: '#FF9800',
        height: hp('7%')
      },
      headerBackground: (
        <Image
          style={{ flex: 1 , width: wp('100%')}}
          source={headerBackground}
          resizeMode="cover"
        />
      ),
      headerTintColor: '#fff',
      headerTitleStyle:{
        fontSize: hp('2%'),
        fontWeight: 'bold'
      }
    }),
  }

});


// eslint-disable-next-line camelcase
const FuelMonitoring_StackNavigator = createStackNavigator({
  // All the screen from the FuelMonitoring will be indexed here
  
  FuelMonitoring: {
    screen: FuelTabNavigator,
    navigationOptions: ({ navigation }) => ({
      title: 'Fuel Monitoring System',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <NotificationIcon navigationProps={navigation} />,
      headerStyle: {
        // backgroundColor: '#fff',
        height: hp('7%')
      },
      headerBackground: (
        <Image
          style={{ flex: 1, width: wp('100%') }}
          source={headerBackground}
          resizeMode="cover"
        />
      ),
      headerTintColor: '#fff',
      headerTitleStyle:{
        fontSize: hp('2%'),
        fontWeight: 'bold'
      }
    }),
  },
  Notification: {
    screen: Notification_StackNavigator,
    // eslint-disable-next-line no-empty-pattern
    navigationOptions: () => ({
      title: 'Notifications',
      headerStyle: {
        // backgroundColor: '#FF9800',
        height: hp('7%')
      },
      headerBackground: (
        <Image
          style={{ flex: 1, width: wp('100%') }}
          source={headerBackground}
          resizeMode="cover"
        />
      ),
      headerTintColor: '#fff',
      headerTitleStyle:{
        fontSize: hp('2%'),
        fontWeight: 'bold'
      }
    }),
  },
  MaintenanceLogs: {
    screen: LogsScreen,
    navigationOptions: () => ({
      title: 'Maintenance Logs',
      headerStyle: {
        // backgroundColor: '#FF9800',
        height: hp('7%')
      },
      headerBackground: (
        <Image
          style={{ flex: 1, width: wp('100%') }}
          source={headerBackground}
          resizeMode="cover"
        />
      ),
      headerTintColor: '#fff',
      headerTitleStyle:{
        fontSize: hp('2%'),
        fontWeight: 'bold'
      }
    }),
  }

});

// eslint-disable-next-line camelcase
const LiquidMonitoring_StackNavigator = createStackNavigator({
  // All the screen from the TemperatureMonitoring will be indexed here
  LiquidMonitoring: {
    screen: LiquidTabNavigator,
    navigationOptions: ({ navigation }) => ({
      title: 'Smart Farm Fisheries',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <NotificationIcon navigationProps={navigation} />,
      headerStyle: {
        // backgroundColor: '#FF9800',
        height: hp('7%')
      },
      headerBackground: (
        <Image
          style={{ flex: 1 , width: wp('100%')}}
          source={headerBackground}
          resizeMode="cover"
        />
      ),
      headerTintColor: '#fff',
      headerTitleStyle:{
        fontSize: hp('2%'),
        fontWeight: 'bold'
      }
    }),
  },

  Notification: {
    screen: Notification_StackNavigator,
    navigationOptions: () => ({
      title: 'Notifications',
      headerStyle: {
        // backgroundColor: '#FF9800',
        height: hp('7%')
      },
      headerBackground: (
        <Image
          style={{ flex: 1 , width: wp('100%')}}
          source={headerBackground}
          resizeMode="cover"
        />
      ),
      headerTintColor: '#fff',
      headerTitleStyle:{
        fontSize: hp('2%'),
        fontWeight: 'bold'
      }
    }),
  }

});

// eslint-disable-next-line camelcase
const TemperatureMonitoring_StackNavigator = createStackNavigator({
  // All the screen from the TemperatureMonitoring will be indexed here
  TemperatureMonitoring: {
    screen: TemperatureTabNavigator,
    navigationOptions: ({ navigation }) => ({
      title: 'Temperature Monitoring System',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <NotificationIcon navigationProps={navigation} />,
      headerStyle: {
        // backgroundColor: '#FF9800',
        height: hp('7%')
      },
      headerBackground: (
        <Image
          style={{ flex: 1 , width: wp('100%')}}
          source={headerBackground}
          resizeMode="cover"
        />
      ),
      headerTintColor: '#fff',
      headerTitleStyle:{
        fontSize: hp('2%'),
        fontWeight: 'bold'
      }
    }),
  },

  Notification: {
    screen: Notification_StackNavigator,
    navigationOptions: () => ({
      title: 'Notifications',
      headerStyle: {
        // backgroundColor: '#FF9800',
        height: hp('7%')
      },
      headerBackground: (
        <Image
          style={{ flex: 1 , width: wp('100%')}}
          source={headerBackground}
          resizeMode="cover"
        />
      ),
      headerTintColor: '#fff',
      headerTitleStyle:{
        fontSize: hp('2%'),
        fontWeight: 'bold'
      }
    }),
  }

});

// eslint-disable-next-line camelcase
const ColdChainMonitoring_StackNavigator = createStackNavigator({
  // All the screen from the TemperatureMonitoring will be indexed here
  ColdChainMonitoring: {
    screen: ColdChainTabNavigator,
    navigationOptions: ({ navigation }) => ({
      title: 'Cold Chain Monitoring System',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <NotificationIcon navigationProps={navigation} />,
      headerStyle: {
        // backgroundColor: '#FF9800',
        height: hp('7%')
      },
      headerBackground: (
        <Image
          style={{ flex: 1 , width: wp('100%')}}
          source={headerBackground}
          resizeMode="cover"
        />
      ),
      headerTintColor: '#fff',
      headerTitleStyle:{
        fontSize: hp('2%'),
        fontWeight: 'bold'
      }
    }),
  },

  Notification: {
    screen: Notification_StackNavigator,
    navigationOptions: () => ({
      title: 'Notifications',
      headerStyle: {
        // backgroundColor: '#FF9800',
        height: hp('7%')
      },
      headerBackground: (
        <Image
          style={{ flex: 1 , width: wp('100%')}}
          source={headerBackground}
          resizeMode="cover"
        />
      ),
      headerTintColor: '#fff',
      headerTitleStyle:{
        fontSize: hp('2%'),
        fontWeight: 'bold'
      }
    }),
  }

});

// eslint-disable-next-line camelcase
const WaterQualityMonitoring_StackNavigator = createStackNavigator({
  // All the screen from the TemperatureMonitoring will be indexed here
  WaterQualityMonitoring: {
    screen: WaterQualityTabNavigator,
    navigationOptions: ({ navigation }) => ({
      title: 'Water Quality Monitoring System',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <NotificationIcon navigationProps={navigation} />,
      headerStyle: {
        // backgroundColor: '#FF9800',
        height: hp('7%')
      },
      headerBackground: (
        <Image
          style={{ flex: 1 , width: wp('100%')}}
          source={headerBackground}
          resizeMode="cover"
        />
      ),
      headerTintColor: '#fff',
      headerTitleStyle:{
        fontSize: 15,
        fontWeight: 'bold'
      }
    }),
  },

  Notification: {
    screen: Notification_StackNavigator,
    navigationOptions: () => ({
      title: 'Notifications',
      headerStyle: {
        // backgroundColor: '#FF9800',
        height: hp('7%')
      },
      headerBackground: (
        <Image
          style={{ flex: 1 , width: wp('100%')}}
          source={headerBackground}
          resizeMode="cover"
        />
      ),
      headerTintColor: '#fff',
      headerTitleStyle:{
        fontSize: hp('2%'),
        fontWeight: 'bold'
      }
    }),
  }

});

// eslint-disable-next-line camelcase
const AssetTrackingMonitoring_StackNavigator = createStackNavigator({
  // All the screen from the TemperatureMonitoring will be indexed here
  AssetTrackingMonitoring: {
    screen: AssetTrackingTabNavigator,
    navigationOptions: ({ navigation }) => ({
      title: 'Fixed Asset Tracking System',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <NotificationIcon navigationProps={navigation} />,
      headerStyle: {
        // backgroundColor: '#FF9800',
        height: hp('7%')
      },
      headerBackground: (
        <Image
          style={{ flex: 1 , width: wp('100%')}}
          source={headerBackground}
          resizeMode="cover"
        />
      ),
      headerTintColor: '#fff',
      headerTitleStyle:{
        fontSize: hp('2%'),
        fontWeight: 'bold'
      }
    }),
  },

  Notification: {
    screen: Notification_StackNavigator,
    navigationOptions: () => ({
      title: 'Notifications',
      headerStyle: {
        // backgroundColor: '#FF9800',
        height: hp('7%')
      },
      headerBackground: (
        <Image
          style={{ flex: 1 , width: wp('100%')}}
          source={headerBackground}
          resizeMode="cover"
        />
      ),
      headerTintColor: '#fff',
      headerTitleStyle:{
        fontSize: hp('2%'),
        fontWeight: 'bold'
      }
    }),
  }

});

// eslint-disable-next-line camelcase
const EnergyMonitoring_StackNavigator = createStackNavigator({
  // All the screen from the TemperatureMonitoring will be indexed here
  EnergyMonitoring: {
    screen: EnergyTabNavigator,
    navigationOptions: ({ navigation }) => ({
      title: 'Energy Monitoring System',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <NotificationIcon navigationProps={navigation} />,
      headerStyle: {
        // backgroundColor: '#FF9800',
        height: hp('7%')
      },
      headerBackground: (
        <Image
          style={{ flex: 1 , width: wp('100%')}}
          source={headerBackground}
          resizeMode="cover"
        />
      ),
      headerTintColor: '#fff',
      headerTitleStyle:{
        fontSize: hp('2%'),
        fontWeight: 'bold'
      }
    }),
  },

  Notification: {
    screen: Notification_StackNavigator,
    navigationOptions: () => ({
      title: 'Notifications',
      headerStyle: {
        // backgroundColor: '#FF9800',
        height: hp('7%')
      },
      headerBackground: (
        <Image
          style={{ flex: 1 , width: wp('100%')}}
          source={headerBackground}
          resizeMode="cover"
        />
      ),
      headerTintColor: '#fff',
      headerTitleStyle:{
        fontSize: hp('2%'),
        fontWeight: 'bold'
      }
    }),
  }

});

// eslint-disable-next-line camelcase
const EnvironmentMonitoring_StackNavigator = createStackNavigator({
  // All the screen from the TemperatureMonitoring will be indexed here
  EnvironmentMonitoring: {
    screen: EnvTabNavigator,
    navigationOptions: ({ navigation }) => ({
      title: 'Environment Monitoring System',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <NotificationIcon navigationProps={navigation} />,
      headerStyle: {
        // backgroundColor: '#FF9800',
        height: hp('7%')
      },
      headerBackground: (
        <Image
          style={{ flex: 1 , width: wp('100%')}}
          source={headerBackground}
          resizeMode="cover"
        />
      ),
      headerTintColor: '#fff',
      headerTitleStyle:{
        fontSize: hp('2%'),
        fontWeight: 'bold'
      }
    }),
  },

  Notification: {
    screen: Notification_StackNavigator,
    navigationOptions: () => ({
      title: 'Notifications',
      headerStyle: {
        // backgroundColor: '#FF9800',
        height: hp('7%')
      },
      headerBackground: (
        <Image
          style={{ flex: 1 , width: wp('100%')}}
          source={headerBackground}
          resizeMode="cover"
        />
      ),
      headerTintColor: '#fff',
      headerTitleStyle:{
        fontSize: hp('2%'),
        fontWeight: 'bold'
      }
    }),
  }

});


// eslint-disable-next-line camelcase
const Profile_StackNavigator = createStackNavigator({
  // All the screen from the Profile will be indexed here
  Profile: {
    screen: ProfileScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Profile',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <NotificationIcon navigationProps={navigation} />,
      headerStyle: {
        // backgroundColor: '#FF9800',
        height: hp('7%')
      },
      headerBackground: (
        <Image
          style={{ flex: 1 , width: wp('100%')}}
          source={headerBackground}
          resizeMode="cover"
        />
      ),
      headerTintColor: '#fff',
      headerTitleStyle:{
        fontSize: hp('2%'),
        fontWeight: 'bold'
      }
    }),
  },

  Notification: {
    screen: Notification_StackNavigator,
    navigationOptions: () => ({
      title: 'Notifications',
      headerStyle: {
        // backgroundColor: '#FF9800',
        height: hp('7%')
      },
      headerBackground: (
        <Image
          style={{ flex: 1 }}
          source={headerBackground}
          resizeMode="cover"
        />
      ),
      headerTintColor: '#fff',
      headerTitleStyle:{
        fontSize: hp('2%'),
        fontWeight: 'bold'
      }
    }),
  }

});

// eslint-disable-next-line camelcase
const Share_StackNavigator = createStackNavigator({
  Share: {
    screen: ShareScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Tell a Friend',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,

      headerStyle: {
        // backgroundColor: '#FF9800',
        height: hp('7%')
      },
      headerBackground: (
        <Image
          style={{ flex: 1 , width: wp('100%')}}
          source={headerBackground}
          resizeMode="cover"
        />
      ),
      headerTintColor: '#fff',
      headerTitleStyle:{
        fontSize: hp('2%'),
        fontWeight: 'bold'
      }
    }),
  },
});

// eslint-disable-next-line camelcase
const Help_StackNavigator = createStackNavigator({
  Help: {
    screen: HelpScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Help and Feedback',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,

      headerStyle: {
        // backgroundColor: '#FF9800',
        height: hp('7%')
      },
      headerBackground: (
        <Image
          style={{ flex: 1 , width: wp('100%')}}
          source={headerBackground}
          resizeMode="cover"
        />
      ),
      headerTintColor: '#fff',
      headerTitleStyle:{
        fontSize: hp('2%'),
        fontWeight: 'bold'
      }
    }),
  },
});

// eslint-disable-next-line camelcase
const Tank_StackNavigator = createStackNavigator({
  // All the screen from the TemperatureMonitoring will be indexed here
  TankMonitoring: {
    screen: TankTabNavigator,
    navigationOptions: ({ navigation }) => ({
      title: 'Water Tank System',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <NotificationIcon navigationProps={navigation} />,
      headerStyle: {
        // backgroundColor: '#FF9800',
        height: hp('7%')
      },
      headerBackground: (
        <Image
          style={{ flex: 1 , width: wp('100%')}}
          source={headerBackground}
          resizeMode="cover"
        />
      ),
      headerTintColor: '#fff',
      headerTitleStyle:{
        fontSize: hp('2%'),
        fontWeight: 'bold'
      }
    }),
  },

  Notification: {
    screen: Notification_StackNavigator,
    navigationOptions: () => ({
      title: 'Notifications',
      headerStyle: {
        // backgroundColor: '#FF9800',
        height: hp('7%')
      },
      headerBackground: (
        <Image
          style={{ flex: 1 , width: wp('100%')}}
          source={headerBackground}
          resizeMode="cover"
        />
      ),
      headerTintColor: '#fff',
      headerTitleStyle:{
        fontSize: hp('2%'),
        fontWeight: 'bold'
      }
    }),
  }

});

const TubeWell_StackNavigator = createStackNavigator({
  // All the screen from the TemperatureMonitoring will be indexed here
  TubeWell: {
    screen: TubeWellTabNavigator,
    navigationOptions: ({ navigation }) => ({
      title: 'TubeWell Monitoring System',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <NotificationIcon navigationProps={navigation} />,
      headerStyle: {
        // backgroundColor: '#FF9800',
        height: hp('7%')
      },
      headerBackground: (
        <Image
          style={{ flex: 1 , width: wp('100%')}}
          source={headerBackground}
          resizeMode="cover"
        />
      ),
      headerTintColor: '#fff',
      headerTitleStyle:{
        fontSize: hp('2%'),
        fontWeight: 'bold'
      }
    }),
  },

  Notification: {
    screen: Notification_StackNavigator,
    navigationOptions: () => ({
      title: 'Notifications',
      headerStyle: {
        // backgroundColor: '#FF9800',
        height: hp('7%')
      },
      headerBackground: (
        <Image
          style={{ flex: 1 , width: wp('100%')}}
          source={headerBackground}
          resizeMode="cover"
        />
      ),
      headerTintColor: '#fff',
      headerTitleStyle:{
        fontSize: hp('2%'),
        fontWeight: 'bold'
      }
    }),
  }

});

const SmartLighting_StackNavigator = createStackNavigator({
  // All the screen from the TemperatureMonitoring will be indexed here
  SmartLightning: {
    screen: SmartLightTabNavigator,
    navigationOptions: ({ navigation }) => ({
      title: 'Smart Highway Lighting System',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <NotificationIcon navigationProps={navigation} />,
      headerStyle: {                          
        // backgroundColor: '#FF9800',
        height: hp('7%')
      },
      headerBackground: (
        <Image
          style={{ flex: 1 , width: wp('100%')}}
          source={headerBackground}
          resizeMode="cover"
        />
      ),
      headerTintColor: '#fff',
      headerTitleStyle:{
        fontSize: hp('2%'),
        fontWeight: 'bold'
      }
    }),
  },

  Notification: {
    screen: Notification_StackNavigator,
    navigationOptions: () => ({
      title: 'Notifications',
      headerStyle: {
        // backgroundColor: '#FF9800',
        height: hp('7%')
      },
      headerBackground: (
        <Image
          style={{ flex: 1 , width: wp('100%')}}
          source={headerBackground}
          resizeMode="cover"
        />
      ),
      headerTintColor: '#fff',
      headerTitleStyle:{
        fontSize: hp('2%'),
        fontWeight: 'bold'
      }
    }),
  }

});

const HumidityAndTemperature_StackNavigator = createStackNavigator({
  // All the screen from the TemperatureMonitoring will be indexed here
  HumidityAndTemperature: {
    screen: HumidityAndTemperatureTabNavigator,
    navigationOptions: ({ navigation }) => ({
      title: 'Humidity & Temperature Monitoring System',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <NotificationIcon navigationProps={navigation} />,
      headerStyle: {                          
        // backgroundColor: '#FF9800',
        height: hp('7%')
      },
      headerBackground: (
        <Image
          style={{ flex: 1 , width: wp('100%')}}
          source={headerBackground}
          resizeMode="cover"
        />
      ),
      headerTintColor: '#fff',
      headerTitleStyle:{
        fontSize: hp('2%'),
        fontWeight: 'bold'
      }
    }),
  },

  Notification: {
    screen: Notification_StackNavigator,
    navigationOptions: () => ({
      title: 'Notifications',
      headerStyle: {
        // backgroundColor: '#FF9800',
        height: hp('7%')
      },
      headerBackground: (
        <Image
          style={{ flex: 1 , width: wp('100%')}}
          source={headerBackground}
          resizeMode="cover"
        />
      ),
      headerTintColor: '#fff',
      headerTitleStyle:{
        fontSize: hp('2%'),
        fontWeight: 'bold'
      }
    }),
  }

});

const SecuritySystem_StackNavigator = createStackNavigator({
  // All the screen from the TemperatureMonitoring will be indexed here
  SecuritySystem: {
    screen: SecurityTabNavigator,
    navigationOptions: ({ navigation }) => ({
      title: 'Security System',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <NotificationIcon navigationProps={navigation} />,
      headerStyle: {                          
        // backgroundColor: '#FF9800',
        height: hp('7%')
      },
      headerBackground: (
        <Image
          style={{ flex: 1 , width: wp('100%')}}
          source={headerBackground}
          resizeMode="cover"
        />
      ),
      headerTintColor: '#fff',
      headerTitleStyle:{
        fontSize: hp('2%'),
        fontWeight: 'bold'
      }
    }),
  },

  Notification: {
    screen: Notification_StackNavigator,
    navigationOptions: () => ({
      title: 'Notifications',
      headerStyle: {
        // backgroundColor: '#FF9800',
        height: hp('7%')
      },
      headerBackground: (
        <Image
          style={{ flex: 1 , width: wp('100%')}}
          source={headerBackground}
          resizeMode="cover"
        />
      ),
      headerTintColor: '#fff',
      headerTitleStyle:{
        fontSize: hp('2%'),
        fontWeight: 'bold'
      }
    }),
  }
});

const RectifierSystem_StackNavigator = createStackNavigator({
  // All the screen from the TemperatureMonitoring will be indexed here
  RectifierSystem: {
    screen: RectifierTabNavigator,
    navigationOptions: ({ navigation }) => ({
      title: 'Rectifier & Backup Battery Monitoring System',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <NotificationIcon navigationProps={navigation} />,
      headerStyle: {                          
        // backgroundColor: '#FF9800',
        height: hp('7%')
      },
      headerBackground: (
        <Image
          style={{ flex: 1 , width: wp('100%')}}
          source={headerBackground}
          resizeMode="cover"
        />
      ),
      headerTintColor: '#fff',
      headerTitleStyle:{
        fontSize: hp('2%'),
        fontWeight: 'bold'
      }
    }),
  },

  Notification: {
    screen: Notification_StackNavigator,
    navigationOptions: () => ({
      title: 'Notifications',
      headerStyle: {
        // backgroundColor: '#FF9800',
        height: hp('7%')
      },
      headerBackground: (
        <Image
          style={{ flex: 1 , width: wp('100%')}}
          source={headerBackground}
          resizeMode="cover"
        />
      ),
      headerTintColor: '#fff',
      headerTitleStyle:{
        fontSize: hp('2%'),
        fontWeight: 'bold'
      }
    }),
  }
});

const GeyserSystem_StackNavigator = createStackNavigator({
  GeyserSystem: {
    screen: GeyserTabNavigator,
    navigationOptions: ({ navigation }) => ({
      title: 'Smart Geyser System',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <NotificationIcon navigationProps={navigation} />,
      headerStyle: {                          
        // backgroundColor: '#FF9800',
        height: hp('7%')
      },
      headerBackground: (
        <Image
          style={{ flex: 1 , width: wp('100%')}}
          source={headerBackground}
          resizeMode="cover"
        />
      ),
      headerTintColor: '#fff',
      headerTitleStyle:{
        fontSize: hp('2%'),
        fontWeight: 'bold'
      }
    }),
  },

  Notification: {
    screen: Notification_StackNavigator,
    navigationOptions: () => ({
      title: 'Notifications',
      headerStyle: {
        // backgroundColor: '#FF9800',
        height: hp('7%')
      },
      headerBackground: (
        <Image
          style={{ flex: 1 , width: wp('100%')}}
          source={headerBackground}
          resizeMode="cover"
        />
      ),
      headerTintColor: '#fff',
      headerTitleStyle:{
        fontSize: hp('2%'),
        fontWeight: 'bold'
      }
    }),
  }
});

const Hybrid_GeyserSystem_StackNavigator = createStackNavigator({
  HYbridGeyserSystem: {
    screen: hybridGeyserTabNavigator,
    navigationOptions: ({ navigation }) => ({
      title: 'Smart Hybrid Geyser System',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <NotificationIcon navigationProps={navigation} />,
      headerStyle: {                          
        // backgroundColor: '#FF9800',
        height: hp('7%')
      },
      headerBackground: (
        <Image
          style={{ flex: 1 , width: wp('100%')}}
          source={headerBackground}
          resizeMode="cover"
        />
      ),
      headerTintColor: '#fff',
      headerTitleStyle:{
        fontSize: hp('2%'),
        fontWeight: 'bold'
      }
    }),
  },

  Notification: {
    screen: Notification_StackNavigator,
    navigationOptions: () => ({
      title: 'Notifications',
      headerStyle: {
        // backgroundColor: '#FF9800',
        height: hp('7%')
      },
      headerBackground: (
        <Image
          style={{ flex: 1 , width: wp('100%')}}
          source={headerBackground}
          resizeMode="cover"
        />
      ),
      headerTintColor: '#fff',
      headerTitleStyle:{
        fontSize: hp('2%'),
        fontWeight: 'bold'
      }
    }),
  }
});

const TemperatureSystem_StackNavigator = createStackNavigator({
  TemperatureSystem: {
    screen: TemperaTureSysTemTabNavigator,
    navigationOptions: ({ navigation }) => ({
      title: 'Temperature System',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <NotificationIcon navigationProps={navigation} />,
      headerStyle: {                          
        // backgroundColor: '#FF9800',
        height: hp('7%')
      },
      headerBackground: (
        <Image
          style={{ flex: 1 , width: wp('100%')}}
          source={headerBackground}
          resizeMode="cover"
        />
      ),
      headerTintColor: '#fff',
      headerTitleStyle:{
        fontSize: hp('2%'),
        fontWeight: 'bold'
      }
    }),
  },

  Notification: {
    screen: Notification_StackNavigator,
    navigationOptions: () => ({
      title: 'Notifications',
      headerStyle: {
        // backgroundColor: '#FF9800',
        height: hp('7%')
      },
      headerBackground: (
        <Image
          style={{ flex: 1 , width: wp('100%')}}
          source={headerBackground}
          resizeMode="cover"
        />
      ),
      headerTintColor: '#fff',
      headerTitleStyle:{
        fontSize: hp('2%'),
        fontWeight: 'bold'
      }
    }),
  }
});

const GasSystem_StackNavigator = createStackNavigator({
  GasSystem: {
    screen: GasTabNavigator,
    navigationOptions: ({ navigation }) => ({
      title: 'Gas System',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <NotificationIcon navigationProps={navigation} />,
      headerStyle: {                          
        // backgroundColor: '#FF9800',
        height: hp('7%')
      },
      headerBackground: (
        <Image
          style={{ flex: 1 , width: wp('100%')}}
          source={headerBackground}
          resizeMode="cover"
        />
      ),
      headerTintColor: '#fff',
      headerTitleStyle:{
        fontSize: hp('2%'),
        fontWeight: 'bold'
      }
    }),
  },

  Notification: {
    screen: Notification_StackNavigator,
    navigationOptions: () => ({
      title: 'Notifications',
      headerStyle: {
        // backgroundColor: '#FF9800',
        height: hp('7%')
      },
      headerBackground: (
        <Image
          style={{ flex: 1 , width: wp('100%')}}
          source={headerBackground}
          resizeMode="cover"
        />
      ),
      headerTintColor: '#fff',
      headerTitleStyle:{
        fontSize: hp('2%'),
        fontWeight: 'bold'
      }
    }),
  }
});

const ChangePassword_StackNavigator = createStackNavigator({
  ChangePassword: {
    screen: changePassword,
    navigationOptions: ({ navigation }) => ({
      title: 'Change Password',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,

      headerStyle: {
        // backgroundColor: '#FF9800',
        height: hp('7%')
      },
      headerBackground: (
        <Image
          style={{ flex: 1 , width: wp('100%')}}
          source={headerBackground}
          resizeMode="cover"
        />
      ),
      headerTintColor: '#fff',
      headerTitleStyle:{
        fontSize: hp('2%'),
        fontWeight: 'bold'
      }
    }),
  },
});
const DrawerNavigator = createDrawerNavigator(
  {
    
    'Home Page': {
      screen : HomePage_StackNavigator ,
      navigationOptions: {
        drawerLabel: null
      }
    },
  
  'Fuel Monitoring System': {
    screen : FuelMonitoring_StackNavigator,
    navigationOptions: {
      drawerLabel: null
    }
  },
  'Smart Farm Fisheries': {
    screen : LiquidMonitoring_StackNavigator,
    navigationOptions: {
      drawerLabel: null
    }
  },
  'Temperature Monitoring System': {
    screen : TemperatureMonitoring_StackNavigator,
    navigationOptions: {
      drawerLabel: null
    }
  },
  'Cold Chain Monitoring System': {
    screen: ColdChainMonitoring_StackNavigator,
    navigationOptions: {
      drawerLabel: null
    }
  },
  'Water Quality Monitoring System': {
    screen: WaterQualityMonitoring_StackNavigator,
    navigationOptions: {
      drawerLabel: null
    }
  },
  'Fixed Asset Tracking System': {
    screen: AssetTrackingMonitoring_StackNavigator,
    navigationOptions: {
      drawerLabel: null
    }
  },
  'Energy Monitoring System': {
    screen: EnergyMonitoring_StackNavigator,
    navigationOptions: {
      drawerLabel: null
    }
  },
  'Water Tank System' : {
    screen: Tank_StackNavigator,
    navigationOptions: {
      drawerLabel: null
    }
  },
  'Environment Monitoring System' : {
    screen: EnvironmentMonitoring_StackNavigator,
    navigationOptions: {
      drawerLabel: null
    }
  },
  'Tubewell Monitoring System' : {
    screen:TubeWell_StackNavigator,
    navigationOptions: {
      drawerLabel: null
    }
  },
  'Smart Highway Lighting System' : {
    screen:SmartLighting_StackNavigator,
    navigationOptions: {
      drawerLabel: null
    }
  },
  'Humidity & Temperature Monitoring System' : {
    screen:HumidityAndTemperature_StackNavigator,
    navigationOptions: {
      drawerLabel: null
    }
  },
  'Security System' : {
    screen:SecuritySystem_StackNavigator,
    navigationOptions: {
      drawerLabel: null
    }
  },
  'Rectifier & Backup Battery Monitoring System' : {
    screen:RectifierSystem_StackNavigator,
    navigationOptions: {
      drawerLabel: null
    }
  },
  'Smart Geyser System' : {
    screen:GeyserSystem_StackNavigator,
    navigationOptions: {
      drawerLabel: null
    }
  },
    'Smart Hybrid Geyser System' : {
    screen:Hybrid_GeyserSystem_StackNavigator,
    navigationOptions: {
      drawerLabel: null
    }
  },
  'Temperature System' : {
    screen:TemperatureSystem_StackNavigator,
    navigationOptions: {
      drawerLabel: null
    }
  },
  'Gas System' : {
    screen:GasSystem_StackNavigator,
    navigationOptions: {
      drawerLabel: null
    }
  },
  Profile: {
    screen : Profile_StackNavigator,
    navigationOptions: {
      drawerLabel: null
    }
  },
  Share: {
    screen: Share_StackNavigator,
    navigationOptions: {
      drawerLabel: null
    }
  },
  Help: {
    screen: Help_StackNavigator,
    navigationOptions: {
      drawerLabel: null
    }
  },
  Notification: {
    screen : Notification,
    navigationOptions: {
      drawerLabel: null
    }
  },
  'SignUP': {
    screen : SignUP,
    navigationOptions: {
      drawerLabel: null
    }
  },
  ChangePassword : {
    screen: ChangePassword_StackNavigator,
    navigationOptions: {
      drawerLabel: null
    }
  },
},
{
  // initialRouteName: 'Notification',
  initialRouteName: 'Home Page',
  contentComponent: drawerContentComponents,
  overlayColor: 'rgba(0, 0, 0, 0.4)',
  drawerBackgroundColor: '#F1F1F7',
  drawerWidth: wp('70%')
}
)
export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: DrawerNavigator,
      Auth: AuthStack,   
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);
