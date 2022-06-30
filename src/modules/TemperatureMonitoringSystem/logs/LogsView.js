import React from 'react';
import {
  StyleSheet,
  View,
  Platform,
  Text,
  FlatList,
  YellowBox
} from 'react-native';

import { fonts, colors } from '../../../styles';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { Dropdown } from '../../../components';
import moment from 'moment';
import Item from './LogsItem';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DatePicker from 'react-native-datepicker';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';
import { withNavigation } from "react-navigation";
YellowBox.ignoreWarnings(['DatePickerAndroid']);

class LogsScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        sensorarray: [],
        selected1: 0,
        selectedValue1 : this.props.temperature[0].name,
        selected2: 0,
        selectedValue2 : 'temperature',
        startDate: moment().subtract(7,'days'),
        endDate: moment().add(1,'day'),
        displayedDate: moment(),
    }
  }  
  async componentDidMount () {
    const {user,temperature} = this.props;
    const{selected1,startDate,endDate} = this.state;
    let done = null;

    done = await this.props.getTemperatureSensors(user.id);
    if(done === 'done') {
      this.handleSensorData();
    }
    else{
      console.log('error');
    }
    await this.props.getTemperatureTableData(temperature[selected1]._id,startDate,endDate);

  }

  handleSensorData = () => {
    const {temperature} = this.props;

    const temp = [];

    temperature.map(s=> {
      temp.push(s.name);
    })
    
    this.setState({
      sensorarray : temp
    })
  }

  handleSensorChange = (index,value) => {

    const {temperature} = this.props;
    const {selectedValue2,startDate,endDate} = this.state;

    const Index2 = temperature.findIndex(s=> s.name === value);

    this.setState({
      selected1: index,
      selectedValue1: temperature[Index2].name
    });

    if(selectedValue2 !== null){
      this.props.getTemperatureTableData(temperature[Index2]._id,startDate,endDate);
    }
  }

  handleTypeChange = (index,value) => {
    
    const {temperature} = this.props;      
    const {selected1,startDate,endDate} = this.state;

    this.setState({
      selected2: index,
      selectedValue2: value
    });

   this.props.getTemperatureTableData(temperature[selected1]._id,startDate,endDate);
   
  }

  startDateChange = (date) => {
    const {temperature} = this.props;
    const {selected1,endDate} = this.state;
    this.setState({
      startDate: date
    })
    this.props.getTemperatureTableData(temperature[selected1]._id,date,endDate);

  }
  endDateChange = (date) => {
    const {temperature} = this.props;
    const {selected1,startDate} = this.state;

    this.setState({
      endDate: date
    })

    this.props.getTemperatureTableData(temperature[selected1]._id,startDate,date);
  }

  render() {
    const{tempData,logs,isLoading} = this.props;
    const {sensorarray} = this.state;    
    
    return (
      <View style={styles.container}>            
        
          <View style = {styles.filterView}>          
            <Dropdown
              placeholder = 'Select Module'
              style={styles.Dropdown}         
              items={sensorarray}
              selectedIndex={this.state.selected1}
              onSelect={(index,value) => this.handleSensorChange(index,value)}
            />
          
            <Dropdown
              placeholder = 'Select Sensor'
              style={styles.Dropdown}         
              items={tempData}
              selectedIndex={this.state.selected2}
              onSelect={(index,value) => this.handleTypeChange(index,value)}
            />
                       
          </View>
          <View style={styles.datePickerView}>
            <Text style={styles.DatePickerText}>Start: </Text>
          <DatePicker
                style={styles.DatePicker}
                date={this.state.startDate}
                mode="date"
                display="default"
                placeholder="select date"
                format="YYYY-MM-DD"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateInput: styles.DatePickerInput,
                  dateIcon: styles.DatePickerIcon
                  
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => {this.startDateChange(date)}}
          />
          <Text style={[styles.DatePickerText,{marginLeft: wp('4%')}]}>End: </Text>
          <DatePicker
                style={styles.DatePicker}
                date={this.state.endDate}
                mode="date"
                display="default"
                placeholder="select date"
                format="YYYY-MM-DD"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateInput: styles.DatePickerInput,
                  dateIcon: styles.DatePickerIcon
                  ,                  
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => {this.endDateChange(date)}}
            />
            </View>

            {isLoading ? (
              <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
                <Bars size={15} color={colors.primary} />
              </View>
            ) : (
              <View>
                {logs.length > 0 ? (
                  <View >
                   
                    <FlatList                
                      data={ logs }                               
                      renderItem={({item}) => <Item updated_at={item.updated_at} created_at={item.created_at} 
                      messagedata={item.temperature} title= {this.state.selectedValue2}/>}
                      keyExtractor={(item, index) => index.toString()}
                    />   
                 
                  </View>
                ):(
                  <View style={styles.TextView}>
                    <Text style={styles.Text}>Sorry no matching records found</Text>
                  </View>
                )}
              
              </View>
            )}

      </View>
    );
  }
}
export default withNavigation(LogsScreen);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    width: wp('100%')
  },
  Dropdown: { width: wp('45%'), height: hp('5%'), marginHorizontal:wp('2.5%')},
  filterView: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: hp('1.5%'),
    marginTop: hp('1.5%'),
  },
  datePickerView:{
    alignItems: 'center',
    flexDirection: 'row', 
  },

  DatePicker:{width: wp('37%'), marginLeft:wp('1%')},
  DatePickerText:{marginLeft: wp('3%'), color: colors.gray,fontWeight:'bold'},
  DatePickerInput:{marginLeft: wp('0%'),height:hp('3%')},
  DatePickerIcon: {top: hp('0%'), marginLeft: wp('0%')},

  TextView:{marginTop: hp('30%'),alignItems: 'center', justifyContent: 'center'},
  Text:{color: colors.gray, fontWeight:'bold',fontSize: hp('2%')}
  
});
