import React from 'react';
import {
  StyleSheet,
  View,
  Platform,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView
} from 'react-native';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { fonts, colors } from '../../../styles';
import { Dropdown } from '../../../components';

import { Card} from 'react-native-elements';

import DialogInput from 'react-native-dialog-input';

import {Bars} from 'react-native-loader';
import ProgressBarAnimated from 'react-native-progress-bar-animated';

import Icon1 from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/MaterialIcons';
const iconOxygen = require('../../../../assets/images/icons/oxygen.png');
const iconPh = require('../../../../assets/images/icons/ph.png');
import { withNavigation } from "react-navigation";

class LiquidHomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state= {
      sensorarray: [],
      selected: -1,
      selectedValue : null,
      isDialogVisible1: false,
      isDialogVisible2: false,
      sensorIndex: null
    }
  }

  async componentDidMount() {
    const {user} = this.props;

    const done1 = await this.props.getLmsSensors(user.id,'farm');
    if(done1 === 'done') {
      this.handleSensorData();
    }
    else{
      console.log('error');
    }

    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", async () => {
      const done1 = await this.props.getLmsSensors(user.id,'farm');
      if(done1 === 'done') {
        this.handleSensorData();
      }
      else{
        console.log('error');
      }
    });
  } 

  handleSensorData = () => {
    const {lms} = this.props;

    const temp = [];

    lms.map(s=> {
      temp.push(s.name);
    })
    
    this.setState({
      sensorarray : temp,
      selected: 0,
      selectedValue: lms[0].name
    })
  }

  handleSensorChange = (index,value) => {

    //const {selected, selectedValue} = this.state;
    const {lms} = this.props;
    const Index2 = lms.findIndex(s=> s.name === value);
    
    this.setState({
      selected: index,
      selectedValue: value,
      sensorIndex: Index2
    });
  }

  openAeratorOnDialog = () => {
    this.setState({
      isDialogVisible1: true
    });
  }
  openAeratorOffDialog = () => {
    this.setState({
      isDialogVisible2: true
    });
  }
  closeAeratorOnDialog = () => {
    this.setState({
      isDialogVisible1: false,
    });
  }
  closeAeratorOffDialog = () => {
    this.setState({
      isDialogVisible2: false,
    });
  }
  sendOnThreshold = (inputText) => {
    
    const{lms} = this.props;
    const {selectedValue,sensorIndex} = this.state;
    const sensor = lms.findIndex(s=> s.name === selectedValue);
    
    if(inputText !== ''){
      this.props.setLmsThreshold(inputText,lms[sensor]._id);
    }
    
    this.closeAeratorOnDialog();
  }

  sendOffThreshold = (inputText) => {
  
    const{lms} = this.props;   
    const {selectedValue} = this.state;
    const sensor = lms.findIndex(s=> s.name === selectedValue);
    
    if(inputText !== ''){
      this.props.setLmsUpperThreshold(inputText,lms[sensor]._id);
    }
    this.closeAeratorOffDialog();
  }

  render() {
    const {sensorarray, selectedValue,sensorIndex,selected} = this.state;
    const {loading, lms} = this.props;
    //console.log(lms);

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
            title='PH VALUE'
            titleStyle={styles.cardTitle}         
            containerStyle={styles.cardMainContainer}
          >
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{flexDirection:'row'}}>
                
                <Text style={styles.Text}>
                  {lms[selected].ph}
                </Text>

                {lms[selected].ph >= 0 && lms[selected].ph < 7 ? (
                  <Text style={[styles.Text, {marginLeft: wp('2%'),marginTop: hp('2.7%'),fontSize: hp('2.5%')}]}>
                    (Acidic)
                  </Text>
                ) : lms[selected].ph == 7 ? (
                  <Text style={[styles.Text, {marginLeft: wp('2%'),marginTop: hp('2.7%'),fontSize: hp('2.5%')}]}>
                    (Neutral)
                  </Text>
                ) : lms[selected].ph > 7 && lms[selected].ph <= 14 ? (
                  <Text style={[styles.Text, {marginLeft: wp('2%'),marginTop: hp('2.7%'),fontSize: hp('2.5%')}]}>
                    (Basic)
                  </Text>
                ) : (
                  <Text style={[styles.Text, {marginLeft: wp('2%'),marginTop: hp('2.7%'),fontSize: hp('2.5%')}]}>
                    (Basic)
                  </Text>
                )}

              </View>
      
              <View style={styles.IconView}>
                <Image
                  resizeMode="contain"
                  source={iconPh}
                  style= {{marginBottom: hp('0.5%'), width: 30, height:35}}
                />
              </View>           
            </View>
            
          </Card>
  
          <Card
            title= 'TDS VALUE'
            titleStyle={styles.cardTitle}         
            containerStyle={styles.cardMainContainer}
          >
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.Text}>
                  {lms[selected].tds} 
                </Text>
                <Text style={[styles.Text,{marginLeft: wp('2%'),marginTop: hp('2.6%'),fontSize: hp('2.5%')}]}>ppm</Text>
              </View>
      
              <View style={styles.IconView}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>TDS</Text>
              </View>           
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
                  {lms[selected].temperature} ℃
                </Text>
              </View>
      
              <View style={styles.IconView}>
                <Icon1 name='thermometer-half' style= {styles.Icon}></Icon1>
              </View>           
            </View>
            
          </Card>

          <Card
            title='Battery'
            titleStyle={styles.cardTitle}         
            containerStyle={styles.cardMainContainer}
          >
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{marginTop: hp('1%') }}>
                <ProgressBarAnimated
                  width={wp('30%')}
                  value={lms[selected].battery}
                  backgroundColorOnComplete="#6CC644"
                />
                <Text style={[styles.Text,{marginTop: hp('1%')}]}>{lms[selected].battery}%</Text>
              </View>
      
              <View style={styles.IconView}>
                <Icon3 name='battery-charging-full' style= {styles.Icon}></Icon3>
              </View>           
            </View>
            
          </Card>
  
          <Card
            title='DISSOLVED OXYGEN VALUE'
            titleStyle={styles.cardTitle}         
            containerStyle={styles.cardMainContainer}
          >
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <Text style={styles.Text}>
                  {lms[selected].dissolvedOxygen} mg/L
                </Text>
              </View>
      
              <View style={styles.IconView}>
                <Image
                  resizeMode="contain"
                  source={iconOxygen}
                  style= {{marginBottom: hp('0.5%'), width: 30, height:30}}
                />
              </View>           
            </View>
            
          </Card>
  
          <Card
            title='MOTOR STATUS'
            titleStyle={styles.cardTitle}         
            containerStyle={styles.cardMainContainer}
          >
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              {lms[selected].motor === 1? (
                  <Text style={styles.Text}>
                    On
                  </Text>
                ):(
                  <Text style={styles.Text}>
                    Off
                  </Text>
                )
              }
              {lms[selected].motor === 1 ? (
                <View style={[styles.IconView,{backgroundColor:'#388E3C'}]}>
                  <Icon2 name='power-off' style= {styles.Icon}></Icon2>
                </View>
              ):(
                <View style={[styles.IconView,{backgroundColor:'#d32f2f'}]}>
                  <Icon2 name='power-off' style= {styles.Icon}></Icon2>
                </View>
              )}            
              
            </View>
            
          </Card>
  
          <Card
            title='AERATOR STATUS'
            titleStyle={styles.cardTitle}         
            containerStyle={styles.cardMainContainer}
          >
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              {lms[selected].aerator === 1? (
                  <Text style={styles.Text}>
                    On
                  </Text>
                ):(
                  <Text style={styles.Text}>
                    Off
                  </Text>
                )
              }
              {lms[selected].aerator === 1 ? (
                <View style={[styles.IconView,{backgroundColor:'#388E3C'}]}>
                  <Icon2 name='power-off' style= {styles.Icon}></Icon2>
                </View>
              ):(
                <View style={[styles.IconView,{backgroundColor:'#d32f2f'}]}>
                  <Icon2 name='power-off' style= {styles.Icon}></Icon2>
                </View>
              )}            
              
            </View>
            
          </Card>
  
          <Card
            title='THRESHOLD TO TURN AERATOR ON'
            titleStyle={styles.cardTitle}         
            containerStyle={styles.cardMainContainer}
          >
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <Text style={[styles.Text,{marginTop:hp('0%')}]}>
                  {lms[selected].threshold} mg/L
                </Text>
                <View style={{flexDirection:'row'}} >
                  <TouchableOpacity onPress = {this.openAeratorOnDialog}>
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
                submitInput={ (inputText) => {this.sendOnThreshold(inputText)} }
                textInputProps={{keyboardType:'numeric'}}
                closeDialog={this.closeAeratorOnDialog}>
              </DialogInput>           
            </View>
            
          </Card>
  
          <Card
            title='THRESHOLD TO TURN AERATOR OFF'
            titleStyle={styles.cardTitle}         
            containerStyle={[styles.cardMainContainer,{marginBottom:10}]}
          >
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <Text style={[styles.Text,{marginTop:hp('0%')}]}>
                  {lms[selected].upperThreshold} mg/L
                </Text>
                <View style={{flexDirection:'row'}} >
                  <TouchableOpacity onPress = {this.openAeratorOffDialog}>
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
                submitInput={ (inputText) => {this.sendOffThreshold(inputText)} }
                closeDialog={this.closeAeratorOffDialog}
                textInputProps={{keyboardType:'numeric'}}>
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
export default withNavigation(LiquidHomeScreen);
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
});
