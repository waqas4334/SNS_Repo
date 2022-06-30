import React from 'react';
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
} from 'react-native';
import { Card, Divider } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
// import AnimatedCircularProgress from 'react-native-animated-circular-progress';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import Icon1 from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/FontAwesome';
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

YellowBox.ignoreWarnings(['Warning:Can']);

class GeyserHomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moduleArray: [],
      selectedModule: -1,
      selectedModuleValue: null,
      sensorIndex: null,
      value: 0,
    };
  }
  async componentDidMount() {
    const { user, navigation } = this.props;
    const done = await this.props.getSensors(user.id);
    if (done === 'done') {
      // console.log('doneee')
      this.handleSensorData();
    } else {
      console.log('error');
    }
    this.focusListener = navigation.addListener('didFocus', async () => {
      const done = await this.props.getSensors(user.id);
      if (done === 'done') {
        this.handleSensorData();
      } else {
        console.log('error');
      }
    });
  }
  handleSensorData = () => {
    const { geyserModule } = this.props;
    // console.log('module',geyserModule)
    const temp = [];
    geyserModule.map(s => {
      temp.push(s.name);
    });

    this.setState({
      moduleArray: temp,
      selectedModule: 0,
      selectedModuleValue: geyserModule[0].name,
    });
  };
  handleSensorChange = (index, value) => {
    const { geyserModule } = this.props;
    const Index2 = geyserModule.findIndex(s => s.name === value);
    // console.log('index',Index2)
    this.setState({
      selectedModule: index,
      selectedModuleValue: value,
      sensorIndex: Index2,
    });
  };
  onClickButton = () => {
    console.log('pressed............');
    const { geyserModule } = this.props;
    const { selectedModule } = this.state;
    if (geyserModule[selectedModule].geyser_control === 0) {
      this.props.GeyserStatus(geyserModule[selectedModule]._id, 1);  
    } else if (geyserModule[selectedModule].geyser_control === 1) {
      this.props.GeyserStatus(geyserModule[selectedModule]._id, 0);
    }
  };

  render() {
    const { moduleArray, selectedModule, selectedModuleValue } = this.state;
    const { user, geyserModule, geyserLoading,addRoutineLoading } = this.props;
    // console.log('geyser',geyserModule);

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
      <View style={{ flex: 1, backgroundColor: colors.dullGrey }}>
        <Dropdown
          placeholder="Select Module..."
          style={styles.Dropdown}
          items={moduleArray}
          selectedIndex={selectedModule}
          onSelect={(index, value) => this.handleSensorChange(index, value)}
        />

        {geyserLoading === true ||
        geyserModule === null ||
        geyserModule === undefined ? (
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
          <View
            style={{ flex: 1, flexDirection: 'column', marginTop: hp('4%') }}
          >
            <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
              <Card containerStyle={styles.cards}>
                <Text style={styles.text}>GEYSER STATUS</Text>
                <Divider />
                <View
                  style={{
                    justifyContent: 'flex-start',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: hp('2%'),
                  }}
                >
                  {geyserModule[selectedModule].geyser_status === true ? (
                    <Image
                      source={require('../../../../assets/images/editGeyser.png')}
                      style={{ width: wp('10%'), height: hp('10%') }}
                    />
                  ) : (
                    <Image
                      source={require('../../../../assets/images/geyserIcon.png')}
                      style={{ width: wp('10%'), height: hp('10%') }}
                    />
                  )}
                </View>
                <TouchableOpacity
                  onPress={() => this.onClickButton()}
                  style={[
                    styles.card,
                    {
                      alignItems: 'center',
                      borderWidth: 0.1,
                      justifyContent: 'space-around',
                      flexDirection: 'row',
                      shadowOpacity: 0.1,
                      backgroundColor: '#f5f5f5',
                      alignSelf: 'center',
                    },
                  ]}
                >
                  {geyserModule[selectedModule].geyser_control === 1 ? (
                    <Icon1 name={'power-off'} size={15} color={'green'} />
                  ) : (
                    <Icon1 name={'power-off'} size={15} color={'red'} />
                  )}
                  {geyserModule[selectedModule].geyser_control === 0 ? (
                    <Text style={styles.cardText}>OFF</Text>
                  ) : (
                    <Text style={styles.cardText}>ON</Text>
                  )}
                </TouchableOpacity>
              </Card>
              <Card containerStyle={styles.cards}>
                <Text style={styles.text}>BURNER STATUS</Text>
                <Divider />
                <View
                  style={{
                    width: 100,
                    height: 100,
                    backgroundColor: '#fff',
                    borderRadius: 50,
                    marginTop: hp('4%'),
                    alignSelf: 'center',
                    justifyContent: 'center',
                    shadowOpacity: 0.1,
                    alignItems: 'center',
                    elevation: 2,
                  }}
                >
                  {geyserModule[selectedModule].burner_status === true ? (
                    <Image
                      source={require('../../../../assets/images/editBurner.png')}
                      style={{ width: wp('10%'), height: hp('6%') }}
                    />
                  ) : (
                    <Image
                      source={require('../../../../assets/images/burner.png')}
                      style={{ width: wp('12%'), height: hp('6%') }}
                    />
                  )}
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginTop: hp('2%'),
                  }}
                >
                  <View>
                    {geyserModule[selectedModule].burner_status === true ? (
                      <Text style={[styles.cardText1, { color: 'red' }]}>
                        ON
                      </Text>
                    ) : (
                      <Text style={[styles.cardText1, { color: 'green' }]}>
                        OFF
                      </Text>
                    )}
                  </View>
                </View>
              </Card>
            </View>


            <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
              <Card containerStyle={styles.cards}>
                <Text style={styles.text}>TEMPERATURE</Text>
                <Divider />
                {/* <View style={styles.progressView}> */}
                {/* <AnimatedCircularProgress
                        startDeg={45}
                        endDeg={120}
                        innerRadius={0}
                        duration={300}
                        style={{ marginTop: 10 }}
                    /> */}
                {/* <AnimatedCircularProgress
                        style={{alignSelf:'center',marginTop:hp('4%')}}
                        size={hp('10%')}
                        width={wp('1%')}
                        // fill={127}
                        fill={geyserModule[selectedModule].temperature}
                            // eslint-disable-next-line no-nested-ternary
                        tintColor="#DB0015"
                        onAnimationComplete={() => console.log('onAnimationComplete')}
                        backgroundColor="#f5f5f5"
                        >
                        {
                        () => (
                            <View style={{alignItems:'center'}}>
                            <Icon1 name="temperature-high" size={25} color="#DB0015" />
                            </View>
                        )
                        }
                        </AnimatedCircularProgress> */}
                {/* </View> */}

                <View
                  style={{
                    width: 100,
                    height: 100,
                    backgroundColor: '#fff',
                    borderRadius: 50,
                    marginTop: hp('4%'),
                    alignSelf: 'center',
                    justifyContent: 'center',
                    shadowOpacity: 0.1,
                    alignItems: 'center',
                    elevation: 2,
                  }}
                >
                  <Icon1 name="temperature-high" size={30} color="#DB0015" />
                </View>
                <Text
                  style={{
                    fontSize: hp('2%'),
                    alignSelf: 'center',
                    marginTop: hp('2.5%'),
                    fontWeight: 'bold',
                  }}
                >
                  {geyserModule[selectedModule].temperature} °C
                </Text>
              </Card>
              <Card containerStyle={styles.cards}>
                <Text style={styles.text}>GAS VALVE</Text>
                <Divider />
                <View
                  style={{
                    width: 100,
                    height: 100,
                    backgroundColor: '#fff',
                    borderRadius: 50,
                    marginTop: hp('4%'),
                    alignSelf: 'center',
                    justifyContent: 'center',
                    shadowOpacity: 0.1,
                    elevation: 2,
                  }}
                >
                  {/* <Icon1 name='user' color={'red'} size={45}/> */}
                  <Image
                    source={require('../../../../assets/images/volveGas.png')}
                    style={{
                      width: wp('12%'),
                      height: hp('8%'),
                      alignSelf: 'center',
                    }}
                  />
                </View>
                <View style={{ alignItems: 'center', marginTop: hp('2%') }}>
                  {geyserModule[selectedModule].gas_valve === true ? (
                    <Text style={styles.textStatus}> OPEN </Text>
                  ) : (
                    <Text style={styles.textStatus}> CLOSE </Text>
                  )}
                </View>
              </Card>
            </View>
          </View>
        )}
      </View>
    );
  }
}

export default GeyserHomeScreen;

const styles = StyleSheet.create({
  cardStyle: { width: wp('30%'), height: hp('20%') },
  Dropdown: {
    width: wp('80%'),
    height: hp('4%'),
    alignSelf: 'center',
    marginTop: hp('5%'),
  },
  textStatus: { fontWeight: 'bold', fontSize: hp('2%') },

  text: { alignSelf: 'center', fontSize: hp('1.5%'), fontWeight: 'bold' },
  progressView: {
    marginTop: hp('4%'),
    width: 100,
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.1,
  },
  cardText: { fontSize: hp('1.5%'), alignSelf: 'center' },
  cardText1: { fontSize: hp('2%'), alignSelf: 'center', fontWeight: 'bold' },
  cards: { width: wp('40%'), height: hp('30%') },
  card: {
    width: wp('30%'),
    height: hp('5.5%'),
    borderRadius: hp('15%'),
    marginTop: hp('4%'),
  },
  card1: {
    width: wp('20%'),
    height: hp('5.5%'),
    borderRadius: hp('15%'),
    marginTop: hp('3%'),
    alignSelf: 'center',
  },
});
