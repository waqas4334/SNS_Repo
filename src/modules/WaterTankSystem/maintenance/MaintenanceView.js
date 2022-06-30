/* eslint-disable array-callback-return */
/* eslint-disable no-shadow */
/* eslint-disable no-console */
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Icon2 from 'react-native-vector-icons/FontAwesome';
import { withNavigation } from 'react-navigation';
import { Bars } from 'react-native-loader';
import { colors } from '../../../styles';
import { Dropdown } from '../../../components';

class MaintenanceScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      sensorarray: [],
      selected: -1,
      // eslint-disable-next-line react/no-unused-state
      selectedValue: null,
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
    const sensorIndex = sensors?.findIndex(s => s.name === value);
    this.setState({
      selected: sensorIndex,
      selectedValue: value,
    });
  };

  handleMaintenance = () => {
    const { sensors } = this.props;
    const { selected } = this.state;

    if (sensors[selected]?.maintenance === false) {
      Alert.alert(
        'Alert!',
        'Controlling would be disabled.You can enable it with same Button',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              this.props.maintenanceControl(1, sensors[selected]._id);
            },
          },
        ],
        { cancelable: false },
      );
    } else if (sensors[selected].maintenance === true) {
      this.props.maintenanceControl(0, sensors[selected]._id);
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

    return (
      <SafeAreaView style={styles.container}>
        <Dropdown
          placeholder="Select Module..."
          style={styles.Dropdown}
          items={sensorarray}
          selectedIndex={this.state.selected}
          onSelect={(index, value) => this.handleSensorChange(index, value)}
        />

        {sensorLoading === true || sensorLoading === undefined ? (
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <Bars size={15} color={colors.primary} />
          </View>
        ) : (
          <View style={{ alignItems: 'center' }}>
            <View style={{ marginVertical: hp('8%') }}>
              <Text style={[styles.Text, { fontSize: 20 }]}>
                Maintenance Mode
              </Text>
            </View>

            <TouchableOpacity onPress={() => this.handleMaintenance()}>
              <View
                style={[
                  styles.IconView,
                  { width: 100, height: 100, borderRadius: 50 },
                ]}
              >
                {sensors[selected].maintenance === true ? (
                  <Icon2
                    name="power-off"
                    style={[styles.Icon, { fontSize: 40, color: '#689F38' }]}
                  />
                ) : (
                  <Icon2
                    name="power-off"
                    style={[styles.Icon, { fontSize: 40, color: '#bf360c' }]}
                  />
                )}
              </View>
            </TouchableOpacity>

            {sensors[selected].maintenance === true ? (
              <Text
                style={[
                  styles.Text,
                  { fontSize: hp('3%'), marginTop: hp('5%'), color: '#689F38' },
                ]}
              >
                Enabled
              </Text>
            ) : (
              <Text
                style={[
                  styles.Text,
                  { fontSize: hp('3%'), marginTop: hp('5%'), color: '#bf360c' },
                ]}
              >
                Disabled
              </Text>
            )}
          </View>
        )}
      </SafeAreaView>
    );
  }
}

export default withNavigation(MaintenanceScreen);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    // paddingHorizontal:15
  },
  scrollView: {
    flex: 1,
    // backgroundColor: '#fff',
  },
  cardMainContainer: {
    flex: 1,
    borderRadius: wp('3%'),
    marginTop: hp('1.5%'),
    marginLeft: wp('3.5%'),
    paddingBottom: hp('5%'),
    paddingHorizontal: 15,
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    // height:hp('18%')
  },
  cardTitle: {
    alignSelf: 'flex-start',
    fontSize: hp('1.7%'),
    marginTop: hp('1%'),
    marginBottom: hp('0.5'),
    color: colors.lightGray,
  },
  IconView: {
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

  Dropdown: {
    width: wp('80%'),
    height: hp('4%'),
    alignSelf: 'center',
    marginTop: hp('1.5%'),
  },
  Text: { fontSize: hp('3.5%'), fontWeight: 'bold', color: '#000' },
  Icon: {
    fontSize: hp('3%'),
    marginBottom: hp('0.5%'),
    color: colors.secondary,
  },
  divider: {
    backgroundColor: colors.primary,
    marginTop: hp('3.5%'),
    marginBottom: hp('2%'),
    marginHorizontal: wp('20%'),
    height: 1,
  },
});
