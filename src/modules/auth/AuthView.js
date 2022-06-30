import React, { useState, useEffect, isValidElement } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Animated,
  Keyboard,
  Platform,
  LayoutAnimation,
  TouchableOpacity,
  ImageBackground,
  Alert,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  ToastAndroid
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';
import axios from 'axios';
import { colors } from '../../styles';
import { TextInput, Button } from '../../components';
// import { Dropdown2 } from '../../DropdownCom/DropdownAuth';
import Dropdown2 from '../../DropdownCom/DropdownAuth';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import promise from 'redux-promise';
import { drop } from 'lodash';

const FORM_STATES = {
  LOGIN: 0,
  REGISTER: 1,
};
items = [
  {
    id: '1',
    name: 'Fuel Monitoring System',
  },
  {
    id: '2',
    name: 'Liquid Monitoring System',
  },
  {
    id: '3',
    name: 'Temperature Monitoring System',
  },
  {
    id: '4',
    name: 'CNC Monitoring System',
  },
  {
    id: '5',
    name: 'Cold Chain Monitoring System',
  },
];

export default class AuthScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    anim: new Animated.Value(0),

    // Current visible form
    formState: FORM_STATES.LOGIN,
    isKeyboardVisible: false,

    isForget: false,

    name: null,
    email: null,
    password: null,
    phone_no: null,
    geyser_id: null,
    geyser_name: null,
    value: null,
    City: null,
    code: null,
    moduleArrayCode: ['sns', 'cnn'],
    selectedCode: null,
    compName: null,
    moduleArrayCity: [
      'Abbotabad',
      'Ahmedpur East',
      'Arif Wala',
      'Attock',
      'Badin',
      'Bahawalnagar',
      'Bahawalpur',
      'Bhakkar',
      'Bhalwal',
      'Burewala',
      'Chakwal',
      'Chaman',
      'Charsadda',
      'Chiniot',
      'Chishtian',
      'Dadu',
      'Daharki',
      'Daska',
      'Dera Ghazi Khan',
      'Dera Ismail Khan',
      'Faisalabad',
      'Ferozwala',
      'Ghotki',
      'Gojra',
      'Gujranwala',
      'Gujranwala Cantonment',
      'Gujrat',
      'Gwadar',
      'Hafizabad',
      'Haroonabad',
      'Hasilpur',
      'Hub',
      'Hyderabad',
      'Islamabad',
      'Jacobabad',
      'Jaranwala',
      'Jatoi',
      'Jhang',
      'Jhelum',
      'Kabal',
      'Kamalia',
      'Kamber Ali Khan',
      'Kandhkot',
      'Karachi',
      'Kasur',
      'Khairpur',
      'Khanewal',
      'Khanpur',
      'Khushab',
      'Khuzdar',
      'Kohat',
      'Kot Abdul Malik',
      'Kot Addu',
      'Kotri',
      'Kāmoke',
      'Lahore',
      'Larkana',
      'Layyah',
      'Lodhran',
      'Mandi Bahauddin',
      'Mansehra',
      'Mardan',
      'Mianwali',
      'Mingora',
      'Mirpur',
      'Mirpur Khas',
      'Mirpur Mathelo',
      'Multan',
      'Muridke',
      'Muzaffarabad',
      'Muzaffargarh',
      'Narowal',
      'Nawabshah',
      'Nowshera',
      'Okara',
      'Pakpattan',
      'Peshawar',
      'Quetta',
      'Rahim Yar Khan',
      'Rawalpindi',
      'Sadiqabad',
      'Sahiwal',
      'Sambrial',
      'Samundri',
      'Sargodha',
      'Shahdadkot',
      'Sheikhupura',
      'Shikarpur',
      'Sialkot',
      'Sukkur',
      'Tando Muhammad Khan',
      'Taxila',
      'Turbat',
      'Umerkot',
      'Vehari',
      'Wah Cantonment',
      'Wazirabad',
    ],
    selectedCity: null,
    moduleArray: ['Smart Geyser System', 'Smart Hybrid Geyser System '],
    selectedModule: null,
    index: [{ 1: 'Smart Geyser System' }, { 2: 'Smart Hybrid Geyser System ' }],

    selected: -1,
    selectedValue: null,

    selectedItems: [],
    Ip: null,
    loading: false,

    isValidUser: true,
    isValidPassword: true,
    isValidPhoneNumber: true,
    isValidAddress: true,
    isValidgeyser_id: true,
    isValidgeyser_name: true,
    isValidEmail: true,
    isValiddropdown: true,
    isValidcitydropdown: true,
    isValidcodedropdown: true,
  };

  UNSAFE_componentWillMount() {
    const { navigation, isAuthenticated } = this.props;
    if (isAuthenticated) {
      navigation.navigate('App');
    }

    this.keyboardDidShowListener = Keyboard.addListener(
      Platform.select({ android: 'keyboardDidShow', ios: 'keyboardWillShow' }),
      this._keyboardDidShow.bind(this),
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      Platform.select({ android: 'keyboardDidHide', ios: 'keyboardWillHide' }),
      this._keyboardDidHide.bind(this),
    );
  }

  componentDidMount() {
    axios.get('https:api.ipify.org?format=json').then(data => {
      this.setState({
        Ip: data.data.ip,
      });
    });
    Animated.timing(this.state.anim, { toValue: 3000, duration: 3000 }).start();
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow() {
    LayoutAnimation.easeInEaseOut();
    this.setState({ isKeyboardVisible: true });
  }

  _keyboardDidHide() {
    LayoutAnimation.easeInEaseOut();
    this.setState({ isKeyboardVisible: false });
  }

  fadeIn(delay, from = 0) {
    const { anim } = this.state;
    return {
      opacity: anim.interpolate({
        inputRange: [delay, Math.min(delay + 500, 3000)],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      }),
      transform: [
        {
          translateY: anim.interpolate({
            inputRange: [delay, Math.min(delay + 500, 3000)],
            outputRange: [from, 0],
            extrapolate: 'clamp',
          }),
        },
      ],
    };
  }

  componentDidUpdate(nextProps) {
    const { error, navigation, isAuthenticated, reg } = this.props;
    console.log('atertttttt', reg);
    if (nextProps.Error !== '') {
      if (error.id === 'LOGIN_FAIL') {
        Alert.alert(
          'Log in Failed!',
          error.message,
          [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
          { cancelable: false },
        );
        this.props.clearErrors();
      } else if (error.id === 'REGISTER_FAIL') {
        this.setState({
          isLoading: false,
        });
        Alert.alert('REGISTER Failed!', error.message.message);
        this.props.clearErrors();
      } else if (reg.id === 'REGISTERED_SUCCESS') {
        Alert.alert('REGISTER SUCCESS!', reg.message);
        this.setState({
          isLoading: false,
        });
        this.props.clearReg();
      }
    }

    if (isAuthenticated) {
      navigation.navigate('App');
    }
  }
  handeSubmitForget = () => {
  const {
      email,isLoading
    } = this.state;
    this.setState({
      isLoading:true
    })
    this.props.forget_Password(email).then( res =>{ 

       (setTimeout(() => {
        Alert.alert(
          'Forgot Password',
          res.data.message
        )
        }, 1000),
        this.setState({
          isLoading:false
        }))
        this.setState({
          isForget : false 
      })
      console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>Forget ',res.data)
    })
  }
  handeSubmit = () => {
    const {
      value,
      name,
      email,
      password,
      phone_no,
      address,
      City,
      code,
      geyser_id,
      geyser_name,
      compName,
      Ip,
      isValidUser,
      isValidEmail, isValidPassword,isValidPhoneNumber,isValidAddress,isValidgeyser_id,isValidgeyser_name
    } = this.state;
    if (this.state.formState == FORM_STATES.LOGIN) {
      if (email === null || password === null) {
        if (email === null) {
          this.setState({ isValidEmail: false });
        }
        if (password === null) {
          this.setState({ isValidPassword: false });
        }
      } else {
        this.props.login(email, password, Ip);
        this.setState({
          loading: true,
        });
      }
    } else {
      if (
        value === null ||
        email === null ||
        password === null ||
        name === null ||
        phone_no === null ||
        address === null ||
        City === null ||
        code === null ||
        geyser_id === null ||
        geyser_name === null ||
        isValidUser === false ||
        isValidEmail === false ||
        isValidPassword === false ||
        isValidPhoneNumber === false ||
        isValidAddress === false ||
        isValidAddress === false ||
        isValidgeyser_id === false ||
        isValidgeyser_name === false
      ) {
        if (value === null) {
          this.setState({ isValiddropdown: false });
        }
        if (name === null) {
          this.setState({ isValidUser: false });
        }
        if (email === null) {
          this.setState({ isValidEmail: false });
        }
        if (password === null) {
          this.setState({ isValidPassword: false });
        }
        if (phone_no === null) {
          this.setState({ isValidPhoneNumber: false });
        }
        if (address === undefined) {
          this.setState({ isValidAddress: false });
        }

        if (City === null) {
          this.setState({ isValidcitydropdown: false });
        }
        if (code === null) {
          this.setState({ isValidcodedropdown: false });
        }
        if (geyser_id === null) {
          this.setState({ isValidgeyser_id: false });
        }
        if (geyser_name === null) {
          this.setState({ isValidgeyser_name: false });
        }
      } else {
        this.props.register(
          value,
          name,
          email,
          password,
          phone_no,
          address,
          City,
          code,
          geyser_id,
          geyser_name,
          compName,
        );
        this.setState({
          isLoading: true,
        });
      }
    }
  };
  handeValiddropdown = val => {
    if (val !== null) {
      this.setState({ isValiddropdown: true });
    } else {
      this.setState({ isValiddropdown: false });
    }
  };
  handeValiddrop = City => {
    if (City !== null) {
      this.setState({ isValidcitydropdown: true });
    } else {
      this.setState({ isValidcitydropdown: false });
    }
  };
  handeValidCode = code => {
    if (code !== null) {
      this.setState({ isValidcodedropdown: true });
    } else {
      this.setState({ isValidcodedropdown: false });
    }
  };
  handeValidUser = val => {
    if (val.trim().length >= 4) {
      this.setState({ isValidUser: true });
    } else {
      this.setState({ isValidUser: false });
    }
  };
  handeValidPassword = val => {
    if (val.trim().length >= 7) {
      this.setState({ isValidPassword: true });
    } else {
      this.setState({ isValidPassword: false });
    }
  };
  handeValidPhone = val => {
    if (val.trim().length === 11) {
      this.setState({ isValidPhoneNumber: true });
    } else {
      this.setState({ isValidPhoneNumber: false });
    }
  };
  handeValidAddress = val => {
    if (val.trim().length >= 10) {
      this.setState({ isValidAddress: true });
    } else {
      this.setState({ isValidAddress: false });
    }
  };
  handeValidGeyser_ID = val => {
    if (val.trim().length >= 9) {
      this.setState({ isValidAddress: true });
    } else {
      this.setState({ isValidAddress: false });
    }
  };
  handeValidGeyser_Name = val => {
    if (val.trim().length > 5 && val.trim().length <= 16) {
      this.setState({ isValidgeyser_id: true });
    } else {
      this.setState({ isValidgeyser_id: false });
    }
  };
  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
  };
  isEmailValid = emial => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log('REGIX: ' + emial);
    return re.test(emial);
  };
  render() {
    const isRegister = this.state.formState === FORM_STATES.REGISTER;
    const { selectedItems, loading, isLoading } = this.state;
    const {
      selectedModule,
      moduleArray,
      value,
      moduleArrayCity,
      selectedCity,
      moduleArrayCode,
      selectedCode,
      compName,
    } = this.state;
    const handleSensorChange = (index, value) => {
      this.setState({ value });
      this.setState({ selectedModule: index });
    };
    const handleCityChange = (index, City) => {
      this.setState({ City });
      this.setState({ selectedCity: index });
    };
    const handleCodeChange = (index, code) => {
      this.setState({ code });
      console.log('++++++++++++++++++++++++++++++++++++++Code', code);
      if (code === 'sns') {
        this.setState({ compName: 'sync and secure' });
        // console.log('___________________________compName',compName)
      } else if (code === 'cnn') {
        this.setState({ compName: 'cannan' });
        // console.log('___________________________compName',compName)
      }
      this.setState({ selectedCode: index });
    };
    console.log(value);
    return (
      <ImageBackground
        source={require('../../../assets/images/background.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {isLoading === true ? (
          <View
            style={{
              height: hp('100%'),
              // flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
            }}
          >
            <Bars size={15} color={colors.primary} />
          </View>
        ) : (
          <View style={styles.container}>
            <StatusBar backgroundColor="#3b35ac" barStyle="light-content" />
            <View style={[styles.section, { paddingTop: hp('1%') }]}>
              <Animated.Image
                resizeMode="contain"
                style={[
                  styles.logo,
                  this.state.isKeyboardVisible && { height: hp('15%') },
                  this.fadeIn(0),
                ]}
                source={require('../../../assets/images/IoT-Insights-Logo.png')}
              />
            </View>
            <Animated.View
              style={[styles.section, styles.middle, this.fadeIn(700, -20)]}
            >
              <ScrollView style={{ width: '100%' }}>
                {this.state.formState === FORM_STATES.REGISTER && (
                  <>
                    <Dropdown2
                      placeholder="Select Module..."
                      style={styles.Dropdown}
                      items={moduleArray}
                      selectedIndex={selectedModule}
                      onSelect={(index, value) => {
                        this.handeValiddropdown(value);
                        handleSensorChange(index, value);
                      }}
                    />
                    {this.state.isValiddropdown ? null : (
                      <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={{ color: '#FF0000' }}>
                          Please Select Your Geyser Type
                        </Text>
                      </Animatable.View>
                    )}
                  </>
                )}
                {this.state.formState === FORM_STATES.REGISTER && (
                  <>
                    <TextInput
                      placeholder="Username"
                      style={styles.textInput}
                      autoCapitalize={true}
                      autoCorrect={false}
                      onChangeText={text => this.setState({ name: text })}
                      onEndEditing={e =>
                        this.handeValidUser(e.nativeEvent.text)
                      }
                    />
                    {this.state.isValidUser ? null : (
                      <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={{ color: '#FF0000' }}>
                          UserName must be 4 characters long
                        </Text>
                      </Animatable.View>
                    )}
                  </>
                )}
                <TextInput
                  placeholder="Enter Your Email-ID"
                  style={styles.textInput}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  onChangeText={t =>
                    t !== null && this.isEmailValid(t)
                      ? this.setState({
                          isValidEmail: true,
                          email: t,
                        })
                      : this.setState({ isValidEmail: false })
                  }
                />
                {this.state.isValidEmail ? null : (
                  <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={{ color: '#FF0000' }}>
                      Enter Valid Email ID
                    </Text>
                  </Animatable.View>
                )}
                 {this.state.isForget ? null : (
                <TextInput
                  placeholder="Password"
                  secureTextEntry
                  style={styles.textInput}
                  onChangeText={text => this.setState({ password: text })}
                  onEndEditing={e =>
                    this.handeValidPassword(e.nativeEvent.text)
                  }
                />
                 )}
                {this.state.isValidPassword ? null : (
                   this.state.isForget ? null : (
                  <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={{ color: '#FF0000' }}>
                      Password must be 8 characters long
                    </Text>
                  </Animatable.View>)
                )}
                {this.state.formState === FORM_STATES.REGISTER && (
                  <>
                    <TextInput
                      placeholder="Phone No (03XXXXXXXXX)"
                      style={styles.textInput}
                      keyboardType="numeric"
                      onChangeText={text => this.setState({ phone_no: text })}
                      onEndEditing={e =>
                        this.handeValidPhone(e.nativeEvent.text)
                      }
                    />
                    {this.state.isValidPhoneNumber ? null : (
                      <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={{ color: '#FF0000' }}>
                          Please Enter Correct Phone Number
                        </Text>
                      </Animatable.View>
                    )}
                  </>
                )}
                {this.state.formState === FORM_STATES.REGISTER && (
                  <>
                    <TextInput
                      placeholder="Address"
                      style={styles.textInput}
                      autoCapitalize="none"
                      autoCorrect={false}
                      onChangeText={text => this.setState({ address: text })}
                      onEndEditing={e =>
                        this.handeValidAddress(e.nativeEvent.text)
                      }
                    />

                    {this.state.isValidAddress ? null : (
                      <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={{ color: '#FF0000' }}>
                          Please Enter Your Correct Address
                        </Text>
                      </Animatable.View>
                    )}
                  </>
                )}
                {this.state.formState === FORM_STATES.REGISTER && (
                  <>
                    <Dropdown2
                      placeholder="Select City..."
                      style={styles.Dropdown}
                      items={moduleArrayCity}
                      selectedIndex={selectedCity}
                      onSelect={(index, City) => {
                        this.handeValiddrop(City);
                        handleCityChange(index, City);
                      }}
                    />
                    {this.state.isValidcitydropdown ? null : (
                      <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={{ color: '#FF0000' }}>
                          Please Select Your City....
                        </Text>
                      </Animatable.View>
                    )}
                  </>
                )}
                {this.state.formState === FORM_STATES.REGISTER && (
                  <>
                    <View style={{ flexDirection: 'row' }}>
                      <Dropdown2
                        placeholder="Code..."
                        style={{
                          marginLeft: wp('1'),
                          marginTop: hp(1),
                          width: wp(20),
                          height: hp(5),
                        }}
                        items={moduleArrayCode}
                        selectedIndex={selectedCode}
                        onSelect={(index, code) => {
                          this.handeValidCode(code);
                          handleCodeChange(index, code);
                        }}
                      />
                      <TextInput
                        placeholder="-Geyser ID"
                        style={{
                          width: wp('62%'),
                          marginTop: hp('1%'),
                          marginLeft: wp('1'),
                        }}
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={text =>
                          this.setState({ geyser_id: text })
                        }
                        onEndEditing={e =>
                          this.handeValidGeyser_ID(e.nativeEvent.text)
                        }
                      />
                    </View>
                    {this.state.isValidgeyser_id ? null : (
                      <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={{ color: '#FF0000' }}>
                          Please Enter Your Correct geyser_Id
                        </Text>
                      </Animatable.View>
                    )}
                    {this.state.isValidcodedropdown ? null : (
                      <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={{ color: '#FF0000' }}>
                          Please Enter Your Correct Code
                        </Text>
                      </Animatable.View>
                    )}
                  </>
                )}

                {this.state.formState === FORM_STATES.REGISTER && (
                  <>
                    <TextInput
                      placeholder="Geyser-Name"
                      style={styles.textInput}
                      autoCapitalize="none"
                      autoCorrect={false}
                      onChangeText={text =>
                        this.setState({ geyser_name: text })
                      }
                      onEndEditing={e =>
                        this.handeValidGeyser_Name(e.nativeEvent.text)
                      }
                    />
                    {this.state.isValidgeyser_name ? null : (
                      <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={{ color: '#FF0000' }}>
                          Geyser Name must be 5 characters long and less then 16
                          characters
                        </Text>
                      </Animatable.View>
                    )}
                  </>
                )}
                <Animated.View
                  style={[styles.section, styles.bottom, this.fadeIn(700, -20)]}
                >
                  {this.state.isForget ? (   <Button
                    bgColor={colors.secondary}
                    textColor="white"
                    rounded
                    style={{ alignSelf: 'stretch', marginTop: hp('4%') }}
                    caption={
                      'Forget Password'
                    }
                    onPress={() => this.handeSubmitForget()}
                  />):(
                  <Button
                    bgColor={colors.secondary}
                    textColor="white"
                    rounded
                    style={{ alignSelf: 'stretch', marginTop: hp('1%') }}
                    caption={
                      this.state.formState === FORM_STATES.LOGIN
                        ? 'Login'
                        : 'Register'
                    }
                    onPress={() => this.handeSubmit()}
                  />
                  )}
              
                  <View>
                    <ActivityIndicator
                      animating={loading}
                      size="small"
                      color={'#fff'}
                    />
                  </View>

                  {!this.state.isKeyboardVisible && (
                    <View>{this.state.isForget ? null: (
                      <TouchableOpacity
                        onPress={() => {
                          LayoutAnimation.spring();
                          this.setState({
                            formState: (isRegister)
                              ? FORM_STATES.LOGIN
                              : FORM_STATES.REGISTER,
                          });
                        }}
                        style={{ flexDirection: 'row' }}
                      >
                        <Text
                          style={{
                            fontSize: wp('4%'),
                            fontWeight: '200',
                            // color: colors.primary,
                            // fontFamily: fonts.primaryRegular,
                          }}
                        >
                          {isRegister ? 'Already have an account?' : ''}
                        </Text>
                        <Text
                          style={{
                            // color: colors.primary,
                            // fontFamily: fonts.primaryBold,
                            fontSize: wp('4%'),
                            fontWeight: '200',
                            marginLeft: 5,
                          }}
                        >
                          {isRegister
                            ? 'Login'
                            : 'New User (Registeraton Here)'}
                        </Text>
                      </TouchableOpacity>)}
                      {isRegister?
                     null: (this.state.isForget ? (
                      <TouchableOpacity
                      style={{marginLeft:5,marginTop:5}}
                      onPress = {() => this.setState({
                          isForget : false 
                      })}
                      >
                        <Text>
                        Back to LogIn
                        </Text>
                      </TouchableOpacity>
                      ) : (
                      <TouchableOpacity
                      style={{marginLeft:5,marginTop:5}}
                      onPress = {() => this.setState({
                          isForget : true 
                      })}
                      >
                        <Text style={{fontSize:wp('3.5%')}}>
                        Forget Password?
                        </Text>
                      </TouchableOpacity>
                      ))}
                      
                    </View>
                  )}
                  
                </Animated.View>
              </ScrollView>
            </Animated.View>
          </View>
        )}
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 30,
  },
  backgroundImage: {
    flex: 1,
  },
  section: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  middle: {
    flex: 2,
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
  },
  bottom: {
    flex: 1,
    alignSelf: 'stretch',
    paddingBottom: Platform.OS === 'android' ? 40 : 0,
  },
  last: {
    justifyContent: 'flex-end',
  },
  textInput: {
    alignSelf: 'stretch',
    marginTop: 5,
  },
  logo: {
    height: hp('20%'),
  },
  socialLoginContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  socialButton: {
    flex: 1,
  },
  socialButtonCenter: {
    marginLeft: 10,
    marginRight: 10,
  },
  Dropdown: {
    width: wp('83%'),
    height: hp('5%'),
    alignSelf: 'center',
    borderWidth: 2,
  },
});
