import React from 'react';
import { View, Text, StyleSheet, YellowBox, ScrollView , ActivityIndicator,Image} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Card } from 'react-native-elements';

import Icon4 from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/MaterialIcons'
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import { withNavigation } from 'react-navigation';
import { colors } from '../../../styles';
import { Dropdown } from '../../../components';

const icon = require('../../../../assets/images/plug.jpg');

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            moduleArray: [],
            selectedModule: -1,
            selectedModuleValue: null,
            segmentIndex: false,
        }
    }

    async componentDidMount() {
        const { user ,navigation} = this.props;
        const done = await this.props.getModule(user.id);
        if (done === 'done') {
            this.handleSensorData();
        } else {
            console.log('error');
        }
        this.focusListener = navigation.addListener('didFocus', async () => {
            const done = await this.props.getModule(user.id);
            if (done === 'done') {
                this.handleSensorData();
            } else {
                console.log('error');
            }
        });
    }

    handleSensorData = () => {
        const { module } = this.props;
        const temp = [];
        module.map(s => {
            temp.push(s.name);
        })
        this.setState({
            moduleArray: temp,
            selectedModule: 0,
            selectedModuleValue: module[0].name
        })
    }

    handleModuleData = (index, value) => {
        const { module } = this.props;
        const Index2 = module.findIndex(s => s.name === value);
        this.setState({
            selectedModule: index,
            selectedModuleValue: value,
            segmentIndex: Index2
        });
    }

    render() {
        const { selectedModule, moduleArray, selectedModuleValue } = this.state;
        const { module, user } = this.props;
        // console.log('rectifierrrrrr',module);

        if (selectedModuleValue === null && selectedModule === -1) {
            return (
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size={15} color={colors.primary} />
              </View>
            );
        }

        return (
          <View style={{ flex: 1 }}>
            {/* <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} 
                colors={["#3955B0","#3367F7", "#3367F7", "#736AFF", "#65B8D6", "#008CEA"]} style={{flex:1}}> */}
            <Dropdown
              placeholder='Set Module'
              items={moduleArray}
              style={styles.dropDown}
              selectedIndex={selectedModule}
              onSelect={(index, value) => this.handleModuleData(index, value)}
            />
            <ScrollView style={{ flex: 1 / 2, paddingBottom: hp('3%') }}>
              <Text style={styles.textStyle}>Rectifier Monitoring</Text>                  
              {/* <Card containerStyle={[styles.cardContainer,{padding:0}]}> */}
              <Text style={styles.texts}>Input Monitoring:</Text>
              <View style={{ flexDirection: 'row' ,justifyContent:'center'}}>
                <Card containerStyle={styles.cardView}>
                  <Text style={styles.text}>Input Power Status</Text>
                  {module[selectedModule].ac_status === 'Down' ? (
                    <View style={[styles.IconView,{backgroundColor:'red'}]}>
                      <Icon4 name='power-off' color="white" size={23} />
                    </View>
                  ):(
                    <View style={styles.IconView}>
                      <Icon4 name='power-off' color="white" size={23} />
                    </View>
                  )}
                  
                 
                  {module[selectedModule].ac_status === 'Down' ? (
                    <Text style={[styles.textView,{color:'red'}]}>{module[selectedModule].ac_status}</Text>
                  ):(
                    <Text style={styles.textView}>{module[selectedModule].ac_status}</Text>
                  )}
                  
                </Card>
                <Card containerStyle={styles.cardView}>
                  <Text style={styles.text}>Input Voltage</Text>
                  <View style={[styles.IconView, { backgroundColor: '#2C3539' }]}>
                    <Icon2 name='bolt' color="white" size={23} />
                  </View>
                  <Text style={styles.textView}>{module[selectedModule].ac_inputVoltage} Volt</Text>
                </Card>
              </View>

              <Text style={styles.texts}>Output Monitoring:</Text>
              <View style={{ flexDirection: 'row' ,justifyContent:'center'}}>
                <Card containerStyle={styles.cardView}>
                  <Text style={styles.text}>Rectification Status</Text>
                  {module[selectedModule].rec_status === 'Down' ? (
                    <View style={[styles.IconView,{backgroundColor:'red'}]}>
                      <Icon4 name='power-off' color="white" size={23} />
                    </View>
                  ):(
                    <View style={styles.IconView}>
                      <Icon4 name='power-off' color="white" size={23} />
                    </View>
                  )}
                  
                 
                  {module[selectedModule].rec_status === 'Down' ? (
                    <Text style={[styles.textView,{color:'red'}]}>{module[selectedModule].rec_status}</Text>
                  ):(
                    <Text style={styles.textView}>{module[selectedModule].rec_status}</Text>
                  )}
                  
                 
                </Card>
                <Card containerStyle={styles.cardView}>
                  <Text style={styles.text}>Output DC Voltage </Text>
                  <View style={[styles.IconView, { backgroundColor: '#2C3539' }]}>
                    <Icon2 name='bolt' color="white" size={23} />
                  </View>
                  <Text style={styles.textView}>{module[selectedModule].rec_outputDcVoltage} Volt</Text>
                </Card>
              </View>
              {/* </Card> */}
                  

              <Text style={styles.textStyle}>Battery Bank Monitoring</Text>
              <Card containerStyle={styles.cardStyle}>
                <Text style={styles.text}>Battery Bank Connection Status</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                  {module[selectedModule].battery_status === 'Connected' ? (
                    <Text style={[styles.text1, { marginTop: hp('5%'), fontSize: hp('3%'), fontWeight: 'bold' ,marginRight:wp('10%'),color:'green'}]}>Connected</Text>
                            ):(
                              <Text style={[styles.text1, { marginTop: hp('5%'), fontSize: hp('3%'), fontWeight: 'bold' ,marginRight:wp('10%'),color:'red'}]}>Disconnected</Text>
                            )}
                          
                  <View style={[styles.IconView, { backgroundColor: '#fff' ,marginLeft:wp('5%')}]}>
                    {module[selectedModule].battery_status === 'Connected' ? (
                      <Icon2 name='plug' color="black" size={30} />
                                ):(
                                  <Image source={icon} style={{width:wp('10%'),height:hp('3.5%')}} />
                                )}
                  </View>
                </View>
              </Card>
              <Card containerStyle={[styles.cardStyle, { marginBottom: wp('4%') }]}>
                <Text style={styles.text}>Battery Bank Status(Voltage/Percentage)</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                  <Text style={[styles.text1, { marginTop: hp('5%'), fontSize: hp('3%'), fontWeight: 'bold' }]}>{module[selectedModule].battery_voltage} Volt</Text>
                  <Text style={[styles.text1, { marginTop: hp('5%'), fontSize: hp('3%'), fontWeight: 'bold' }]}>{module[selectedModule].battery_voltagePercentage}%</Text>
                  <View style={[styles.IconView, { backgroundColor: '#fff' }]}>
                    <Icon1 name='battery-full' size={30} />
                  </View>
                </View>
              </Card>
            </ScrollView>
            {/* </LinearGradient> */}
          </View>
        );
    }
}
export default withNavigation(HomeScreen);

