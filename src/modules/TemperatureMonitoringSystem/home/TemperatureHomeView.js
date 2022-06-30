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
  SafeAreaView,
  ScrollView
} from 'react-native';
import { Card, ListItem,Button, Icon } from 'react-native-elements';
import DialogInput from 'react-native-dialog-input';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';
import Icon1 from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/MaterialIcons';
import { withNavigation } from "react-navigation";
import { Dropdown } from '../../../components';
import { fonts, colors } from '../../../styles';

class TemperatureHomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state= {
      moduleArray: [],
      selectedModule: -1,
      selectedModuleValue : null,
      loading: true,
      isDialogVisible1: false,
      isDialogVisible2: false,
      sensorIndex: null
    }
  }

  async componentDidMount() {
    const {user,addNotification, updateTemperature} = this.props;
  
    const done = await this.props.getTemperatureSensors(user.id);
    if(done === 'done') {
      this.handleSensorData();
    }
    else{
      console.log('error');
    }

    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", async () => {
      const done = await this.props.getTemperatureSensors(user.id);
      if(done === 'done') {
        this.handleSensorData();
      }
      else{
        console.log('error');
      }
    });
  }

  handleSensorData = () => {
    const {temperature} = this.props;

    const temp = [];

    temperature.map(s=> {
      temp.push(s.name);
    })
    
    this.setState({
      moduleArray : temp,
      selectedModule: 0,
      selectedModuleValue: temperature[0].name
    })
  }

  handleSensorChange = (index,value) => {

    // const {selected, selectedValue} = this.state;
    const {temperature} = this.props;
    const Index2 = temperature.findIndex(s=> s.name === value);
    
    this.setState({
      selectedModule: index,
      selectedModuleValue: value,
      sensorIndex: Index2
    });
  }

  openDialog = () => {
    this.setState({
      isDialogVisible1: true
    });
  }

  openUpperDialog = () => {
    this.setState({
      isDialogVisible2: true
    });
  }

  closeDialog = () => {
    this.setState({
      isDialogVisible1: false,
    });
  }

  closeUpperDialog = () => {
    this.setState({
      isDialogVisible2: false,
    });
  }

  sendThreshold = (inputText) => {
    
    const{temperature} = this.props;
    const {selectedModuleValue} = this.state;
    const sensor = temperature.findIndex(s=> s.name === selectedModuleValue);
    
    if(inputText !== ''){
      this.props.setThreshold(inputText,temperature[sensor]._id);
    }

    this.closeDialog();
  }

  sendUpperThreshold = (inputText) => {
    const{temperature} = this.props;
    const {selectedModuleValue,selected} = this.state;
    const sensor = temperature.findIndex(s=> s.name === selectedModuleValue);

    if(inputText !== ''){
      this.props.setUpperThreshold(inputText,temperature[sensor]._id);
    }

    this.closeUpperDialog();
  }

  render() {
    const {moduleArray, selectedModuleValue,selectedModule} = this.state;
    const {temperature, isLoading} = this.props;
    console.log('temp',temperature)
    
    if(selectedModuleValue === null && selectedModule === -1){
      return(
        <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
          <Bars size={15} color={colors.primary} />
        </View> 
      );
    }
    
      return (
        <SafeAreaView style={styles.container}>
          <Dropdown
            placeholder='Select Module...'
            style={styles.Dropdown}         
            items={moduleArray}
            selectedIndex={this.state.selectedModule}
            onSelect={(index,value) => this.handleSensorChange(index,value)}
          />
          {isLoading ? (
            <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
              <Bars size={15} color={colors.primary} />
            </View>
            ) : (
              <ScrollView keyboardShouldPersistTaps='handled' style={styles.scrollView}>  
                <Card
                  title='CURRENT TEMPERATURE'
                  titleStyle={styles.cardTitle}         
                  containerStyle={styles.cardMainContainer}
                >
                  <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View>
                      <Text style={styles.Text}>
                        {temperature[selectedModule].currentTemp} ℃
                      </Text>
                    </View>
        
                    <View style={styles.IconView}>
                      <Icon1 name='thermometer-half' style={styles.Icon} />
                    </View>           
                  </View>
              
                </Card>
  
                <Card
                  title='TEMPERATURE LOWER THRESHOLD'
                  titleStyle={styles.cardTitle}         
                  containerStyle={styles.cardMainContainer}
                >
                  <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View>
                      <Text style={[styles.Text,{marginTop:hp('0%')}]}>
                        {temperature[selectedModule].threshold}
                      </Text>
                      <View style={{flexDirection:'row'}}>
                        <TouchableOpacity onPress={this.openDialog}>
                          <Text style={[styles.Text,{marginTop: hp('0.5%'), fontSize: hp('2%'), color: '#1976D2'}]}>Set Threshold</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
        
                    <View style={styles.IconView}>
                      <Icon3 name='graphic-eq' style={styles.Icon} />
                    </View>
    
                    <DialogInput
                      isDialogVisible={this.state.isDialogVisible1}
                      title="Set Threshold"
                      message="Enter Value to set threshold"
                  // hintInput ={"HINT INPUT"}
                      submitInput={(inputText) => {this.sendThreshold(inputText)}}
                      textInputProps={{keyboardType:'numeric'}}
                      closeDialog={this.closeDialog}
                    />           
                  </View>            
                </Card>

                <Card
                  title='TEMPERATURE UPPER THRESHOLD'
                  titleStyle={styles.cardTitle}         
                  containerStyle={[styles.cardMainContainer,{marginBottom:10}]}
                >
                  <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View>
                      <Text style={[styles.Text,{marginTop:hp('0%')}]}>
                        {temperature[selectedModule].upperThreshold}
                      </Text>
                      <View style={{flexDirection:'row'}}>
                        <TouchableOpacity onPress={this.openUpperDialog}>
                          <Text style={[styles.Text,{marginTop: hp('0.5%'), fontSize: hp('2%'), color: '#1976D2'}]}>Set Threshold</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
      
                    <View style={styles.IconView}>
                      <Icon3 name='graphic-eq' style={styles.Icon} />
                    </View>
  
                    <DialogInput
                      isDialogVisible={this.state.isDialogVisible2}
                      title="Set Threshold"
                      message="Enter Value to set threshold"
                // hintInput ={"HINT INPUT"}
                      submitInput={(inputText) => {this.sendUpperThreshold(inputText)}}
                      textInputProps={{keyboardType:'numeric'}}
                      closeDialog={this.closeUpperDialog}
                    />           
                  </View>            
                </Card>          
  
              </ScrollView>      
            )}  
                
        </SafeAreaView>
      )
        
  }
}
export default withNavigation(TemperatureHomeScreen);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    // backgroundColor: '#fff',
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
