import React, { Component } from 'react';
import { connect } from 'react-redux';
//import react in our code.
import { View, Image, TouchableOpacity,Text,Alert,StyleSheet } from 'react-native';
import { fonts, colors } from '../../styles';
import { logout } from '../../redux/actions/authActions';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icon5 from 'react-native-vector-icons/Ionicons';

import { NavigationActions } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import all basic components

//For React Navigation 2.+ import following
//import {DrawerNavigator, StackNavigator} from 'react-navigation';

//For React Navigation 3.+ import following
 class HomeHeaderSturcture extends Component {
  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
    });
    this.props.navigation.dispatch(navigateAction);
  };
    //Structure for the navigatin Drawer
    // toggleDrawer = () => {
    //   //Props to open/close the drawer
    //   this.props.navigationProps.toggleDrawer();
    //   this.props.navigationProps.openDrawer();
    // };
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
              this.props.navigationProps.navigate('Auth');
            },
          },
        ],
        { cancelable: false },
      );
    };
    constructor(props) {
      super(props);
    }
    render() {  
      const { user } = this.props;
      const {navigationProps,notification} = this.props;
 
      return (
        <View style={{ borderBottomLeftRadius:20,borderBottomRightRadius:20}}>
        <View 
        style={{padding:(20),
        flexDirection: "row",
        flexWrap: "wrap",
      // borderWidth:2,
      width:wp('100%'),
    justifyContent:"space-between"}}
        >
          <View>
          <TouchableOpacity onPress={()=>navigationProps.navigate('Profile') }>  
            <Image
            source={require('../../../assets/images/photos.jpeg')}
              // borderRadius style will help us make the Round Shape Image
              
            style={{
                width: 100,
                height: 100,
                borderRadius: 63 ,
                marginBottom: hp('0.5%'),
                marginTop: hp('0%'),
              }}
              
   
          />
            </TouchableOpacity>
                <Text     
                        style={{  color: colors.white,
                                
                                fontWeight: 'bold',
                               fontSize: hp('3%')}}>
                                 {user.name}</Text>
                <Text 
                         style={{  color: colors.white,
                         
                          fontWeight: 'bold',
                          fontSize: hp('2%')}}>
                  Assigned System: {user.dashboards.length}{' '}
                </Text>
                
          </View>
          <View   style={{
        flexDirection: "row",
        flexWrap: "wrap", 
        // borderWidth:2,
        // paddingLeft:wp('36%'),
        color: 'white',
   
        fontSize: hp('3%')}}>
              <View style={{ flexDirection: 'row' }}>
          {notification.length === 0 ? (
            <View > 
            <TouchableOpacity onPress={()=>navigationProps.navigate('Notification')}>
              {/*Donute Button Image */}
              <Icon name='notifications' style= {{fontSize:hp('4%'), color: 'white'}}></Icon>
            </TouchableOpacity>
          </View>
          ):(
            <View > 
              <TouchableOpacity onPress={()=>navigationProps.navigate('Notification')}>
                {/*Donute Button Image */}
                {/* <Badge status="warning" /> */}
                <Icon name='notifications' style= {{   fontSize: hp('4%'), color: 'white', marginTop:hp('0%')}}></Icon>
                
              </TouchableOpacity>
            </View>
          )}
        </View>
      
                
          <Icon5
                    
                      name="ios-log-out"
                      style={[
                      {
                        paddingLeft:wp('4%'),
                        color: 'white',
                        fontSize: hp('4%'),
                      },
                      this.props.activeItemKey == 'SignOut'
                        ? styles.selectedTextStyle
                        : null,
                    ]}
                    onPress={this.handleLogout}
                  />

                  </View>
        </View>
    
        </View>
      );
    }
  }

  const mapStateToProps = (state)=> ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    loading: state.auth.isLoading,
    notification: state.notification.notifications
  });
  
  export default connect(mapStateToProps, { logout })(HomeHeaderSturcture) ;
  
const styles = StyleSheet.create({

  screenStyle: {
    height: hp('4.3%'),
    marginTop: hp('0.5%'),
    flexDirection: 'row',
    alignItems: 'center',
    width: wp('65%'),
  
  },
  screenTextStyle: {
    fontSize: hp('2.5%'),
    color: 'white',
  },

  screenIcon: {
    paddingTop:'60%',
    color: 'white',
    fontSize: 27,
  },

});