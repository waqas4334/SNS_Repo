/* eslint-disable react/sort-comp */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Card } from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon1 from 'react-native-vector-icons/FontAwesome5';
import DialogInput from 'react-native-dialog-input';
import { withNavigation } from 'react-navigation';
import { Bars } from 'react-native-loader';
import { colors } from '../../../styles';
import { Dropdown } from '../../../components';

class SettingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sensorarray: [],
      selected: -1,
      selectedValue: null,
      loading: true,
      isDialogVisible1: false,
      isDialogVisible2: false,
      isDialogVisible3: false,
      isDialogVisible4: false,
      sensorIndex: null,
      Index: 0,
    };
  }

  openDialog = type => {
    if (type === 'voltage-upper') {
      this.setState({
        isDialogVisible1: true,
      });
    } else if (type === 'voltage-lower') {
      this.setState({
        isDialogVisible2: true,
      });
    } else if (type === 'pf-lower') {
      this.setState({
        isDialogVisible3: true,
      });
    } else if (type === 'units-upper') {
      this.setState({
        isDialogVisible4: true,
      });
    }
  };

  closeDialog = type => {
    if (type === 'voltage-upper') {
      this.setState({
        isDialogVisible1: false,
      });
    } else if (type === 'voltage-lower') {
      this.setState({
        isDialogVisible2: false,
      });
    } else if (type === 'pf-lower') {
      this.setState({
        isDialogVisible3: false,
      });
    } else if (type === 'units-upper') {
      this.setState({
        isDialogVisible4: false,
      });
    }
  };

  sendThreshold = (inputText, type) => {
    const { selectedValue, selected } = this.state;
    const { sensor, set_emUpperThreshold, set_emLowerThreshold } = this.props;
    const Index = sensor.findIndex(s => s.name === selectedValue);

    if (type === 'voltage-upper') {
      set_emUpperThreshold(sensor[Index]._id, 'voltage_U', inputText);
      this.closeDialog(type);
    } else if (type === 'voltage-lower') {
      set_emLowerThreshold(sensor[Index]._id, 'voltage', inputText);
      this.closeDialog(type);
    } else if (type === 'pf-lower') {
      set_emLowerThreshold(sensor[Index]._id, 'power', inputText);
      this.closeDialog(type);
    } else if (type === 'units-upper') {
      set_emUpperThreshold(sensor[Index]._id, 'unit_U', inputText);
      this.closeDialog(type);
    }
  };

  async componentDidMount() {
    const { user } = this.props;
    const done = await this.props.get_Em_sensor(user.id);
    if (done === 'done') {
      this.handleSensorData();
    } else {
      console.log('error');
    }

    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', async () => {
      const done = await this.props.get_Em_sensor(user.id);
      if (done === 'done') {
        this.handleSensorData();
      } else {
        console.log('error');
      }
    });
  }

  handleSensorData = async () => {
    const { sensor } = this.props;
    const temp = [];

    sensor.map(s => {
      temp.push(s.name);
    });
    const name = await sensor[0].name;
    this.setState({
      sensorarray: temp,
      selected: 0,
      selectedValue: name,
    });
  };

  handleSensorChange = (index, value) => {
    //const {selected, selectedValue} = this.state;
    const { sensor } = this.props;
    const sensorIndex = sensor.findIndex(s => s.name === value);
    this.setState({
      selected: index,
      selectedValue: value,
      Index: sensorIndex,
    });
  };

  render() {
    const { sensorarray, selectedValue, selected } = this.state;
    const { isLoading, sensor } = this.props;

    if (selectedValue === null && selected === -1) {
      return (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Bars size={15} color={colors.primary} />
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          {isLoading ? (
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
                items={sensorarray}
                selectedIndex={this.state.selected}
                onSelect={(index, value) =>
                  this.handleSensorChange(index, value)
                }
              />

              <Text style={[styles.headingText, { marginTop: hp('1%') }]}>
                Voltage:
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <Card
                  title="VOLTAGE UPPER THRESHOLD"
                  titleStyle={styles.cardTitle}
                  containerStyle={styles.cardMainContainer}
                >
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <View
                      style={[styles.IconView, { backgroundColor: '#d32f2f' }]}
                    >
                      <Icon1 name="lightbulb" style={styles.Icon}></Icon1>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={styles.Text}>
                        {sensor[selected].vUpperLimit}
                      </Text>
                      <Text
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
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={styles.btn}
                      onPress={() => this.openDialog('voltage-upper')}
                    >
                      <Text style={styles.btnText}>Set Threshold</Text>
                    </TouchableOpacity>

                    <DialogInput
                      isDialogVisible={this.state.isDialogVisible1}
                      title={'Set Threshold'}
                      message={'Enter Value to set threshold'}
                      //hintInput ={"HINT INPUT"}
                      submitInput={inputText => {
                        this.sendThreshold(inputText, 'voltage-upper');
                      }}
                      textInputProps={{ keyboardType: 'numeric' }}
                      closeDialog={() => this.closeDialog('voltage-upper')}
                    ></DialogInput>
                  </View>
                </Card>

                <Card
                  title="VOLTAGE LOWER THRESHOLD"
                  titleStyle={styles.cardTitle}
                  containerStyle={styles.cardMainContainer}
                >
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <View
                      style={[styles.IconView, { backgroundColor: '#d32f2f' }]}
                    >
                      <Icon1 name="lightbulb" style={styles.Icon}></Icon1>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={styles.Text}>
                        {sensor[selected].vLowerLimit}
                      </Text>
                      <Text
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
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={styles.btn}
                      onPress={() => this.openDialog('voltage-lower')}
                    >
                      <Text style={styles.btnText}>Set Threshold</Text>
                    </TouchableOpacity>

                    <DialogInput
                      isDialogVisible={this.state.isDialogVisible2}
                      title={'Set Threshold'}
                      message={'Enter Value to set threshold'}
                      //hintInput ={"HINT INPUT"}
                      submitInput={inputText => {
                        this.sendThreshold(inputText, 'voltage-lower');
                      }}
                      textInputProps={{ keyboardType: 'numeric' }}
                      closeDialog={() => this.closeDialog('voltage-lower')}
                    ></DialogInput>
                  </View>
                </Card>
              </View>
              <Text style={styles.headingText}>Current:</Text>

              <Card
                title="CURRENT UPPER THRESHOLD"
                titleStyle={styles.cardTitle}
                containerStyle={styles.cardMainContainer}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.Text}>
                      {sensor[selected].iUpperLimit}
                    </Text>
                    <Text
                      style={[
                        styles.Text,
                        {
                          color: 'red',
                          fontSize: 20,
                          marginTop: hp('2.3%'),
                          marginLeft: wp('2%'),
                        },
                      ]}
                    >
                      AMP
                    </Text>
                  </View>

                  <View style={styles.IconView}>
                    <Icon1 name="lightbulb" style={styles.Icon}></Icon1>
                  </View>
                </View>
              </Card>

              <Text style={styles.headingText}>Others:</Text>

              <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <Card
                  title="PF LOWER THRESHOLD"
                  titleStyle={styles.cardTitle}
                  containerStyle={styles.cardMainContainer}
                >
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <View
                      style={[styles.IconView, { backgroundColor: '#d32f2f' }]}
                    >
                      <Icon1 name="lightbulb" style={styles.Icon}></Icon1>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={styles.Text}>
                        {sensor[selected].pfLowerLimit}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={styles.btn}
                      onPress={() => this.openDialog('pf-lower')}
                    >
                      <Text style={styles.btnText}>Set Threshold</Text>
                    </TouchableOpacity>
                    <DialogInput
                      isDialogVisible={this.state.isDialogVisible3}
                      title={'Set Threshold'}
                      message={'Enter Value to set threshold'}
                      //hintInput ={"HINT INPUT"}
                      submitInput={inputText => {
                        this.sendThreshold(inputText, 'pf-lower');
                      }}
                      textInputProps={{ keyboardType: 'numeric' }}
                      closeDialog={() => this.closeDialog('pf-lower')}
                    ></DialogInput>
                  </View>
                </Card>

                <Card
                  title="UNITS UPPER THRESHOLD"
                  titleStyle={styles.cardTitle}
                  containerStyle={styles.cardMainContainer}
                >
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <View
                      style={[styles.IconView, { backgroundColor: '#d32f2f' }]}
                    >
                      <Icon1 name="lightbulb" style={styles.Icon}></Icon1>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={styles.Text}>
                        {sensor[selected].uUpperLimit}
                      </Text>
                      <Text
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
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={styles.btn}
                      onPress={() => this.openDialog('units-upper')}
                    >
                      <Text style={styles.btnText}>Set Threshold</Text>
                    </TouchableOpacity>
                    <DialogInput
                      isDialogVisible={this.state.isDialogVisible4}
                      title={'Set Threshold'}
                      message={'Enter Value to set threshold'}
                      //hintInput ={"HINT INPUT"}
                      submitInput={inputText => {
                        this.sendThreshold(inputText, 'units-upper');
                      }}
                      textInputProps={{ keyboardType: 'numeric' }}
                      closeDialog={() => this.closeDialog('units-upper')}
                    ></DialogInput>
                  </View>
                </Card>
              </View>
            </ScrollView>
          )}
        </View>
      );
    }
  }
}

export default withNavigation(SettingScreen);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scrollView: {
    //backgroundColor: '#fff',
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
    marginTop: hp('3%'),
    elevation: 5,
  },
  btnText: { color: '#fff', fontWeight: 'bold' },
});
