/* eslint-disable import/no-unresolved */
import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';

import { colors, fonts } from '../../styles';

import AssetTrackingHomeScreen from '../FixedAssetTrackingSystem/home/AssetTrackingHomeViewContainer';
import SettingsScreen from '../FixedAssetTrackingSystem/settings/SettingsViewContainer';
import LogsScreen from '../FixedAssetTrackingSystem/logs/LogsViewContainer';
import AlertScreen from '../FixedAssetTrackingSystem/alerts/AlertViewContainer';

const iconCalendar = require('../../../assets/images/tabbar/calendar.png');
const iconSettings = require('../../../assets/images/tabbar/setting.png');
const iconComponents = require('../../../assets/images/tabbar/components.png');
const iconLocation = require('../../../assets/images/tabbar/location.png');
const iconAlert = require('../../../assets/images/tabbar/alert.png');

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
      screen: AssetTrackingHomeScreen,
      navigationOptions: {
        title: 'Location'
      },
    },
    Settings: {
      screen: SettingsScreen,
      navigationOptions: {
        title: 'Settings',
      },
    },
    Logs: {
      screen: LogsScreen,
      navigationOptions: {
        title: 'Logs',
      },
    },
    Alerts: {
      screen: AlertScreen                                                                                                                      ,
      navigationOptions: {
        title: 'Recent Alerts',
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
            iconSource = iconLocation;
            break;
          case 'Settings':
            iconSource = iconSettings;
            break;  
          case 'Logs':
            iconSource = iconCalendar;
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
      },
      labelStyle: {
        color: colors.grey,
      },
    },
  },
);
