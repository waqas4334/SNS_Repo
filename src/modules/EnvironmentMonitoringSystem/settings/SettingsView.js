/* eslint-disable array-callback-return */
/* eslint-disable arrow-body-style */
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Bars } from 'react-native-loader';
import { Card } from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import DialogInput from 'react-native-dialog-input';
import Icon1 from 'react-native-vector-icons/FontAwesome5';
import { Dropdown } from '../../../components';
import { getSensors, setThreshold } from '../../../redux/actions/envActions';
import { colors } from '../../../styles';

const SettingsScreen = props => {
  const [moduleArray, setModuleArray] = useState([]);
  const [selectedModule, setSelectedModule] = useState(-1);
  const [selectedModuleValue, setSelectedModuleValue] = useState(null);
  const [isDialogVisible1, setIsDialogVisible1] = useState(false);
  const [isDialogVisible2, setIsDialogVisible2] = useState(false);
  const [isDialogVisible3, setIsDialogVisible3] = useState(false);
  const [isDialogVisible4, setIsDialogVisible4] = useState(false);

  const dispatch = useDispatch();
  const { navigation } = props;

  const user = useSelector(state => state.auth.user);
  const sensors = useSelector(state => state.env.envSensors);
  const sensorLoading = useSelector(state => state.env.envSensorLoading);

  useEffect(() => {
    dispatch(getSensors(user.id));
    handleSensorData();

    navigation.addListener('didFocus', async () => {
      dispatch(getSensors(user.id));
      handleSensorData();
    });
  }, []);

  const handleSensorData = async () => {
    const temp = [];

    sensors.map(s => {
      temp.push(s.name);
    });
    const name = await sensors[0].name;
    setModuleArray(temp);
    setSelectedModule(0);
    setSelectedModuleValue(name);
  };

  const handleSensorChange = (index, value) => {
    setSelectedModule(index);
    setSelectedModuleValue(value);
  };

  const openDialog = type => {
    if (type === 'pm2.5_l') {
      setIsDialogVisible1(true);
    } else if (type === 'pm2.5_u') {
      setIsDialogVisible2(true);
    } else if (type === 'pm1_u') {
      setIsDialogVisible3(true);
    } else if (type === 'pm10_u') {
      setIsDialogVisible4(true);
    }
  };

  const closeDialog = type => {
    if (type === 'pm2.5_l') {
      setIsDialogVisible1(false);
    } else if (type === 'pm2.5_u') {
      setIsDialogVisible2(false);
    } else if (type === 'pm1_u') {
      setIsDialogVisible3(false);
    } else if (type === 'pm10_u') {
      setIsDialogVisible4(false);
    }
  };

  const sendThreshold = (inputText, type) => {
    const Index = sensors.findIndex(s => s.name === selectedModuleValue);

    if (type === 'pm2.5_l') {
      dispatch(setThreshold(sensors[Index]._id, type, inputText));
      closeDialog(type);
    } else if (type === 'pm2.5_u') {
      dispatch(setThreshold(sensors[Index]._id, type, inputText));
      closeDialog(type);
    } else if (type === 'pm1_u') {
      dispatch(setThreshold(sensors[Index]._id, type, inputText));
      closeDialog(type);
    } else if (type === 'pm10_u') {
      dispatch(setThreshold(sensors[Index]._id, type, inputText));
      closeDialog(type);
    }
  };

  if (selectedModuleValue === null && selectedModule === -1) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Bars size={15} color={colors.primary} />
      </View>
    );
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      {sensorLoading ? (
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
        <ScrollView keyboardShouldPersistTaps="handled">
          <Dropdown
            placeholder="Select Module..."
            style={styles.Dropdown}
            items={moduleArray}
            selectedIndex={selectedModule}
            onSelect={(index, value) => handleSensorChange(index, value)}
          />

          <View style={{ flexDirection: 'row', marginTop: hp('2%') }}>
            <Card
              title="PM (2.5) LOWER THRESHOLD"
              titleStyle={styles.cardTitle}
              containerStyle={styles.cardMainContainer}
            >
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <View style={[styles.IconView, { backgroundColor: '#d32f2f' }]}>
                  <Icon1 name="lightbulb" style={styles.Icon} />
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.Text}>
                    {sensors[selectedModule].pm2_5threshold}
                  </Text>
                  {/* <Text
                    style={[
                      styles.Text,
                      {
                        color: 'red',
                        fontSize: 15,
                        marginTop: wp('5.6%'),
                        marginLeft: wp('1%'),
                      },
                    ]}
                  >
                    Volt
                  </Text> */}
                </View>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => openDialog('pm2.5_l')}
                >
                  <Text style={styles.btnText}>Set Threshold</Text>
                </TouchableOpacity>

                <DialogInput
                  isDialogVisible={isDialogVisible1}
                  title="Set Threshold"
                  message="Enter Value to set threshold"
                  // hintInput ={"HINT INPUT"}
                  submitInput={inputText => {
                    sendThreshold(inputText, 'pm2.5_l');
                  }}
                  textInputProps={{ keyboardType: 'numeric' }}
                  closeDialog={() => closeDialog('pm2.5_l')}
                />
              </View>
            </Card>

            <Card
              title="PM (2.5) UPPER THRESHOLD"
              titleStyle={styles.cardTitle}
              containerStyle={styles.cardMainContainer}
            >
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <View style={[styles.IconView, { backgroundColor: '#d32f2f' }]}>
                  <Icon1 name="lightbulb" style={styles.Icon} />
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.Text}>
                    {sensors[selectedModule].pm2_5upperThreshold}
                  </Text>
                  {/* <Text
                    style={[
                      styles.Text,
                      {
                        color: 'red',
                        fontSize: 15,
                        marginTop: wp('5.6%'),
                        marginLeft: wp('1%'),
                      },
                    ]}
                  >
                    Volt
                  </Text> */}
                </View>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => openDialog('pm2.5_u')}
                >
                  <Text style={styles.btnText}>Set Threshold</Text>
                </TouchableOpacity>

                <DialogInput
                  isDialogVisible={isDialogVisible2}
                  title="Set Threshold"
                  message="Enter Value to set threshold"
                  // hintInput ={"HINT INPUT"}
                  submitInput={inputText => {
                    sendThreshold(inputText, 'pm2.5_u');
                  }}
                  textInputProps={{ keyboardType: 'numeric' }}
                  closeDialog={() => closeDialog('pm2.5_u')}
                />
              </View>
            </Card>
          </View>

          <View style={{ flexDirection: 'row', marginBottom: 10 }}>
            <Card
              title="PM (1) UPPER THRESHOLD"
              titleStyle={styles.cardTitle}
              containerStyle={styles.cardMainContainer}
            >
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <View style={[styles.IconView, { backgroundColor: '#d32f2f' }]}>
                  <Icon1 name="lightbulb" style={styles.Icon} />
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.Text}>
                    {sensors[selectedModule].pm1_upperThreshold}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => openDialog('pm1_u')}
                >
                  <Text style={styles.btnText}>Set Threshold</Text>
                </TouchableOpacity>
                <DialogInput
                  isDialogVisible={isDialogVisible3}
                  title="Set Threshold"
                  message="Enter Value to set threshold"
                  // hintInput ={"HINT INPUT"}
                  submitInput={inputText => {
                    sendThreshold(inputText, 'pm1_u');
                  }}
                  textInputProps={{ keyboardType: 'numeric' }}
                  closeDialog={() => closeDialog('pm1_u')}
                />
              </View>
            </Card>

            <Card
              title="PM (10) UPPER THRESHOLD"
              titleStyle={styles.cardTitle}
              containerStyle={styles.cardMainContainer}
            >
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <View style={[styles.IconView, { backgroundColor: '#d32f2f' }]}>
                  <Icon1 name="lightbulb" style={styles.Icon} />
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.Text}>
                    {sensors[selectedModule].pm10_upperThreshold}
                  </Text>
                  {/* <Text
                    style={[
                      styles.Text,
                      {
                        color: 'red',
                        fontSize: 15,
                        marginTop: wp('5.6%'),
                        marginLeft: wp('1%'),
                      },
                    ]}
                  >
                    KWH
                  </Text> */}
                </View>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => openDialog('pm10_u')}
                >
                  <Text style={styles.btnText}>Set Threshold</Text>
                </TouchableOpacity>
                <DialogInput
                  isDialogVisible={isDialogVisible4}
                  title="Set Threshold"
                  message="Enter Value to set threshold"
                  // hintInput ={"HINT INPUT"}
                  submitInput={inputText => {
                    sendThreshold(inputText, 'pm10_u');
                  }}
                  textInputProps={{ keyboardType: 'numeric' }}
                  closeDialog={() => closeDialog('pm10_u')}
                />
              </View>
            </Card>
          </View>
        </ScrollView>
      )}
    </View>
  );
};
export default SettingsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scrollView: {
    // backgroundColor: '#fff',
  },
  headingText: {
    marginLeft: wp('3.3%'),
    marginVertical: hp('1%'),
    fontWeight: 'bold',
    marginTop: hp('2.5%'),
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
    paddingBottom: 15,
  },
  cardTitle: {
    alignSelf: 'flex-start',
    fontSize: hp('1.7%'),
    marginVertical: hp('0%'),
    marginBottom: hp('0.2'),
    color: colors.lightGray,
  },
  IconView: {
    width: 50,
    height: 50,
    borderRadius: 25,
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
    fontSize: hp('3%'),
    fontWeight: 'bold',
    color: '#424242',
  },
  Icon: { fontSize: hp('3%'), marginBottom: hp('0.5%'), color: 'white' },
  divider: {
    height: 0.8,
    marginHorizontal: wp('15%'),
    marginTop: hp('4%'),
    marginVertical: hp('1%'),
    backgroundColor: '#dbd9d3',
  },
  btn: {
    backgroundColor: colors.primaryGradientStart,
    borderRadius: 20,
    marginTop: hp('1.5%'),
    paddingHorizontal: 15,
    paddingVertical: 7,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: hp('3%'),
    elevation: 5,
  },
  btnText: { color: '#fff', fontWeight: 'bold' },
});
