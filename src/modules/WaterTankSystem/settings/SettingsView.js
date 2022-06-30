/* eslint-disable no-console */
/* eslint-disable react/no-unused-state */
/* eslint-disable array-callback-return */
/* eslint-disable no-shadow */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import Icon3 from 'react-native-vector-icons/MaterialIcons';
import DialogInput from 'react-native-dialog-input';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Bars } from 'react-native-loader';
import { colors } from '../../../styles';
import { Dropdown } from '../../../components';

export default class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      sensorarray: [],
      // eslint-disable-next-line react/no-unused-state
      selected: -1,
      // eslint-disable-next-line react/no-unused-state
      selectedValue: null,
      isDialogVisible1: false,
      isDialogVisible2: false,
      isDialogVisible3: false,
      isDialogVisible4: false,
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

  openDialog = (type) => {

    if(type === 'OH'){
      this.setState({
        isDialogVisible1: true,
      });
    }
    else if(type === 'OH_U'){
      this.setState({
        isDialogVisible2: true,
      });
    }
    else if(type === 'UG'){
      this.setState({
        isDialogVisible3: true,
      });
    }
    else if(type === 'UG_U'){
      this.setState({
        isDialogVisible4: true,
      });
    }
  };

  closeDialog = (type) => {
    if(type === 'OH'){
      this.setState({
        isDialogVisible1: false,
      });
    }
    else if(type === 'OH_U'){
      this.setState({
        isDialogVisible2: false,
      });
    }
    else if(type === 'UG'){
      this.setState({
        isDialogVisible3: false,
      });
    }
    else if(type === 'UG_U'){
      this.setState({
        isDialogVisible4: false,
      });
    }
  };

  sendThreshold = (value,type) => {
    const { sensors } = this.props;
    const { selected } = this.state;
    // const sensor = sensors.findIndex(s => s.name === selectedModuleValue);

    if(type === 'OH'){
      // console.log(value,type);
      this.props.setLowerThreshold(value, sensors[selected]._id, 'OH');
      this.closeDialog('OH');
    }
    if(type === 'UG'){
      // console.log(value,type);
      this.props.setLowerThreshold(value, sensors[selected]._id, 'UG');
      this.closeDialog('UG');
    }
    if (type === 'OH_U'){
      // console.log(value,type);
      this.props.setUpperThreshold(value, sensors[selected]._id, 'OH_U');
      this.closeDialog('OH_U');
    }
    if (type === 'UG_U'){
      // console.log(value,type);
      this.props.setUpperThreshold(value, sensors[selected]._id, 'UG_U');
      this.closeDialog('UG_U');
    }    
  };

  render() {
    const { sensorarray, selected, selectedValue } = this.state;
    const { sensors, sensorLoading } = this.props;
    console.log(sensors);

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
      <View style={styles.container}>
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
                <Text style={styles.title2}>LOWER THRESHOLD:</Text>
                <Text style={styles.title2}>UPPER THRESHOLD:</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <View
                  style={{ justifyContent: 'center', alignItems: 'center' }}
                >
                  <View style={styles.IconView}>
                    <Icon3 name="graphic-eq" style={styles.Icon} />
                  </View>

                  <Text
                    style={[
                      styles.Text,
                      { marginTop: hp('1%'), color: colors.whiteTwo },
                    ]}
                  >
                    {sensors[selected].threshold}
                  </Text>
                  <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                      onPress={()=>this.openDialog('OH')}
                      style={{
                        backgroundColor: colors.whiteTwo,
                        borderRadius: 20,
                        marginTop: hp('1.5%'),
                      }}
                    >
                      <Text
                        style={[
                          styles.Text,
                          {
                            marginTop: hp('0.5%'),
                            marginBottom: hp('0.5%'),
                            fontSize: hp('1.8%'),
                            color: colors.secondary,
                            marginHorizontal: wp('1.8%'),
                          },
                        ]}
                      >
                        Set Threshold
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <DialogInput
                    isDialogVisible={this.state.isDialogVisible1}
                    title="Set Threshold"
                    message="Enter Value to set threshold"
                    // hintInput ={"HINT INPUT"}
                    submitInput={inputText => {
                      this.sendThreshold(inputText,'OH');
                    }}
                    closeDialog={()=>this.closeDialog('OH')}
                    textInputProps={{ keyboardType: 'numeric' }}
                  />
                </View>

                <View
                  style={{ justifyContent: 'center', alignItems: 'center' }}
                >
                  <View style={styles.IconView}>
                    <Icon3 name="graphic-eq" style={styles.Icon} />
                  </View>

                  <Text
                    style={[
                      styles.Text,
                      { marginTop: hp('1%'), color: colors.whiteTwo },
                    ]}
                  >
                    {sensors[selected].upperThreshold}
                  </Text>
                  <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                      onPress={()=>this.openDialog('OH_U')}
                      style={{
                        backgroundColor: colors.whiteTwo,
                        borderRadius: 20,
                        marginTop: hp('1.5%'),
                      }}
                    >
                      <Text
                        style={[
                          styles.Text,
                          {
                            marginTop: hp('0.5%'),
                            marginBottom: hp('0.5%'),
                            fontSize: hp('1.8%'),
                            color: colors.secondary,
                            marginHorizontal: wp('1.8%'),
                          },
                        ]}
                      >
                        Set Threshold
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <DialogInput
                    isDialogVisible={this.state.isDialogVisible2}
                    title="Set Threshold"
                    message="Enter Value to set threshold"
                    // hintInput ={"HINT INPUT"}
                    submitInput={inputText => {
                      this.sendThreshold(inputText,'OH_U');
                    }}
                    closeDialog={()=>this.closeDialog('OH_U')}
                    textInputProps={{ keyboardType: 'numeric' }}
                  />
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
                <Text style={styles.title2}>LOWER THRESHOLD:</Text>
                <Text style={styles.title2}>UPPER THRESHOLD:</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <View
                  style={{ justifyContent: 'center', alignItems: 'center' }}
                >
                  <View style={styles.IconView}>
                    <Icon3 name="graphic-eq" style={styles.Icon} />
                  </View>

                  <Text
                    style={[
                      styles.Text,
                      { marginTop: hp('1%'), color: colors.whiteTwo },
                    ]}
                  >
                    {sensors[selected].threshold_lowerTank}
                  </Text>
                  <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                      onPress={()=>this.openDialog('UG')}
                      style={{
                        backgroundColor: colors.whiteTwo,
                        borderRadius: 20,
                        marginTop: hp('1.5%'),
                      }}
                    >
                      <Text
                        style={[
                          styles.Text,
                          {
                            marginTop: hp('0.5%'),
                            marginBottom: hp('0.5%'),
                            fontSize: hp('1.8%'),
                            color: colors.secondary,
                            marginHorizontal: wp('1.8%'),
                          },
                        ]}
                      >
                        Set Threshold
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <DialogInput
                    isDialogVisible={this.state.isDialogVisible3}
                    title="Set Threshold"
                    message="Enter Value to set threshold"
                    // hintInput ={"HINT INPUT"}
                    submitInput={inputText => {
                      this.sendThreshold(inputText,'UG');
                    }}
                    closeDialog={()=>this.closeDialog('UG')}
                    textInputProps={{ keyboardType: 'numeric' }}
                  />
                </View>

                <View
                  style={{ justifyContent: 'center', alignItems: 'center' }}
                >
                  <View style={styles.IconView}>
                    <Icon3 name="graphic-eq" style={styles.Icon} />
                  </View>

                  <Text
                    style={[
                      styles.Text,
                      { marginTop: hp('1%'), color: colors.whiteTwo },
                    ]}
                  >
                    {sensors[selected].upperThreshold_lowerTank}
                  </Text>
                  <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                      onPress={()=>this.openDialog('UG_U')}
                      style={{
                        backgroundColor: colors.whiteTwo,
                        borderRadius: 20,
                        marginTop: hp('1.5%'),
                      }}
                    >
                      <Text
                        style={[
                          styles.Text,
                          {
                            marginTop: hp('0.5%'),
                            marginBottom: hp('0.5%'),
                            fontSize: hp('1.8%'),
                            color: colors.secondary,
                            marginHorizontal: wp('1.8%'),
                          },
                        ]}
                      >
                        Set Threshold
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <DialogInput
                    isDialogVisible={this.state.isDialogVisible4}
                    title="Set Threshold"
                    message="Enter Value to set threshold"
                    // hintInput ={"HINT INPUT"}
                    submitInput={inputText => {
                      this.sendThreshold(inputText,'UG_U');
                    }}
                    closeDialog={()=>this.closeDialog('UG_U')}
                    textInputProps={{ keyboardType: 'numeric' }}
                  />
                </View>
              </View>
            </Card>
          </View>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scrollView: {
    // backgroundColor: '#fff',
  },
  cardMainContainer: {
    // flex:1,
    backgroundColor: colors.white,
    borderColor: colors.white,
    borderWidth: 0,
    elevation: 5,
    shadowRadius: wp('3%'),
    borderRadius: wp('3%'),
    paddingHorizontal: 40,
  },
  cardTitle: {
    alignSelf: 'flex-start',
    fontSize: hp('1.7%'),
    color: colors.lightGray,
  },
  title2: {
    alignSelf: 'flex-start',
    fontSize: hp('1.4%'),
    color: colors.lightGray,
    marginBottom: hp('1%'),
  },
  IconView: {
    width: 65,
    height: 65,
    borderRadius: 35,
    backgroundColor: '#fff',
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
  Icon: { fontSize: hp('3%'), marginBottom: hp('0.5%'), color: colors.primary },
});
