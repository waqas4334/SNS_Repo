import React from 'react';
import {
  StyleSheet,
  View,
  Platform,
  SafeAreaView,
  ScrollView
} from 'react-native';

import { fonts, colors } from '../../../styles';
import { Dropdown } from '../../../components';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import DropdownAlert from 'react-native-dropdownalert';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { withNavigation } from "react-navigation";

class LocationScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state= {
      sensorarray: [],
      selected: -1,
      selectedValue : null,
      loading: true,
      isDialogVisible1: false,
      isDialogVisible2: false,
      sensorIndex: null,
      isLoading: true
    
    }
  }

  async componentDidMount() {
    const {user} = this.props;
    const done = await this.props.getColdChainSensors(user.id,'store');
    if(done === 'done') {
      this.handleSensorData();
      this.setState({
        isLoading: false
      })
    }
    else{
      console.log('error');
    }
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", async () => {
      const done = await this.props.getColdChainSensors(user.id,'store');
      if(done === 'done') {
        this.handleSensorData();
        this.setState({
          isLoading: false
        })
      }
      else{
        console.log('error');
      }
      // The screen is focused
      // Call any action
    }); 
  }
  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }

  handleSensorData = () => {
    const {coldchain} = this.props;

    const temp = [];

    coldchain.map(s=> {
      temp.push(s.name);
    })
    
    this.setState({
      sensorarray : temp,
      selected: 0,
      selectedValue: coldchain[0].name
    })
  }

  handleSensorChange = (index,value) => {

    //const {selected, selectedValue} = this.state;
    const {coldchain} = this.props;
    const Index2 = coldchain.findIndex(s=> s.name === value);
    
    this.setState({
      selected: index,
      selectedValue: value,
      sensorIndex: Index2
    });
  }

  render() {
    const {sensorarray, selectedValue,sensorIndex,selected,isLoading} = this.state;
    const {loading,coldchain} = this.props;

    if(selectedValue === null && selected === -1){
      return(
        <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
          <Bars size={15} color={colors.primary} />
        </View>
      );
    }
    else if(isLoading === true){
      return(
        <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
          <Bars size={15} color={colors.primary} />
        </View>
      );
    }
    else{
      return (
        <SafeAreaView style={styles.container}>
          <Dropdown
                placeholder = 'Select Module...'
                style={styles.Dropdown}         
                items={sensorarray}
                selectedIndex={this.state.selected}
                onSelect={(index,value) => this.handleSensorChange(index,value)}
              />
          {loading === true ? 
            (
              <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
                <Bars size={15} color={colors.primary} />
              </View>
            )
            :
            (    

            <MapView
              
              style={styles.map}
              initialRegion={{
                latitude: parseFloat(coldchain[selected].latitude),
                longitude:  parseFloat(coldchain[selected].longitude),
                latitudeDelta: 8.0,
                longitudeDelta: 0.01,
              }}
              //mapType={"hybrid"}
              //onPress={this.pickLocationHandler}
              showsUserLocation={true}
              followUserLocation={true}
              //zoomEnabled={true}       
            >
              <MapView.Marker
                  coordinate={{
                  latitude:  parseFloat(coldchain[selected].latitude),
                  longitude:  parseFloat(coldchain[selected].longitude)}}
                  title={selectedValue}
                  //description={"description"}
              />
            <MapView.Circle
                  center={{
                    latitude:  parseFloat(coldchain[selected].geofenceCenter.latitude),
                    longitude: parseFloat(coldchain[selected].geofenceCenter.longitude),
                  }}
                  radius={coldchain[selected].geofenceCenter.radius}
                  strokeWidth={2}
                  strokeColor="#3399ff"
                  fillColor="#80bfff"
              />
              
          </MapView>        
          
            )
          }
          
        </SafeAreaView>
      );
    }    
  }
}
export default withNavigation(LocationScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    //backgroundColor: '#fff',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    //position: 'absolute',
    flex:1,
    top:hp('6%'),
    left: wp('1%'),
    right: wp('1%'),
    height:hp('77.5%')
  },
  Dropdown:{ width: wp('80%'),height: hp('4%'), alignSelf: 'center', marginTop: hp('1.5%')},
});