const styles = StyleSheet.create({
    dropDown: { width: wp('90%'), height: hp('4%'), color: '#fff', marginLeft: wp('5%'), marginTop: hp('3%') ,backgroundColor:'#fff'},
    container: { flex: 1, backgroundColor: '#E0E0E0', },
    cardContainer: { width: wp('85%'), height: hp('60%'), marginLeft: wp('7%') },
    textStyle: { alignSelf: 'center', fontWeight: 'bold', fontSize: hp('3%'), marginBottom: hp('-2%'), marginTop: hp('5%'),color:'#3955B0' },
    cardView: { width: wp('40%'), height: hp('23%'), marginLeft: wp('4%'), marginTop: hp('0.3%'), padding: 2 },
    cardStyle: { width: wp('85%'), height: hp('18%'), marginLeft: wp('7%'), marginTop: hp('3%'), padding: 2 },
    IconView: {
        width: 55,
        height: 55,
        borderRadius: 35,
        backgroundColor: 'green',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: hp('3%'),
        justifyContent: 'center',
        shadowOffset: { width: wp('0%'), height: hp('0%') },
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowRadius: wp('2%'),
        elevation: 10,
    },
    text: { fontSize: hp('1.8%'), alignSelf: 'center',marginTop:hp('2%') },
    textView: { alignSelf: 'center', fontSize: hp('3%'), marginTop: hp('1%') },
    text1: { alignSelf: 'flex-start' },
    texts:{ alignSelf: 'flex-start', fontWeight: 'bold', marginTop: hp('3%'), marginBottom: hp('0.5%'), color: '#0079BA' ,marginLeft:wp('10%')}
})