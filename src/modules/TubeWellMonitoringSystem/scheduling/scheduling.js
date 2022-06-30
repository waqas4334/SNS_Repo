import React, { useEffect, useState } from 'react';
import {View,Text,TouchableOpacity,StyleSheet,ScrollView,FlatList,Alert} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Card, Divider } from 'react-native-elements';
import {colors} from '../../../styles';
import { Dropdown } from '../../../components';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';
import moment from 'moment';
import {getSensors,getRoutine,EnaDisRoutine} from '../../../redux/actions/tubewellAction';
import { useDispatch, useSelector } from 'react-redux';
import Item from './schedulingItem';

const SchedulingScreen = () => {
    
    const user = useSelector(state => state.auth.user);
    const sensors = useSelector(state => state.tubewell.sensors);
    const sensorsLoading = useSelector(state => state.tubewell.sensorsLoading);
    const RoutinesLoading = useSelector(state => state.tubewell.RoutinesLoading);
    const routines = useSelector(state => state.tubewell.routines);
    // console.log('RoutineLoading',RoutinesLoading);
    const dispatch = useDispatch();
   
    const [segmentArray, setSegmentArray] = useState([]);
    const [selectedModule, setSelectedModule] = useState(0);
    const [selectedModuleValue, setSelectedModuleValue] = useState(null);
    const [mode, setMode] = useState('time');

    useEffect(() => {
        handleSegmentData();
        dispatch(getRoutine(sensors[selectedModule]._id));
    }, []);
    const handleSegmentData = async () => {
        const data = await dispatch(getSensors(user.id));
        // console.log('data',data);
        if (data === 'done') {
            handleSensorData();
        }
    }
    const handleSensorData = () => {
        const temp = [];
        sensors.map(s => {
            temp.push(s.name);
        })
        setSegmentArray(temp);
        setSelectedModule(0);
        setSelectedModuleValue(sensors[0].name);
    }
    const handleModuleChange = (index, value) => {
        setSelectedModule(index);
        setSelectedModuleValue(value);
    }
    const onPressRoutine = () => {
        if(sensors[selectedModule].routine_enable === false ){
            dispatch(EnaDisRoutine(sensors[selectedModule]._id,true));
            dispatch(getRoutine(sensors[selectedModule]._id));
        }
        else if(sensors[selectedModule].routine_enable === true){
            dispatch(EnaDisRoutine(sensors[selectedModule]._id,false));
            dispatch(getRoutine(sensors[selectedModule]._id));
        }
    }
    const getRoutines = () => {
        dispatch(getRoutine(sensors[selectedModule]._id));
    }
    const handleClick = (index) => {
      console.log('pressed', index);
  };
  const onPressAlert = () => {
    console.log('aleert')
    if (sensors[selectedModule].auto === true) {
      Alert.alert(
          'Alert!',
          'Please Enable Hydro Pump Manual Mode First then Enable Scheduling.',
          [
              {
                  text: 'OK',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
              },
              // {
              //     text: 'OK',
              //     onPress: () => {
              //         this.props.motorMode(sensors[selectedModule]._id, true);
              //     },
              // },
          ],
          { cancelable: false },
      );
  }
  // else if (sensors[selectedModule].auto === true) {
  //     this.props.motorMode(sensors[selectedModule]._id, false);
  // }
  else {
      console.log('Error');
  }
  }
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
            <View style={{ flex: 1 }}>
                <Dropdown
                placeholder='Select Module...'
                style={styles.Dropdown}
                items={segmentArray}
                selectedIndex={selectedModule}
                onSelect={(index, value) => handleModuleChange(index, value)}
                />

            {sensorsLoading ? (
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                <Bars size={15} color={colors.primary} />
              </View>
) : (
            <View style={{flex:1}}>
                {/* RoutineScheduling? */}
                <View style={{flexDirection:'row',marginTop:hp('5%'),justifyContent:'flex-end',marginRight:wp('5%')}}>
                    <Text style={{fontWeight:'bold',fontSize:hp('2%'),marginRight:wp('1%')}}>Routine:</Text>
                    {sensors[selectedModule].auto === true ? (
                      <TouchableOpacity
                      style={{ height: 25, width: 60, borderRadius: 15, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', marginRight: wp('2%') }}
                      onPress={() => onPressAlert()}
                     >
                     <Text style={{ color: '#fff' }}>OFF</Text>
                     </TouchableOpacity>
                    ): sensors[selectedModule].routine_enable === true ? (
                      <TouchableOpacity
                         style={{ height: 25, width: 60, borderRadius: 15, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', marginRight: wp('2%') }}
                         onPress={() => onPressRoutine()}
                        >
                        <Text style={{ color: '#fff' }}>OFF</Text>
                        </TouchableOpacity>
                    ):(
                        <TouchableOpacity
                        style={{ height: 25, width: 60, borderRadius: 15, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', marginRight: wp('-3%') }}
                        onPress={() => onPressRoutine()}
                        >
                        <Text style={{ color: '#fff' }}>ON</Text>
                        </TouchableOpacity>
                    )}
                </View>
                
                {/* <View style={{backgroundColor:'#f5f5f5',flex:1,marginHorizontal:wp('3%'),marginVertical:hp('3%')}}>               
                    <TouchableOpacity onPress={()=>getRoutines()}><Text>Setttt</Text></TouchableOpacity>
                </View> */}

        {RoutinesLoading ? (
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <Bars size={15} color={colors.primary} />
          </View>
            ) : (
              <View style={{  backgroundColor:'#fff',flex:1}}>
                {routines.length > 0 ? (
                  <View style={{ backgroundColor: '#fff', marginHorizontal: wp('5%'), marginVertical: hp('0.5%')}}>
                    <TouchableOpacity>
                    {/* onPress={()=>getRoutines()}> */}
                      <Text style={{fontWeight:'bold',fontSize:hp('3%')}}>ROUTINES</Text>
                      </TouchableOpacity>
                    <FlatList
                      data={routines}
                      renderItem={({ item ,index }) => <Item name={item.name}from={item.from} to={item.to} enabel={item.enabel} 
                      module={selectedModule} sensors={sensors} id={sensors[selectedModule]._id} _id={item._id} index={index}
                      key={index} 
                      click={() => handleClick(index)} />}
                      keyExtractor={(item, index) => index.toString()}
                    />
                   
                  </View>
                        ) : (
                          <View style={styles.TextView}>
                            <Text style={styles.Text}>No Routines</Text>
                          </View>
                            )}
              </View>
        )}
            </View>
    )}
            </View>
        )
    }

export default SchedulingScreen;

const styles = StyleSheet.create({
    Dropdown: { width: wp('80%'), height: hp('4%'), alignSelf: 'center', marginTop: hp('1.5%') },
    TextView: {
      marginTop: hp('30%'),
      alignItems: 'center',
      justifyContent: 'center',
  },
  Text: { color: colors.gray, fontWeight: 'bold', fontSize: hp('2%') },
})