/* eslint-disable import/no-unresolved */
import React from 'react';
import { Image, View, StyleSheet, Text } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import { colors, fonts } from '../../styles';
import HomeScreen from '../RectifierAndBackupBatteryMonitoringSystem/overview/overviewContainer';
import SettingScreen from '../RectifierAndBackupBatteryMonitoringSystem/settingScreen/setings';
import LogScreen from '../RectifierAndBackupBatteryMonitoringSystem/logs/logs';
import ChartScreen from '../RectifierAndBackupBatteryMonitoringSystem/charts/charts';
import AlertScreen from '../RectifierAndBackupBatteryMonitoringSystem/alerts/AlertView';
const iconHome = require('../../../assets/images/tabbar/home.png');
const iconComponents = require('../../../assets/images/tabbar/components.png');
const iconCalendar = require('../../../assets/images/tabbar/calendar.png');
const hederBackground = require('../../../assets/images/topBarBg.png');
const iconAlert = require('../../../assets/images/tabbar/alert.png');
const iconSettings = require('../../../assets/images/tabbar/setting.png')
const iconGraphs = require('../../../assets/images/tabbar/chart.png');

export default createBottomTabNavigator(

  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: 'Overview'
      },
    },
    Setting: {
      screen: SettingScreen,
      navigationOptions: {
        title: 'Settings'
      },
    },
    Logs: {
      screen: LogScreen,
      navigationOptions: {
        title: 'Logs'
      },
    },
    Charts: {
      screen: ChartScreen,
      navigationOptions: {
        title: 'Charts'
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
            iconSource = iconHome;
            break;
          case 'Setting':
            iconSource = iconSettings;
            break;
          case 'Logs':
            iconSource = iconCalendar;
            break;
          case 'Charts':
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
    swipeEnabled: false,
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
  }
});

