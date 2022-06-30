/* eslint-disable no-console */
/* eslint-disable array-callback-return */
/* eslint-disable no-shadow */
/* eslint-disable react/sort-comp */
/* eslint-disable react/no-unused-state */
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  BackHandler,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { Card } from 'react-native-elements';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import DialogInput from 'react-native-dialog-input';

import { Bars } from 'react-native-loader';

import Icon1 from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/MaterialIcons';
import { withNavigation } from 'react-navigation';
import { Dropdown } from '../../../components';
import { colors } from '../../../styles';

class FuelHomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sensorarray: [],
      selected: -1,
      selectedValue: null,
      isDialogVisible: false,
      sensor: null,
    };
  }

  backAction = () =>
    /* Alert.alert("Hold on!", "Are you sure you want to go back?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "YES", onPress: () => BackHandler.exitApp() }
    ]); */
    true;

  async componentDidMount() {
    const { user } = this.props;
    const done = await this.props?.getSensors(user.id);
    if (done === 'done') {
      this.handleSensorData();
    } else {
      console.log('error');
    }

    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', async () => {
      const done = await this.props?.getSensors(user.id);
      if (done === 'done') {
        this.handleSensorData();
      } else {
        console.log('error');
      }

      this.backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        this.backAction,
      );
    });

    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backAction,
    );
  }

  componentWillUnmount() {
    this.backHandler = BackHandler.removeEventListener(
      'hardwareBackPress',
      this.backAction,
    );
  }

  handleSensorData = () => {
    const { sensors, loading } = this.props;
    // console.log('sensors',sensors)
    const temp = [];
    if (sensors === undefined) {
      // console.log('undefined');
    } else if (sensors !== undefined) {
      sensors?.map(s => {
        temp.push(s.name);
      });
      // const name = await sensors[0].name;
      this.setState({
        sensorarray: temp,
        selected: 0,
        selectedValue: sensors[0].name,
      });
    }
  };

  handleSensorChange = (index, value) => {
    // const {selected, selectedValue} = this.state;
    const { sensors } = this.props;
    const sensorIndex = sensors.findIndex(s => s.name === value);
    this.setState({
      selected: index,
      selectedValue: value,
      sensor: sensorIndex,
    });
  };

  openDialog = () => {
    this.setState({
      isDialogVisible: true,
    });
  };

  closeDialog = () => {
    this.setState({
      isDialogVisible: false,
    });
  };

  sendInput = inputText => {
    const { sensors } = this.props;

    const { selectedValue } = this.state;
    const sensor = sensors.findIndex(s => s.name === selectedValue);

    if (inputText !== '') {
      this.props.setThreshold(inputText, sensors[sensor]._id);
    }

    this.closeDialog();
  };

  render() {
    const { sensorarray, selectedValue, selected } = this.state;
    const { sensors, loading, sensorLoading } = this.props;

    if (selectedValue === null && selected === -1) {
      return (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Bars size={15} color={colors.primary} />
        </View>
      );
    }

    return (
      <SafeAreaView style={styles.container}>
        <Dropdown
          placeholder="Select Module..."
          style={styles.Dropdown}
          items={sensorarray}
          selectedIndex={this.state.selected}
          onSelect={(index, value) => this.handleSensorChange(index, value)}
        />
        {sensorLoading ? (
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <Bars size={15} color={colors.primary} />
          </View>
        ) : (
          <ScrollView
            keyboardShouldPersistTaps="handled"
            style={styles.scrollView}
          >
            <Card
              title="DOOR STATUS"
              titleStyle={styles.cardTitle}
              containerStyle={styles.cardMainContainer}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                {sensors[selected]?.door_status !== undefined &&
                sensors[selected]?.door_status === 1 ? (
                  <Text style={styles.Text}>Open</Text>
                ) : (
                  <Text style={styles.Text}>Close</Text>
                )}
                {sensors[selected]?.door_status !== undefined &&
                sensors[selected]?.door_status === 1 ? (
                  <View
                    style={[styles.IconView, { backgroundColor: '#d32f2f' }]}
                  >
                    <Icon1 name="door-open" style={styles.Icon} />
                  </View>
                ) : (
                  <View
                    style={[styles.IconView, { backgroundColor: '#388E3C' }]}
                  >
                    <Icon1 name="door-closed" style={styles.Icon} />
                  </View>
                )}
              </View>
            </Card>

            <Card
              title="GEN STATUS"
              titleStyle={styles.cardTitle}
              containerStyle={styles.cardMainContainer}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                {sensors[selected]?.gen_status === 1 ? (
                  <Text style={styles.Text}>Generator On</Text>
                ) : (
                  <Text style={styles.Text}>Generator Off</Text>
                )}
                {sensors[selected]?.gen_status === 1 ? (
                  <View
                    style={[styles.IconView, { backgroundColor: '#388E3C' }]}
                  >
                    <Icon2 name="power-off" style={styles.Icon} />
                  </View>
                ) : (
                  <View
                    style={[styles.IconView, { backgroundColor: '#d32f2f' }]}
                  >
                    <Icon2 name="power-off" style={styles.Icon} />
                  </View>
                )}
              </View>
            </Card>

            <Card
              title="TEMPERATURE"
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
                    {sensors[selected]?.temperature} ℃
                  </Text>
                </View>

                <View style={styles.IconView}>
                  <Icon1 name="thermometer-half" style={styles.Icon} />
                </View>
              </View>
            </Card>

            <Card
              title="TANK FILL LEVEL"
              titleStyle={styles.cardTitle}
              containerStyle={styles.cardMainContainer}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <View style={{ marginTop: hp('1%') }}>
                  <ProgressBarAnimated
                    width={wp('50%')}
                    value={sensors[selected]?.fillLevel}
                    backgroundColorOnComplete="#6CC644"
                  />
                  <Text style={[styles.Text, { marginTop: hp('1%') }]}>
                    {sensors[selected]?.fillLevel}%
                  </Text>
                </View>

                <View style={[styles.IconView, { backgroundColor: '#FFA000' }]}>
                  <Icon1 name="gas-pump" style={styles.Icon} />
                </View>
              </View>
            </Card>

            <Card
              title="LITERS"
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
                    {(
                      (sensors[selected]?.fillLevel / 100) *
                      sensors[selected]?.literThreshold
                    ).toFixed(2)}
                  </Text>
                  <Text
                    style={[
                      styles.Text,
                      { marginTop: hp('0%'), fontSize: hp('2.5%') },
                    ]}
                  >
                    liters
                  </Text>
                </View>

                <View style={styles.IconView}>
                  <Icon1 name="fill-drip" style={styles.Icon} />
                </View>
              </View>
            </Card>

            <Card
              title="LITER THRESHOLD"
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
                    {sensors[selected]?.literThreshold}
                  </Text>
                  <View style={{ flexDirection: 'row' }}>
                    <Text
                      style={[
                        styles.Text,
                        { marginTop: hp('0%'), fontSize: hp('2.5%') },
                      ]}
                    >
                      liters
                    </Text>
                    <TouchableOpacity onPress={this.openDialog}>
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
                  isDialogVisible={this.state.isDialogVisible}
                  title="Set Threshold"
                  message="Enter Value to set threshold"
                  // hintInput ={"HINT INPUT"}
                  submitInput={inputText => {
                    this.sendInput(inputText);
                  }}
                  closeDialog={this.closeDialog}
                  textInputProps={{ keyboardType: 'numeric' }}
                />
              </View>
            </Card>
          </ScrollView>
        )}
      </SafeAreaView>
    );
  }
}
export default withNavigation(FuelHomeScreen);
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
});
