import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Platform,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Button } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux'
import {changePasswordAction} from '../../redux/actions/userActions'
const changePassword = () => {
const   dispatch =useDispatch();
  const user_id = useSelector(state => state.auth.user.id);
  const user = useSelector(state => state.auth.user);
console.log('user',user)
  const [data, setData] = React.useState({

    oldPassword:null,
    password: null,
    confirmPassword:null,
    check_textInputChange: false,
    secureOldPasswordEntry: true,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
    correctPassword:true,

    isValidOldPassword : true,
    isValidPassword:true,
    isValidconfirmPassword:true,
    isLoading:false,
  });
  const handleValidOldPasswordChange = (val) =>{
    if( (val.trim().length > 5)){
      
      setData({
        ...data,
        isValidOldPassword : true
      })
    }else{
      setData({
        ...data,
        isValidOldPassword : false
      })
    }
  }
  const handleValidPasswordChange = (val) =>{
    if( (val.trim().length >= 8)){
      
      setData({
        ...data,
        isValidPassword : true
      })
    }else{
      setData({
        ...data,
        isValidPassword : false
      })
    }
  }
  const handleValidConfirmPasswordChange = (val) =>{
    if( (val.trim().length > 5)){
      
      setData({
        ...data,
        isValidconfirmPassword : true
      })
    }else{
      setData({
        ...data,
        isValidconfirmPassword : false
      })
    }
  }
  const updateOldPasswordEntry = () => {
    setData({
        ...data,
        secureOldPasswordEntry: !data.secureOldPasswordEntry
    });
}
  const updateSecureTextEntry = () => {
    setData({
        ...data,
        secureTextEntry: !data.secureTextEntry
    });
}
const updateConfirmSecureTextEntry = () => {
  setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry
  });
}
const handleOldPasswordChange = (val) => {
  setData({
      ...data,
      oldPassword: val
  });
} 
   const handlePasswordChange = (val) => {
  setData({
      ...data,
      password: val
  });
   }
    const handleConfirmPasswordChange = (val) => {
  setData({
      ...data,
      confirmPassword: val
  });
}
const handeSubmit = () => {
  console.log('+++++++++++',data.confirmPassword)
  const Password =data.oldPassword
  const newPassword = data.password
  const confirmpassword =data.confirmPassword

if (newPassword === confirmpassword) {
  console.log('++++++++++++++++++++++++++++++++++++++++++++++',newPassword)
  if (Password === null || newPassword === null || data.isValidPassword === false || data.isValidOldPassword === false ) {
    if(Password === null || Password === undefined||data.isValidOldPassword === false){
      setData({
        ...data,
        isValidOldPassword : false
      })
    }
    if(newPassword === null||Password === undefined ||data.isValidPassword === false){
      setData({
        ...data,
        isValidPassword : false
      })
    }
  }
  else{
    console.log('Dispatch',Password,newPassword)
    setData({
      ...data,
      isLoading : true
    })
    dispatch(changePasswordAction(Password,newPassword,user_id)).then( res =>{ 
      setData({
        ...data,
        isLoading : false
      })
      console.log('ADD+++++++++++++++++++++++++',res),
       Alert.alert('PASSWORD',
        res.data.message
    )
       } )
  }
}
else{
  setData({
    ...data,
    isValidconfirmPassword : false
  })
}


}
  return (
    data.isLoading === true  ? (
      <View
        style={{
          
          alignItems: "center",
          justifyContent: 'space-around',
          alignSelf: 'center',
        }}
      >
        <Bars size={15} color='#555CC4' />
      </View>
    ) : (
    <SafeAreaView>
      <View
        style={{ padding: hp('5%') }}>
            <Text style={[styles.text_footer, {
     
        }]}>Old Password</Text>
        <View style={styles.action}>
          <Feather
            name="lock"
            color="#05375a"
            size={20}
          />
          <TextInput
            placeholder="Enter Your Old Password"
            secureTextEntry={data.secureOldPasswordEntry? true : false}
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => handleOldPasswordChange(val)}
            onEndEditing={(e)=> handleValidOldPasswordChange(e.nativeEvent.text)}
          />
          <TouchableOpacity
          onPress={updateOldPasswordEntry}
          >
            {data.secureOldPasswordEntry ?
              <Feather
                name="eye-off"
                color="grey"
                size={20}
              />
              :
              <Feather
                name="eye"
                color="grey"
                size={20}
              />
            }
          </TouchableOpacity>
        </View>
        {data.isValidOldPassword ? null :
              <Animatable.View animation='fadeInLeft' duration={500}>
              <Text style={{color:'#FF0000'}}>InValid Password</Text>
              </Animatable.View>}
        <Text style={[styles.text_footer, {
          marginTop: 35,
        }]}>Password</Text>
        <View style={styles.action}>
          <Feather
            name="lock"
            color="#05375a"
            size={20}
          />
          <TextInput
            placeholder="Enter New Password"
            secureTextEntry={data.secureTextEntry ? true : false}
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => handlePasswordChange(val)}
            onEndEditing={(e)=> handleValidPasswordChange(e.nativeEvent.text)}
          />
          <TouchableOpacity
          onPress={updateSecureTextEntry}
          >
            {data.secureTextEntry ?
              <Feather
                name="eye-off"
                color="grey"
                size={20}
              />
              :
              <Feather
                name="eye"
                color="grey"
                size={20}
              />
            }
          </TouchableOpacity>
        </View>
        { data.isValidPassword ? null :
              <Animatable.View animation='fadeInLeft' duration={500}>
              <Text style={{color:'#FF0000'}}>Password must be 8 characters long</Text>
              </Animatable.View>}
        <Text style={[styles.text_footer, {
          marginTop: 35
        }]}>Confirm Password</Text>
        <View style={styles.action}>
          <Feather
            name="lock"
            color="#05375a"
            size={20}
          />
          <TextInput
            placeholder="Confirm Your Password"
            secureTextEntry={data.confirm_secureTextEntry? true : false}
            style={styles.textInput}
            autoCapitalize="none"
          onChangeText={(val) => handleConfirmPasswordChange(val)}
          onEndEditing={(e)=> handleValidConfirmPasswordChange(e.nativeEvent.text)}
          />
          <TouchableOpacity
          onPress={updateConfirmSecureTextEntry}
          >
            {data.confirm_secureTextEntry?
              <Feather
                name="eye-off"
                color="grey"
                size={20}
              />
              :
              <Feather
                name="eye"
                color="grey"
                size={20}
              />
            }
          </TouchableOpacity>
        </View>
        { data.isValidconfirmPassword ? null :
              <Animatable.View animation='fadeInLeft' duration={500}>
              <Text style={{color:'#FF0000'}}>Password not Correct</Text>
              </Animatable.View>}
        <TouchableOpacity
                    style={styles.btn}
                    onPress={() => handeSubmit()}
                >
                  {/* background-color: #045de9;
                background-image: linear-gradient(315deg, #045de9 0%, #09c6f9 74%); */}
                <LinearGradient
                    colors={['#09c6f9', '#045de9']}
                    style={styles.btn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}
                    onPress={() => handeSubmit()}
                    >Change Password</Text>
                </LinearGradient>
                </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
  )
}
export default changePassword;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387'
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30
  },
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
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50
  },
  btn: {
    
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop:hp('4%')
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold'
  }
});
