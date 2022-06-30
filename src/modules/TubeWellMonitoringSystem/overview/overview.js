import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Alert, ActivityIndicator ,Platform,YellowBox} from 'react-native';
import { Card, Divider } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon4 from 'react-native-vector-icons/MaterialIcons'
import * as Animatable from 'react-native-animatable';
import { Shake } from "react-native-motion";
import CardFlip from 'react-native-card-flip';
import { withNavigation } from 'react-navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';
import { fonts, colors } from '../../../styles';
import { Dropdown } from '../../../components';
// import { setMaintananceThreshold } from '../../../redux/actions/fuelActions';

YellowBox.ignoreWarnings(['Failed prop type']);

const background = require("../../../../assets/images/tdsIcon.png")
const iconPh = require('../../../../assets/images/phIcon.png')
const icontank = require('../../../../assets/images/storage-tank.png')
const volve = require("../../../../assets/images/volve2.png")
const pump =  require("../../../../assets/images/pump.png")

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            moduleArray: [],
            selectedModule: -1,
            selectedModuleValue: null,
            sensorIndex: null,
            value: 0,
        }
    }
    async componentDidMount() {
        const { user, navigation } = this.props;
        const done = await this.props.getSensors(user.id);
        if (done === 'done') {
            this.handleSensorData();
        } else {
            console.log('error');
        }

        this.focusListener = navigation.addListener('didFocus', async () => {
            const done = await this.props.getSensors(user.id);
            if (done === 'done') {
                this.handleSensorData();
            } else {
                console.log('error');
            }
        });
    }
    handleSensorData = () => {
        const { sensors } = this.props;
        // console.log('sens',sensors)
        const temp = [];

        sensors.map(s => {
            temp.push(s.name);
        })

        this.setState({
            moduleArray: temp,
            selectedModule: 0,
            selectedModuleValue: sensors[0].name
        })
    }
    handleSensorChange = (index, value) => {
        const { sensors } = this.props;
        const Index2 = sensors.findIndex(s => s.name === value);
        // console.log('index',Index2)
        this.setState({
            selectedModule: index,
            selectedModuleValue: value,
            sensorIndex: Index2
        });
    }
    // manageControl = async (mode) => {
    //     const { sensors } = this.props;
    //     const { selectedModule } = this.state;
    //     const done = await this.props.forceMotor(mode, sensors[selectedModule]._id);
    //     console.log('done', done)
    //     if (done === 'done') {
    //         this.card.flip();
    //     }
    // }
    handleMotorControl = () => {
        const { selectedModule } = this.state;
        const { sensors, motorLoading } = this.props;
        
        if (sensors[selectedModule].motor === 0) {
            Alert.alert(
                'Alert!',
                'Automatic switching would be turned off, you have to turn off motor manually.',
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    {
                        text: 'OK',
                        onPress: () => {
                            
                            this.props.forceMotor(1, sensors[selectedModule]._id);
                            console.log('Ok Pressedddddd')
                            this.setState({ value: this.state.value +  1});
                        },
                    },
                ],
                { cancelable: false },
            );
        }
        else if (sensors[selectedModule].motor === 1) {
            this.props.forceMotor(0, sensors[selectedModule]._id);
            this.setState({ value: this.state.value + 1 });
        }
        else {
            console.log('Error');
        }
    }
    motorAlert = (type) => {
      if(type === 'auto'){
        Alert.alert(
          'Alert!',
          'Hydro Pump Controlling dissbled, because system is on auto mode.',
          [
              {
                  text: 'OK',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
              },
              
          ],
          { cancelable: false },
      );
      } else 
      if(type === 'fillLevel'){
        Alert.alert(
          'Alert!',
          'Hydro Pump Controlling is disabled because FillLevel Upper Limit exceeded',
          [
              {
                  text: 'OK',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
              },
              
          ],
          { cancelable: false },
      );
      }
      else   
      if(type === 'scheduling'){
        Alert.alert(
          'Alert!',
          'Hydro Pump Controlling is Disabled Because Scheduling is Enabled',
          [
              {
                  text: 'OK',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
              },
              
          ],
          { cancelable: false },
      );
      }
    }
    handleMotorMode = () => {
      const { selectedModule } = this.state;
      const { sensors } = this.props;
      if (sensors[selectedModule].auto === true) {
        Alert.alert(
            'Alert!',
            'Automatic switching would be turned off, you have to turn off Hydro Pump Manually.',
            [
                {
                    text: 'Ok',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
            ],
            { cancelable: false },
        );
    }
    else if (sensors[selectedModule].auto === false) {
       this.handleMotorControl();
    }
    }

    
  
    render() {
        const { user, sensors, sensorsLoading, controlLoading , motorLoading} = this.props;
        const { moduleArray, selectedModule, selectedModuleValue } = this.state;
        // console.log('tubewell System',sensors);
        // console.log('tubewell', sensors[0].Ia);

        if (selectedModuleValue === null && selectedModule === -1) {
            return (
              <View
                style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
              >
                <Bars size={15} color={colors.primary} />
              </View>
            );
        }
        return (
          <ScrollView style={{ flex: 1 }}>
            <Dropdown
              placeholder='Select Module...'
              style={styles.Dropdown}
              items={moduleArray}
              selectedIndex={selectedModule}
              onSelect={(index, value) => this.handleSensorChange(index, value)}
            />

            {sensorsLoading ? (
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                <Bars size={15} color={colors.primary} />
              </View>
) : (

  <View style={{ flex: 1 }}>
    <View style={{ flex: 0.5 }}>
      <Text style={{ color: '#000', fontWeight: 'bold', fontSize: hp('2.5%'), marginTop: hp('2%'), alignSelf: 'center' }}>TANK SYSTEM</Text>
      <Divider style={{ backgroundColor: '#000', marginRight: wp('2%'), marginLeft: hp('2%') }} />
      <ScrollView horizontal style={{ backgroundColor: '#fff' }}>
        <Animatable.View
          animation="zoomInUp"
          iterationCount={1}
        >
          <Card
            containerStyle={[styles.cardMainContainer, { marginLeft: wp('3%'), }]}
          >
            <LinearGradient
              colors={["#0575e6", "#0b5eca", "#0b47af", "#083194", "#021b79"]}
              style={{
                                                width: wp('40%'),
                                                height: hp('30%'), borderTopLeftRadius: 25, borderBottomRightRadius: 25
                                            }}
            >
              <Animatable.Text
                animation="slideInDown"
                iterationCount="1"
                easing="ease-out"
                style={{ fontSize: hp('1.5%'), color: '#fff', alignSelf: 'center', marginTop: hp('2%'), fontWeight: 'bold' }}
              >TANK FILL LEVEL
              </Animatable.Text>
              <Divider style={{ backgroundColor: '#fff', marginHorizontal: wp('10%') }} />
              <View style={[styles.IconView, {backgroundColor: '#083194'}]}>
                <Image source={icontank} style={{ height: hp('2%'), width: wp('5%') }} />
              </View>
              <Animatable.Text
                animation="zoomIn"
                iterationCount="2"
                easing="ease-out"
                style={{ fontWeight: 'bold', color: '#fff', fontSize: hp('3%'), alignSelf: 'center', marginTop: hp('2%') }}
              >{sensors[selectedModule].fillLevel}%
              </Animatable.Text>
              <View style={{ marginTop: hp('2%'), alignSelf: 'center' }}>
                <ProgressBarAnimated
                  width={wp('27%')}
                  height={hp('1.5%')}
                  value={sensors[selectedModule].fillLevel}
                  backgroundColorOnComplete="#fff"
                  backgroundColor='#fff'
                />
              </View>
            </LinearGradient>
          </Card>

        </Animatable.View>

        <Shake value={this.state.value} type="timing">
          <Animatable.View
            animation="zoomInUp"
            iterationCount={1}
          >
            <Card
              containerStyle={[styles.cardMainContainer, { marginLeft: wp('3%'), }]}
            >
              <LinearGradient
                colors={["#240b36", "#4d0845", "#c31432", "#a10043", "#780049"]}
                style={{
                                                width: wp('40%'),
                                                height: hp('30%'), borderTopLeftRadius: 25, borderBottomRightRadius: 25
                                            }}
              >
                <Animatable.Text
                  animation="slideInDown"
                  iterationCount="1"
                  easing="ease-out"
                  style={{ fontSize: hp('1.5%'), color: '#fff', alignSelf: 'center', marginTop: hp('2%'), fontWeight: 'bold' }}
                >HYDRO PUMP STATUS
                </Animatable.Text>
                <Divider style={{ backgroundColor: '#fff', marginHorizontal: wp('6%') }} />
                
                {/* Loading on motor */}
                {/* {controlLoading ? (
                  <View style={{ alignItems:'center',justifyContent:'center',backgroundColor: 'transparent' }}>
                    <ActivityIndicator size='small' color="#fff" style={{alignItems:'center',justifyContent:'center',alignSelf:'center'}} />
                  </View>
                                                ) : (                                              
                                                 <>
                                                 {(sensors[selectedModule].fillLevel >= sensors[selectedModule].fillLevel_upperLmt) && sensors[selectedModule].auto === true ? (
                                                   <TouchableOpacity style={[styles.IconView, {backgroundColor:'#4d0845'}]}
                                                   onPress={() => this.handleMotorMode()}>
                                                      <Icon2
                                                        name='power-off'
                                                        color="#fff"
                                                        size={25}
                                                      />
                                                   </TouchableOpacity>
                                                  ): sensors[selectedModule].motor === 1 || sensors[selectedModule].auto === false ? (
                                                  <TouchableOpacity style={[styles.IconView, {backgroundColor:'green'}]}
                                                     onPress={() => this.handleMotorControl()}>
                                                       {motorLoading ? (
                                                         <View style={{ alignItems:'center',justifyContent:'center',backgroundColor: 'transparent' }}>
                                                            <ActivityIndicator size='small' color="#fff" style={{alignItems:'center',justifyContent:'center',alignSelf:'center'}}/>
                                                         </View>
                                                        
                                                       ):(
                                                        <Icon2
                                                        name='power-off'
                                                        color="#fff"
                                                        size={25}
                                                      />
                                                       )}
                                                        
                                                     </TouchableOpacity>
                                                 ): sensors[selectedModule].motor === 0 || sensors[selectedModule].auto === false ? (
                                                  <TouchableOpacity style={[styles.IconView, {backgroundColor:'#4d0845'}]}
                                                    onPress={() => this.handleMotorControl()}>
                                                       {motorLoading === true ? (
                                                        <View style={{ alignItems:'center',justifyContent:'center',backgroundColor: 'transparent' }}>
                                                        <ActivityIndicator size='small' color="#fff" style={{alignItems:'center',justifyContent:'center',alignSelf:'center'}}/>
                                                        </View>
                                                       ):(
                                                        <Icon2
                                                        name='power-off'
                                                        color="#fff"
                                                        size={25}
                                                      />
                                                       )}
                                                    </TouchableOpacity>
                                                 ):(
                                                  <View style={{ustifyContent:'center',backgroundColor: 'grey', alignSelf:'center',
                                                  marginTop:hp('5%'),borderRadius:30,width:60,height:60}}>
                                                  <ActivityIndicator size='small' color="#fff" style={{alignSelf:'center',marginTop:hp('2.5%')}}/>                                               
                                                  </View>
                                                 )}
                                                  </>
                  )} */}

                                                 {sensors[selectedModule].auto === true ? (
                                                   <TouchableOpacity style={[styles.IconView, {backgroundColor:'grey'}]}
                                                   onPress={() => this.motorAlert('auto')}>
                                                      <Icon2
                                                        name='power-off'
                                                        color="#fff"
                                                        size={25}
                                                      />
                                                   </TouchableOpacity>
                                                 ) : sensors[selectedModule].routine_enable === true ? (
                                                  <TouchableOpacity style={[styles.IconView, {backgroundColor:'grey'}]}
                                                  onPress={() => this.motorAlert('scheduling')}>
                                                     <Icon2
                                                       name='power-off'
                                                       color="#fff"
                                                       size={25}
                                                     />
                                                  </TouchableOpacity>
                                                ) : (
                                                   <>
                                                   {sensors[selectedModule].fillLevel >= sensors[selectedModule].fillLevel_upperLmt ? (
                                                      <TouchableOpacity style={[styles.IconView, {backgroundColor:sensors[selectedModule].motor === 0 ? '#4d0845': "green"}]}
                                                      onPress={() => this.motorAlert('fillLevel')}>
                                                         <Icon2
                                                           name='power-off'
                                                           color="#fff"
                                                           size={25}
                                                         />
                                                      </TouchableOpacity>
                                                   ) : (
                                                    <TouchableOpacity style={[styles.IconView, {backgroundColor:sensors[selectedModule].motor === 0 ? '#4d0845': "green"}]}
                                                    onPress={() => this.handleMotorControl()}>
                                                      {controlLoading ? (
                                                         <View style={{ alignItems:'center',justifyContent:'center',backgroundColor: 'transparent' }}>
                                                            <ActivityIndicator size='small' color="#fff" style={{alignItems:'center',justifyContent:'center',alignSelf:'center'}}/>
                                                         </View>
                                                       ):(
                                                        <Icon2
                                                        name='power-off'
                                                        color="#fff"
                                                        size={25}
                                                      />
                                                       )}
                                                       
                                                    </TouchableOpacity>
                                                   
                                                   )}
                                                   </>
                                                 )}
                                                
                                                    
                                                    
                {/* sensors[selectedModule].Ia */}
                {sensors[selectedModule].motor === 0 ? (
                  <Animatable.Text
                    animation="bounce"
                    iterationCount="2"
                    easing="ease-out"
                    style={{ fontWeight: 'bold', color: '#fff', fontSize: hp('3%'), alignSelf: 'center', marginTop: hp('2%') }}
                  >OFF
                  </Animatable.Text>
                                                ) : (
                                                  <Animatable.Text
                                                    animation="jello"
                                                    iterationCount="infinite"
                                                    easing="ease-in"
                                                    style={{ fontWeight: 'bold', color: '#fff', fontSize: hp('3%'), alignSelf: 'center', marginTop: hp('2%') }}
                                                  >ON
                                                  </Animatable.Text>
                                                    )}

                {/* <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                  <Text style={{ color: '#fff', fontSize: hp('1.5%'), alignSelf: 'center', marginTop: hp('2%'), marginRight: wp('1%') }}>Force Hydro Pump:</Text>
                  {sensors[selectedModule].forceMotor === true ? (
                    <Text style={{ color: '#fff', fontSize: hp('1.5'), alignSelf: 'center', marginTop: hp('2%'), fontWeight: 'bold' }}>ON</Text>
                                                    ) : (
                                                      <Text style={{ color: '#fff', fontSize: hp('1.5'), alignSelf: 'center', marginTop: hp('2%'), fontWeight: 'bold' }}>OFF</Text>
                                                        )}

                </View> */}
              </LinearGradient>
            </Card>
          </Animatable.View>
        </Shake>
        <Animatable.View
          animation="zoomInUp"
          iterationCount={1}
        >
          <Card containerStyle={styles.cardMainContainer}>
            <LinearGradient
              colors={["#001510", "#00bf8f", "#00906f", "#06634e", "#0a3a2f"]}
              style={{
                                                width: wp('40%'),
                                                height: hp('30%'), borderTopLeftRadius: 25, borderBottomRightRadius: 25
                                            }}
            >
              <Animatable.Text
                animation="slideInDown"
                iterationCount="1"
                easing="ease-out"
                style={{ fontSize: hp('1.5%'), color: '#fff', alignSelf: 'center', marginTop: hp('2%'), fontWeight: 'bold' }}
              >GALLONS AVAILABLE
              </Animatable.Text>
              <Divider style={{ backgroundColor: '#fff', marginHorizontal: wp('8%') }} />
              <View style={[styles.IconView, {backgroundColor: '#00906f', marginTop: hp('4%')}]}>
                <Icon3 name='fill-drip' style={styles.Icon} size={20}/>
              </View>
              <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: hp('3%'), alignSelf: 'center', marginTop: hp('4%') }}> {(sensors[selectedModule].liters / 100) * sensors[selectedModule].fillLevel}</Text>
              <Text style={{color:'#fff',alignSelf:'center'}}>Gallons</Text>
            </LinearGradient>
          </Card>
        </Animatable.View>

        <Animatable.View
          animation="zoomInUp"
          iterationCount={1}
        >
          <Card containerStyle={styles.cardMainContainer}>
            <LinearGradient
              colors={["#34154f", "#8231c8", "#6d2aa8", "#592389", "#461c6b"]}
              style={{
                                                width: wp('40%'),
                                                height: hp('30%'), borderTopLeftRadius: 25, borderBottomRightRadius: 25
                                            }}
            >
              <Text style={{ fontSize: hp('1.5%'), color: '#fff', alignSelf: 'center', marginTop: hp('2%'), fontWeight: 'bold' }}>TANK LID STATUS</Text>
              <Divider style={{ backgroundColor: '#fff', marginHorizontal: wp('9%') }} />
              {sensors[selectedModule].t_lid === false ? (
                <View style={[styles.IconView, {backgroundColor: '#6d2aa8', marginTop: hp('4%') }]}>
                  <Icon3 name='door-closed' style={styles.Icon} size={25}/>
                </View>
                                                ) : (
                                                  <View style={[styles.IconView, { backgroundColor: '#6d2aa8' }]}>
                                                    <Icon3 name='door-open' style={styles.Icon} size={25}/>
                                                  </View>
                                                    )}

              {sensors[selectedModule].t_lid === false ? (
                <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: hp('3%'), alignSelf: 'center', marginTop: hp('4%') }}>Lid Closed</Text>
                                                ) : (
                                                  <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: hp('3%'), alignSelf: 'center', marginTop: hp('4%') }}>Lid Open</Text>
                                                    )}

            </LinearGradient>
          </Card>
        </Animatable.View>
      </ScrollView>

    </View>

    <View style={{ flex: 0.2, marginTop: hp('4%') }}>
      <Text style={{ fontWeight: 'bold', fontSize: hp('2.5%'), alignSelf: 'center' }}>WATER QUALITY SYSTEM</Text>
      <View>
        <Divider style={{ backgroundColor: '#000', width: wp('95%'), marginLeft: wp('2%'), marginRight: wp('2%') }} />
      </View>
      <Animatable.View  
        animation="fadeInLeft"
        iterationCount={1}
      >
        <Card containerStyle={{ borderTopLeftRadius: 25, borderBottomRightRadius: 25 }}>
          <Text style={{ fontWeight: 'bold', fontSize: hp('2%') }}>PH VALUE</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: hp('3%'), marginTop: hp('2%'), color: '#6d2aa8', fontWeight: 'bold' }}>{sensors[selectedModule].ph}</Text>
            <View style={[styles.IconView, {backgroundColor: '#6d2aa8', marginTop: hp('0.1') }]}>
              <Image source={iconPh} style={{ height: hp('3%'), width: wp('6%') }} />
            </View>
          </View>
        </Card>
      </Animatable.View>
                                
      <Animatable.View 
        animation="fadeInRight"
        iterationCount={1}
      >
        <Card containerStyle={{ borderTopLeftRadius: 25, borderBottomRightRadius: 25 }}>
          <Text style={{ fontWeight: 'bold', fontSize: hp('2%') }}>TDS VALUE</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: hp('3%'), marginTop: hp('2%'), color: '#6d2aa8', fontWeight: 'bold' }}>{sensors[selectedModule].tds}</Text>
            <View style={[styles.IconView, {backgroundColor: '#6d2aa8', marginTop: hp('0.1') }]}>
              <Image source={background} style={{ height: hp('3%'), width: wp('6%') }} />
            </View>
          </View>
        </Card>
      </Animatable.View>
                                
    </View>

    <View style={{ flex: 0.2, marginTop: hp('4%') }}>
      <Text style={{ fontWeight: 'bold', fontSize: hp('2.5%'), alignSelf: 'center' }}>HYDRO PUMP SYSTEM</Text>
      <View>
        <Divider style={{ backgroundColor: '#000', width: wp('95%'), marginLeft: wp('2%'), marginRight: wp('2%') }} />
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Card containerStyle={{ padding: 0, backgroundColor: '#fff', borderTopLeftRadius: 25, borderBottomRightRadius: 25, width: wp('45%'), height: hp('15%'), marginLeft: wp('2.5%') }}>
          <LinearGradient
            colors={["#8C0964", "#D65DB1", "#AC0677"]}
            style={{
                                            width: wp('45%'),
                                            height: hp('15%'), borderTopLeftRadius: 25, borderBottomRightRadius: 25
                                        }}
          >
            <Text style={{ fontWeight: 'bold', fontSize: hp('1.5%'), alignSelf: 'center', color: '#fff', marginTop: hp('1.5%') }}>MAIN LINE STATUS</Text>
            <Divider style={{ backgroundColor: '#fff', marginHorizontal: wp('10%') }} />
            <Animatable.View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              {sensors[selectedModule].phaseDown === false ? (
                <Text style={{ fontSize: hp('2%'), marginTop: hp('3%'), color: '#fff', marginLeft: wp('2%'), fontWeight: 'bold' }}>Power-Up</Text>
                                                ) : (
                                                  <Animatable.Text
                                                    animation="jello"
                                                    iterationCount="infinite"
                                                    easing="ease-out" 
                                                    style={{ fontSize: hp('2%'), marginTop: hp('3%'), color: '#fff', marginLeft: wp('2%'), fontWeight: 'bold' }}
                                                  >Power-Down
                                                  </Animatable.Text>
                                                    )}

              <View style={[styles.IconView, {backgroundColor: '#6F004D', marginTop: hp('2%'), marginRight: wp('3%') }]}>
                <Icon2 name='power-off' style={styles.Icon} size={25}/>
              </View>
            </Animatable.View>
          </LinearGradient>

        </Card>
        <Card containerStyle={{ padding: 0, backgroundColor: '#616161', borderTopLeftRadius: 25, borderBottomRightRadius: 25, width: wp('45%'), height: hp('15%'), marginLeft: wp('0.01%') }}>
          <LinearGradient
            colors={["#332E3B", "#504D55", "#413F44", "#242325"]}
            style={{
                                            width: wp('45%'),
                                            height: hp('15%'), borderTopLeftRadius: 25, borderBottomRightRadius: 25
                                        }}
          >
            <Text style={{ fontWeight: 'bold', fontSize: hp('1.5%'), alignSelf: 'center', color: '#fff', marginTop: hp('1.5%') }}>LINE CURRENT STATUS</Text>
            <Divider style={{ backgroundColor: '#fff', marginHorizontal: wp('8%') }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              {/* {sensors[selectedModule].forceMotor === true ? (
                <Text style={{ fontSize: hp('2%'), marginTop: hp('3%'), color: '#fff', marginLeft: wp('5%') }}>{sensors[selectedModule].Ia} ampere</Text>
                                                ) : (
                                                  <Text style={{ fontSize: hp('2%'), marginTop: hp('3%'), color: '#fff', marginLeft: wp('2%') }}>0 ampere</Text>
                                                    )} */}
              <Text style={{ fontSize: hp('2%'), marginTop: hp('3%'), color: '#fff', marginLeft: wp('2%') }}>{sensors[selectedModule].Ia} ampere</Text>
              <View style={[styles.IconView, {backgroundColor: '#171518', marginTop: hp('2%'), marginRight: wp('3%') }]}>
                <Icon3 name='bolt' style={styles.Icon} size={30}/>
              </View>
            </View>
          </LinearGradient>
        </Card>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Card containerStyle={{ padding: 0, backgroundColor: '#fff', borderTopLeftRadius: 25, borderBottomRightRadius: 25, width: wp('45%'), height: hp('15%'), marginLeft: wp('2.5%') }}>
          <LinearGradient
            colors={["#8C0964", "#D65DB1", "#AC0677"]}
            style={{
                                            width: wp('45%'),
                                            height: hp('15%'), borderTopLeftRadius: 25, borderBottomRightRadius: 25
                                        }}
          >
            <Text style={{ fontWeight: 'bold', fontSize: hp('1.5%'), alignSelf: 'center', color: '#fff', marginTop: hp('1.5%') }}>PRIMING/ PRIMING LEVEL</Text>
            <Divider style={{ backgroundColor: '#fff', marginHorizontal: wp('5%') }} />
            <Animatable.View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View style={{flexDirection:'column'}}>
                {sensors[selectedModule].volve  === 0 ? (
                  <Text style={{ fontSize: hp('2%'), marginTop: hp('3%'), color: '#fff', marginLeft: wp('2%'), fontWeight: 'bold' }}>Valve Closed</Text>
                                                ) : (
                                                  <Animatable.Text
                                                    animation="jello"
                                                    iterationCount="infinite"
                                                    easing="ease-out" 
                                                    style={{ fontSize: hp('2%'), marginTop: hp('3%'), color: '#fff', marginLeft: wp('2%'), fontWeight: 'bold' }}
                                                  >Valve Open
                                                  </Animatable.Text>
                                                    )}
                {sensors[selectedModule].plvl === 0 ? (
                  <Text style={{ fontSize: hp('2%'), marginTop: hp('1%'), color: '#fff', marginLeft: wp('2%'), fontWeight: 'bold' }}>Un-Filled</Text>
                                                ) : (
                                                  <Text
                                                    animation="jello"
                                                    iterationCount="infinite"
                                                    easing="ease-out" 
                                                    style={{ fontSize: hp('2%'), marginTop: hp('1%'), color: '#fff', marginLeft: wp('2%'), fontWeight: 'bold' }}
                                                  >Filled
                                                  </Text>
                                                    )}
              </View>
              

              <View style={[styles.IconView, {backgroundColor: '#fff', marginTop: hp('2%'), marginRight: wp('3%') }]}>
                <Image source={volve} style={{width:30,height:20}} />
              </View>
            </Animatable.View>
          </LinearGradient>

        </Card>
        <Card containerStyle={{ padding: 0, backgroundColor: '#616161', borderTopLeftRadius: 25, borderBottomRightRadius: 25, width: wp('45%'), height: hp('15%'), marginLeft: wp('0.01%') }}>
          <LinearGradient
            colors={["#332E3B", "#504D55", "#413F44", "#242325"]}
            style={{
                                            width: wp('45%'),
                                            height: hp('15%'), borderTopLeftRadius: 25, borderBottomRightRadius: 25
                                        }}
          >
            <Text style={{ fontWeight: 'bold', fontSize: hp('1.5%'), alignSelf: 'center', color: '#fff', marginTop: hp('1.5%') }}>PUMP VIBRATION</Text>
            <Divider style={{ backgroundColor: '#fff', marginHorizontal: wp('12%') }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              {sensors[selectedModule].vib === 0 ? (
                <Text style={{ fontSize: hp('2%'), marginTop: hp('3%'), color: '#fff', marginLeft: wp('2%') }}>Normal</Text>
                                                ) : (
                                                  <Text style={{ fontSize: hp('2%'), marginTop: hp('3%'), color: '#fff', marginLeft: wp('2%') }}>Ab-Normal</Text>
                                                    )}
              <View style={[styles.IconView, {backgroundColor: '#fff', marginTop: hp('3%'), marginRight: wp('3%'),alignItems:'center' }]}>
                <Image source={pump} style={{width:45,height:45}} />
              </View>
            </View>
          </LinearGradient>
        </Card>
      </View>
    </View>


    <View style={{ flex: 0.1, marginTop: hp('4%') }}>
      <Text style={{ fontWeight: 'bold', fontSize: hp('2.5%'), alignSelf: 'center' }}>SECURITY</Text>
      <View>
        <Divider style={{ backgroundColor: '#000', width: wp('95%'), marginLeft: wp('2%'), marginRight: wp('2%') }} />
      </View>
      <Card containerStyle={{ borderTopLeftRadius: 25, borderBottomRightRadius: 25 }}>
        <Text style={{ fontWeight: 'bold', fontSize: hp('2%') }}>TUBEWELL DOOR STATUS</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {sensors[selectedModule].door_status === 0 ? (
            <Text style={{ fontSize: hp('3%'), marginTop: hp('2%'), color: '#578300', fontWeight: 'bold' }}>Door Closed</Text>
                                        ) : (
                                          <Text style={{ fontSize: hp('3%'), marginTop: hp('2%'), color: '#578300', fontWeight: 'bold' }}>Door Open</Text>
                                            )}
          {sensors[selectedModule].door_status === 0 ? (
            <View style={[styles.IconView, {backgroundColor: '#578300', marginTop: hp('1%'), marginRight: wp('2%') }]}>
              <Icon3 name='door-closed' style={styles.Icon} size={25}/>
            </View>
                                        ) : (
                                          <View style={[styles.IconView, {backgroundColor: '#578300', marginTop: hp('1%'), marginRight: wp('2%') }]}>
                                            <Icon3 name='door-open' style={styles.Icon} size={25}/>
                                          </View>
                                            )}

        </View>
      </Card>
    </View>

    <View style={{ flex: 0.1, marginTop: hp('4%'), marginBottom: hp('2%') }}>
      <Text style={{ fontWeight: 'bold', fontSize: hp('2.5%'), alignSelf: 'center' }}>FIRE ALARM</Text>
      <View>
        <Divider style={{ backgroundColor: '#000', width: wp('95%'), marginLeft: wp('2%'), marginRight: wp('2%') }} />
      </View>
      <Card containerStyle={{ borderTopLeftRadius: 25, borderBottomRightRadius: 25 }}>
        <Text style={{ fontWeight: 'bold', fontSize: hp('2%') }}>FIRE ALARM STATUS</Text>

        <Animatable.View 
          style={{ flexDirection: 'row', justifyContent: 'space-between' }}
        >
          {sensors[selectedModule].alarm === false ? (
            <Text style={{ fontSize: hp('3%'), marginTop: hp('2%'), color: '#578300', fontWeight: 'bold' }}>OFF</Text>
                                        ) : (
                                          <Animatable.Text 
                                            animation="wobble"
                                            iterationCount="infinite"
                                            style={{ fontSize: hp('3%'), marginTop: hp('2%'), color: 'red', fontWeight: 'bold' }}
                                          >ON
                                          </Animatable.Text>
                                            )}

          {sensors[selectedModule].alarm === false ? (
            <View style={[styles.IconView, {backgroundColor: '#578300', marginTop: hp('1%'), marginRight: wp('2%') }]}>
            <Icon4 name='timer' style={styles.Icon} size={25}/>
          </View>
          ):(
            <View style={[styles.IconView, {backgroundColor: 'red', marginTop: hp('1%'), marginRight: wp('2%') }]}>
            <Icon4 name='timer' style={styles.Icon} size={25}/>
          </View>
          )}
        </Animatable.View>
      </Card>
    </View>
  </View>
                    )}
          </ScrollView>
        )
    }
}

export default withNavigation(HomeScreen);

const styles = StyleSheet.create({
    cardMainContainer: {
        width: wp('40%'),
        height: hp('30%'),
        marginLeft: wp('0.1%'),
        padding: 0,
        borderTopLeftRadius: 25,
        borderBottomRightRadius: 25,
        borderWidth: 0
    },
    card: {
        color: '#000',
        fontSize: 12
    },
    IconView: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#1976D2',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: hp('4%'),
        justifyContent: 'center',
        shadowOffset: { width: wp('0%'), height: hp('0%') },
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowRadius: wp('2%'),
        elevation: 10,
    },
    Icon: {  color: 'white' },
    Text: {
        marginTop: hp('2%'),
        fontSize: hp('3.5%'),
        fontWeight: 'bold',
        color: '#424242',
    },
    Dropdown: { width: wp('80%'), height: hp('4%'), alignSelf: 'center', marginTop: hp('1.5%') },
})