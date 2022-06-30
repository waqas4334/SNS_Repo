import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
  Platform,
  YellowBox,
  FlatList,
} from 'react-native';
import { Card, Divider } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import Icon1 from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/AntDesign';
import DialogInput from 'react-native-dialog-input';
import Icon4 from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';
import { Shake } from 'react-native-motion';
import CardFlip from 'react-native-card-flip';
import { withNavigation } from 'react-navigation';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';
import { fonts, colors } from '../../../styles';
import { Dropdown } from '../../../components';
import { useDispatch, useSelector } from 'react-redux';
import {
  getSensors,
  getThreshold,
  getRoutine,
  routineControlling,
  addRoutine,
  updateRoutine,
} from '../../../redux/actions/geyserAction';
import Item from './schedulingItem';

const background = require('../../../../assets/images/threshold.png');

const SettingScreen = props => {
  const { navigation } = props;
  const user = useSelector(state => state.auth.user);
  const geyserModule = useSelector(state => state.geyser.geyserModule);
  const geyserLoading = useSelector(state => state.geyser.geyserLoading);
  const AllRoutineLoading = useSelector(
    state => state.geyser.AllRoutineLoading,
  );
  const geyserRoutines = useSelector(state => state.geyser.geyserRoutines);

  const addRoutineLoading = useSelector(state=> state.geyser.addRoutineLoading)
  // const [Data, setData] = useState([
  //   geyserModule[selectedModule]?.scheduling?.routine,
  // ]);
  const RoutinesLoading = useSelector(state => state.geyser.RoutinesLoading);
  const routines = useSelector(state => state.geyser.routines);
  const dispatch = useDispatch();

  const [dialogVisible1, setDialogVisible1] = useState(false);
  const [dialogVisible2, setDialogVisible2] = useState(false);
  const [moduleArray, setModuleArray] = useState([]);
  const [selectedModule, setSelectedModule] = useState(0);
  const [selectedModuleValue, setSelectedModuleValue] = useState(0);
  const [mode, setMode] = useState('time');
  const [type, setType] = useState('lower');
  const [selectedThresholdUpper, setSelectedThresholdUpper] = useState(-1);
  const [selectedThresholdLower, setSelectedThresholdLower] = useState(-1);
  const [addLoading,setaddLoading]=useState(false);
  const [thresholdArrayUpper, setThresholdArrayUpper] = useState([
    '45',
    '50',
    '55',
    '60',
    '65',
    '70',
    '75',
  ]);
  const [thresholdArrayLower, setThresholdArrayLower] = useState([
    '40',
    '45',
    '50',
    '55',
    '60',
    '65',
    '70',
    '75',
  ]);

  useEffect(() => {
    handleSegmentData();
       navigation.addListener('willFocus', async () => {
        handleSegmentData();
    });
  }, []);

  // useEffect(()=>{
  //   navigation.addListener('willFocus', async () => {
  //     dispatch(getRoutine(geyserModule[selectedModule]._id));
  //   });
  // },[geyserModule]);

  const handleSegmentData = async () => {
    const data = await dispatch(getSensors(user?.id));
    if (data === 'done') {
      handleSensorData();
      dispatch(getRoutine(geyserModule[selectedModule]._id));
    }
  };
  const handleSensorData = () => {
    const temp = [];
    geyserModule.map(s => {
      temp.push(s.name);
    });
    setModuleArray(temp),
      setSelectedModule(0),
      setSelectedModuleValue(geyserModule[0].name);
  };
  const handleSensorChange = (index, value) => {
    setSelectedModule(index);
    setSelectedModuleValue(value);
    dispatch(getRoutine(geyserModule[index]._id));
  };
  const sendInputLower = (index, value) => {
    if (geyserModule[selectedModule]._id !== undefined) {
      dispatch(
        getThreshold(
          geyserModule[selectedModule]._id,
          'temp_lowerthreshold',
          value,
        ),
      );
      setSelectedThresholdLower(value);
    } else {
      console.log('error');
    }
  };
  const sendInputUpper = (index, value) => {
    dispatch(
      getThreshold(
        geyserModule[selectedModule]._id,
        'temp_upperthreshold',
        value,
      ),
    );
    setSelectedThresholdUpper(value);
  };
  const onAddRoutine = () => {
    setaddLoading(true);
    dispatch(addRoutine(geyserModule[selectedModule]._id));
    
  };
  const onUpdateAllRoutine = () => {
    console.log(
      'onAlllllll......',
      geyserModule[selectedModule].routine_enable,
    );
    if (geyserModule[selectedModule].routine_enable === true) {
      console.log('true', geyserModule[selectedModule]._id);
      dispatch(routineControlling(geyserModule[selectedModule]._id, false));
    } else if (geyserModule[selectedModule].routine_enable === false) {
      console.log('false', geyserModule[selectedModule].routine_enable);
      dispatch(routineControlling(geyserModule[selectedModule]._id, true));
    }
  };

  if (selectedModuleValue === null && selectedModule === -1) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Bars size={15} color={colors.primary} />
      </View>
    );
  }
  // console.log(
  //   'geyserModule[selectedModule]?.scheduling?.routine',
  //   geyserModule[selectedModule]?.scheduling?.routine,
  // );
  return (
    <View style={{ flex: 1 }}>
      <Dropdown
        placeholder="Select Module..."
        style={styles.Dropdown}
        items={moduleArray}
        selectedIndex={selectedModule}
        onSelect={(index, value) => handleSensorChange(index, value)}
      />
      {geyserLoading ||
      geyserModule === undefined ||
      geyserModule[selectedModule] === undefined ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
          }}
        >
          <Bars size={15} color={colors.primary} />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <View>
            <Card containerStyle={styles.card}>
              <Text style={styles.text}>Temperature(Lower Threshold)</Text>
              {/* <Divider/> */}
              <View style={styles.viewStyle}>
                <Text style={{ marginTop: hp('2%') }}>
                  {geyserModule[selectedModule]?.temp_lowerthreshold}°C
                </Text>
                <View>
                  <Dropdown
                    placeholder="Set Threshold"
                    // color='#e03e1f'
                    style={{
                      width: wp('35%'),
                      height: hp('5%'),
                      marginTop: hp('1%'),
                    }}
                    items={thresholdArrayLower}
                    selectedIndex={selectedThresholdLower}
                    onSelect={(index, value) => sendInputLower(index, value)}
                  />
                </View>
                <View
                  style={[
                    styles.IconView,
                    { alignSelf: 'center', backgroundColor: '#0564a8' },
                  ]}
                >
                  <Image source={background} style={styles.image} />
                </View>
              </View>
            </Card>
            <Card containerStyle={styles.card}>
              <Text style={styles.text}>Temperature(Upper Threshold)</Text>
              {/* <Divider/> */}
              <View style={styles.viewStyle}>
                <Text style={{ marginTop: hp('1.5%') }}>
                  {geyserModule[selectedModule]?.temp_upperthreshold}°C
                </Text>
                <View>
                  <Dropdown
                    placeholder="Set Threshold"
                    // color='#e03e1f'
                    style={{
                      width: wp('35%'),
                      height: hp('5%'),
                      marginTop: hp('1%'),
                    }}
                    items={thresholdArrayUpper}
                    selectedIndex={selectedThresholdUpper}
                    onSelect={(index, value) => sendInputUpper(index, value)}
                  />
                </View>
                <View
                  style={[
                    styles.IconView,
                    { alignSelf: 'center', backgroundColor: '#0564a8' },
                  ]}
                >
                  <Image source={background} style={styles.image} />
                </View>
              </View>
            </Card>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 18,
              marginTop: 18,
              justifyContent: 'flex-end',
              marginBottom: 13,
            }}
          >
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: hp('2%'),
                marginRight: wp('1%'),
              }}
            >
              Routine:
            </Text>
            {/* {geyserModule[selectedModule].auto === true ? (
                      <TouchableOpacity
                      style={{ height: 25, width: 60, borderRadius: 15, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', marginRight: wp('2%') }}
                      // onPress={() => onPressAlert()}
                     >
                     <Text style={{ color: '#fff' }}>OFF</Text>
                     </TouchableOpacity>
                    ):  */}
            {/* <TouchableOpacity
                style={{
                  height: 25,
                  width: 60,
                  borderRadius: 15,
                  backgroundColor: colors.primary,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: wp('2%'),
                }}
                onPress={() => onUpdateAllRoutine()}
              >
                <Text style={{ color: '#fff' }}>OFF</Text>
              </TouchableOpacity>
            ) : ( */}
            <TouchableOpacity
              style={{
                height: 25,
                width: 60,
                borderRadius: 15,
                backgroundColor: colors.primary,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: wp('-3%'),
              }}
              onPress={() => onUpdateAllRoutine()}
            >
              <Text style={{ color: '#fff' }}>
                {geyserModule[selectedModule]?.routine_enable === true
                  ? 'OFF'
                  : 'ON'}
              </Text>
            </TouchableOpacity>
            {/* // )} */}
          </View>
          {addRoutineLoading && (<ActivityIndicator  size='small' color='#000'/>)}
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ marginLeft: wp('5%'), fontWeight: 'bold' }}>
              Add Routines
            </Text>
            <TouchableOpacity onPress={() => onAddRoutine()}>
              <Icon2
                name={'pluscircle'}
                style={{ marginLeft: wp('1%'), marginTop: hp('0%') }}
                size={20}
                color={'#0564a8'}
              />
            </TouchableOpacity>
          </View>

          {/* {geyserModule[selectedModule]?.scheduling?.routine === [] ? (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text>No routine</Text>
            </View>
            geyserModule[selectedModule]?.scheduling?.routine !== [] 
          ) :  */}
          {AllRoutineLoading ? (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* <Bars size={15} color={colors.primary} /> */}
              <ActivityIndicator size="large" />
            </View>
          ) : (
            <View style={{ backgroundColor: '#fff', flex: 1 }}>
              {/* {geyserModule[selectedModule].scheduling.routine !== undefined ? ( */}
              <View
                style={{
                  backgroundColor: '#fff',
                  marginHorizontal: wp('5%'),
                  marginVertical: hp('0.5%'),
                }}
              >
                <FlatList
                  showsVerticalScrollIndicator={false}
                  // data={geyserModule[selectedModule]?.scheduling?.routine}
                  data={geyserRoutines}
                  ListEmptyComponent={() => (
                    <View style={{ alignSelf: 'center', marginTop: '20%' }}>
                      <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                        Empty list
                      </Text>
                    </View>
                  )}
                  renderItem={({ item, index }) => (
                    <Item
                      name={item?.name}
                      from={item?.from}
                      to={item?.to}
                      enable={item?.enable}
                      status={item?.status}
                      module={selectedModule}
                      geyserModule={geyserModule}
                      id={geyserModule[selectedModule]?._id}
                      _id={item?._id}
                      index={index}
                      key={index}
                      // click={() => handleClick(index)}
                    />
                  )}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
              {/* // ) : (
                // <View style={styles.TextView}>
                //   <Text style={styles.Text}>No Routines</Text>
                // </View>
              // )} */}
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  Dropdown: {
    width: wp('80%'),
    height: hp('4%'),
    alignSelf: 'center',
    marginTop: hp('5%'),
  },
  text: { alignSelf: 'center', fontSize: hp('2%'), fontWeight: 'bold' },
  IconView: {
    marginTop: hp('1%'),
    width: 45,
    height: 45,
    borderRadius: 35,
    backgroundColor: '#EB5345',
    alignItems: 'center',
    marginRight: wp('6%'),
    marginBottom: hp('1%'),
    justifyContent: 'center',
    shadowOffset: { width: wp('0%'), height: hp('0%') },
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: wp('2%'),
    elevation: 10,
  },
  viewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp('1%'),
  },
  image: { height: 25, width: 25 },
  touchableText: {
    height: hp('3%'),
    borderRadius: 20,
    width: wp('30%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('2%'),
    borderWidth: 0.2,
  },
  card: {
    width: wp('90%'),
    height: hp('12%'),
    borderRadius: hp('15%'),
    marginTop: hp('3%'),
    alignSelf: 'center',
    justifyContent: 'space-evenly',
  },
});
