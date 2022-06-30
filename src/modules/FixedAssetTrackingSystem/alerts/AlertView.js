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
  Button
} from 'react-native';

import { fonts, colors } from '../../../styles';
import Item from './AlertItem';
import {Bars} from 'react-native-loader';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { withNavigation } from "react-navigation";

class AlertScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        seconds: 5,
        titlearray: [],
        selected: -1,
        selectedValue : null,
        color:'',
    }
  }
  
  componentDidMount () {

    AppState.addEventListener('change', this.handleAppStateChange);

    const{user} = this.props;

    const temp = []

    user.dashboards.forEach(d => {
      temp.push(d.title);
    })
    this.setState({
      titlearray :  temp
    });
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      this.props.getColdChainAlerts(user.id,'fa');
      // The screen is focused
      // Call any action
    });
   
  }
  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
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
    const {assetTrackingAlertData,assetTrackingAlertLoading} =this.props;    
    return (
      <View style={styles.container}>
        
            {assetTrackingAlertLoading ? (
              <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
                <Bars size={15} color={colors.primary} />
              </View>
            ) : (
              <View style={{flex:1}}>
                {assetTrackingAlertData.length > 0 ? (
                  <FlatList                
                    data={ assetTrackingAlertData }                               
                    renderItem={({item}) => <Item date={item.created_at} 
                    message={item.message}/>}
                    keyExtractor={(item, index) => index.toString()}
                  /> 
                ) : (
                  <View style={{flex:0.9, alignItems:'center', justifyContent:'center'}}>
                    <Text style={styles.Text}>NO RECENT ALERTS!</Text>
                  </View>                  
                )}
              </View>
            )}
      </View>
    );
  }
}
export default withNavigation(AlertScreen);
const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: colors.background,
},
btnText: {fontSize: hp('2%'),fontWeight: 'bold',color: '#fff'
},

Image:{width:wp('50%'), height:hp('60%')},
Text:{color: colors.gray, fontWeight:'bold',fontSize: hp('2%')},
Dropdown:{ width: wp('80%'),height: hp('4%'), 
          alignSelf: 'center', marginTop: hp('1.5%')},
});
