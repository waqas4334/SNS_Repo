import React from 'react';
import {
  StyleSheet,
  View,
  Platform,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ScrollView
} from 'react-native';

import { fonts, colors } from '../../../styles';
import { Dropdown } from '../../../components';

import { Card } from 'react-native-elements';
import DialogInput from 'react-native-dialog-input';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { Bars } from 'react-native-loader';

import Icon1 from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/MaterialIcons';
import { withNavigation } from "react-navigation";

class ColdChainHomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state= {
      sensorarray: [],
      selected: -1,
      selectedValue : null,
      loading: true,
      isDialogVisible1: false,
      isDialogVisible2: false,
      isDialogVisible3: false,
      sensorIndex: null,
    }
  }

  async componentDidMount() {
    const {user} = this.props;
    const done = await this.props.getColdChainSensors(user.id,'store');
    if(done === 'done') {
      this.handleSensorData();
    }
    else{
      console.log('error');
    }
    
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", async () => {
      const done = await this.props.getColdChainSensors(user.id,'store');
      if(done === 'done') {
        this.handleSensorData();
      }
      else{
        console.log('error');
      }
    });
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

  openLowerDialog = () => {
    this.setState({
      isDialogVisible1: true
    });
  }
  openUpperDialog = () => {
    this.setState({
      isDialogVisible2: true
    });
  }
  closeLowerDialog = () => {
    this.setState({
      isDialogVisible1: false,
    });
  }
  closeUpperDialog = () => {
    this.setState({
      isDialogVisible2: false,
    });
  }
  sendLowerThreshold = (inputText) => {
    
    const{coldchain} = this.props;
    const {selectedValue,selected} = this.state;
    const sensor = coldchain.findIndex(s=> s.name === selectedValue);
    
    if(inputText !== ''){
      this.props.setColdChainThreshold(inputText,coldchain[selected].upperThreshold,coldchain[sensor]._id);
    }
    this.closeLowerDialog();

  }
  openCenterDialog = () => {
    this.setState({
      isDialogVisible3: true
    })
  }

  closeCenterDialog = () => {
    this.setState({
      isDialogVisible3: false
    })
  }
 
  sendGeofence = (inputText) => {
    
    const{coldchain} = this.props;
    const {selectedValue,selected} = this.state;
    const sensor = coldchain.findIndex(s=> s.name === selectedValue);
    
    if(inputText !== ''){
      this.props.setColdChainGeofence(inputText,coldchain[sensor]._id);
    }

    this.closeCenterDialog();

  }

  sendUpperThreshold = (inputText) => {
    const{coldchain} = this.props;
    const {selectedValue,selected} = this.state;
    const sensor = coldchain.findIndex(s=> s.name === selectedValue);
    
    if(inputText !== ''){
      this.props.setColdChainThreshold(coldchain[selected].lowerThreshold,inputText,coldchain[sensor]._id);
    }
    this.closeUpperDialog();
  }

  setCenter = () => {
    const {coldchain} = this.props;
    const {selected} = this.state;
   
    this.props.setColdChainGeofenceCenter(coldchain[selected]._id);    
    //console.log(coldchain[selected]._id);
  } 

  render() {
    const {sensorarray, selectedValue,sensorIndex,selected} = this.state;
    const {loading, coldchain} = this.props;
    //console.log(coldchain);

    if(selectedValue === null && selected === -1){
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
              <ScrollView keyboardShouldPersistTaps='handled' style={styles.scrollView}>

          <Card
            title='DOOR STATUS'
            titleStyle={styles.cardTitle}         
            containerStyle={styles.cardMainContainer}
          >
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              {coldchain[selected].status === 1 ? (
                  <Text style={styles.Text}>
                    Open
                  </Text>
                ):(
                  <Text style={styles.Text}>
                    Close
                  </Text>
                )
              }
              {coldchain[selected].status === 1? (
                <View style={[styles.IconView,{backgroundColor:'#d32f2f'}]}>
                  <Icon1 name='door-open' style= {styles.Icon}></Icon1>
                </View>
              ):(
                <View style={[styles.IconView,{backgroundColor:'#388E3C'}]}>
                  <Icon1 name='door-closed' style= {styles.Icon}></Icon1>
                </View>
              )}            
              
            </View>
            
          </Card>
  
          <Card
            title='TEMPERATURE'
            titleStyle={styles.cardTitle}         
            containerStyle={styles.cardMainContainer}
          >
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <Text style={styles.Text}>
                  {coldchain[selected].temperature} ℃
                </Text>
              </View>
      
              <View style={styles.IconView}>
                <Icon1 name='thermometer-half' style= {{fontSize: 35, marginBottom: 2, color: 'white'}}></Icon1>
              </View>           
            </View>
            
          </Card>
  
          <Card
            title='BATTERY'
            titleStyle={styles.cardTitle}         
            containerStyle={styles.cardMainContainer}
          >
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <Text style={styles.Text}>
                  {coldchain[selected].battery} %
                </Text>
              </View>
      
              <View style={styles.IconView}>
                <Icon3 name='battery-charging-full' style= {{fontSize: 35, marginBottom: 2, color: 'white'}}></Icon3>
              </View>           
            </View>
            
          </Card>

          <Card
                  title='GEOFENCE'
                  titleStyle={styles.cardTitle}         
                  containerStyle={[styles.cardMainContainer,{marginBottom:10}]}
                >
                  <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View>
                      <Text style={[styles.Text,{marginTop:hp('0%')}]}>
                        {coldchain[selected].geofenceCenter.radius} meters
                      </Text>
                      <View style={{flexDirection:'row'}} >
                        <TouchableOpacity onPress = {this.openCenterDialog}>
                          <Text style={[styles.Text,{marginTop: hp('0.5%'), fontSize: hp('2%'), color: '#1976D2'}]}>SET GEOFENCE</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
            
                    <View style={styles.IconView}>
                      <Icon3 name='graphic-eq' style= {styles.Icon}></Icon3>
                    </View>
        
                    <DialogInput isDialogVisible={this.state.isDialogVisible3}
                      title={"Set GEOFENCE"}
                      message={"Enter Value to set Geofence"}
                      //hintInput ={"HINT INPUT"}
                      submitInput={ (inputText) => {this.sendGeofence(inputText)} }
                      textInputProps={{keyboardType:'numeric'}}
                      closeDialog={this.closeCenterDialog}>
                    </DialogInput>           
                  </View>                  
                </Card>

          <Card
            title='GEOFENCE CENTER POINT'
            titleStyle={styles.cardTitle}         
            containerStyle={[styles.cardMainContainer,{marginBottom:10}]}
            >
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flexDirection:'row'}} >
                  <TouchableOpacity style={styles.centerBtn} onPress = {this.setCenter}>
                    <Text style={{ fontSize: hp('1.7%'),fontWeight:'bold', color: '#1976D2'}}>SET CENTER</Text>
                  </TouchableOpacity>
                </View>
            
                <View style={styles.IconView}>
                  <Icon3 name='graphic-eq' style= {styles.Icon}></Icon3>
                </View>
              </View>                  
          </Card> 
  
          <Card
            title='LOWER THRESHOLD'
            titleStyle={styles.cardTitle}         
            containerStyle={styles.cardMainContainer}
          >
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <Text style={[styles.Text,{marginTop:hp('0%')}]}>
                  {coldchain[selected].lowerThreshold}
                </Text>
                <View style={{flexDirection:'row'}} >
                  <TouchableOpacity onPress = {this.openLowerDialog}>
                    <Text style={[styles.Text,{marginTop: hp('0.5%'), fontSize: hp('2%'), color: '#1976D2'}]}>Set Threshold</Text>
                  </TouchableOpacity>
                </View>
              </View>
      
              <View style={styles.IconView}>
                <Icon3 name='graphic-eq' style= {styles.Icon}></Icon3>
              </View>
  
              <DialogInput isDialogVisible={this.state.isDialogVisible1}
                title={"Set Threshold"}
                message={"Enter Value to set threshold"}
                //hintInput ={"HINT INPUT"}
                submitInput={ (inputText) => {this.sendLowerThreshold(inputText)} }
                textInputProps={{keyboardType:'numeric'}}
                closeDialog={this.closeLowerDialog}>
              </DialogInput>           
            </View>
            
          </Card>
  
          <Card
            title='UPPER THRESHOLD'
            titleStyle={styles.cardTitle}         
            containerStyle={[styles.cardMainContainer,{marginBottom:10}]}
          >
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <Text style={[styles.Text,{marginTop:hp('0%')}]}>
                  {coldchain[selected].upperThreshold}
                </Text>
                <View style={{flexDirection:'row'}} >
                  <TouchableOpacity onPress = {this.openUpperDialog}>
                    <Text style={[styles.Text,{marginTop: hp('0.5%'), fontSize: hp('2%'), color: '#1976D2'}]}>Set Threshold</Text>
                  </TouchableOpacity>
                </View>
              </View>
      
              <View style={styles.IconView}>
                <Icon3 name='graphic-eq' style= {styles.Icon}></Icon3>
              </View>
  
              <DialogInput isDialogVisible={this.state.isDialogVisible2}
                title={"Set Threshold"}
                message={"Enter Value to set threshold"}
                //hintInput ={"HINT INPUT"}
                submitInput={ (inputText) => {this.sendUpperThreshold(inputText)} }
                textInputProps={{keyboardType:'numeric'}}
                closeDialog={this.closeUpperDialog}>
              </DialogInput>           
            </View>            
          </Card>          
          </ScrollView>
            )
          } 
          
        </SafeAreaView>
      );
    }    
  }
}
export default withNavigation(ColdChainHomeScreen);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    //backgroundColor: '#fff',
  },
  cardMainContainer:{  
    flex:1,
    backgroundColor: colors.white,
    borderColor: colors.white,
    borderWidth: 0,
    elevation: 5,
    shadowRadius: wp('3%'),  
    justifyContent: 'center',
    borderRadius: wp('3%'),  
    marginTop: hp('1%'), 
    marginLeft: wp('3.5%'),
    padding: 9,
    paddingHorizontal:15,     
  },
  cardTitle: {
    alignSelf: 'flex-start', 
    fontSize: hp('1.7%'), 
    marginVertical: hp('0%'), 
    marginBottom: hp('0.2'),
    color: colors.lightGray
  },
  IconView: {
    width: 65, 
    height: 65, 
    borderRadius: 35, 
    backgroundColor: '#1976D2', 
    alignItems: 'center',
    justifyContent: 'center', 
    shadowOffset: {width: wp('0%'), height: hp('0%')}, 
    shadowColor: 'black',
    shadowOpacity: 0.5, 
    shadowRadius: wp('2%'),
    elevation: 5,
  },

  Dropdown:{ width: wp('80%'),height: hp('4%'), alignSelf: 'center', marginTop: hp('1.5%')},
  Text:{marginTop: hp('2%'), fontSize: hp('3.5%'), fontWeight: 'bold', color: '#424242'},
  Icon:{fontSize: hp('3%'), marginBottom: hp('0.5%'), color: 'white'},

  centerBtn:{
    backgroundColor: colors.white,
    alignItems:'center',
    justifyContent:'center',
    width:wp('30%'),
    height:hp('5%'),
    borderRadius: 20,
    marginTop: 17,
    elevation: 5,
    shadowColor: '#000000',
    shadowRadius: 20,
  }
});
