import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Alert, ActivityIndicator ,Platform,YellowBox,FlatList} from 'react-native';
import { Card, Divider } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import Icon1 from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/AntDesign';
import DialogInput from 'react-native-dialog-input';
import Icon4 from 'react-native-vector-icons/MaterialIcons'
import * as Animatable from 'react-native-animatable';
import { Shake } from "react-native-motion";
import CardFlip from 'react-native-card-flip';
import { withNavigation } from 'react-navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, heightPercentageToDP } from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';
import { fonts, colors } from '../../../styles';
import { Dropdown } from '../../../components';
import { useDispatch, useSelector } from 'react-redux';
import {getSensors,Thresholds,FanMode} from '../../../redux/actions/tempAction';


const background = require("../../../../assets/images/threshold.png")

const SettingScreen = (props) => {
  const {navigation} = props;
    const user = useSelector(state => state.auth.user);
    const tempModule = useSelector(state => state.Temperature.tempModule);
    const tempLoading = useSelector(state => state.Temperature.tempLoading);
    const dispatch = useDispatch();
    
    const [dialogVisible1, setDialogVisible1] = useState(false);
    const [dialogVisible2, setDialogVisible2] = useState(false);
    const [moduleArray, setModuleArray] = useState([]);
    const [selectedModule, setSelectedModule] = useState(0);
    const [selectedModuleValue, setSelectedModuleValue] = useState(null);

  useEffect(() => {
      handleSegmentData();
  }, []);
  const handleSegmentData = async () => {
      const data = await dispatch(getSensors(user.id));
      if (data === 'done') {
          handleSensorData();
      }       
  }
  const handleSensorData = () => {
      const temp = [];
      tempModule.map(s => {
          temp.push(s.name);
      })
      setModuleArray(temp),
      setSelectedModule(0),
      setSelectedModuleValue (tempModule[0].name)
  }
 const  handleSensorChange = (index, value) => {
    const Index2 = tempModule.findIndex(s => s.name === value);
    setSelectedModule(index),
    setSelectedModuleValue(value)
  }
  //   const sendInputLower = (index,value) => {
  //     if(geyserModule[selectedModule]._id !== undefined){
  //       dispatch(getThreshold(geyserModule[selectedModule]._id,'temp_lowerthreshold',value))
  //       setSelectedThresholdLower(value);
  //     }
  //    else{
  //     console.log('error')
  //    }
      
  //   };
    // const sendInputUpper = (index,value) => {
    //   console.log('upper',value)
    //     dispatch(getThreshold(geyserModule[selectedModule]._id,'temp_upperthreshold',value))
    //     setSelectedThresholdUpper(value);
    // };
    // const onAddRoutine = () => {
    // dispatch(addRoutine(geyserModule[selectedModule]._id))
    // }
    // const onUpdateAllRoutine = () => {
    //   if(geyserModule[selectedModule].routine_enable === true ){
    //     dispatch(routineControlling(geyserModule[selectedModule]._id,false))
    //   }
    //   else 
    //   dispatch(routineControlling(geyserModule[selectedModule]._id,true))
  // }
  const showDialog = (type) => {
      // console.log('type',type)
      if (type === 'Upper Input') {       
          setDialogVisible1(true);
      }
      else if(type === 'Lower Input'){
          setDialogVisible2(true);
      } 
      else{
        console.log('erooorr')
    } 
  }
  const sendInput = (inputText,type) => {
      // console.log('typeeeee',inputText)
      if (type === 'Upper Input') {    
        // console.log('upper',inputText)   
          dispatch(Thresholds('upperthreshold',tempModule[selectedModule]._id,inputText)) 
          closeDialog(type);
      }
      else if(type === 'Lower Input'){
          // console.log('lower',inputText)
          dispatch(Thresholds('lowerthreshold',tempModule[selectedModule]._id,inputText))
          closeDialog(type);
      }
      else{
        console.log('erooorr')
    }        
  }
  const closeDialog = (type) => {
      if (type === 'Upper Input') {   
          setDialogVisible1(false);
      }
      else if(type === 'Lower Input'){  
          setDialogVisible2(false);
      }  
      else{
          console.log('erooorr')
      }     
  }
  const onclick = () => {
    if(tempModule[selectedModule].fan_auto === true){
        Alert.alert(
            'Alert!',
            'Do You Want To Disable Fan mode Automatic',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: () => {
                        dispatch(FanMode(tempModule[selectedModule]._id,false))
                        console.log('Ok Pressedddddd')
                        // this.setState({ value: this.state.value +  1});
                    },
                },
            ],
            { cancelable: false },
        );
    }
    else if(tempModule[selectedModule].fan_auto === false){
        dispatch(FanMode(tempModule[selectedModule]._id,true))
    }
    else {
        console.log('Error');
    }
  } 

    if (selectedModuleValue === null && selectedModule === -1) {
        return (
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <Bars size={15} color={colors.primary} />
          </View>
        );
    }
    return(
        <View style={{flex:1}}>
            
          <View style={styles.moduleView}>
          <Dropdown
                    placeholder='Select Module...'
                    style={styles.Dropdown}
                    items={moduleArray}
                    selectedIndex={selectedModule}
                    onSelect={(index, value) => handleSensorChange(index, value)}
                />
              
          </View>

          {tempLoading === true || tempModule === null || tempModule === undefined || tempModule[selectedModule] === undefined ? (
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                <Bars size={15} color={colors.primary} />
              </View>
) : (
    <View style={styles.inlineCards}>
                    <Card containerStyle={styles.card}>
                     <Text style={styles.textCard}>TEMPERATURE LOWER THRESHOLD</Text>
                     <View style={styles.CardView}>
                     <Text style={styles.text}>{tempModule[selectedModule].lowerthreshold}°C</Text>
                     <TouchableOpacity style={styles.inputText} onPress={()=>showDialog('Lower Input')}>
                                <Text style={styles.font}>Set Threshold</Text>
                     </TouchableOpacity>
                        <View style={[styles.IconView, { alignSelf: 'center', backgroundColor: '#0564a8' }]}>
                            <Image source={background} style={styles.image} />
                          </View>
                    <DialogInput isDialogVisible={dialogVisible2}
                        title={"Set Threshold"}
                        message={"Enter Value To Set Input Lower Threshold"}
                        hintInput ={"HINT INPUT"}
                        submitInput={ (inputText) => {sendInput(inputText,'Lower Input')} }
                        closeDialog={ () => closeDialog('Lower Input')}>
                    </DialogInput>
                     </View>
                     </Card>

                    <Card containerStyle={styles.card}>
                     <Text style={styles.textCard}>TEMPERATURE UPPER THRESHOLD</Text>
                     <View style={styles.CardView}>
                     <Text style={styles.text}>{tempModule[selectedModule].upperthreshold}°C</Text>
                     <TouchableOpacity style={styles.inputText} onPress={()=>showDialog('Upper Input')}>
                                <Text style={styles.font}>Set Threshold</Text>
                     </TouchableOpacity>
                        <View style={[styles.IconView, { alignSelf: 'center', backgroundColor: '#0564a8' }]}>
                            <Image source={background} style={styles.image} />
                          </View>
                    <DialogInput isDialogVisible={dialogVisible1}
                        title={"Set Threshold"}
                        message={"Enter Value To Set Input Upper Threshold"}
                        hintInput ={"HINT INPUT"}
                        submitInput={ (inputText) => {sendInput(inputText,'Upper Input')} }
                        closeDialog={ () => closeDialog('Upper Input')}>
                    </DialogInput>
                     </View>
                    </Card>

                    <Card containerStyle={styles.card}>
                     <Text style={styles.textCard}>FAN MODE</Text>
                     <View style={styles.CardView}>
                     <Text style={styles.text}>{tempModule[selectedModule].fan_auto === true ? 'AUTOMACTIC' : 'MANUAL'}</Text>
                        <TouchableOpacity style={[styles.IconView, { alignSelf: 'center', 
                        backgroundColor:tempModule[selectedModule].fan_auto === true ? 'green' : 'red'}]}
                        onPress={()=>onclick()}>
                            <Icon1 name="power-off" size={20} color="white"/>
                          </TouchableOpacity>
                    <DialogInput isDialogVisible={dialogVisible1}
                        title={"Set Threshold"}
                        message={"Enter Value To Set Input Upper Threshold"}
                        hintInput ={"HINT INPUT"}
                        submitInput={ (inputText) => {sendInput(inputText,'Upper Input')} }
                        closeDialog={ () => closeDialog('Upper Input')}>
                    </DialogInput>
                     </View>
                    </Card>
                    
                    
          </View>
)}
          
        </View>
    )
}

