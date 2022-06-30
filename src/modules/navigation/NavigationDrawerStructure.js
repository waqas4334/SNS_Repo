import React, { Component } from 'react';
//import react in our code.
import { View, Image, TouchableOpacity } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
// import all basic components

//For React Navigation 2.+ import following
//import {DrawerNavigator, StackNavigator} from 'react-navigation';

//For React Navigation 3.+ import following


export default class NavigationDrawerStructure extends Component {
    //Structure for the navigatin Drawer
    toggleDrawer = () => {
      //Props to open/close the drawer
      //this.props.navigationProps.toggleDrawer();
      this.props.navigationProps.openDrawer();
    };
    render() {
      return (
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
            {/*Donute Button Image */}
            <Image
              source={require('../../../assets/images/drawer1.png')}
              style={{ width: wp('8%'), height: hp('4%'), marginLeft: wp('3.5%') }}
            />
          </TouchableOpacity>
        </View>
      );
    }
  }