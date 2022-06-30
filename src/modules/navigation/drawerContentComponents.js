/* eslint-disable no-console */
/* eslint-disable eqeqeq */
import React, { Component } from 'react';
import { NavigationActions, ScrollView } from 'react-navigation';
import {
  Image,
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import Icon1 from 'react-native-vector-icons/Fontisto';
import Icon4 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Entypo';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import Icon5 from 'react-native-vector-icons/Ionicons';
import Icon6 from 'react-native-vector-icons/Octicons';
import Icon7 from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Divider } from 'react-native-elements';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Bars } from 'react-native-loader';
import { logout } from '../../redux/actions/authActions';
import { fonts, colors } from '../../styles';

const image = require("../../../assets/images/humidityIcon.png")
const fuel = require("../../../assets/images/fuel.png")
const fish = require("../../../assets/images/fish.png")
const fixed = require("../../../assets/images/fixed.png")
const background = require("../../../assets/images/tubewell.png");
const homeIcon = require("../../../assets/images/icons/homeIcon.png");


class drawerContentComponents extends Component {
  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
    });
    this.props.navigation.dispatch(navigateAction);
  };

  toggleDrawer = () => {
    // Props to open/close the drawer
    this.props.navigation.closeDrawer();
  };

  homeNav = () => {
    this.props.navigation.navigate('Home Page');
    this.toggleDrawer();
  };

  fuelNav = () => {
    this.props.navigation.navigate('Fuel Monitoring System');
    this.toggleDrawer();
  };

  liquidNav = () => {
    this.props.navigation.navigate('Smart Farm Fisheries');
    this.toggleDrawer();
  };

  temperatureNav = () => {
    this.props.navigation.navigate('Temperature Monitoring System');
    this.toggleDrawer();
  };

  coldchainNav = () => {
    this.props.navigation.navigate('Cold Chain Monitoring System');
    this.toggleDrawer();
  };

  waterQualityNav = () => {
    this.props.navigation.navigate('Water Quality Monitoring System');
    this.toggleDrawer();
  };

  assetTrackingNav = () => {
    this.props.navigation.navigate('Fixed Asset Tracking System');
    this.toggleDrawer();
  };

  energyNav = () => {
    this.props.navigation.navigate('Energy Monitoring System');
    this.toggleDrawer();
  };

  tankNav = () => {
    this.props.navigation.navigate('Water Tank System');
    this.toggleDrawer();
  };

  envNav = () => {
    this.props.navigation.navigate('Environment Monitoring System');
    this.toggleDrawer();
  };

  tubeNav = () => {
    this.props.navigation.navigate('Tubewell Monitoring System');
    this.toggleDrawer();
  };

  smartLightNav = () => {
    this.props.navigation.navigate('Smart Highway Lighting System');
    this.toggleDrawer();
  };
  
  HumidityTempNav = () => {
    this.props.navigation.navigate('Humidity & Temperature Monitoring System');
    this.toggleDrawer();
  }
  SecurityNav = () => {
    this.props.navigation.navigate('Security System');
    this.toggleDrawer();
  }
  RectifierNav = () => {
    this.props.navigation.navigate('Rectifier & Backup Battery Monitoring System');
    this.toggleDrawer();
  }
  GeyserNav = () => {
    this.props.navigation.navigate('Smart Geyser System');
    this.toggleDrawer();
  }
  HybridGeyserNav = () => {
    this.props.navigation.navigate('Smart Hybrid Geyser System');
    this.toggleDrawer();
  }
  TempNav = () => {
    this.props.navigation.navigate('Temperature System');
    this.toggleDrawer();
  }
  GasNav = () => {
    this.props.navigation.navigate('Gas System');
    this.toggleDrawer();
  }
  handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Do you want to sign out?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            AsyncStorage.removeItem('userToken');
            this.props.logout();
            this.props.navigation.navigate('Auth');
          },
        },
      ],
      { cancelable: false },
    );
  };

  render() {
    const { user, loading } = this.props;
    // console.log('user',user);

    return (
      <View>
        {loading ? (
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <Bars size={15} color={colors.primary} />
          </View>
        ) : (
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              <ImageBackground
                source={require('../../../assets/images/iot6.jpg')}
                style={{ flex: 1, width: wp('69%'), justifyContent: 'center' }}
              >
                <TouchableOpacity>
                  <Image
                    source={require('../../../assets/images/photos.jpeg')}
                      // borderRadius style will help us make the Round Shape Image
                    style={{
                        width: 73,
                        height: 73,
                        borderRadius: 73 / 2,
                        marginLeft: wp('4.5%'), 
                        marginBottom: hp('0.5%'),
                        marginTop: hp('9%'),
                      }}
                  />
                </TouchableOpacity>
                <Text style={styles.headerText}>{user.name}</Text>
                <Text style={styles.headerText1}>
                  Systems: {user.dashboards.length}{' '}
                </Text>
              </ImageBackground>
            </View>
           

            <View style={styles.screenContainer}>       
              <View style={{height:hp('65%')}}>     
                <ScrollView style={{height:hp('100%')}}> 
                 {/* Home PAge */}
                  <View
                    style={[
                        styles.screenStyle,
                        this.props.activeItemKey == 'Home Page'
                          ? styles.activeBackgroundColor
                          : null,
                      ]}
                  >
                    <Image
                      source={homeIcon}
                      style={{ height: 20, width: 20,marginLeft:0}}
                    />
                    <Text
                      style={[
                          styles.screenTextStyle,
                          { marginLeft: 15 },
                          this.props.activeItemKey == 'Home Page'
                            ? styles.selectedTextStyle
                            : null,
                        ]}
                      onPress={this.homeNav}
                    >
                      Home
                    </Text>
                  </View>
                  {user.dashboards.findIndex(
                  d => d.title === 'Fuel Monitoring System',
                ) === -1 ? null : (
                    // eslint-disable-next-line eqeqeq
                  <View
                    style={[
                        styles.screenStyle,
                        this.props.activeItemKey == 'Fuel Monitoring System'
                          ? styles.activeBackgroundColor
                          : null,
                      ]}
                  >
                    <Image
                      source={fuel}
                      style={{ height: 20, width: 20,marginLeft:-2}}
                    />
                    <Text
                      style={[
                          styles.screenTextStyle,
                          { marginLeft: 15 },
                          this.props.activeItemKey == 'Fuel Monitoring System'
                            ? styles.selectedTextStyle
                            : null,
                        ]}
                      onPress={this.fuelNav}
                    >
                      Fuel Monitoring System
                    </Text>
                  </View>
                  )}

                  {user.dashboards.findIndex(
                  d => d.title === 'Smart Farm Fisheries',
                ) === -1 ? null : (
                  <View
                    style={[
                        styles.screenStyle,
                        this.props.activeItemKey == 'Smart Farm Fisheries'
                          ? styles.activeBackgroundColor
                          : null,
                      ]}
                  >
                    {/* <Image source={fish} style={{ height: hp('3%'), width: wp('4%') ,marginLeft:wp('2%')}}
                      ></Image> */}
                    <Icon3
                      name="fish"
                      style={[
                          styles.screenIcon,
                          this.props.activeItemKey == 'Smart Farm Fisheries'
                            ? styles.selectedTextStyle
                            : null,
                        ]}
                    />
                    <Text
                      style={[
                          styles.screenTextStyle,
                          { marginLeft: 16 },
                          this.props.activeItemKey == 'Smart Farm Fisheries'
                            ? styles.selectedTextStyle
                            : null,
                        ]}
                      onPress={this.liquidNav}
                    >
                      Smart Farm Fisheries
                    </Text>
                  </View>
                  )}

                  {user.dashboards.findIndex(
                  d => d.title === 'Temperature Monitoring System',
                ) === -1 ? null : (
                  <View
                    style={[
                        styles.screenStyle,
                        this.props.activeItemKey == 'Temperature Monitoring System'
                          ? styles.activeBackgroundColor
                          : null,
                      ]}
                  >
                    <Icon2
                      name="thermometer"
                      style={[
                          styles.screenIcon,
                          this.props.activeItemKey ==
                            'Temperature Monitoring System'
                            ? styles.selectedTextStyle
                            : null,
                        ]}
                    />
                    <Text
                      style={[
                          styles.screenTextStyle,
                          { marginLeft: 15 },
                          this.props.activeItemKey ==
                            'Temperature Monitoring System'
                            ? styles.selectedTextStyle
                            : null,
                        ]}
                      onPress={this.temperatureNav}
                    >
                      Temperature Monitoring System
                    </Text>
                  </View>
                  )}

                  {user.dashboards.findIndex(
                  d => d.title === 'Cold Chain Monitoring System',
                ) === -1 ? null : (
                  <View
                    style={[
                        styles.screenStyle,
                        this.props.activeItemKey == 'Cold Chain Monitoring System'
                          ? styles.activeBackgroundColor
                          : null,
                      ]}
                  >
                    <Icon
                      name="sourcetree"
                      style={[
                          styles.screenIcon,
                          this.props.activeItemKey == 'Cold Chain Monitoring System'
                            ? styles.selectedTextStyle
                            : null,
                        ]}
                    />
                    <Text
                      style={[
                          styles.screenTextStyle,
                          { marginLeft: 15 },
                          this.props.activeItemKey == 'Cold Chain Monitoring System'
                            ? styles.selectedTextStyle
                            : null,
                        ]}
                      onPress={this.coldchainNav}
                    >
                      Cold Chain Monitoring System
                    </Text>
                  </View>
                  )}

                  {user.dashboards.findIndex(
                  d => d.title === 'Water Quality Monitoring System',
                ) === -1 ? null : (
                  <View
                    style={[
                        styles.screenStyle,
                        this.props.activeItemKey ==
                          'Water Quality Monitoring System'
                          ? styles.activeBackgroundColor
                          : null,
                      ]}
                  >
                    <Icon2
                      name="drop"
                      style={[
                          styles.screenIcon,
                         
                          this.props.activeItemKey ==
                            'Water Quality Monitoring System'
                            ? styles.selectedTextStyle
                            : null,
                        ]}
                    />
                    <Text
                      style={[
                          styles.screenTextStyle,
                          { marginLeft: 15 },
                          this.props.activeItemKey ==
                            'Water Quality Monitoring System'
                            ? styles.selectedTextStyle
                            : null,
                        ]}
                      onPress={this.waterQualityNav}
                    >
                      Water Quality Monitoring System
                    </Text>
                  </View>
                  )}
                  {user.dashboards.findIndex(
                  d => d.title === 'Fixed Asset Tracking System',
                ) === -1 ? null : (
                  <View
                    style={[
                        styles.screenStyle,
                        this.props.activeItemKey == 'Fixed Asset Tracking System'
                          ? styles.activeBackgroundColor
                          : null,
                      ]}
                  >
                    <Image
                      source={fixed}
                      style={{ height: 20, width: 20,marginLeft:-2}}
                    />
                    <Text
                      style={[
                          styles.screenTextStyle,
                          { marginLeft: 10 },
                          this.props.activeItemKey == 'Fixed Asset Tracking System'
                            ? styles.selectedTextStyle
                            : null,
                        ]}
                      onPress={this.assetTrackingNav}
                    >
                      Fixed Asset Tracking System
                    </Text>
                  </View>
                  )}
                  {user.dashboards.findIndex(
                  d => d.title === 'Energy Monitoring System',
                ) === -1 ? null : (
                  <View
                    style={[
                        styles.screenStyle,
                        this.props.activeItemKey == 'Energy Monitoring System'
                          ? styles.activeBackgroundColor
                          : null,
                      ]}
                  >
                    <Icon3
                      name="bolt"
                      style={[
                          styles.screenIcon,
                          this.props.activeItemKey == 'Energy Monitoring System'
                            ? styles.selectedTextStyle
                            : null,
                        ]}
                    />
                    <Text
                      style={[
                          styles.screenTextStyle,
                          { marginLeft: 17 },
                          this.props.activeItemKey == 'Energy Monitoring System'
                            ? styles.selectedTextStyle
                            : null,
                        ]}
                      onPress={this.energyNav}
                    >
                      Energy Monitoring System
                    </Text>
                  </View>
                  )}

                  {user.dashboards.findIndex(
                  d => d.title === 'Water Tank System',
                ) === -1 ? null : (
                  <View
                    style={[
                        styles.screenStyle,
                        this.props.activeItemKey == 'Water Tank System'
                          ? styles.activeBackgroundColor
                          : null,
                      ]}
                  >
                    <Icon3
                      name="water"
                      style={[
                          styles.screenIcon,
                          this.props.activeItemKey == 'Water Tank System'
                            ? styles.selectedTextStyle
                            : null,
                        ]}
                    />
                    <Text
                      style={[
                          styles.screenTextStyle,
                          { marginLeft: 15 },
                          this.props.activeItemKey == 'Water Tank System'
                            ? styles.selectedTextStyle
                            : null,
                        ]}
                      onPress={this.tankNav}
                    >
                      Water Tank System
                    </Text>
                  </View>
                  )}

                {user.dashboards.findIndex(
                  d => d.title === 'Environment Monitoring System',
                ) === -1 ? null : (
                  <View
                    style={[
                        styles.screenStyle,
                        this.props.activeItemKey == 'Environment Monitoring System'
                          ? styles.activeBackgroundColor
                          : null,
                      ]}
                  >
                    <Icon3
                      name="water"
                      style={[
                          styles.screenIcon,
                          this.props.activeItemKey == 'Environment Monitoring System'
                            ? styles.selectedTextStyle
                            : null,
                        ]}
                    />
                    <Text
                      style={[
                          styles.screenTextStyle,
                          { marginLeft: 15 },
                          this.props.activeItemKey == 'Environment Monitoring System'
                            ? styles.selectedTextStyle
                            : null,
                        ]}
                      onPress={this.envNav}
                    >
                      Environment Monitoring System
                    </Text>
                  </View>
                  )}

                  {user.dashboards.findIndex(
                  d => d.title === 'Tubewell Monitoring System',
                ) === -1 ? null : (
                  <View
                    style={[
                        styles.screenStyle,
                        this.props.activeItemKey == 'Tubewell Monitoring System'
                          ? styles.activeBackgroundColor
                          : null,
                      ]}
                  >
                    <Image
                      source={background}
                      style={{ height:20, width: 20,marginLeft:-4 }}
                    />
                   
                    <Text
                      style={[
                          styles.screenTextStyle,
                          { marginLeft: 12 },
                          this.props.activeItemKey == 'Tubewell Monitoring System'
                            ? styles.selectedTextStyle
                            : null,
                        ]}
                      onPress={this.tubeNav}
                    >
                      Tubewell Monitoring System
                    </Text>
                  </View>
                  )}

                  {user.dashboards.findIndex(
                  d => d.title === 'Smart Highway Lighting System',
                ) === -1 ? null : (
                  <View
                    style={[
                        styles.screenStyle,
                        this.props.activeItemKey == 'Smart Highway Lighting System'
                          ? styles.activeBackgroundColor
                          : null,
                      ]}
                  >
                    
                    <Icon3
                      name="traffic-light"
                      style={[
                      styles.screenIcon,
                      this.props.activeItemKey == 'Smart Highway Lighting System'
                        ? styles.selectedTextStyle
                        : null,
                    ]}
                    />
                    <Text
                      style={[
                          styles.screenTextStyle,
                          { marginLeft: 15 },
                          this.props.activeItemKey == 'Smart Highway Lighting System'
                            ? styles.selectedTextStyle
                            : null,
                        ]}
                      onPress={this.smartLightNav}
                    >
                      Smart Highway Lighting System
                    </Text>
                  </View>
                  )}
                

                  {user.dashboards.findIndex(
                  d => d.title === 'Humidity & Temperature Monitoring System',
                ) === -1 ? null : (
                  <View
                    style={[
                        styles.screenStyle,
                        this.props.activeItemKey == 'Humidity & Temperature Monitoring System'
                          ? styles.activeBackgroundColor
                          : null,
                      ]}
                  >
                    <Image
                      source={image}
                      style={{ height: 25, width: 18,marginLeft:-3}}
                    />
                   
                    <Text
                      style={[
                          styles.screenTextStyle,
                          { marginLeft: 10 },
                          this.props.activeItemKey == 'Humidity & Temperature Monitoring System'
                            ? styles.selectedTextStyle
                            : null,
                        ]}
                      onPress={this.HumidityTempNav}
                    >
                      Humidity & Temperature Monitoring System
                    </Text>
                  </View>
                  )}
                
                  {user.dashboards.findIndex(
                  d => d.title === 'Security System',
                ) === -1 ? null : (
                  <View
                    style={[
                        styles.screenStyle,
                        this.props.activeItemKey == 'Security System'
                          ? styles.activeBackgroundColor
                          : null,
                      ]}
                  >
                    <Image
                      source={image}
                      style={{ height: 25, width: 18,marginLeft:-3}}
                    />
                    <Text
                      style={[
                          styles.screenTextStyle,
                          { marginLeft: 15 },
                          this.props.activeItemKey == 'Security System'
                            ? styles.selectedTextStyle
                            : null,
                        ]}
                      onPress={this.SecurityNav}
                    >
                      Security System
                    </Text>
                  </View>
                  )}

                  {user.dashboards.findIndex(
                  d => d.title === 'Rectifier & Backup Battery Monitoring System',
                ) === -1 ? null : (
                  <View
                    style={[
                        styles.screenStyle,
                        this.props.activeItemKey == 'Rectifier & Backup Battery Monitoring System'
                          ? styles.activeBackgroundColor
                          : null,
                      ]}
                  >
                    <Icon7
                      name="battery-full"
                      style={[
                      styles.screenIcon,
                      this.props.activeItemKey == 'Rectifier & Backup Battery Monitoring System'
                        ? styles.selectedTextStyle
                        : null,
                    ]}
                    />
                    <Text
                      style={[
                          styles.screenTextStyle,
                          { marginLeft: 8.5 },
                          this.props.activeItemKey == 'Rectifier & Backup Battery Monitoring System'
                            ? styles.selectedTextStyle
                            : null,
                        ]}
                      onPress={this.RectifierNav}
                    >
                      Rectifier & Backup Battery Monitoring System
                    </Text>
                  </View>
                  )}

                  {/* geyser */}
                  {user.dashboards.findIndex(
                  d => d.title === 'Smart Geyser System',
                ) === -1 ? null : (
                  <View
                    style={[
                        styles.screenStyle,
                        this.props.activeItemKey == 'Smart Geyser System'
                          ? styles.activeBackgroundColor
                          : null,
                      ]}
                  >
                    <Image
                      source={require('../../../assets/images/geyserIcon.png')}
                      style={[
                      styles.screenIcon2,
                      this.props.activeItemKey == 'Smart Geyser System'
                        ? styles.selectedTextStyle
                        : null,
                    ]}
                    />
                    <Text
                      style={[
                          styles.screenTextStyle,
                          { marginLeft: 8.5 },
                          this.props.activeItemKey == 'Smart Geyser System'
                            ? styles.selectedTextStyle
                            : null,
                        ]}
                      onPress={this.GeyserNav}
                    >
                      Smart Geyser System
                    </Text>
                  </View>
                  )}

             {user.dashboards.findIndex(
                  d => d.title === 'Smart Hybrid Geyser System ',
                ) === -1 ? null : (
                  <View
                    style={[
                        styles.screenStyle,
                        this.props.activeItemKey == 'Smart Hybrid Geyser System '
                          ? styles.activeBackgroundColor
                          : null,
                      ]}
                  >
                    <Image
                      source={require('../../../assets/images/geyserIcon.png')}
                      style={[
                      styles.screenIcon2,
                      this.props.activeItemKey == 'Smart Hybrid Geyser System '
                        ? styles.selectedTextStyle
                        : null,
                    ]}
                    />
                    <Text
                      style={[
                          styles.screenTextStyle,
                          { marginLeft: 8.5 },
                          this.props.activeItemKey == 'Smart Hybrid Geyser System '
                            ? styles.selectedTextStyle
                            : null,
                        ]}
                      onPress={this.HybridGeyserNav}
                    >
                      Smart Hybrid Geyser System
                    </Text>
                  </View>
                  )}

                {user.dashboards.findIndex(
                  d => d.title === 'Temperature System',
                ) === -1 ? null : (
                  <View
                    style={[
                        styles.screenStyle,
                        this.props.activeItemKey == 'Temperature System'
                          ? styles.activeBackgroundColor
                          : null,
                      ]}
                  >
                    <Icon3
                      name="temperature-high"
                      style={[
                      styles.screenIcon,
                      this.props.activeItemKey == 'Temperature System'
                        ? styles.selectedTextStyle
                        : null,
                    ]}
                    />
                    <Text
                      style={[
                          styles.screenTextStyle,
                          { marginLeft: 8.5 },
                          this.props.activeItemKey == 'Temperature System'
                            ? styles.selectedTextStyle
                            : null,
                        ]}
                      onPress={this.TempNav}
                    >
                     Temperature System
                    </Text>
                  </View>
                  )}

                {user.dashboards.findIndex(
                  d => d.title === 'Gas System',
                ) === -1 ? null : (
                  <View
                    style={[
                        styles.screenStyle,
                        this.props.activeItemKey == 'Gas System'
                          ? styles.activeBackgroundColor
                          : null,
                      ]}
                  >
                    <Icon1
                      name="fire"
                      style={[
                      styles.screenIcon,
                      this.props.activeItemKey == 'Gas System'
                        ? styles.selectedTextStyle
                        : null,
                    ]}
                    />
                    <Text
                      style={[
                          styles.screenTextStyle,
                          { marginLeft: 8.5 },
                          this.props.activeItemKey == 'Gas System'
                            ? styles.selectedTextStyle
                            : null,
                        ]}
                      onPress={this.GasNav}
                    >
                     Gas System
                    </Text>
                  </View>
                  )}

                  <View
                    style={[
                    styles.screenStyle,
                    this.props.activeItemKey == 'Profile'
                      ? styles.activeBackgroundColor
                      : null,
                  ]}
                  >
                    <Icon2
                      name="user"
                      style={[
                      styles.screenIcon,
                      this.props.activeItemKey == 'Profile'
                        ? styles.selectedTextStyle
                        : null,
                    ]}
                    />
                    <Text
                      style={[
                      styles.screenTextStyle,
                      { marginLeft: 15 },
                      this.props.activeItemKey == 'Profile'
                        ? styles.selectedTextStyle
                        : null,
                    ]}
                      onPress={this.navigateToScreen('Profile')}
                    >
                      Profile
                    </Text>
                  </View>

                  <Divider
                    style={{
                    backgroundColor: '#acacac',
                    marginHorizontal: wp('4%'),
                    marginTop: hp('10%'),
                    marginBottom: hp('2%'),
                  }}
                  />

                  <View
                    style={[
                    styles.screenStyle,
                    this.props.activeItemKey == 'Share'
                      ? styles.activeBackgroundColor
                      : null,
                  ]}
                  >
                    <Icon2
                      name="share"
                      style={[
                      styles.screenIcon,
                      this.props.activeItemKey == 'Share'
                        ? styles.selectedTextStyle
                        : null,
                    ]}
                    />
                    <Text
                      style={[
                      styles.screenTextStyle,
                      { marginLeft: 15 },
                      this.props.activeItemKey == 'Share'
                        ? styles.selectedTextStyle
                        : null,
                    ]}
                      onPress={this.navigateToScreen('Share')}
                    >
                      Tell a Friend
                    </Text>
                  </View>

                  <View
                    style={[
                    styles.screenStyle,
                    this.props.activeItemKey == 'Help'
                      ? styles.activeBackgroundColor
                      : null,
                  ]}
                  >
                    <Icon5
                      name="md-help-circle-outline"
                      style={[
                      styles.screenIcon,
                      { marginLeft: 0 },
                      this.props.activeItemKey == 'Help'
                        ? styles.selectedTextStyle
                        : null,
                    ]}
                    />
                    <Text
                      style={[
                      styles.screenTextStyle,
                      { marginLeft: 16 },
                      this.props.activeItemKey == 'Help'
                        ? styles.selectedTextStyle
                        : null,
                    ]}
                      onPress={this.navigateToScreen('Help')}
                    >
                      Help and Feedback
                    </Text>
                  </View>

                  <Divider
                    style={{
                    backgroundColor: '#acacac',
                    marginHorizontal: wp('4%'),
                    marginTop: hp('1%'),
                    marginBottom: hp('0.5%'),
                  }}
                  />

                  <View
                    style={[
                    styles.screenStyle,
                    this.props.activeItemKey == 'SignOut'
                      ? styles.activeBackgroundColor
                      : null,
                  ]}
                  >
                    <Icon5
                      name="ios-log-out"
                      style={[
                      styles.screenIcon,
                     
                      this.props.activeItemKey == 'SignOut'
                        ? styles.selectedTextStyle
                        : null,
                    ]}
                    />
                    <Text
                      style={[
                      styles.screenTextStyle,
                      { marginLeft: 16 },
                      this.props.activeItemKey == 'SignOut'
                        ? styles.selectedTextStyle
                        : null,
                    ]}
                      onPress={this.handleLogout}
                    >
                      Sign Out
                    </Text>
                  </View>
                </ScrollView>
              </View>
            </View>
          </View>
          )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  loading: state.auth.isLoading,
});

export default connect(mapStateToProps, { logout })(drawerContentComponents);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    
    // backgroundColor: 'blue'
  },
  headerContainer: {
    height: hp('25%'),
    marginTop: hp('0.2%'),
  },
  headerText: {
    color: colors.white,
    marginLeft: wp('5%'),
    fontWeight: 'bold',
    fontSize: hp('2.3%'),
  },
  headerText1: {
    color: colors.white,
    marginLeft: wp('5%'),
    marginBottom: hp('4%'),
    fontSize: hp('1.5%'),
  },
  screenContainer: {
    paddingTop: hp('3%'),
    // alignItems:'center',
    // backgroundColor:'red'
  },
  screenStyle: {
    height: hp('4.3%'),
    marginTop: hp('0.5%'),
    flexDirection: 'row',
    alignItems: 'center',
    width: wp('60%'),
    // backgroundColor:'#000'
  },
  screenTextStyle: {
    fontSize: hp('1.6%'),
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#5f5f5f',
    fontFamily: fonts.primaryRegular,
    
  },
  selectedTextStyle: {
    fontWeight: 'bold',
    color: '#4f44b6',
  },
  activeBackgroundColor: {
    backgroundColor: 'rgba(90, 129, 247, 0.4)',
  },
  screenIcon: {
    color: '#5f5f5f',
    fontSize: 18,
    marginLeft: 1,
  },
  screenIcon1: {
    width:wp('5%'),
    height:hp('2%')
  },
  screenIcon2: {
    width:wp('4%'),
    height:hp('1.5%')
  }
});
