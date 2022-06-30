/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, Animated, StatusBar, ImageBackground, ScrollView, TouchableOpacity, Platform, ActivityIndicator} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Card, Divider } from 'react-native-elements';
import Icon4 from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import DialogInput from 'react-native-dialog-input';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch, useSelector } from 'react-redux';
import { Bubbles } from 'react-native-loader';
import moment from 'moment';
import {
    DimLevel, getSegment, lightTimer, radar, scheduling, SegmentControl, setIndividualAllRoutines, setDimLowStartTime, setDimLowEndTime,
    setSegStartTime, setSegEndTime, setDimHighStartTime, setDimHighEndTime, setDimMediumStartTime, setDimMediumEndTime
} from '../../../redux/actions/streetLightAction';
import { colors } from '../../../styles';
import { Dropdown } from '../../../components';
// import Accordion from 'react-native-collapsible/Accordion';

// const SECTIONS = [{ title: 'Enable' }];

const AutomationScreen = () => {
    const user = useSelector(state => state.auth.user);
    const segment = useSelector(state => state.light.segment);
    const segmentLoading = useSelector(state => state.light.segmentLoading);
    const dispatch = useDispatch();

    const [segmentArray, setSegmentArray] = useState([]);
    const [dimLevelArray, setDimLevelArray] = useState(['50%', '75%', '100%']);
    const [selectedModule, setSelectedModule] = useState(-1);
    const [selectedDimLevel, setSelectedDimLevel] = useState(-1);
    const [selectedModuleValue, setSelectedModuleValue] = useState(null);
    const [selectedDimLevelValue, setSelectedDimLevelValue] = useState(null);
    const [items, setItems] = useState(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']);
    const [segmentIndex, setSegmentIndex] = useState(false);
    const [schedulingIndex, setSchedulingIndex] = useState(false);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [mode, setMode] = useState('time');

    // const [activeSections, setactiveSections] = useState([]);
    const [ShowSegmentFrom, setShowSegmentFrom] = useState(false);
    const [ShowSegmentTo, setShowSegmentTo] = useState(false);
    const [Show_Dim_High_From, setShow_Dim_High_From] = useState(false);
    const [Show_Dim_High_To, setShow_Dim_High_To] = useState(false);
    const [Show_Dim_Medium_From, setShow_Dim_Medium_From] = useState(false);
    const [Show_Dim_Medium_To, setShow_Dim_Medium_To] = useState(false);
    const [Show_Dim_Low_From, setShow_Dim_Low_From] = useState(false);
    const [Show_Dim_Low_To, setShow_Dim_Low_To] = useState(false);

    const [SegmentTimeFrom, setSegmentTimeFrom] = useState(new Date());
    const [SegmentTimeTo, setSegmentTimeTo] = useState(new Date());
    const [Dim_High_From, setDim_High_From] = useState(new Date());
    const [Dim_High_To, setDim_High_To] = useState(new Date());
    const [Dim_Medium_From, setDim_Medium_From] = useState(new Date());
    const [Dim_Medium_To, setDim_Medium_To] = useState(new Date());
    const [Dim_Low_From, setDim_Low_From] = useState(new Date());
    const [Dim_Low_To, setDim_Low_To] = useState(new Date());

    useEffect(() => {
        handleSegmentData();
    }, []);
    const handleSegmentData = async () => {
        const data = await dispatch(getSegment(user.id));
        // console.log('data',data);
        if (data === 'done') {
            handleSensorData();
        }
    }
    const handleSensorData = () => {
        const temp = [];
        segment.map(s => {
            temp.push(s.name);
        })
        setSegmentArray(temp);
        setSelectedModule(0);
        setSelectedModuleValue(segment[0].name);
    }
    const handleModuleChange = (index, value) => {
        //   const Index2 = segment.findIndex(s=>s.name === value);
        setSelectedModule(index);
        setSelectedModuleValue(value);
        //   setSegmentIndex:Index2
    }
    const handleDimLevelChange = (index, value) => {
        console.log(segment[selectedModule].dimLevel, 'dim')
        setSelectedDimLevel(index);
        setSelectedDimLevelValue(value);

        dispatch(DimLevel(segment[selectedModule]._id, value))
    }
    // Picker
    const openTimePicker = (type) => {
        console.log(type);
        if (type === 'segmentFrom') {
            setShowSegmentFrom(true);
        }
        else if (type === 'segmentTo') {
            setShowSegmentTo(true);
        }
        else if (type === 'dimHighFrom') {
            setShow_Dim_High_From(true);
        }
        else if (type === 'dimHighTo') {
            setShow_Dim_High_To(true);
        }
        else if (type === 'dimMediumFrom') {
            setShow_Dim_Medium_From(true);
        }
        else if (type === 'dimMediumTo') {
            setShow_Dim_Medium_To(true);
        }
        else if (type === 'dimLowFrom') {
          console.log('type',type)
            setShow_Dim_Low_From(true);
        }
        else if (type === 'dimLowTo') {
            setShow_Dim_Low_To(true);
        }
        setMode('time');
    };
    const onPickerChange = (event, selectedTime, type) => {
        if (type === 'segmentFrom') {
            console.log('From', SegmentTimeFrom)
            const currentTime = selectedTime || SegmentTimeFrom;
            setShowSegmentFrom(Platform.OS === 'ios');
            setSegmentTimeFrom(currentTime);
            console.log('cuuentTime', currentTime)
            dispatch(setSegStartTime(segment[selectedModule]._id, currentTime));

        } else if (type === 'segmentTo') {
            const currentTime = selectedTime || SegmentTimeTo;
            setShowSegmentTo(Platform.OS === 'ios');
            setSegmentTimeTo(currentTime);
            dispatch(setSegEndTime(segment[selectedModule]._id, currentTime));
        }
        else if (type === 'dimHighFrom') {
            const currentTime = selectedTime || Dim_High_From;
            setShow_Dim_High_From(Platform.OS === 'ios');
            setDim_High_From(currentTime);
            dispatch(setDimHighStartTime(segment[selectedModule]._id, currentTime));
        }
        else if (type === 'dimHighTo') {
            const currentTime = selectedTime || Dim_High_To;
            setShow_Dim_High_To(Platform.OS === 'ios');
            setDim_High_To(currentTime);
            dispatch(setDimHighEndTime(segment[selectedModule]._id, currentTime));
        }
        else if (type === 'dimMediumFrom') {
            const currentTime = selectedTime || Dim_Medium_From;
            setShow_Dim_Medium_From(Platform.OS === 'ios');
            setDim_Medium_From(currentTime);
            dispatch(setDimMediumStartTime(segment[selectedModule]._id, currentTime));
        }
        else if (type === 'dimMediumTo') {
            const currentTime = selectedTime || Dim_Medium_To;
            setShow_Dim_Medium_To(Platform.OS === 'ios');
            setDim_Medium_To(currentTime);
            dispatch(setDimMediumEndTime(segment[selectedModule]._id, currentTime));
        }
        else if (type === 'dimLowFrom') {
            const currentTime = selectedTime || Dim_Low_From;
            setShow_Dim_Low_From(Platform.OS === 'ios');
            setDim_Low_From(currentTime);
            dispatch(setDimLowStartTime(segment[selectedModule]._id, currentTime));
        }
        else if (type === 'dimLowTo') {
            const currentTime = selectedTime || Dim_Low_To;
            setShow_Dim_Low_To(Platform.OS === 'ios');
            setDim_Low_To(currentTime);
            dispatch(setDimLowEndTime(segment[selectedModule]._id, currentTime));
        }
    };
    const onPressDropdown = (type) => {
        if (type === 'brightness') {
            Alert.alert(
                'Alert!',
                'Disable Scheduling To Set Brightness',
                [
                    {
                        text: 'OK',
                        onPress: () => console.log('Ok Pressed'),
                    },
                ],
                { cancelable: false },
            );
        }
        else if (type === 'timer') {
            Alert.alert(
                'Alert!',
                'Disable Scheduling To Set Timer',
                [
                    {
                        text: 'OK',
                        onPress: () => console.log('Ok Pressed'),
                    },
                ],
                { cancelable: false },
            );
        }
        else if (type === 'radar') {
            Alert.alert(
                'Alert!',
                'Disable Scheduling To Control Radar',
                [
                    {
                        text: 'OK',
                        onPress: () => console.log('Ok Pressed'),
                    },
                ],
                { cancelable: false },
            );
        }
        else if (type === 'segmentControl') {
            Alert.alert(
                'Alert!',
                'Disable Scheduling To Control Segment',
                [
                    {
                        text: 'OK',
                        onPress: () => console.log('Ok Pressed'),
                    },
                ],
                { cancelable: false },
            );
        }
        else if (type === 'scheduling') {
            Alert.alert(
                'Alert!',
                'To Enable Scheduling , First Enable Segment Control',
                [
                    {
                        text: 'OK',
                        onPress: () => console.log('Ok Pressed'),
                    },
                ],
                { cancelable: false },
            );
        }
        else if (type === 'segment') {
            Alert.alert(
                'Alert!',
                'To Enable Segment Off Routine, First Enable Scheduling',
                [
                    {
                        text: 'OK',
                        onPress: () => console.log('Ok Pressed'),
                    },
                ],
                { cancelable: false },
            );
        }
        else if (type === 'dimHigh') {
            Alert.alert(
                'Alert!',
                'To Enable 100% Brightness Routine, First Enable Scheduling',
                [
                    {
                        text: 'OK',
                        onPress: () => console.log('Ok Pressed'),
                    },
                ],
                { cancelable: false },
            );
        }
        else if (type === 'dimMedium') {
            Alert.alert(
                'Alert!',
                'To Enable 75% Brightness Routine, First Enable Scheduling',
                [
                    {
                        text: 'OK',
                        onPress: () => console.log('Ok Pressed'),
                    },
                ],
                { cancelable: false },
            );
        }
        else if (type === 'dimLow') {
            Alert.alert(
                'Alert!',
                'To Enable 50% Brightness Routine, First Enable Scheduling',
                [
                    {
                        text: 'OK',
                        onPress: () => console.log('Ok Pressed'),
                    },
                ],
                { cancelable: false },
            );
        }
        else {
            console.log('Error');
        }
    }
    // enable/disable
    const onClick_Routine = (type) => {
        if (type === 'segment') {
            if (segment[selectedModule].seg_routineEnable === true) {
                console.log('true')
                dispatch(setIndividualAllRoutines(segment[selectedModule]._id, 'segment', false, SegmentTimeFrom, SegmentTimeTo));

            } else if (segment[selectedModule].seg_routineEnable === false) {
                console.log('false')
                dispatch(setIndividualAllRoutines(segment[selectedModule]._id, 'segment', true, SegmentTimeFrom, SegmentTimeTo));

            }
        }
        else if (type === 'dimHigh') {
            if (segment[selectedModule].dim_high_routineEnable === true) {
                dispatch(setIndividualAllRoutines(segment[selectedModule]._id, 'dim_high', false, Dim_High_From, Dim_High_To));
            }
            else if (segment[selectedModule].dim_high_routineEnable === false) {
                dispatch(setIndividualAllRoutines(segment[selectedModule]._id, 'dim_high', true, Dim_High_From, Dim_High_To));
            }
        }
        else if (type === 'dimMedium') {
            if (segment[selectedModule].dim_medium_routineEnable === true) {
                dispatch(setIndividualAllRoutines(segment[selectedModule]._id, 'dim_medium', false, Dim_Medium_From, Dim_Medium_To))
            }
            else if (segment[selectedModule].dim_medium_routineEnable === false) {
                dispatch(setIndividualAllRoutines(segment[selectedModule]._id, 'dim_medium', true, Dim_Medium_From, Dim_Medium_To))
            }
        }
        else if (type === 'dimLow') {
            if (segment[selectedModule].dim_low_routineEnable === true) {
                dispatch(setIndividualAllRoutines(segment[selectedModule]._id, 'dim_low', false, Dim_Low_From, Dim_Low_To))
            }
            else if (segment[selectedModule].dim_low_routineEnable === false) {
                dispatch(setIndividualAllRoutines(segment[selectedModule]._id, 'dim_low', true, Dim_Low_From, Dim_Low_To))
            }
        }
    }
    const toggleSegment = () => {
        if (segment[selectedModule].segControl === '0') {
            dispatch(SegmentControl(segment[selectedModule]._id, '2'));
        } else {
            dispatch(SegmentControl(segment[selectedModule]._id, '0'));
        }

    };
    const toggleScheduling = () => {
        console.log('allRoutines', segment[selectedModule].allRoutines)
        if (segment[selectedModule].allRoutines === true) {
            dispatch(scheduling(segment[selectedModule]._id, false));
        }
        else if (segment[selectedModule].allRoutines === false) {
            dispatch(scheduling(segment[selectedModule]._id, true));
        }
    };
    const showDialog = () => {
        setDialogVisible(true);
    }
    const closeDialog = () => {
        console.log('close');
        setDialogVisible(false);
    }
    const sendInput = (inputText) => {
        if (inputText === "") {       
            Alert.alert(
                'Alert!',
                'Enter Any Value To Set Timer',
                [
                    {
                        text: 'OK',
                        onPress: () => console.log('Ok Pressed'),
                    },
                ],
                { cancelable: false },
            );
        }
        else {
            console.log('else',inputText)
           dispatch(lightTimer(segment[selectedModule]._id, inputText));
           closeDialog();
        }        
    }
    const onclick = () => {
        if (segment[selectedModule].radar_enable === false) {
            console.log('false');
            Alert.alert(
                'Alert!',
                'Do You Want To Enable Radar Mode? Automation Would Be Turned On',
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    {
                        text: 'OK',
                        onPress: () => {
                            dispatch(radar(segment[selectedModule]._id, true));
                        },
                    },
                ],
                { cancelable: false },
            );
        }
        else if (segment[selectedModule].radar_enable === true) {
            console.log('true');
            dispatch(radar(segment[selectedModule]._id, false));
        }

    }
    if (selectedModuleValue === null && selectedModule === -1) {
        return (
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <ActivityIndicator size={15} color={colors.primary} />
          </View>
        );
    }
    console.log('smartStreet Light', segment)
    return (
      <View style={styles.container}>
        <View
          style={{
                    flexDirection: 'row',
                    marginRight: '3%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: hp('1.5%'),

                }}
        >
          <Dropdown
            placeholder='Select Segment...'
                    // style={styles.Dropdown}
            style={{ width: wp('40%'), height: hp('4%'), marginTop: hp('1%'), borderWidth: 0.3 }}
            color='#000'
            items={segmentArray}
            selectedIndex={selectedModule}
            onSelect={(index, value) => handleModuleChange(index, value)}
          />
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ marginTop: hp('0.5%'), fontWeight: 'bold', fontSize: hp('2%'), marginLeft: wp('7%'), marginRight: wp('1%') }}>Segment Control:</Text>

            {(segment[selectedModule].allRoutines === true) && (segment[selectedModule].dim_high_routineEnable === true || segment[selectedModule].seg_routineEnable === true ||
                        segment[selectedModule].dim_medium_routineEnable === true || segment[selectedModule].dim_low_routineEnable === true) ? (
                          <TouchableOpacity
                            style={{ height: 30, width: 60, borderRadius: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primary, marginRight: wp('-3%') }}
                            onPress={() => onPressDropdown('segmentControl')}
                          >
                            <Text style={{ color: '#fff' }}>OFF</Text>
                          </TouchableOpacity>
                        ) : segment[selectedModule].segControl === '2' ? (
                          <TouchableOpacity
                            style={{ height: 30, width: 60, borderRadius: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primary, marginRight: wp('-3%') }}
                            onPress={() => toggleSegment()}
                          >
                            <Text style={{ color: '#fff' }}>OFF</Text>
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            style={{ height: 30, width: 60, borderRadius: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primary, marginRight: wp('-3%') }}
                            onPress={() => toggleSegment()}
                          >
                            <Text style={{ color: '#fff' }}>ON</Text>
                          </TouchableOpacity>
                            )}
          </View>
        </View>

        {segmentLoading ? (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size={14} color={colors.primary} />
          </View>
            ) : (
              <View style={{ flex: 1 }}>
                <View style={{ flex: 0.9 }}>
                  <ScrollView horizontal keyboardShouldPersistTaps="handled">
                    <Animatable.View animation="fadeIn" iterationCount={1}>
                      <Card containerStyle={{ width: wp('35%'), height: hp('30%'), borderRadius: 30, elevation: 1, padding: 0 }}>
                        <LinearGradient
                          colors={["#0575e6", "#0b5eca", "#0b47af", "#083194", "#021b79"]}
                          style={{ width: wp('35%'), height: hp('5%'), borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 0, alignItems: 'center', justifyContent: 'center' }}
                        >
                          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: hp('2%'), alignSelf: 'center' }}> BRIGHTNESS </Text>
                        </LinearGradient>
                        {(segment[selectedModule].allRoutines === true) && (segment[selectedModule].dim_high_routineEnable === true || segment[selectedModule].seg_routineEnable === true ||
                                        segment[selectedModule].dim_medium_routineEnable === true || segment[selectedModule].dim_low_routineEnable === true) ? (
                                          <TouchableOpacity
                                            style={{
                                                borderWidth: 0.3, marginLeft: wp('2%'), marginRight: wp('2%'), borderRadius: 3, marginTop: hp('1.5%'),
                                                height: hp('3.5%'), justifyContent: 'center', alignItems: 'center'
                                            }}
                                            onPress={() => onPressDropdown('brightness')}
                                          >
                                            <Text style={{ color: '#000', alignSelf: 'center', fontSize: 14 }}>
                                              Set Brightness
                                            </Text>
                                          </TouchableOpacity>
                                        ) : (
                                          <Dropdown
                                            placeholder='Set Brightness'
                                            style={{ width: wp('33%'), height: hp('3.5%'), marginTop: hp('1.5%'), alignSelf: 'center', borderWidth: 0.2 }}
                                            color='#000'
                                            items={dimLevelArray}
                                            onSelect={(index, value) => handleDimLevelChange(index, value)}
                                          />
                                        )}
                        <Icon2 name="light-up" style={[styles.Icon, { alignSelf: 'center', color: '#FFCA28', marginTop: hp('4%') }]} />
                        <View>
                          {(segment[selectedModule].allRoutines === true) && (segment[selectedModule].dim_high_routineEnable === true || segment[selectedModule].seg_routineEnable === true ||
                                            segment[selectedModule].dim_medium_routineEnable === true || segment[selectedModule].dim_low_routineEnable === true) ? (
                                              <Animatable.View animation="zoomInUp" iterationCount={1}>
                                                <Text style={{ fontWeight: 'bold', fontSize: 30, color: 'black', alignSelf: 'center', marginTop: hp('3%') }}>{segment[selectedModule].routine_dimLevel}%</Text>
                                              </Animatable.View>
                                            ) : (
                                              <Animatable.View animation="zoomInUp" iterationCount={1}>
                                                <Text style={{ fontWeight: 'bold', fontSize: 30, color: 'black', alignSelf: 'center', marginTop: hp('3%') }}>{segment[selectedModule].dimLevel}%</Text>
                                              </Animatable.View>

                                            )}
                        </View>
                      </Card>
                    </Animatable.View>

                    <Animatable.View animation="fadeIn" iterationCount={1}>
                      <Card containerStyle={{ width: wp('35%'), height: hp('30%'), borderRadius: 30, marginLeft: wp('0%'), elevation: 1, padding: 0 }}>
                        <LinearGradient
                          colors={["#0575e6", "#0b5eca", "#0b47af", "#083194", "#021b79"]}
                          style={{ width: wp('35%'), height: hp('5%'), borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 0, alignItems: 'center', justifyContent: 'center' }}
                        >
                          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: hp('2%'), alignSelf: 'center' }}> TIMER (sec) </Text>
                        </LinearGradient>
                        {(segment[selectedModule].allRoutines === true) && (segment[selectedModule].dim_high_routineEnable === true || segment[selectedModule].seg_routineEnable === true ||
                                        segment[selectedModule].dim_medium_routineEnable === true || segment[selectedModule].dim_low_routineEnable === true) ? (
                                          <TouchableOpacity
                                            style={{
                                                borderWidth: 0.3, marginLeft: wp('2%'), marginRight: wp('2%'), borderRadius: 3, marginTop: hp('1.5%'),
                                                height: hp('3.5%'), justifyContent: 'center', alignItems: 'center'
                                            }}
                                            onPress={() => onPressDropdown('timer')}
                                          >
                                            <Text style={{ color: '#000', alignSelf: 'center', fontSize: 14 }}>
                                              Set Timer
                                            </Text>
                                          </TouchableOpacity>
                                        ) : (
                                          <TouchableOpacity
                                            style={{
                                                borderWidth: 0.2, marginLeft: wp('2%'), marginRight: wp('2%'), borderRadius: 3, marginTop: hp('1.5%'),
                                                height: hp('3.5%'), justifyContent: 'center', alignItems: 'center'
                                            }}
                                            onPress={() => showDialog()}
                                          >
                                            <Text style={{ color: '#000', alignSelf: 'center', fontSize: 14 }}>
                                              Set Timer
                                            </Text>
                                          </TouchableOpacity>
                                        )}
                        <DialogInput
                          isDialogVisible={dialogVisible}
                          title="Set Timer"
                          message="Enter Value to set Timer"
                          hintInput="Timer"
                          submitInput={(inputText) => { sendInput(inputText) }}
                          closeDialog={() => closeDialog()}
                        />
                        <Icon4 name="timer" style={[styles.Icon, { alignSelf: 'center', color: '#000', marginTop: hp('3.5%') }]} />
                        <Animatable.View animation="zoomInUp" iterationCount={1}>
                          <Animatable.Text
                            animation="bounce"
                            iterationCount="1"
                            easing="ease-out" 
                            style={{ fontWeight: 'bold', fontSize: 30, color: '#000', alignSelf: 'center', marginTop: hp('3.5%') }}
                          >{segment[selectedModule].light_time} sec
                          </Animatable.Text>
                        </Animatable.View>
                      </Card>
                    </Animatable.View>

                    <Animatable.View animation="fadeIn" iterationCount={1}>
                      <Card containerStyle={{ width: wp('35%'), height: hp('30%'), borderRadius: 30, marginLeft: wp('0%'), elevation: 1, padding: 0 }}>
                        <LinearGradient
                          colors={["#0575e6", "#0b5eca", "#0b47af", "#083194", "#021b79"]}
                          style={{ width: wp('35%'), height: hp('5%'), borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 0, alignItems: 'center', justifyContent: 'center' }}
                        >
                          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: hp('1.5%'), alignSelf: 'center' }}> RADAR MODE </Text>
                        </LinearGradient>
                        {(segment[selectedModule].allRoutines === true) && (segment[selectedModule].dim_high_routineEnable === true || segment[selectedModule].seg_routineEnable === true ||
                                        segment[selectedModule].dim_medium_routineEnable === true || segment[selectedModule].dim_low_routineEnable === true) ? (
                                          <TouchableOpacity
                                            style={[styles.IconView,{backgroundColor:'grey'}]}
                                            onPress={() => onPressDropdown('radar')}
                                          >
                                            <Icon3
                                                        name='power-off'
                                                        color="#fff"
                                                        size={25}
                                                      />
                                          </TouchableOpacity>

                                        ) : (
                                          <>
                                          {segment[selectedModule].radar_enable === true ? (
                                            <TouchableOpacity style={[styles.IconView,{backgroundColor:'green'}]}
                                              onPress={() => onclick()}>
                                              <Icon3 
                                                name='power-off'
                                                color='#fff'
                                                size={25}
                                              />
                                            </TouchableOpacity>
                                          ) : (
                                            <TouchableOpacity style={[styles.IconView, {backgroundColor:'red'}]}
                                              onPress={() => onclick()}>
                                              <Icon3 
                                                name='power-off'
                                                color='#fff'
                                                size={25}
                                              />
                                            </TouchableOpacity>
                                          )}
                                          </>

                                          
                                        )}
                        {segment[selectedModule].radar_enable === true ? (
                          <Animatable.View animation="slideInDown" iterationCount={1}>
                            <Animatable.Text
                              animation="bounce"
                              iterationCount="2"
                              easing="ease-out"
                              style={{ fontWeight: 'bold', fontSize: hp('3%'), color: '#000', alignSelf: 'center', marginTop: hp('4%') }}
                            >ENABLED
                            </Animatable.Text>
                          </Animatable.View>
                                    ) : (
                                      <Animatable.View animation="slideInDown" iterationCount={1}>
                                        <Animatable.Text
                                          animation="bounce"
                                          iterationCount="2"
                                          easing="ease-out" 
                                          style={{ fontWeight: 'bold', fontSize: hp('3%'), color: '#000', alignSelf: 'center', marginTop: hp('5%') }}
                                        >DISABLED
                                        </Animatable.Text>
                                      </Animatable.View>
                                        )}
                      </Card>
                    </Animatable.View>
                  </ScrollView>
                </View>


                <View style={{ flex: 1, backgroundColor: '#fff', borderTopLeftRadius: 50, borderTopRightRadius: 50, paddingTop: 15 }}>
                  <Text style={{ fontSize: hp('3%'), fontWeight: 'bold', alignSelf: 'center', marginBottom: hp('2%') }}>Routines</Text>
                  <Divider style={{ color: '#000', marginRight: wp('4%'), marginLeft: wp('4%'), marginBottom: hp('1%') }} />
                  {/* <Accordion
                                sections={SECTIONS}
                                activeSections={activeSections}
                                renderHeader={_renderHeader}
                                renderContent={_renderContent}
                                onChange={_updateSections}
                            /> */}

                  <View style={{ alignSelf: 'flex-end', marginRight: wp('10%') }}>
                    {segmentLoading ? (
                      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Bubbles size={10} color={colors.primary} />
                      </View>
                                ) : (
                                  <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontSize: hp('2%'), fontWeight: 'bold', marginTop: hp('0.5%'), marginRight: wp('2%') }}>Scheduling:</Text>

                                    {segment[selectedModule].segControl === '0' && segment[selectedModule].allRoutines === false ? (
                                      <TouchableOpacity
                                        style={{ height: 25, width: 60, borderRadius: 15, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', marginRight: wp('-3%') }}
                                        onPress={() => onPressDropdown('scheduling')}
                                      >
                                        <Text style={{ color: '#fff' }}>Enable</Text>
                                      </TouchableOpacity>
                                            ) : segment[selectedModule].allRoutines === true ? (
                                              <TouchableOpacity
                                                style={{ height: 25, width: 60, borderRadius: 15, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', marginRight: wp('-3%') }}
                                                onPress={() => toggleScheduling()}
                                              >
                                                <Text style={{ color: '#fff' }}>Disable</Text>
                                              </TouchableOpacity>
                                            ) : (
                                              <TouchableOpacity
                                                style={{ height: 25, width: 60, borderRadius: 15, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', marginRight: wp('-3%') }}
                                                onPress={() => toggleScheduling()}
                                              >
                                                <Text style={{ color: '#fff' }}>Enable </Text>
                                              </TouchableOpacity>
)}
                                  </View>
                                    )}
                  </View>
                  <ScrollView style={{ paddingTop: 15 }} keyboardShouldPersistTaps="handled">
                    <Text style={styles.routineSubHeading}>Set Time for Routine (Segment OFF)</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <View style={{ flexDirection: 'column' }}>
                        <View style={{ flexDirection: 'row' }}>
                          <Text style={[styles.textheading, { fontWeight: 'bold' }]}>From:</Text>
                          <TouchableOpacity onPress={() => openTimePicker('segmentFrom')}>
                            <Text style={{ marginLeft: wp('2%'), color: 'grey', fontSize: 14, borderBottomWidth: 0.5, borderColor: 'grey' }}>
                              {moment(segment[selectedModule].seg_startTime).format('HH:mm')}
                            </Text>
                          </TouchableOpacity>
                          {ShowSegmentFrom && (
                          <DateTimePicker
                            style={[styles.TimePicker, { marginLeft: wp('4%') }]}
                            testID="dateTimePicker"
                            value={SegmentTimeFrom}
                            mode={mode}
                            is24Hour
                            display="default"
                            onChange={(event, value) => onPickerChange(event, value, 'segmentFrom')}
                          />
                                            )}
                        </View>
                        <View>
                          <View style={{ flexDirection: 'row', marginTop: wp('1%'), marginBottom: hp('1%') }}>
                            <Text style={[styles.textheading, { fontWeight: 'bold' }]}>To:</Text>
                            <TouchableOpacity onPress={() => openTimePicker('segmentTo')}>
                              <Text style={{ marginLeft: wp('2%'), color: 'grey', fontSize: 14, borderBottomWidth: 0.5, borderColor: 'grey' }}>
                                {moment(segment[selectedModule].seg_endTime).format('HH:mm')}
                              </Text>
                            </TouchableOpacity>
                            {ShowSegmentTo && (
                            <DateTimePicker
                              style={[styles.TimePicker, { marginLeft: wp('4%') }]}
                              testID="dateTimePicker"
                              value={SegmentTimeTo}
                              mode={mode}
                              is24Hour
                              display="default"
                              onChange={(event, value) => onPickerChange(event, value, 'segmentTo')}
                            />
                                                )}
                          </View>
                        </View>
                      </View>
                      {segment[selectedModule].allRoutines === false ? (
                        <TouchableOpacity
                          onPress={() => onPressDropdown('segment')}
                          style={{ marginRight: wp('6%'), borderRadius: 10, width: wp('16%'), height: hp('4%'), backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' }}
                        >
                          <Text style={{ alignSelf: 'center', color: '#fff' }}>Disable</Text>
                        </TouchableOpacity>
                                    ) : segment[selectedModule].seg_routineEnable === true ? (
                                      <TouchableOpacity
                                        onPress={() => onClick_Routine('segment')}
                                        style={{ marginRight: wp('6%'), borderRadius: 10, width: wp('16%'), height: hp('4%'), backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' }}
                                      >
                                        <Text style={{ alignSelf: 'center', color: '#fff' }}>Disable</Text>
                                      </TouchableOpacity>
                                    ) : (
                                      <TouchableOpacity
                                        onPress={() => onClick_Routine('segment')}
                                        style={{ marginRight: wp('6%'), borderRadius: 10, width: wp('16%'), height: hp('4%'), backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' }}
                                      >
                                        <Text style={{ alignSelf: 'center', color: '#fff' }}>Enable</Text>
                                      </TouchableOpacity>
                                            )}

                    </View>

                    <Text style={[styles.routineSubHeading, { marginTop: hp('3%') }]}>Set Time for Routine (Brightness 100%)</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <View style={{ flexDirection: 'column' }}>
                        <View style={{ flexDirection: 'row' }}>
                          <Text style={[styles.textheading, { fontWeight: 'bold' }]}>From:</Text>
                          <TouchableOpacity onPress={() => openTimePicker('dimHighFrom')}>
                            <Text style={{ marginLeft: wp('2%'), color: 'grey', fontSize: 14, borderBottomWidth: 0.5, borderColor: 'grey' }}>
                              {moment(segment[selectedModule].dim_high_strtime).format('HH:mm')}
                            </Text>
                          </TouchableOpacity>
                          {Show_Dim_High_From && (
                          <DateTimePicker
                            style={[styles.TimePicker, { marginLeft: wp('4%') }]}
                            testID="dateTimePicker"
                            value={Dim_High_From}
                            mode={mode}
                            is24Hour
                            display="default"
                            onChange={(event, value) => onPickerChange(event, value, 'dimHighFrom')}
                          />
                                            )}
                        </View>

                        <View>
                          <View style={{ flexDirection: 'row', marginBottom: hp('1%') }}>
                            <Text style={[styles.textheading, { fontWeight: 'bold' }]}>To:</Text>
                            <TouchableOpacity onPress={() => openTimePicker('dimHighTo')}>
                              <Text style={{ marginLeft: wp('2%'), color: 'grey', fontSize: 14, borderBottomWidth: 0.5, borderColor: 'grey' }}>
                                {moment(segment[selectedModule].dim_high_endtime).format('HH:mm')}
                              </Text>
                            </TouchableOpacity>
                            {Show_Dim_High_To && (
                            <DateTimePicker
                              style={[styles.TimePicker, { marginLeft: wp('4%') }]}
                              testID="dateTimePicker"
                              value={Dim_High_To}
                              mode={mode}
                              is24Hour
                              display="default"
                              onChange={(event, value) => onPickerChange(event, value, 'dimHighTo')}
                            />
                                                )}
                          </View>
                        </View>
                      </View>
                      {segment[selectedModule].allRoutines === false ? (
                        <TouchableOpacity
                          onPress={() => onPressDropdown('dimHigh')}
                          style={{ marginRight: wp('6%'), borderRadius: 10, width: wp('16%'), height: hp('4%'), backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' }}
                        >
                          <Text style={{ alignSelf: 'center', color: '#fff' }}>Disable</Text>
                        </TouchableOpacity>
                                    ) : segment[selectedModule].dim_high_routineEnable === true ? (
                                      <TouchableOpacity
                                        onPress={() => onClick_Routine('dimHigh')}
                                        style={{ marginRight: wp('6%'), borderRadius: 10, width: wp('16%'), height: hp('4%'), backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' }}
                                      >
                                        <Text style={{ alignSelf: 'center', color: '#fff' }}>Disable</Text>
                                      </TouchableOpacity>
                                    ) : (
                                      <TouchableOpacity
                                        onPress={() => onClick_Routine('dimHigh')}
                                        style={{ marginRight: wp('6%'), borderRadius: 10, width: wp('16%'), height: hp('4%'), backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' }}
                                      >
                                        <Text style={{ alignSelf: 'center', color: '#fff' }}>Enable</Text>
                                      </TouchableOpacity>
                                            )}
                    </View>

                    <Text style={[styles.routineSubHeading, { marginTop: hp('3%') }]}>Set Time for Routine (Brightness 75%)</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <View style={{ flexDirection: 'column' }}>
                        <View style={{ flexDirection: 'row' }}>
                          <Text style={[styles.textheading, { fontWeight: 'bold' }]}>From:</Text>
                          <TouchableOpacity onPress={() => openTimePicker('dimMediumFrom')}>
                            <Text style={{ marginLeft: wp('2%'), color: 'grey', fontSize: 14, borderBottomWidth: 0.5, borderColor: 'grey' }}>
                              {moment(segment[selectedModule].dim_medium_strtime).format('HH:mm')}
                            </Text>
                          </TouchableOpacity>
                          {Show_Dim_Medium_From && (
                          <DateTimePicker
                            style={[styles.TimePicker, { marginLeft: wp('4%') }]}
                            testID="dateTimePicker"
                            value={Dim_Medium_From}
                            mode={mode}
                            is24Hour
                            display="default"
                            onChange={(event, value) => onPickerChange(event, value, 'dimMediumFrom')}
                          />
                                            )}
                        </View>
                        <View>
                          <View style={{ flexDirection: 'row', marginBottom: hp('1%') }}>
                            <Text style={[styles.textheading, { fontWeight: 'bold' }]}>To:</Text>
                            <TouchableOpacity onPress={() => openTimePicker('dimMediumTo')}>
                              <Text style={{ marginLeft: wp('2%'), color: 'grey', fontSize: 14, borderBottomWidth: 0.5, borderColor: 'grey' }}>
                                {moment(segment[selectedModule].dim_medium_endtime).format('HH:mm')}
                              </Text>
                            </TouchableOpacity>
                            {Show_Dim_Medium_To && (
                            <DateTimePicker
                              style={[styles.TimePicker, { marginLeft: wp('4%') }]}
                              testID="dateTimePicker"
                              value={Dim_Medium_To}
                              mode={mode}
                              is24Hour
                              display="default"
                              onChange={(event, value) => onPickerChange(event, value, 'dimMediumTo')}
                            />
                                                )}
                          </View>
                        </View>
                      </View>
                      {segment[selectedModule].allRoutines === false ? (
                        <TouchableOpacity
                          onPress={() => onPressDropdown('dimMedium')}
                          style={{ marginRight: wp('6%'), borderRadius: 10, width: wp('16%'), height: hp('4%'), backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' }}
                        >
                          <Text style={{ alignSelf: 'center', color: '#fff' }}>Disable</Text>
                        </TouchableOpacity>
                                    ) : segment[selectedModule].dim_medium_routineEnable === true ? (
                                      <TouchableOpacity
                                        onPress={() => onClick_Routine('dimMedium')}
                                        style={{ marginRight: wp('6%'), borderRadius: 10, width: wp('16%'), height: hp('4%'), backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' }}
                                      >
                                        <Text style={{ alignSelf: 'center', color: '#fff' }}>Disable</Text>
                                      </TouchableOpacity>
                                    ) : (
                                      <TouchableOpacity
                                        onPress={() => onClick_Routine('dimMedium')}
                                        style={{ marginRight: wp('6%'), borderRadius: 10, width: wp('16%'), height: hp('4%'), backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' }}
                                      >
                                        <Text style={{ alignSelf: 'center', color: '#fff' }}>Enable</Text>
                                      </TouchableOpacity>
                                            )}
                    </View>

                    <Text style={[styles.routineSubHeading, { marginTop: hp('3%') }]}>Set Time for Routine (Brightness 50%)</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <View style={{ flexDirection: 'column' }}>
                        <View style={{ flexDirection: 'row' }}>
                          <Text style={[styles.textheading, { fontWeight: 'bold' }]}>From:</Text>
                          <TouchableOpacity onPress={() => openTimePicker('dimLowFrom')}>
                            <Text style={{ marginLeft: wp('2%'), color: 'grey', fontSize: 14, borderBottomWidth: 0.5, borderColor: 'grey' }}>
                              {moment(segment[selectedModule].dim_low_strtime).format('HH:mm')}
                            </Text>
                          </TouchableOpacity>
                          {Show_Dim_Low_From && (
                          <DateTimePicker
                            style={[styles.TimePicker, { marginLeft: wp('4%') }]}
                            testID="dateTimePicker"
                            value={Dim_Low_From}
                            mode={mode}
                            is24Hour
                            display="default"
                            onChange={(event, value) => onPickerChange(event, value, 'dimLowFrom')}
                          />
                                            )}
                        </View>
                        <View>
                          <View style={{ flexDirection: 'row', marginBottom: hp('1%') }}>
                            <Text style={[styles.textheading, { marginBottom: hp('3%'), fontWeight: 'bold' }]}>To:</Text>
                            <TouchableOpacity
                              onPress={() => openTimePicker('dimLowTo')}
                              style={{ marginBottom: wp('2%') }}
                            >
                              <Text style={{ marginLeft: wp('2%'), color: 'grey', fontSize: 14, borderBottomWidth: 0.5, borderColor: 'grey' }}>
                                {moment(segment[selectedModule].dim_low_endtime).format('HH:mm')}
                              </Text>
                            </TouchableOpacity>
                            {Show_Dim_Low_To && (
                            <DateTimePicker
                              style={[styles.TimePicker, { marginLeft: wp('4%') }]}
                              testID="dateTimePicker"
                              value={Dim_Low_To}
                              mode={mode}
                              is24Hour
                              display="default"
                              onChange={(event, value) => onPickerChange(event, value, 'dimLowTo')}
                            />
                                                )}
                          </View>
                        </View>
                      </View>
                      {segment[selectedModule].allRoutines === false ? (
                        <TouchableOpacity
                          onPress={() => onPressDropdown('dimLow')}
                          style={{ marginRight: wp('6%'), borderRadius: 10, width: wp('16%'), height: hp('4%'), backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' }}
                        >
                          <Text style={{ alignSelf: 'center', color: '#fff' }}>Disable</Text>
                        </TouchableOpacity>
                                    ) : segment[selectedModule].dim_low_routineEnable === true ? (
                                      <TouchableOpacity
                                        onPress={() => onClick_Routine('dimLow')}
                                        style={{ marginRight: wp('6%'), borderRadius: 10, width: wp('16%'), height: hp('4%'), backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' }}
                                      >
                                        <Text style={{ alignSelf: 'center', color: '#fff' }}>Disable</Text>
                                      </TouchableOpacity>
                                    ) : (
                                      <TouchableOpacity
                                        onPress={() => onClick_Routine('dimLow')}
                                        style={{ marginRight: wp('6%'), borderRadius: 10, width: wp('16%'), height: hp('4%'), backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' }}
                                      >
                                        <Text style={{ alignSelf: 'center', color: '#fff' }}>Enable</Text>
                                      </TouchableOpacity>
                                            )}
                    </View>
                  </ScrollView>
                </View>
              </View>
                )}
      </View>
    );
}
export default AutomationScreen;

const styles = StyleSheet.create({
    Dropdown: { width: wp('40%'), height: hp('4%'), alignSelf: 'flex-end', color: '#fff' },
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
    container: { flex: 1, backgroundColor: '#E0E0E0', },
    text: { color: '#fff', },
    Icon: { fontSize: hp('4.5%'), color: 'white' },
    routineSubHeading: { fontSize: 15, fontWeight: 'bold', marginBottom: hp('1%'), marginLeft: wp('5%') },
    textheading: { marginLeft: wp('6%'), fontSize: 14 },
    TimePicker: { width: wp('37%'), marginTop: hp('-1.8%') },
    TimePickerText: { color: "#000", fontWeight: 'bold', fontSize: 13 },
    TimePickerInput: { height: hp('2.5%'), borderColor: '#000', borderWidth: 0.1 },
    TimePickerIcon: { height: hp('10%') },
    TimePickerIcon1: { height: hp('0%'), width: wp('0%') },
})