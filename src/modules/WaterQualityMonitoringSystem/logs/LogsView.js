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
        type: '',
        logtype: 'ph',
        dasboardarray:[],
        logtypearray: [],
        sensorarray: [],
        selected1: 0,
        selectedValue1 : this.props.lms[0].name,
        selected2: 0,
        selectedValue2 : 'ph',
        startDate: moment().subtract(7,'days'),
        endDate: moment().add(1,'day'),
        displayedDate: moment(),
    }
  }

  async componentDidMount () {
    const {user,lms} = this.props;
    const{selectedValue2,selected1,startDate,endDate} = this.state;
    let done = null;

    const temp = []

    user.dashboards.forEach(d => {
      temp.push(d.title);
    })
    this.setState({
      dasboardarray :  temp
    });

    done = await this.props.getLmsSensors(user.id,'qa');

    if (done === 'done'){
      this.handleSensorData();  
    }
    await this.props.getLmsTableData(selectedValue2,lms[selected1]._id,startDate, endDate);
    
  }


  handleSensorData = () => {
    const {lms} = this.props;

    const temp = [];

    lms.map(s=> {
      temp.push(s.name);
    })
    
    this.setState({
      sensorarray : temp
    })
  }

  handleSensorChange = (index,value) => {

    const {lms,user} = this.props;
    const {selectedValue2,startDate, endDate} = this.state;

    const Index2 = lms.findIndex(s=> s.name === value);
    this.setState({
      selected1: Index2,
      selectedValue1: lms[Index2].name
    });

    if(selectedValue2 !== null){
      this.props.getLmsTableData(selectedValue2,lms[Index2]._id,startDate, endDate);
    }

  }

  handleTypeChange = (index,value) => {
    
    const {lms} = this.props;   
    const {type,selected1, startDate,endDate} = this.state;

    this.setState({
      selected2: index,
      selectedValue2: value
    });

   this.props.getLmsTableData(value,lms[selected1]._id,startDate,endDate);
  }

  startDateChange = (date) => {
    const {lms} = this.props;
    const {selected1,selectedValue2,startDate,endDate} = this.state;
    this.setState({
      startDate: date
    })

    this.props.getLmsTableData(selectedValue2,lms[selected1]._id,date,endDate);

  }
  endDateChange = (date) => {
    const {lms} = this.props;
    const {selected1,selectedValue2,startDate} = this.state;

    this.setState({
      endDate: date
    })

    this.props.getLmsTableData(selectedValue2, lms[selected1]._id,startDate,date);
  }

  render() {
    const{lmsData,logs, isLoading} = this.props;
    const {sensorarray,selectedValue2} = this.state;
    
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
              items={lmsData}
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
                placeholder="select date"
                format="YYYY-MM-DD"
                display="default"
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
                style={{width: wp('38%')}}
                date={this.state.endDate}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                display="default"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateInput: styles.DatePickerInput,
                  dateIcon:styles.DatePickerIcon      
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
                  <View>
                                {selectedValue2 === 'ph' ? (
                  <FlatList                
                    data={ logs }                               
                    renderItem={({item}) => <Item updated_at={item.updated_at} created_at={item.created_at} 
                    messagedata={item.ph} title= {this.state.selectedValue2}/>}
                    keyExtractor={(item, index) => index.toString()}
                  />
                ) : selectedValue2 === 'motor' ? (
                  <FlatList                
                    data={ logs }                               
                    renderItem={({item}) => <Item updated_at={item.updated_at} created_at={item.created_at} 
                    messagedata={item.motor} title= {this.state.selectedValue2}/>}
                    keyExtractor={(item, index) => index.toString()}
                  />
                ) : selectedValue2 === 'tds' ? (
                  <FlatList                
                    data={ logs }                               
                    renderItem={({item}) => <Item updated_at={item.updated_at} created_at={item.created_at} 
                    messagedata={item.tds} title= {this.state.selectedValue2}/>}
                    keyExtractor={(item, index) => index.toString()}
                  />
                ) : selectedValue2 === 'waterflow' ? (
                  <FlatList                
                    data={ logs }                               
                    renderItem={({item}) => <Item updated_at={item.updated_at} created_at={item.created_at} 
                    messagedata={item.waterflow} title= {this.state.selectedValue2}/>}
                    keyExtractor={(item, index) => index.toString()}
                  />
                ) : selectedValue2 === 'temperature' ? (
                  <FlatList                
                    data={ logs }                               
                    renderItem={({item}) => <Item updated_at={item.updated_at} created_at={item.created_at} 
                    messagedata={item.temperature} title= {this.state.selectedValue2}/>}
                    keyExtractor={(item, index) => index.toString()}
                  />
                ) : selectedValue2 === 'aerator' ? (
                  <FlatList                
                    data={ logs }                               
                    renderItem={({item}) => <Item updated_at={item.updated_at} created_at={item.created_at} 
                    messagedata={item.aerator} title= {this.state.selectedValue2}/>}
                    keyExtractor={(item, index) => index.toString()}
                  />
                ):
                (
                  <FlatList                
                    data={ logs }                               
                    renderItem={({item}) => <Item updated_at={item.updated_at} created_at={item.created_at} 
                    messagedata={item.dissolvedOxygen} title= {this.state.selectedValue2}/>}
                    keyExtractor={(item, index) => index.toString()}
                  />
                )
                } 
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
