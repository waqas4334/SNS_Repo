import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Animated,YellowBox, ScrollView, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Dropdown } from '../../../components';
import { Card, Divider } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { Bubbles } from 'react-native-loader';
import { colors } from '../../../styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons'
import DialogInput from 'react-native-dialog-input';
import LinearGradient from 'react-native-linear-gradient';
import {getModule,InputThreshold} from '../../../redux/actions/rectifierAction';
import { useDispatch, useSelector } from 'react-redux';

const iconThreshold = require("../../../../assets/images/threshold.png");

const SettingScreen = () => {
    const user = useSelector(state => state.auth.user);
    const module = useSelector(state => state.rectifier.module);
 
    const [dialogVisible1, setDialogVisible1] = useState(false);
    const [dialogVisible2, setDialogVisible2] = useState(false);
    const [dialogVisible3, setDialogVisible3] = useState(false);
    const [dialogVisible4, setDialogVisible4] = useState(false);
    const [dialogVisible5, setDialogVisible5] = useState(false);
    const [dialogVisible6, setDialogVisible6] = useState(false);
    const [dialogVisible7, setDialogVisible7] = useState(false);
    const [moduleArray, setModuleArray] = useState([]);
    const [selectedModule, setSelectedModule] = useState(-1);
    const [selectedModuleValue, setSelectedModuleValue] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        handleModuleData();
    }, []);
    const handleModuleData = async () => {
        const data = await dispatch(getModule(user.id));
        if (data === 'done') {
            handleRectifierData();
        }
    }
    const handleRectifierData = () => {
        const temp = [];
        module.map(s => {
            temp.push(s.name);
        })
        setModuleArray(temp);
        setSelectedModule(0);
        setSelectedModuleValue(module[0].name);
    }
    const handleModuleChange = (index, value) => {
        setSelectedModule(index);
        setSelectedModuleValue(value);
    }
    const showDialog = (type) => {
        console.log('type',type)
        if (type === 'Lower Input Voltage') {       
            setDialogVisible1(true);
        }
        else if(type === 'Upper Input Voltage'){
            setDialogVisible2(true);
        } 
        else if(type === 'Lower Output Voltage'){
            setDialogVisible3(true);
        }  
        else if(type === 'Upper Output Voltage'){
            setDialogVisible4(true);
        }       
        else if(type === 'Single Battery'){
            setDialogVisible5(true);
        } 
        else if(type === 'Low Battery'){
            setDialogVisible6(true);
        }   
        else if(type === 'Max Battery'){
            setDialogVisible7(true);
        }   
    }
    const sendInput = (inputText,type) => {
        console.log('typeeeee',inputText)
        if (type === 'Lower Input Voltage') {       
            dispatch(InputThreshold('ac_lowerthreshold',module[selectedModule]._id,inputText))
            console.log('inputTexttttttt',inputText)
            closeDialog(type);
        }
        else if(type === 'Upper Input Voltage'){
            dispatch(InputThreshold('ac_upperthreshold',module[selectedModule]._id,inputText))
            closeDialog(type);
        }  
        else if(type === 'Lower Output Voltage'){
            dispatch(InputThreshold('rec_lowerthreshold',module[selectedModule]._id,inputText))
            closeDialog(type);
        }  
        else if(type === 'Upper Output Voltage'){
            dispatch(InputThreshold('rec_upperthreshold',module[selectedModule]._id,inputText))
            closeDialog(type);
        } 
        else if(type === 'Single Battery'){
            dispatch(InputThreshold('battery_theftThreshold',module[selectedModule]._id,inputText))
            closeDialog(type);
        } 
        else if(type === 'Low Battery'){
            dispatch(InputThreshold('battery_lowBatteryAlertThreshold',module[selectedModule]._id,inputText))
            closeDialog(type);
        } 
        else if(type === 'Max Battery'){
            dispatch(InputThreshold('battery_maxVolageValue',module[selectedModule]._id,inputText))
            closeDialog(type);
        }      
    }
    const closeDialog = (type) => {
        if (type === 'Lower Input Voltage') {   
            setDialogVisible1(false);
        }
        else if(type === 'Upper Input Voltage'){  
            setDialogVisible2(false);
        } 
        else if(type === 'Lower Output Voltage'){
            setDialogVisible3(false);
        }  
        else if(type === 'Upper Output Voltage'){
            setDialogVisible4(false);
        } 
        else if(type === 'Single Battery'){
            setDialogVisible5(false);
        } 
        else if(type === 'Low Battery'){
            setDialogVisible6(false);
        } 
        else if(type === 'Max Battery'){
            setDialogVisible7(false);
        }    
        else{
            console.log('erooorr')
        }     
    }

    if (selectedModuleValue === null && selectedModule === -1) {
        return (
            <View
                style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Bubbles size={15} color={colors.primary} />
            </View>
        );
    }
    return (
        <View>
            <Dropdown
                placeholder='Select System...'
                style={styles.Dropdown}
                color='#000'
                items={moduleArray}
                selectedIndex={selectedModule}
                onSelect={(index, value) => handleModuleChange(index, value)}
            />
            <ScrollView keyboardShouldPersistTaps="handled">
                <Card containerStyle={{ width: wp('85%'), height: hp('81%'), borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 0, alignSelf: 'center'}}>
                    <LinearGradient colors={["#0575e6", "#0b5eca", "#0b47af", "#083194", "#021b79"]}
                        style={{ width: wp('85%'), height: hp('5%'), borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 0, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ alignSelf: 'center', fontSize: hp('3%'), fontWeight: 'bold', color: '#fff' }}>Rectifier Monitroing</Text>
                    </LinearGradient>
                    <Text style={styles.textView}>Input Monitoring:</Text>
                    <Card containerStyle={styles.cards}>
                        <Text style={styles.text}>Input Voltage(Lower Threshold)</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between',alignItems:'center'}}>
                            <Text style={{ fontSize: hp('3%'), marginTop: hp('2%') }}>{module[selectedModule].ac_lowerthreshold} Volt</Text>
                            <TouchableOpacity style={styles.inputText} onPress={()=>showDialog('Lower Input Voltage')}>
                                <Text style={styles.font}>Set Threshold</Text>
                            </TouchableOpacity>
                            <View style={[styles.IconView, {  backgroundColor: '#fff', marginTop: hp('1%') }]}>
                                <Image source={iconThreshold} style={styles.image} />
                            </View>
                        </View>
                        <DialogInput isDialogVisible={dialogVisible1}
                        title={"Set Threshold"}
                        message={"Enter Value To Set Input Lower Threshold"}
                        hintInput ={"HINT INPUT"}
                        submitInput={ (inputText) => {sendInput(inputText,'Lower Input Voltage')} }
                        closeDialog={ () => closeDialog('Lower Input Voltage')}>
                        </DialogInput>
                    </Card>
                    <Card containerStyle={styles.cards}>
                        <Text style={styles.text}>Input Voltage(Upper Threshold)</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' ,alignItems:'center'}}>
                            <Text style={{ fontSize: hp('3%'), marginTop: hp('2%') }}>{module[selectedModule].ac_upperthreshold} Volt</Text>
                            <TouchableOpacity style={styles.inputText} onPress={()=>showDialog('Upper Input Voltage')}>
                                <Text style={styles.font}>Set Threshold</Text>
                            </TouchableOpacity>
                            <View style={[styles.IconView, {  backgroundColor: '#fff', marginTop: hp('1%') }]}>
                                <Image source={iconThreshold}  style={styles.image} />
                            </View>
                        </View>
                        <DialogInput isDialogVisible={dialogVisible2}
                            title={"Set Threshold"}
                            message={"Enter Value To Set Input Upper threshold"}
                            hintInput={"Threshold"}
                        submitInput={(inputText) => { sendInput(inputText, 'Upper Input Voltage') }}
                        closeDialog={() => closeDialog('Upper Input Voltage')}
                        >
                        </DialogInput>
                    </Card>

                    <Text style={styles.textView}>Output Monitoring:</Text>
                    <Card containerStyle={styles.cards}>
                        <Text style={styles.text}>Output Dc Voltage(Lower Limit)</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' ,alignItems:'center'}}>
                            <Text style={{ fontSize: hp('3%'), marginTop: hp('2%') }}>{module[selectedModule].rec_lowerthreshold} Volt</Text>
                            <TouchableOpacity style={styles.inputText} onPress={()=>showDialog('Lower Output Voltage')}>
                                <Text style={styles.font}>Set Threshold</Text>
                            </TouchableOpacity>
                            <View style={[styles.IconView, {  backgroundColor: '#fff', marginTop: hp('1%') }]}>
                                <Image source={iconThreshold}  style={styles.image} />
                            </View>
                        </View>
                        <DialogInput isDialogVisible={dialogVisible3}
                            title={"Set Threshold"}  
                            message={"Enter Value To Set Output Dc Voltage Lower Threshold"}
                            hintInput={"Threshold"}
                            submitInput={(inputText) => { sendInput(inputText, 'Lower Output Voltage') }}
                            closeDialog={() => closeDialog('Lower Output Voltage')}
                        >
                        </DialogInput>
                    </Card>
                    <Card containerStyle={styles.cards}>
                        <Text style={styles.text}>Output Dc Voltage(Upper Limit)</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' ,alignItems:'center'}}>
                            <Text style={{ fontSize: hp('3%'), marginTop: hp('2%') }}>{module[selectedModule].rec_upperthreshold} Volt</Text>
                            <TouchableOpacity style={styles.inputText} onPress={()=>showDialog('Upper Output Voltage')}>
                                <Text style={styles.font}>Set Threshold</Text>
                            </TouchableOpacity>
                            <View style={[styles.IconView, {  backgroundColor: '#fff', marginTop: hp('1%') }]}>
                                <Image source={iconThreshold}  style={styles.image} />
                            </View>
                        </View>
                        <DialogInput isDialogVisible={dialogVisible4}
                            title={"Set Threshold"}
                            message={"Enter Value To Set Output Dc Voltage Upper Threshold"}
                            hintInput={"Threshold"}
                            submitInput={(inputText) => { sendInput(inputText, 'Upper Output Voltage') }}
                            closeDialog={() => closeDialog('Upper Output Voltage')}
                        >
                        </DialogInput>
                    </Card>
                </Card>

                <Card containerStyle={{ width: wp('85%'), height: hp('58%'), borderTopLeftRadius: 30, marginTop:hp('5%'),marginBottom:hp('10%'),
                borderTopRightRadius: 30, padding: 0, alignSelf: 'center' }}>
                    <LinearGradient colors={["#0575e6", "#0b5eca", "#0b47af", "#083194", "#021b79"]}
                        style={{ width: wp('85%'), height: hp('5%'), borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 0, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ alignSelf: 'center', fontSize: hp('3%'), fontWeight: 'bold', color: '#fff' }}>Battery Bank Monitoring</Text>
                    </LinearGradient>
                    <Card containerStyle={styles.cards}>
                    <Text style={styles.text}>Single Battery Threshold</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' ,alignItems:'center'}}>
                            <Text style={{ fontSize: hp('3%'), marginTop: hp('2%') }}>{module[selectedModule].battery_theftThreshold} Volt</Text>
                            <TouchableOpacity style={styles.inputText} onPress={()=>showDialog('Single Battery')}>
                                <Text style={styles.font}>Set Threshold</Text>
                            </TouchableOpacity>
                            <View style={[styles.IconView, {  backgroundColor: '#fff', marginTop: hp('1%') }]}>
                                <Image source={iconThreshold}  style={styles.image} />
                            </View>
                        </View>
                        <DialogInput isDialogVisible={dialogVisible5}
                            title={"Set Threshold"}
                            message={"Enter Value to set single battery threshold"}
                            hintInput={"Threshold"}
                        submitInput={(inputText) => { sendInput(inputText, 'Single Battery') }}
                        closeDialog={() => closeDialog('Single Battery')}
                        >
                        </DialogInput>
                    </Card>
                    <Card containerStyle={styles.cards}>
                    <Text style={styles.text}>Low Battery Threshold</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' ,alignItems:'center'}}>
                            <Text style={{ fontSize: hp('3%'), marginTop: hp('2%') }}>{module[selectedModule].battery_lowBatteryAlertThreshold} Volt</Text>
                            <TouchableOpacity style={styles.inputText} onPress={()=>showDialog('Low Battery')}>
                                <Text style={styles.font}>Set Threshold</Text>
                            </TouchableOpacity>
                            <View style={[styles.IconView, {  backgroundColor: '#fff', marginTop: hp('1%') }]}>
                                <Image source={iconThreshold}  style={styles.image} />
                            </View>
                        </View>
                        <DialogInput isDialogVisible={dialogVisible6}
                            title={"Set Threshold"}
                            message={"Enter Value to set temperature lower threshold"}
                            hintInput={"Threshold"}
                            submitInput={(inputText) => { sendInput(inputText, 'Low Battery') }}
                            closeDialog={() => closeDialog('Low Battery')}
                        >
                        </DialogInput>
                    </Card>
                    <Card containerStyle={[styles.cards,{marginBottom:hp('3%')}]}>
                    <Text style={styles.text}>Max System Voltage</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' ,alignItems:'center'}}>
                            <Text style={{ fontSize: hp('3%'), marginTop: hp('2%') }}>{module[selectedModule].battery_maxVolageValue} Volt</Text>
                            <TouchableOpacity style={styles.inputText} onPress={()=>showDialog('Max Battery')}>
                                <Text style={styles.font}>Set Threshold</Text>
                            </TouchableOpacity>
                            <View style={[styles.IconView, {  backgroundColor: '#fff', marginTop: hp('1%') }]}>
                                <Image source={iconThreshold} style={styles.image} />
                            </View>
                        </View>
                        <DialogInput isDialogVisible={dialogVisible7}
                            title={"Set Threshold"}
                            message={"Enter Value to set temperature lower threshold"}
                            hintInput={"Threshold"}
                            submitInput={(inputText) => { sendInput(inputText, 'Max Battery') }}
                            closeDialog={() => closeDialog('Max Battery')}
                        >
                        </DialogInput>
                    </Card>
                </Card>
            </ScrollView>
        </View>
    )
}
export default SettingScreen;

const styles = StyleSheet.create({
    Dropdown: { width: wp('85%'), height: hp('4%'), alignSelf: 'center', color: '#fff', marginTop: hp('3%') },
    cards: { width: wp('76%'), height: hp('15%') },
    text: { alignSelf: 'flex-start' },
    IconView: {
        width: 45,
        height: 45,
        borderRadius: 35,
        backgroundColor: '#fff',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: hp('1%'),
        justifyContent: 'center',
        shadowOffset: { width: wp('0%'), height: hp('0%') },
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowRadius: wp('2%'),
        elevation: 10,
    },
    image:{ alignSelf: 'center', width: 25, height:25 },
    font: { fontWeight: 'bold', color: 'grey', fontSize: hp('1.5%') },
    inputText: { marginTop: hp('1%'), borderWidth: 0.5, width: wp('20%'), height: hp('4%'), alignItems: 'center', justifyContent: 'center', borderRadius: 5 },
    textView:{ justifyContent: 'flex-start', fontWeight: 'bold',marginBottom:hp('-1%'),marginTop:hp('2%') ,marginLeft:wp('3.5%')}
})
//6a0dad purple