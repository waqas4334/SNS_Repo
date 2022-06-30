import React from 'react';
import {
  StyleSheet,
  View,
  Platform,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  AppState,
  Alert,
  Button,
  StatusBar
} from 'react-native';

import { fonts, colors } from '../../styles';
import Item from './NotificationItem';
import { Dropdown } from '../../components';
import ActionButton from 'react-native-action-button';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class NotificationScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        seconds: 5,
        titlearray: [],
        selected: -1,
        selectedValue : null,
        color:''
    }
  }

  componentDidMount () {

    AppState.addEventListener('change', this.handleAppStateChange);

    const{user,addNotification,showNotification} = this.props;

    const temp = []

    user.dashboards.forEach(d => {
      temp.push(d.title);
    })
    this.setState({
      titlearray :  temp
    });
  }

  handleAppStateChange = (appState) => {
    if (appState === 'background') {          
      console.log('app is in background', this.state.seconds);    
    }
    else {
      console.log('app is in foreground');
    }       
  }

  _openArticle = article => {
    this.props.navigation.navigate({
      routeName: 'Article',
      params: { ...article },
    });
  }; 

  clearNotification = () => {
    this.props.clearNotifications();
  }

  render() {
    const {user,notification} =this.props;
    const{titlearray,selectedValue,color} = this.state;

    /*let filter = null;

    if(selectedValue === 'Smart Farm Fisheries'){
      filter = notification.filter(n=> n.type === 'lms');
    }
    else if(selectedValue === 'CNC Monitoring System'){
      filter = notification.filter(n=> n.type === 'led');
    }
    else if(selectedValue === 'Fuel Monitoring System'){
      filter = notification.filter(n=> n.type === 'fuel');
    }
    else if(selectedValue === 'Cold Chain Monitoring System'){
      filter = notification.filter(n=> n.type === 'coldChain');
    }
    else if(selectedValue === 'Temperature Monitoring System'){
      filter = notification.filter(n=> n.type === 'temperature');
    }
    else if(selectedValue === 'Water Quality Monitoring System'){
      filter = notification.filter(n=> n.type === 'qa');
    }
    else if(selectedValue === 'Fixed Asset Tracking System'){
      filter = notification.filter(n=> n.type === 'fa');
    }
    else {  
      filter = notification
    }*/

    /*<View style = {styles.dropdown}>
         <Dropdown
          placeholder = 'All Dashboards'
          style={styles.Dropdown}         
          items={titlearray}
          selectedIndex={this.state.selected}
          onSelect={(index,value) => this.setState({selected: index, selectedValue: value})}
        />
        </View>*/
    
    return (
      <View style={styles.container}>
        <StatusBar
                    backgroundColor= "#3b35ac"
                    barStyle="light-content"
                />
        
        {notification.length > 0 ? (
          <FlatList                
            data={ notification }                               
            renderItem={({item}) => <Item variant={item.variant} type={item.type} 
            message={item.title}/>}
            keyExtractor={(item, index) => index.toString()}
          /> 
        ) : (
          <View style={{flex:0.9, alignItems:'center', justifyContent:'center'}}>
            <Text style={{color: colors.primary, fontSize: 20,fontWeight: 'bold'}}>No Notifications!!</Text>
          </View>
        )}
        
        <ActionButton 
            //bgColor= "rgba(0, 0, 0, .3)"
            buttonColor= '#115293'
            renderIcon={active => active ? (<Text style={styles.btnText}>Clear</Text> ) : 
            (<Text style={styles.btnText}>Clear</Text>)}                        
            onPress={this.clearNotification}            
          />

      </View>
    );
  }
}

const styles = StyleSheet.create({
container: {
    flex: 1,
},
btnText: {fontSize: hp('1.5%'),fontWeight: 'bold',color: colors.white
},

Image:{width:wp('75%'), height:hp('60%')},

Dropdown:{ width: wp('80%'),height: hp('4%'), 
          alignSelf: 'center', marginTop: hp('1.5%')},
});