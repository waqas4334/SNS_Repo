import React from 'react';
import { View, Text, StyleSheet, Image,YellowBox, ScrollView, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Card, Divider } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { Bubbles } from 'react-native-loader';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DialogInput from 'react-native-dialog-input';
import { withNavigation } from 'react-navigation';
import { colors } from '../../../styles';
import { Dropdown } from '../../../components';

YellowBox.ignoreWarnings([' undefined is not an object']);
YellowBox.ignoreWarnings(['Cant perform a React state']);
const image = require("../../../../assets/images/humidity.jpg");
const iconThreshold = require("../../../../assets/images/threshold.png");

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            moduleArray: [],
            selectedModule: -1,
            selectedModuleValue: null,
            segmentIndex: false,
            dialogVisible: false,
            dialogVisible1: false,
            dialogVisible2: false,
            dialogVisible3: false,
        }
    }

    // Animation Handling
    handleViewRef1 = ref => this.view1 = ref;

    handleViewRef2 = ref => this.view2 = ref;

    handleViewRef3 = ref => this.view3 = ref;

    handleViewRef4 = ref => this.view4 = ref;

    handleViewRef5 = ref => this.view5 = ref;

    handleViewRef6 = ref => this.view6 = ref;

    animate1 = () => this.view1.bounceInLeft(2500).then(endState => console.log(endState.finished ? 'finished' : 'canceled'));

    animate2 = () => this.view2.bounceInRight(2500).then(endState => console.log(endState.finished ? 'finished' : 'canceled'));

    animate3 = () => this.view3.bounceInLeft(2500).then(endState => console.log(endState.finished ? 'finished' : 'canceled'));

    animate4 = () => this.view4.bounceInRight(2500).then(endState => console.log(endState.finished ? 'finished' : 'canceled'));

    animate5 = () => this.view5.bounceInLeft(2500).then(endState => console.log(endState.finished ? 'finished' : 'canceled'));

    animate6 = () => this.view6.bounceInRight(2500).then(endState => console.log(endState.finished ? 'finished' : 'canceled'));

    async componentDidMount() {
        const { user, navigation } = this.props;
        const done = await this.props.getModule(user.id);
        if (done === 'done') {
            this.handleSensorData();
        } else {
            console.log('error');
        }
        if (this.view1 !== null && this.view2 !== null && this.view3 !== null && this.view4 !== null && this.view5 !== null && this.view6 !== null) {
            this.animate1();
            this.animate2();
            this.animate3();
            this.animate4();
            this.animate5();
            this.animate6();
        }

        this.focusListener = navigation.addListener('didFocus', async () => {
            const done = await this.props.getModule(user.id);
            if (done === 'done') {
                this.handleSensorData();
            } else {
                console.log('error');
            }
            if (this.view1 !== null && this.view2 !== null && this.view3 !== null && this.view4 !== null && this.view5 !== null && this.view6 !== null) {
                this.animate1();
                this.animate2();
                this.animate3();
                this.animate4();
                this.animate5();
                this.animate6();
            }
        });

    }

    handleSensorData = () => {
        const { module } = this.props;
        const temp = [];
        module.map(s => {
            temp.push(s.name);
        })
        this.setState({
            moduleArray: temp,
            selectedModule: 0,
            selectedModuleValue: module[0].name
        })
    }

    handleModuleChange = (index, value) => {
        const { module } = this.props;
        const Index2 = module.findIndex(s => s.name === value);
        this.setState({
            selectedModule: index,
            selectedModuleValue: value,
            segmentIndex: Index2
        });
    }

    showDialog = (type) => {
        if (type === 'lowerTemp') {
            this.setState({
                dialogVisible: true
            })
        }
        else if (type === 'upperTemp') {
            this.setState({
                dialogVisible1: true
            })
        }
        else if (type === 'lowerHumidity') {
            this.setState({
                dialogVisible2: true
            })
        }
        else if (type === 'upperHumidity') {
            this.setState({
                dialogVisible3: true
            })
        }
    }

    closeDialog = (type) => {
        if (type === 'lowerTemp') {
            this.setState({
                dialogVisible: false
            })
        }
        else if (type === 'upperTemp') {
            this.setState({
                dialogVisible1: false
            })
        }
        else if (type === 'lowerHumidity') {
            this.setState({
                dialogVisible2: false
            })
        }
        else if (type === 'upperHumidity') {
            this.setState({
                dialogVisible3: false
            })
        }
    }

    sendInput = (inputText, type) => {
        const { module } = this.props;
        const { selectedModule } = this.state;
        if (type === 'lowerTemp') {
            console.log('lower', inputText)
            this.props.tempLowerThreshold(module[selectedModule]._id, inputText);
            this.closeDialog('lowerTemp');
        }
        else if (type === 'upperTemp') {
            console.log('upper', inputText)
            this.props.tempUpperThreshold(module[selectedModule]._id, inputText);
            this.closeDialog('upperTemp');
        }
        else if (type === 'upperHumidity') {
            console.log('upperhumidty', inputText)
            this.props.humidityUpperThreshold(module[selectedModule]._id, inputText);
            this.closeDialog('upperHumidity');
        }
        else if (type === 'lowerHumidity') {
            console.log('lowerhumidity', inputText)
            this.props.humidityLowerThreshold(module[selectedModule]._id, inputText);
            this.closeDialog('lowerHumidity');
        }
    }

    render() {
        const { moduleArray, selectedModule, selectedModuleValue, dialogVisible, dialogVisible1, dialogVisible2, dialogVisible3 } = this.state;
        const { module, user, moduleLoading } = this.props;
        console.log('humidity',module)

        if (selectedModuleValue === null && selectedModule === -1) {
            return (
              <View
                style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
              >
                <Bubbles size={15} color={colors.primary} />
              </View>
            );
        }
        return (
          <View style={styles.container}>
            <View style={{ alignSelf: 'center', marginTop: hp('1.5%'), }}>
              <Dropdown
                placeholder='Select Module...'
                        // style={styles.Dropdown}
                style={{ width: wp('80%'), height: hp('5%'), marginTop: hp('1%'), borderWidth: 0.2 }}
                color='#000'
                items={moduleArray}
                selectedIndex={selectedModule}
                onSelect={(index, value) => this.handleModuleChange(index, value)}
              />
            </View>
            {moduleLoading ? (
              <View
                style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
              >
                <Bubbles size={15} color={colors.primary} />
              </View>
                ) : (
                  <ScrollView keyboardShouldPersistTaps="handled">
                    <Animatable.View ref={this.handleViewRef1}>
                      <Card containerStyle={[styles.cardStyle, { width: wp('80%'), height: hp('15%'), borderTopEndRadius: 30, borderBottomRightRadius: 30, marginLeft: wp('-2%') }]}>
                        <Text style={styles.Text}>Current Temperature</Text>
                        {/* <Text style={styles.Text}>Temperature</Text> */}
                        <Divider style={{ marginHorizontal: wp('17%'), backgroundColor: '#000' }} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                          <Text style={[styles.TextView, { color: '#D32F2F' }]}>{module[selectedModule].currentTemp}°C</Text>
                          <View style={[styles.IconView, {  backgroundColor: '#fff', marginTop: hp('1%') }]}>
                            <Icon name="temperature-high" size={28} color="red" />
                          </View>
                        </View>
                      </Card>
                    </Animatable.View>

                    <Animatable.View ref={this.handleViewRef2}>
                      <Card containerStyle={[styles.cardStyle, { width: wp('80%'), height: hp('15%'), borderTopStartRadius: 30, borderBottomStartRadius: 30, marginLeft: wp('20%') }]}>
                        <Text style={styles.Text}>Current Humidity</Text>
                        {/* <Text style={styles.Text}>Humidity</Text> */}
                        <Divider style={{ marginHorizontal: wp('19%'), backgroundColor: '#000' }} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                          <Text style={[styles.TextView, { color: '#1976D2' }]}>{module[selectedModule].currentHumidity}%</Text>
                          <View style={[styles.IconView, {backgroundColor: '#fff', marginTop: hp('1%') }]}>
                            <Image source={image} style={{ alignSelf: 'center', marginTop: hp('2%'), width:30, height:43, color: 'red' }} />
                          </View>
                        </View>
                      </Card>
                    </Animatable.View>

                    <Animatable.View ref={this.handleViewRef3}>
                      <Card containerStyle={[styles.cardStyle, { width: wp('80%'), height: hp('15%'), borderTopEndRadius: 30, borderBottomRightRadius: 30, marginLeft: wp('-2%') }]}>
                        <Text style={styles.Text}>Temperature Lower Threshold</Text>
                        {/* <Text style={styles.Text}>Lower Threshold</Text> */}
                        <Divider style={{ marginHorizontal: wp('10%'), backgroundColor: '#000' }} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                          <Text style={[styles.TextView, { color: '#512DA8' }]}>{module[selectedModule].threshold}°C</Text>
                          <TouchableOpacity
                            style={styles.dropdown}
                            onPress={() => this.showDialog('lowerTemp')}
                          >
                            <Text style={styles.font}>Set Threshold</Text>
                          </TouchableOpacity>
                          <View style={[styles.IconView, {  backgroundColor: '#6a0dad', marginTop: hp('1%') }]}>
                            <Image source={iconThreshold} style={{ alignSelf: 'center', width: 25, height:25}} />
                          </View>

                        </View>
                        <DialogInput
                          isDialogVisible={dialogVisible}
                          title="Set Threshold"
                          message="Enter Value to set temperature lower threshold"
                          hintInput="Threshold"
                          submitInput={(inputText) => { this.sendInput(inputText, 'lowerTemp') }}
                          closeDialog={() => this.closeDialog('lowerTemp')}
                        />
                      </Card>
                    </Animatable.View>

                    <Animatable.View ref={this.handleViewRef4}>
                      <Card containerStyle={[styles.cardStyle, { width: wp('80%'), height: hp('15%'), borderTopStartRadius: 30, borderBottomStartRadius: 30, marginLeft: wp('20%'), }]}>
                        <Text style={styles.Text}>Temperature Upper Threshold</Text>
                        {/* <Text style={styles.Text}>Upper Threshold</Text> */}
                        <Divider style={{ marginHorizontal: wp('10%'), backgroundColor: '#000' }} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                          <Text style={[styles.TextView, { color: '#512DA8' }]}>{module[selectedModule].upperThreshold}°C</Text>
                          <TouchableOpacity
                            style={styles.dropdown}
                            onPress={() => this.showDialog('upperTemp')}
                          >
                            <Text style={styles.font}>Set Threshold</Text>
                          </TouchableOpacity>
                          <View style={[styles.IconView, {  backgroundColor: '#6a0dad', marginTop: hp('1%') }]}>
                            <Image source={iconThreshold} style={{ alignSelf: 'center', width: 25, height:25 }} />
                          </View>
                        </View>

                        <DialogInput
                          isDialogVisible={dialogVisible1}
                          title="Set Threshold"
                          message="Enter Value to set temperature upper threshold"
                          hintInput="Threshold"
                          submitInput={(inputText) => { this.sendInput(inputText, 'upperTemp') }}
                          closeDialog={() => this.closeDialog('upperTemp')}
                        />
                      </Card>
                    </Animatable.View>

                    <Animatable.View ref={this.handleViewRef5}>
                      <Card containerStyle={[styles.cardStyle, { width: wp('80%'), height: hp('15%'), borderTopEndRadius: 30, borderBottomRightRadius: 30, marginLeft: wp('-2%') }]}>
                        <Text style={styles.Text}>Humidity Lower Threshold</Text>
                        {/* <Text style={styles.Text}>Lower Threshold</Text> */}
                        <Divider style={{ marginHorizontal: wp('12%'), backgroundColor: '#000' }} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                          <Text style={[styles.TextView, { color: '#512DA8' }]}>{module[selectedModule].humidity_threshold}°C</Text>
                          <TouchableOpacity
                            style={styles.dropdown}
                            onPress={() => this.showDialog('lowerHumidity')}
                          >
                            <Text style={styles.font}>Set Threshold</Text>
                          </TouchableOpacity>
                          <View style={[styles.IconView, {  backgroundColor: '#6a0dad', marginTop: hp('1%') }]}>
                            <Image source={iconThreshold} style={{ alignSelf: 'center', width:25, height:25 }} />
                          </View>
                        </View>

                        <DialogInput
                          isDialogVisible={dialogVisible2}
                          title="Set Threshold"
                          message="Enter Value to set humdity lower threshold"
                          hintInput="Threshold"
                          submitInput={(inputText) => { this.sendInput(inputText, 'lowerHumidity') }}
                          closeDialog={() => this.closeDialog('lowerHumidity')}
                        />
                      </Card>
                    </Animatable.View>

                    <Animatable.View ref={this.handleViewRef6}>
                      <Card containerStyle={[styles.cardStyle, { width: wp('80%'), height: hp('15%'), borderTopStartRadius: 30, borderBottomStartRadius: 30, marginBottom: hp('3%'), marginLeft: wp('20%'), }]}>
                        <Text style={styles.Text}>Humidity Upper Threshold</Text>
                        {/* <Text style={styles.Text}>Upper Threshold</Text> */}
                        <Divider style={{ marginHorizontal: wp('12%'), backgroundColor: '#000' }} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                          <Text style={[styles.TextView, { color: '#512DA8' }]}>{module[selectedModule].humidity_upperThreshold}°C</Text>
                          <TouchableOpacity
                            style={styles.dropdown}
                            onPress={() => this.showDialog('upperHumidity')}
                          >
                            <Text style={styles.font}>Set Threshold</Text>
                          </TouchableOpacity>
                          <View style={[styles.IconView, {  backgroundColor: '#6a0dad', marginTop: hp('1%') }]}>
                            <Image source={iconThreshold} style={{ alignSelf: 'center', width: 25, height:25 }} />
                          </View>
                        </View>

                        <DialogInput
                          isDialogVisible={dialogVisible3}
                          title="Set Threshold"
                          message="Enter Value to set humdity upper threshold"
                          hintInput="Threshold"
                          submitInput={(inputText) => { this.sendInput(inputText, 'upperHumidity') }}
                          closeDialog={() => this.closeDialog('upperHumidity')}
                        />
                      </Card>
                    </Animatable.View>
                  </ScrollView>
                    )}
          </View>
        );
    }
}

export default withNavigation(HomeScreen);

const styles = StyleSheet.create({
    Dropdown: { width: wp('40%'), height: hp('4%'), alignSelf: 'flex-end', color: '#fff' },
    Icon: { fontSize: hp('4.5%'), color: 'white' },
    IconView: {
        width: 45,
        height: 45,
        borderRadius: 35,
        backgroundColor: '#1976D2',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: hp('4%'),
        justifyContent: 'center',
        shadowOffset: { width: wp('0%'), height: hp('0%') },
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowRadius: wp('2%'),
        elevation: 10,
    },
    font: { fontWeight: 'bold', color: 'grey', fontSize: hp('1.5%') },
    dropdown: { marginTop: hp('3%'), borderWidth: 0.5, width: wp('20%'), height: hp('4%'), alignItems: 'center', justifyContent: 'center', borderRadius: 5 },
    container: { flex: 1, backgroundColor: '#E0E0E0', },
    imageContainer: { height: '30%', },
    cardStyle: { borderRadius: 5 },
    Text: { alignSelf: 'center', fontWeight: 'bold', fontSize: hp('2%') },
    TextView: { marginTop: hp('2%'), fontSize: hp('4.5%'), fontWeight: 'bold' }
})