import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Alert,
  Image,ToastAndroid,
  TextInput,
    YellowBox,  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { fonts, colors } from '../../../styles';
import * as Animatable from 'react-native-animatable';
import { Card, Input } from 'react-native-elements';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Button } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
YellowBox.ignoreWarnings(['Warning:Can']);
import { addsenser } from '../../../redux/actions/hybridgeyserAction';
const tick_icon =require('../../../../assets/images/tick.jpg')
import { SliderBox } from "react-native-image-slider-box";
const AddGeyser = () => {
  const geyserModule = useSelector(state => state.hybridgeyser.geyserModule);
  const geyserLoading = useSelector(state => state.hybridgeyser.geyserLoading);
  const user_id = useSelector(state => state.auth.user.id);
  const [data, setData] = React.useState({
    value:null,
    geyser_Name:null,

    isValidgeyserName:true,
    isValidgeyserID:true,

    images: [
      "https://source.unsplash.com/1024x768/?nature",
      "https://source.unsplash.com/1024x768/?water",
      "https://source.unsplash.com/1024x768/?girl",
      "https://source.unsplash.com/1024x768/?tree", // Network image
      // require('./assets/images/girl.jpg'),          // Local image
    ]
});
  const dispatch = useDispatch();
  const SubmitGeyserID=(val)=>{
    setData({
      ...data,
      value: val,
  });
  }
  const SubmitGeyserName=(gName)=>{
    setData({
      ...data,
      geyser_Name: gName,
    
  });
  }
  const handeValidGeyser_Name = (val) =>{
    if( (val.trim().length > 5)&& (val.trim().length  <= 16) ){
      
      setData({
        ...data,
        isValidgeyserName : true
      })
    }else{
      setData({
        ...data,
        isValidgeyserName : false
      })
    }
  }
  const handeValidGeyser_ID =(val) => {
    if( (val.trim().length == 11) ){
      setData({
        ...data,
        isValidgeyserID : true
      })
    }else{
      setData({
        ...data,
        isValidgeyserID : false
      })
    }
  }
  const handeSubmit = () => {
   const geyser_Name =data.geyser_Name
    const geyser_id = data.value
    if(geyser_Name === null || geyser_id === null)
    {
      if(geyser_id === null){
        setData({
          ...data,
          isValidgeyserID : false
        })
    
      }
        if(geyser_Name === null){
        setData({
          ...data,
          isValidgeyserName : false
        })
      }
    }
    else{
    dispatch(addsenser(geyser_id,user_id,geyser_Name)).then( res =>{ 
      // console.log('ADD+++++++++++++++++++++++++',res.data.message),
      setTimeout(() => {
        Alert.alert(
          'ADD GEYSER UPDATE',
          res.data.message
        )
        }, 1000)
       }
    );}

  }
    return (
      <SafeAreaView>
           {geyserLoading === true ||
        geyserModule === null ||
        geyserModule === undefined ? (
          <View
            style={{
              
              alignItems: "center",
              justifyContent: 'space-around',
              alignSelf: 'center',
            }}
          >
            <Bars size={15} color={colors.primary} />
          </View>
        ) : (
        <Card 
       containerStyle={{ shadowOffset: { width: wp('0%'), height: hp('0%') },
       shadowColor: 'black',
       shadowOpacity: 0.5,
       shadowRadius: wp('2%'),
       elevation: 10,
       borderWidth: 2,
       borderRadius: 20,
      marginBottom:hp('5  %')}}
            title="ADD NEW GEYSER ">
          
          <Text style={[styles.text_footer, {
          marginTop: 0,
        }]}>Geyser Name</Text>
        <View style={styles.action}>
          {/* <Feather
            name="lock"
            color="#05375a"
            size={20}
          /> */}
          <TextInput
            style={styles.textInput} 
            placeholder='Please Enter Your Geyser Name'
            autoCapitalize = {true}
            onChangeText={(gName) => SubmitGeyserName(gName)}
            onEndEditing={(e)=> handeValidGeyser_Name(e.nativeEvent.text)}
         />
         </View>
            { data.isValidgeyserName ? null :
              <Animatable.View animation='fadeInLeft' duration={500}>
              <Text style={{color:'#FF0000'}}>Geyser Name must be 5 characters long and less then 16 characters</Text>
              </Animatable.View>}
              <Text style={[styles.text_footer, {
          marginTop: 0,
        }]}>Board-ID</Text>
        <View style={styles.action}>
          {/* <Feather
            name="lock"
            color="#05375a"
            size={20}
          /> */}
          <TextInput
            style={styles.textInput} 
            placeholder='Please Enter Your Board-ID'
            // autoCapitalize = {true}
            autoCapitalize="none"
            onChangeText={(val) => SubmitGeyserID(val)}
            onEndEditing={(e)=> handeValidGeyser_ID(e.nativeEvent.text)}/>
            </View>
             { data.isValidgeyserID ? null :
              <Animatable.View animation='fadeInLeft' duration={500}>
              <Text style={{color:'#FF0000'}}>Please Enter Correct Geyser ID</Text>
              </Animatable.View>}
              <View>
              <TouchableOpacity
                    style={styles.btn}
                    onPress= {() => handeSubmit()}
                >
                <LinearGradient
                    colors={['#09c6f9', '#045de9']}
                    style={styles.btn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}
                    onPress={() => handeSubmit()}
                    >ADD GEYSER</Text>
                </LinearGradient>
                </TouchableOpacity>
                </View>
            
            </Card>

)}
            <SliderBox
  images={data.images}
  sliderBoxHeight={200}
  onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
  dotColor="#FFEE58"
  inactiveDotColor="#90A4AE"
  paginationBoxVerticalPadding={20}
  autoplay
  circleLoop
  resizeMethod={'resize'}
  resizeMode={'cover'}
  paginationBoxStyle={{
    position: "absolute",
    bottom: 0,
    padding: 0,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    paddingVertical: 10
  }}
  dotStyle={{
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 0,
    padding: 0,
    margin: 0,
    backgroundColor: "rgba(128, 128, 128, 0.92)"
  }}
  ImageComponentStyle={{borderRadius: 15, width: '92%', marginTop: 5}}
  imageLoadingColor="#2196F3"
/>

  </SafeAreaView>
  
    );
  }

export default AddGeyser;
const styles = StyleSheet.create({
  text_footer: {
    color: '#05375a',
    fontSize: 18
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  btn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop:hp('2%'),
    marginBottom:hp('2%')

  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold'
  }

})


