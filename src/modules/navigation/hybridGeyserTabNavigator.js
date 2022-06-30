/* eslint-disable import/no-unresolved */
import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';

import { colors, fonts } from '../../styles';
import HybridGeyserHomeScreen from '../HybridGeyserMoniteringSystem/home/homeViewContainer';
// import HybridGeyserOverViewScreen from '../HybridGeyserMoniteringSystem/home/overview'
// import HybridGeyserHomeScreen from '../HybridGeyserMonitoringSystem/home/homeViewContainer';
// import LogScreen from '../GeyserMonitoringSystem/logs/logsContainer';
import LogScreen from '../HybridGeyserMoniteringSystem/logs/logsContainer';

// import ChartsScreen from '../GeyserMonitoringSystem/charts/chartContainer';
import ChartsScreen from '../HybridGeyserMoniteringSystem/charts/chartContainer'
// import SettingScreen from '../GeyserMonitoringSystem/settings/settings';
import SettingScreen from '../HybridGeyserMoniteringSystem/settings/settings';
// import AlertScreen from '../HybridGeyserMonitoringSystem/alerts/alerts';
import AlertScreen from '../HybridGeyserMoniteringSystem/alerts/alerts'
import AddGeyser from '../HybridGeyserMoniteringSystem/addSenser/addSensor';
const iconCalendar = require('../../../assets/images/tabbar/calendar.png');
const iconPages = require('../../../assets/images/tabbar/pages.png');
const iconComponents = require('../../../assets/images/tabbar/components.png');
const iconGraphs = require('../../../assets/images/tabbar/chart.png');
const iconAlert = require('../../../assets/images/tabbar/alert.png');
const iconMaintenance = require('../../../assets/images/tabbar/maintenance.png');
const iconAdd = require('../../../assets/images/tabbar/Add.png');
const styles = StyleSheet.create({
  tabBarItemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  tabBarIcon: {
    width: 23,
    height: 23,
  },
  tabBarIconFocused: {
    tintColor: colors.primary,
  },
  headerContainer: {
    height: 70,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },
  headerImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: 70,
    resizeMode: 'cover',
  },
  headerCaption: {
    fontFamily: fonts.primaryRegular,
    color: colors.white,
    fontSize: 18,
  },
});

export default createBottomTabNavigator(
  
  {
    Home: {
      screen: HybridGeyserHomeScreen,
      navigationOptions: {
        title: 'Monitering'
      },
    },
    Settings: {
      screen: SettingScreen,
      navigationOptions: {
        title: 'Settings',
      },
    },
    AddGeyser: {
      screen: AddGeyser,
      navigationOptions: {
        title: 'Add Geyser',
      },
    },
    
    Alerts: {
      screen: AlertScreen                                                                                                                      ,
      navigationOptions: {
        title: 'Alerts',
      },
    },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      // eslint-disable-next-line react/prop-types
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconSource;
        switch (routeName) {
          case 'Home':
            iconSource = iconPages;
            break;
          case 'Settings':
            iconSource = iconMaintenance;
            break;
            case 'AddGeyser':
              iconSource = iconAdd;
              break;
          case 'Alerts':
            iconSource = iconAlert;
            break;    
          default:
            iconSource = iconComponents;
        }
        return (
          <View style={styles.tabBarItemContainer}>
            <Image
              resizeMode="contain"
              source={iconSource}
              style={[styles.tabBarIcon, focused && styles.tabBarIconFocused]}
            />
          </View>
        );
      },
    }),
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: true,
    scrollEnabled: true,
    tabBarOptions: {
      showLabel: true,
      style: {
        backgroundColor: colors.background,
        marginBottom:1,
        borderTopWidth:3,
        borderTopColor:'#1976D2',
        borderLeftWidth:3,
        borderRightWidth:3,
        borderRadius:20,
        borderBottomLeftRadius:0,
        borderBottomEndRadius:0,
        borderBottomColor:'#1976D2',
        borderEndColor:'#1976D2',
        borderStartColor:'#1976D2'
      },
      labelStyle: {
        color: colors.grey,
        fontSize: 14,
        fontWeight:'bold'
        
      },
    },
  },
);
