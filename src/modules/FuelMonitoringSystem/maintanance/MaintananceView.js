/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
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
  ScrollView,
} from 'react-native';

import { Card, ListItem, Button, Icon } from 'react-native-elements';
import DialogInput from 'react-native-dialog-input';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';

import Icon1 from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/MaterialIcons';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { withNavigation } from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown } from '../../../components';
import { fonts, colors } from '../../../styles';
import {
  getSensors,
  setThreshold,
  getMaintananceData,
  setMaintananceThreshold,
  setOilThreshold,
} from '../../../redux/actions/fuelActions';

const MaintananceScreen = props => {
  const [SensorArray, setSensorArray] = useState([]);
  const [Selected, setSelected] = useState(-1);
  const [SelectedValue, setSelectedValue] = useState(null);
  const [IsDialogVisible1, setIsDialogVisible1] = useState(false);
  const [IsDialogVisible2, setIsDialogVisible2] = useState(false);

  const dispatch = useDispatch();
  const { navigation } = props;

  const user = useSelector(state => state.auth.user);
  const sensors = useSelector(state => state.fuel.sensors);
  const maintanance_loading = useSelector(
    state => state.fuel.maintanance_loading,
  );

  const fetchSensorData = async () => {
    const result = await dispatch(getSensors(user.id));
    if (result === 'done') {
      handleSensorData();
    fetchMaintenanceData();
    }
  };

  const fetchMaintenanceData = async () => {
    await dispatch(getMaintananceData(sensors[0]._id));
  };

  useEffect(() => {
    fetchSensorData();
    navigation.addListener('didFocus', async () => {
      fetchSensorData();
    });
  }, []);

  const handleSensorData = async () => {
    const temp = [];

    sensors.map(s => {
      temp.push(s.name);
    });
    const name = await sensors[0].name;
    setSensorArray(temp);
    setSelected(0);
    setSelectedValue(name);
  };

  const handleSensorChange =  (index, value) => {
    setSelected(index);
    setSelectedValue(value);
     dispatch(getMaintananceData(sensors[index]._id));
  };

  const openOilDialog = () => {
    setIsDialogVisible1(true);
  };
  const openMaintananceDialog = () => {
    setIsDialogVisible2(true);
  };
  const closeOilDialog = () => {
    setIsDialogVisible1(false);
  };
  const closeMaintananceDialog = () => {
    setIsDialogVisible2(false);
  };
  const sendMaintananceThreshold = inputText => {
    const Index = sensors.findIndex(s => s.name === SelectedValue);

    if (inputText !== '') {
      dispatch(setMaintananceThreshold(inputText, sensors[Index]._id));
    }

    closeMaintananceDialog();
  };

  const sendOilThreshold = inputText => {
    const sensor2 = sensors.findIndex(s => s.name === SelectedValue);

    if (inputText !== '') {
      dispatch(setOilThreshold(inputText, sensors[sensor2]._id));
    }
    closeOilDialog();
  };

  console.log('index........',Selected);

  if (SelectedValue === null && Selected === -1 || sensors[Selected]?.maintanance?.totalRunningTime == null) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Bars size={15} color={colors.primary} />
      </View>
    );
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <Dropdown
        placeholder="Select Module..."
        style={styles.Dropdown}
        items={SensorArray}
        selectedIndex={Selected}
        onSelect={(index, value) => handleSensorChange(index, value)}
      />
      {maintanance_loading ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Bars size={15} color={colors.primary} />
        </View>
      ) : (
        <ScrollView
          keyboardShouldPersistTaps="handled"
          style={styles.scrollView}
        >
          <Card
            title="TOTAL RUNNING TIME"
            titleStyle={styles.cardTitle}
            containerStyle={styles.cardMainContainer}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <View>
                <Text style={styles.Text}>
                  {sensors[Selected]?.maintanance?.totalRunningTime} hours
                </Text>
              </View>

              <View style={styles.IconView}>
                <Icon2 name="wrench" style={styles.Icon} />
              </View>
            </View>
          </Card>

          <Card
            title="RUNNING TIME AFTER LAST MAINTANANCE"
            titleStyle={styles.cardTitle}
            containerStyle={styles.cardMainContainer}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <View>
                <Text style={styles.Text}>
                  {sensors[Selected].maintanance.runningTime} mins
                </Text>
              </View>

              <View style={styles.IconView}>
                <Icon2 name="wrench" style={styles.Icon} />
              </View>
            </View>
          </Card>

          <Card
            title="RUNNING TIME AFTER LAST OIL CHANGE"
            titleStyle={styles.cardTitle}
            containerStyle={styles.cardMainContainer}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <View>
                <Text style={styles.Text}>
                  {sensors[Selected].maintanance.oilRunningTime} mins
                </Text>
              </View>

              <View style={styles.IconView}>
                <Icon2 name="wrench" style={styles.Icon} />
              </View>
            </View>
          </Card>

          <Card
            title="OIL CHANGE THRESHOLD"
            titleStyle={styles.cardTitle}
            containerStyle={styles.cardMainContainer}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <View>
                <Text style={[styles.Text, { marginTop: hp('0%') }]}>
                  {sensors[Selected].oilThreshold}
                </Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text
                    style={[
                      styles.Text,
                      { marginTop: hp('0%'), fontSize: hp('2.5%') },
                    ]}
                  >
                    hours
                  </Text>
                  <TouchableOpacity onPress={openOilDialog}>
                    <Text
                      style={[
                        styles.Text,
                        {
                          marginTop: hp('0.5%'),
                          fontSize: hp('2%'),
                          marginLeft: wp('3%'),
                          color: '#1976D2',
                        },
                      ]}
                    >
                      Set Threshold
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.IconView}>
                <Icon3 name="graphic-eq" style={styles.Icon} />
              </View>

              <DialogInput
                isDialogVisible={IsDialogVisible1}
                title="Set Threshold"
                message="Enter Value to set threshold"
                // hintInput ={"HINT INPUT"}
                submitInput={inputText => {
                  sendOilThreshold(inputText);
                }}
                closeDialog={closeOilDialog}
                textInputProps={{ keyboardType: 'numeric' }}
              />
            </View>
          </Card>

          <Card
            title="MAINTANANCE THRESHOLD"
            titleStyle={styles.cardTitle}
            containerStyle={[styles.cardMainContainer, { marginBottom: 10 }]}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <View>
                <Text style={[styles.Text, { marginTop: hp('0%') }]}>
                  {sensors[Selected].maintananceThreshold}
                </Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text
                    style={[
                      styles.Text,
                      { marginTop: hp('0%'), fontSize: hp('2.5%') },
                    ]}
                  >
                    hours
                  </Text>
                  <TouchableOpacity onPress={openMaintananceDialog}>
                    <Text
                      style={[
                        styles.Text,
                        {
                          marginTop: hp('0.5%'),
                          fontSize: hp('2%'),
                          marginLeft: wp('3%'),
                          color: '#1976D2',
                        },
                      ]}
                    >
                      Set Threshold
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.IconView}>
                <Icon3 name="graphic-eq" style={styles.Icon} />
              </View>

              <DialogInput
                isDialogVisible={IsDialogVisible2}
                title="Set Threshold"
                message="Enter Value to set threshold"
                // hintInput ={"HINT INPUT"}
                submitInput={inputText => {
                  sendMaintananceThreshold(inputText);
                }}
                closeDialog={closeMaintananceDialog}
                textInputProps={{ keyboardType: 'numeric' }}
              />
            </View>
          </Card>

          {/* <Card
            title="Maintenance Logs"
            titleStyle={styles.cardTitle}
            containerStyle={[styles.cardMainContainer, { marginBottom: 10 }]}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                  style={styles.centerBtn}
                  onPress={() => navigation.navigate('MaintenanceLogs')}
                >
                  <Text
                    style={{
                      fontSize: hp('1.7%'),
                      fontWeight: 'bold',
                      color: '#1976D2',
                    }}
                  >
                    Get Logs
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.IconView}>
                <Icon3 name="graphic-eq" style={styles.Icon} />
              </View>
            </View>
          </Card> */}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default withNavigation(MaintananceScreen);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scrollView: {
    // backgroundColor: '#fff',
  },
  cardMainContainer: {
    flex: 1,
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
    paddingHorizontal: 15,
  },
  cardTitle: {
    alignSelf: 'flex-start',
    fontSize: hp('1.7%'),
    marginVertical: hp('0%'),
    marginBottom: hp('0.2'),
    color: colors.lightGray,
  },
  IconView: {
    width: 65,
    height: 65,
    borderRadius: 35,
    backgroundColor: '#1976D2',
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: wp('0%'), height: hp('0%') },
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: wp('2%'),
    elevation: 5,
  },
  Dropdown: {
    width: wp('80%'),
    height: hp('4%'),
    alignSelf: 'center',
    marginTop: hp('1.5%'),
  },

  Text: {
    marginTop: hp('2%'),
    fontSize: hp('3.5%'),
    fontWeight: 'bold',
    color: '#424242',
  },
  Icon: { fontSize: hp('3%'), marginBottom: hp('0.5%'), color: 'white' },
  centerBtn: {
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('30%'),
    height: hp('5%'),
    borderRadius: 20,
    marginTop: 17,
    elevation: 5,
    shadowColor: '#000000',
    shadowRadius: 20,
  },
});
