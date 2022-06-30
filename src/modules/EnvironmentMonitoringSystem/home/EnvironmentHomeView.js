/* eslint-disable array-callback-return */
/* eslint-disable arrow-body-style */
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { Card } from 'react-native-elements';
import { Bars } from 'react-native-loader';

import Icon1 from 'react-native-vector-icons/FontAwesome5';
import { Dropdown } from '../../../components';
import { colors } from '../../../styles';
import { withNavigation } from 'react-navigation';

class EnvironmentHomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moduleArray: [],
      selectedModule: -1,
      selectedModuleValue: null,
      isDialogVisible: false,
      sensor: null,
    };
  }

  async componentDidMount() {
    const { user } = this.props;
    // console.log('user', user.id);
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
    });
  }

  handleSensorData = () => {
    const { envSensors } = this.props;
    // console.log('sensors',sensors)
    const temp = [];
    if (envSensors === undefined) {
      // console.log('undefined');
    } else if (envSensors !== undefined) {
      envSensors?.map(s => {
        temp.push(s.name);
      });
      // const name = await sensors[0].name;
      this.setState({
        moduleArray: temp,
        selectedModule: 0,
        selectedModuleValue: envSensors[0]?.name,
      });
    }
  };
  handleSensorChange = (index, value) => {
    // const {selected, selectedValue} = this.state;
    const { envSensors } = this.props;
    const sensorIndex = envSensors.findIndex(s => s.name === value);
    this.setState({
      selectedModule: index,
      selectedModuleValue: value,
      // sensor: sensorIndex,
    });
  };

  // const handleSensorChange = (index, value) => {
  //   setSelectedModule(index);
  //   setSelectedModuleValue(value);
  // };
  render() {
    const { moduleArray, selectedModuleValue, selectedModule } = this.state;
    const { envSensors, envSensorLoading } = this.props;
    // console.log('senss......', envSensors, envSensorLoading);
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
      <SafeAreaView style={styles.container}>
        <Dropdown
          placeholder="Select Module..."
          style={styles.Dropdown}
          items={moduleArray}
          selectedIndex={selectedModule}
          onSelect={(index, value) => handleSensorChange(index, value)}
        />
        {envSensorLoading ? (
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <Bars size={15} color={colors.primary} />
          </View>
        ) : (
          <View keyboardShouldPersistTaps="handled" style={styles.scrollView}>
            <Card
              title="PM (1)"
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
                    {envSensors[selectedModule].pm1}
                  </Text>
                </View>

                <View style={styles.IconView}>
                  <Icon1 name="thermometer-half" style={styles.Icon} />
                </View>
              </View>
            </Card>

            <Card
              title="PM (2.5)"
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
                    {envSensors[selectedModule].pm2_5}
                  </Text>
                </View>

                <View style={styles.IconView}>
                  <Icon1 name="thermometer-half" style={styles.Icon} />
                </View>
              </View>
            </Card>

            <Card
              title="PM (10)"
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
                    {envSensors[selectedModule].pm10}
                  </Text>
                </View>

                <View style={styles.IconView}>
                  <Icon1 name="thermometer-half" style={styles.Icon} />
                </View>
              </View>
            </Card>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

export default EnvironmentHomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scrollView: {
    // backgroundColor: '#fff',
  },
  cardMainContainer: {
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
