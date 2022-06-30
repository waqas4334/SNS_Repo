/* eslint-disable import/no-unresolved */
import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';

import { colors, fonts } from '../../styles';

import EnvironmentHomeScreen from '../EnvironmentMonitoringSystem/home/EnvironmentHomeViewContainer';
import SettingsScreen from '../EnvironmentMonitoringSystem/settings/SettingsView';
import LogsScreen from '../EnvironmentMonitoringSystem/logs/LogsView';
import ChartsScreen from '../EnvironmentMonitoringSystem/charts/ChartsView';
import AlertScreen from '../EnvironmentMonitoringSystem/alerts/AlertView';

const iconCalendar = require('../../../assets/images/tabbar/calendar.png');
const iconPages = require('../../../assets/images/tabbar/pages.png');
const iconComponents = require('../../../assets/images/tabbar/components.png');
const iconSettings = require('../../../assets/images/tabbar/setting.png');
const iconGraphs = require('../../../assets/images/tabbar/chart.png');
const iconAlert = require('../../../assets/images/tabbar/alert.png');
// const iconMaintenance = require('../../../assets/images/tabbar/maintenance.png');

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
      screen: EnvironmentHomeScreen,
      navigationOptions: {
        title: 'Overview',
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
    Graphs: {
      screen: ChartsScreen,
      navigationOptions: {
        title: 'Graphs',
      },
    },
    Alerts: {
      screen: AlertScreen,
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
            iconSource = iconPages;
            break;
          case 'Settings':
            iconSource = iconSettings;
            break;
          case 'Logs':
            iconSource = iconCalendar;
            break;
          case 'Graphs':
            iconSource = iconGraphs;
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
