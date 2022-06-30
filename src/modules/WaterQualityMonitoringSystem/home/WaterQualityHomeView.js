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
import { Card, ListItem,Button, Icon } from 'react-native-elements';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';
import { withNavigation } from "react-navigation";
const iconPh = require('../../../../assets/images/icons/ph.png');

class WaterQualityHomeScreen extends React.Component {

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
    const {selected} = this.state;
    console.log(selected);
    const done1 = await this.props.getLmsSensors(user.id,'qa');
    if(done1 === 'done') {
      this.handleSensorData();
    }
    else{
      console.log('error');
    }

    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", async () => {
      const done1 = await this.props.getLmsSensors(user.id,'qa');
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

  render() {
    const {sensorarray, selectedValue,sensorIndex,selected} = this.state;
    const {loading, lms} = this.props;
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
              <ScrollView style={styles.scrollView}>
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
            containerStyle={[styles.cardMainContainer,{marginBottom:10}]}
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
          </ScrollView>
            )
          }
          
        </SafeAreaView>
      );
    }

    
  }
}
export default withNavigation(WaterQualityHomeScreen);
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
  Icon:{fontSize: hp('4%'), marginBottom: hp('0.5%'), color: 'white'},

});