export default SettingScreen;

const styles = StyleSheet.create({
    Dropdown: { width: wp('90%'), height: hp('4%'), alignSelf: 'center' },
    moduleView:{ backgroundColor:colors.dullGrey,borderRadius:6,margin:6,alignItems:'center',justifyContent:'center',padding:13},
    inlineCards:{flex:1,backgroundColor:colors.dullGrey,marginHorizontal:6,borderRadius:6},
    CardView:{justifyContent:'space-between',flexDirection:'row',marginTop:hp('2%')},
    textCard:{alignSelf:'center',fontSize:hp('1.5%'),fontWeight:'bold',color:colors.darkGray},
    text:{fontSize:hp('2%'),padding:6,color:colors.darkGray},
    IconView: {
       
        width: 45,
        height: 45,
        borderRadius: 35,
        backgroundColor: '#EB5345',
        alignItems: 'center',
        marginRight: wp('6%'),
        marginBottom: hp('1%'),
        justifyContent: 'center',
        shadowOffset: { width: wp('0%'), height: hp('0%') },
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowRadius: wp('2%'),
        elevation: 10,
    },
    font: { fontWeight: 'bold', color: 'grey', fontSize: hp('1.5%') },
    inputText: {  borderWidth: 0.5, width: wp('30%'), height: hp('4%'), alignItems: 'center', justifyContent: 'center', borderRadius: 5 },
    textView:{ justifyContent: 'flex-start', fontWeight: 'bold',marginBottom:hp('-1%'),marginTop:hp('2%') ,marginLeft:wp('3.5%')},
    viewStyle:{flexDirection:'row',justifyContent:'space-between',marginTop:hp('1%')},
    image:{ height: 25, width: 25 },
    touchableText:{ height: hp('3%'), borderRadius: 20, width: wp('30%'), alignItems: 'center',justifyContent:'center', marginTop: hp('2%') ,borderWidth:0.2},
    card:{width:wp('90%'),height:hp('12%'),borderRadius:hp('1%'),marginTop:hp('3%'),alignSelf:'center',justifyContent:'space-evenly'},
})