import React, { Component } from 'react';
//import react in our code.
import { View, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Avatar, Badge, withBadge } from 'react-native-elements';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {connect} from 'react-redux';
// import all basic components

//For React Navigation 2.+ import following
//import {DrawerNavigator, StackNavigator} from 'react-navigation';

//For React Navigation 3.+ import following

class NotificationIcon extends Component {

  constructor(props) {
    super(props);
  }

    render() {
        const {navigationProps,notification} = this.props;
      return (
        <View style={{ flexDirection: 'row' }}>
          {notification.length === 0 ? (
            <View style = {{marginRight: wp('10%')}}> 
            <TouchableOpacity onPress={()=>navigationProps.navigate('Notification')}>
              {/*Donute Button Image */}
              <Icon name='notifications' style= {{fontSize:hp('3.2%'), color: 'white'}}></Icon>
            </TouchableOpacity>
          </View>
          ):(
            <View style = {{marginRight: 30}}> 
              <TouchableOpacity onPress={()=>navigationProps.navigate('Notification')}>
                {/*Donute Button Image */}
                <Badge status="warning" badgeStyle= {{marginLeft: wp('3%')}}/>
                <Icon name='notifications' style= {{fontSize: hp('3.2%'), color: 'white', marginTop:hp('0%')}}></Icon>
                
              </TouchableOpacity>
            </View>
          )}
        </View>
      );
    }
  }

  mapStateToProps = (state) => ({
    notification: state.notification.notifications
  });

  export default connect(mapStateToProps,null) (NotificationIcon);