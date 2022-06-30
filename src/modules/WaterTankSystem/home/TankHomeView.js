/* eslint-disable react/no-unused-state */
/* eslint-disable array-callback-return */
/* eslint-disable no-shadow */
/* eslint-disable no-console */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import { Card } from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon1 from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import { withNavigation } from 'react-navigation';
import { Bars } from 'react-native-loader';
import { colors } from '../../../styles';
import { Dropdown } from '../../../components';

class TankHomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sensorarray: [],
      selected: -1,
      // eslint-disable-next-line react/no-unused-state
      selectedValue: null,
      fillLevel: 20,
      motor: 1,
    };
  }

  async componentDidMount() {
    const { user } = this.props;
    const done = await this.props.getSensors(user.id);
    if (done === 'done') {
      this.handleSensorData();
    } else {
      console.log('error');
    }

    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', async () => {
      const done = await this.props.getSensors(user.id);
      if (done === 'done') {
        this.handleSensorData();
      } else {
        console.log('error');
      }
    });
  }

  handleSensorData = async () => {
    const { sensors } = this.props;

    const temp = [];

    sensors.map(s => {
      temp.push(s.name);
    });
    const name = await sensors[0].name;
    this.setState({
      sensorarray: temp,
      selected: 0,
      // eslint-disable-next-line react/no-unused-state
      selectedValue: name,
    });
  };

  handleSensorChange = (index, value) => {
    // const {selected, selectedValue} = this.state;
    const { sensors } = this.props;
    const sensorIndex = sensors.findIndex(s => s.name === value);
    this.setState({
      selected: sensorIndex,
      selectedValue: value,
    });
  };

  handleMotor = () => {
    const { sensors } = this.props;
    const { selected } = this.state;

    console.log(sensors[selected]);

    if (sensors[selected].motor === 0) {
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
              this.props.controlMotor(1, sensors[selected]._id);
            },
          },
        ],
        { cancelable: false },
      );
    } else if (sensors[selected].motor === 1) {
      this.props.controlMotor(0, sensors[selected]._id);
    }
  };

  render() {
    const { sensorarray, selectedValue, selected } = this.state;
    const { sensors, sensorLoading } = this.props;

    if (selectedValue === null && selected === -1) {
      return (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Bars size={15} color={colors.primary} />
        </View>
      );
    }
    console.log('maintenance',sensors[selected].maintenance);

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
          <View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ marginVertical: hp('2%') }}>
                <Text style={[styles.Text, { fontSize: 20 }]}>Motor</Text>
              </View>

              {sensors[selected]?.fillLevel1 <=
                sensors[selected].threshold_lowerTank ||
              sensors[selected].maintenance === true ? (
                <View
                  style={[
                    styles.controlIconView,
                    {
                      width: 100,
                      height: 100,
                      borderRadius: 50,
                      marginTop: hp('3%'),
                    },
                  ]}
                >
                  <Icon2
                    name="power-off"
                    style={[
                      styles.Icon,
                      { fontSize: 40, color: colors.darkGray },
                    ]}
                  />
                </View>
              ) : (
                // eslint-disable-next-line no-console
                <TouchableOpacity onPress={() => this.handleMotor()}>
                  <View
                    style={[
                      styles.controlIconView,
                      {
                        width: 100,
                        height: 100,
                        borderRadius: 50,
                        marginTop: hp('3%'),
                      },
                    ]}
                  >
                    {sensors[selected].motor === 1 ? (
                      <Icon2
                        name="power-off"
                        style={[
                          styles.Icon,
                          { fontSize: 40, color: '#689F38' },
                        ]}
                      />
                    ) : (
                      <Icon2
                        name="power-off"
                        style={[
                          styles.Icon,
                          { fontSize: 40, color: '#bf360c' },
                        ]}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              )}

              {sensors[selected].motor === 1 ? (
                <Text style={styles.Text}>ON</Text>
              ) : (
                <Text style={[styles.Text, { fontSize: hp('5%') }]}>OFF</Text>
              )}
            </View>

            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                marginLeft: wp('3.5%'),
                marginTop: hp('3%'),
              }}
            >
              FillLevel:
            </Text>

            <Card
              title="UPPER TANK"
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

                <View style={[styles.IconView]}>
                  <Icon1 name="gas-pump" style={styles.Icon} />
                </View>
              </View>
            </Card>

            <Card
              title="LOWER TANK"
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
                    value={sensors[selected]?.fillLevel1}
                    backgroundColorOnComplete="#6CC644"
                  />
                  <Text style={[styles.Text, { marginTop: hp('1%') }]}>
                    {sensors[selected]?.fillLevel1}%
                  </Text>
                </View>

                <View style={[styles.IconView]}>
                  <Icon1 name="gas-pump" style={styles.Icon} />
                </View>
              </View>
            </Card>
          </View>
        )}
      </SafeAreaView>
    );
  }
}
export default withNavigation(TankHomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    // justifyContent:'center',
    // alignItems:'center',
  },
  cardMainContainer: {
    backgroundColor: colors.white,
    borderColor: colors.white,
    borderWidth: 0,
    elevation: 5,
    shadowRadius: wp('3%'),
    borderRadius: wp('3%'),
    marginVertical: hp('2%'),
    // marginLeft: wp('3.5%'),
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
  controlIconView: {
    width: 65,
    height: 65,
    borderRadius: 35,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: wp('0%'), height: hp('0%') },
    shadowColor: 'black',
    shadowOpacity: 1.0,
    shadowRadius: wp('2%'),
    elevation: wp('5%'),
  },

  Text: {
    marginTop: hp('2%'),
    fontSize: hp('3.5%'),
    fontWeight: 'bold',
    color: '#263238',
  },
  Icon: { fontSize: hp('3%'), marginBottom: hp('0.5%'), color: colors.white },
  divider: {
    backgroundColor: colors.primary,
    marginTop: hp('3.5%'),
    marginBottom: hp('2%'),
    marginHorizontal: wp('20%'),
    height: 1,
  },
  Dropdown: {
    width: wp('80%'),
    height: hp('4%'),
    alignSelf: 'center',
    marginTop: hp('1.5%'),
  },
});
