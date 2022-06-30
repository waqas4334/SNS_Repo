import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text ,Image,ScrollView,TouchableOpacity} from 'react-native';
import Icon2 from 'react-native-vector-icons/Entypo';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import Icon4 from 'react-native-vector-icons/MaterialCommunityIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import { segmentLight } from '../../../redux/actions/streetLightAction';
import { Card, Divider } from 'react-native-elements';
import { fanControl } from '../../../redux/actions/tempAction';
import { colors } from '../../../styles';


const fan = require("../../../../assets/images/fan.jpeg");
const Item = (props) => {
  const { item,status,module_id} = props;
  // console.log('status',status)
  const dispatch = useDispatch();
  const [Index, setIndex] = useState(null);

  // useEffect(() => {
  //   if (lights[index] === '2') {
  //     setIndex(true);
  //   } else if (lights[index] === '0') {
  //     setIndex(false);
  //   }
  // }, []);

  // const toggle = () => {
  //   if (lights[index] === '0') {
  //     dispatch(segmentLight(segId, index, '2'));
  //   } else {
  //     dispatch(segmentLight(segment[module]._id, index, '0'));
  //   }
  // };
  const onfanControl = () => {
    if(status === true){
      // console.log('trueee')
      dispatch(fanControl(module_id,item._id,false));
    }
    else if(status === false){
      // console.log('false')
      dispatch(fanControl(module_id,item._id,true));
     
    }
  }
  return (
        <Card containerStyle={styles.cardStyle}>
        <Text style={styles.itemName}>{item.name}</Text> 
        <View style={styles.innerCard}>
          <View style={{alignSelf:'center'}}>
            <TouchableOpacity style={[styles.btn,{backgroundColor: status === false ? colors.dullGrey : colors.primary}]} onPress={()=> onfanControl()}>
              <Text style={[styles.btnText,{color: status === false ? "#000" : "#fff"}]}>{status === false ? "OFF" : "ON"}</Text>
            </TouchableOpacity>
          </View>
            <View style={{marginTop:hp('-2%')}}>
              {status === false ? (
                 <View>
                 <Image source={fan} style={{ alignSelf: 'center',width:50, height:45}} />
                 </View>
              ):(
                <Animatable.View animation="rotate" iterationCount={'infinite'}>
                <Image source={fan} style={{ alignSelf: 'center',width:50, height:45}} />
              </Animatable.View> 
              )}
            </View>
           
          </View>       
        </Card>
  );
};
export default Item;

const styles = StyleSheet.create({
 cardStyle:{
   borderRadius:6,
 },
 btn:{paddingHorizontal: 13,paddingVertical:5,borderRadius:6},
 btnText:{fontSize: 13},
  Icon: { fontSize: hp('4.5%'), color: 'white' },
  textStyle:{fontWeight:'bold',fontSize:hp('3%')},
  itemName:{fontSize:hp('1.5%'),color:'#9DA4B4'},
  innerCard:{marginTop:13,flexDirection:'row',justifyContent:'space-between'},
  container:{flex:1}
});