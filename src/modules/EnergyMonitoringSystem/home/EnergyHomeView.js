/* eslint-disable no-console */
/* eslint-disable array-callback-return */
/* eslint-disable no-shadow */
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { Card, Divider } from 'react-native-elements';
import { Bars } from 'react-native-loader';

import Icon1 from 'react-native-vector-icons/FontAwesome5';
import { withNavigation } from 'react-navigation';

import { Dropdown } from '../../../components';
import { colors } from '../../../styles';

class EnergyHomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sensorarray: [],
      selected: -1,
      selectedValue: null,
      // eslint-disable-next-line react/no-unused-state
      isDialogVisible: false,
    };
  }

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

  // componentWillUnmount () {
  //   this.backHandler = BackHandler.removeEventListener(
  //     "hardwareBackPress",
  //     this.backAction
  //   );

  //   this._isMounted = false;
  // }

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
    const { sensor } = this.props;
    const sensorIndex = sensor.findIndex(s => s.name === value);
    this.setState({
      selected: index,
      selectedValue: value,
      // eslint-disable-next-line react/no-unused-state
      sensor: sensorIndex,
    });
  };

  render() {
    const { sensor, isLoading ,user} = this.props;
    console.log('enerygy',sensor);
    const { sensorarray, selectedValue, selected } = this.state;

    if ((selectedValue === null && selected === -1) || sensor === undefined) {
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
        {isLoading ? (
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
            <Text style={styles.headingText}>Voltage:</Text>
            <View style={{ flexDirection: 'row' }}>
              <Card
                title="PHASE-A VOLTAGE"
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
                    <Text style={styles.Text}>{sensor[selected].Va}</Text>
                    <Text style={[styles.Text, { color: 'red', fontSize: 15 }]}>
                      Volt
                    </Text>
                  </View>
                  <View style={styles.IconView}>
                    {/* <Icon1 name='lightbulb' style={styles.Icon} /> */}
                    <Image
                      style={styles.voltageIcon}
                      source={require('../../../../assets/images/icons/voltage3.png')}
                    />
                  </View>
                </View>
              </Card>

              <Card
                title="PHASE-B VOLTAGE"
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
                    <Text style={styles.Text}>{sensor[selected].Vb}</Text>
                    <Text style={[styles.Text, { color: 'red', fontSize: 15 }]}>
                      Volt
                    </Text>
                  </View>
                  <View style={styles.IconView}>
                    {/* <Icon1 name='lightbulb' style={styles.Icon} /> */}
                    <Image
                      style={styles.voltageIcon}
                      source={require('../../../../assets/images/icons/voltage3.png')}
                    />
                  </View>
                </View>
              </Card>
            </View>

            <Card
              title="PHASE-C VOLTAGE"
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
                  <Text style={styles.Text}>{sensor[selected].Vc}</Text>
                  <Text
                    style={[
                      styles.Text,
                      {
                        color: 'red',
                        fontSize: 15,
                        marginTop: hp('0.9%'),
                        marginLeft: wp('2%'),
                      },
                    ]}
                  >
                    Volt
                  </Text>
                </View>

                <View style={styles.IconView}>
                  {/* <Icon1 name='lightbulb' style={styles.Icon} /> */}
                  <Image
                    style={styles.voltageIcon}
                    source={require('../../../../assets/images/icons/voltage3.png')}
                  />
                </View>
              </View>
            </Card>

            <Text style={styles.headingText}>Current:</Text>
            <View style={{ flexDirection: 'row' }}>
              <Card
                title="PHASE-A CURRENT"
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
                    <Text style={styles.Text}>{sensor[selected].Ia}</Text>
                    <Text style={[styles.Text, { color: 'red', fontSize: 15 }]}>
                      AMP
                    </Text>
                  </View>
                  <View
                    style={[styles.IconView, { backgroundColor: '#d32f2f' }]}
                  >
                    <Icon1 name="bolt" style={styles.Icon} />
                  </View>
                </View>
              </Card>

              <Card
                title="PHASE-B CURRENT"
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
                    <Text style={styles.Text}>{sensor[selected].Ib}</Text>
                    <Text style={[styles.Text, { color: 'red', fontSize: 15 }]}>
                      AMP
                    </Text>
                  </View>
                  <View
                    style={[styles.IconView, { backgroundColor: '#d32f2f' }]}
                  >
                    <Icon1 name="bolt" style={styles.Icon} />
                  </View>
                </View>
              </Card>
            </View>

            <Card
              title="PHASE-C CURRENT"
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
                  <Text style={styles.Text}>{sensor[selected].Ic}</Text>
                  <Text
                    style={[
                      styles.Text,
                      {
                        color: 'red',
                        fontSize: 15,
                        marginTop: hp('0.9%'),
                        marginLeft: wp('2%'),
                      },
                    ]}
                  >
                    AMP
                  </Text>
                </View>

                <View style={[styles.IconView, { backgroundColor: '#d32f2f' }]}>
                  <Icon1 name="bolt" style={styles.Icon} />
                </View>
              </View>
            </Card>

            <Divider style={styles.divider} />

            <View style={{ flexDirection: 'row' }}>
              <Card
                title="POWER FACTOR"
                titleStyle={styles.cardTitle}
                containerStyle={styles.cardMainContainer}
              >
                <View
                  style={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Text style={styles.Text}>{sensor[selected].Pf}</Text>
                </View>
              </Card>

              <Card
                title="APPARENT POWER"
                titleStyle={styles.cardTitle}
                containerStyle={styles.cardMainContainer}
              >
                <View
                  style={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Text style={styles.Text}>{sensor[selected].PA}</Text>
                </View>
              </Card>
            </View>

            <View style={{ flexDirection: 'row', marginBottom: hp('2%') }}>
              <Card
                title="REAL POWER"
                titleStyle={styles.cardTitle}
                containerStyle={styles.cardMainContainer}
              >
                <View
                  style={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Text style={styles.Text}>{sensor[selected].PR}</Text>
                </View>
              </Card>

              <Card
                title="UNITS"
                titleStyle={styles.cardTitle}
                containerStyle={styles.cardMainContainer}
              >
                <View
                  style={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.Text}>{sensor[selected].U}</Text>
                    <Text
                      style={[
                        styles.Text,
                        {
                          color: 'red',
                          fontSize: 15,
                          marginTop: hp('0.7%'),
                          marginLeft: wp('2%'),
                        },
                      ]}
                    >
                      KWH
                    </Text>
                  </View>
                </View>
              </Card>
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
    );
  }
}
export default withNavigation(EnergyHomeScreen);
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scrollView: {
    // backgroundColor: '#fff',
  },
  headingText: {
    marginLeft: wp('3.3%'),
    marginVertical: hp('1%'),
    fontWeight: 'bold',
    marginTop: hp('3.5%'),
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
    marginTop: hp('0%'),
    fontSize: hp('3%'),
    fontWeight: 'bold',
    color: '#424242',
  },
  Icon: { fontSize: hp('2.5%'), marginBottom: hp('0.5%'), color: 'white' },
  divider: {
    height: 0.8,
    marginHorizontal: wp('15%'),
    marginTop: hp('4%'),
    marginVertical: hp('1%'),
    backgroundColor: '#dbd9d3',
  },
  voltageIcon: {
    height: hp('2.5%'),
    width: wp('5%'),
  },
  valueView: {
    backgroundColor: 'yellow',
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
});
