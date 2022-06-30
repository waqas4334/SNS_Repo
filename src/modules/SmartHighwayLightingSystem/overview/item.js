import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text ,Image} from 'react-native';
import Icon2 from 'react-native-vector-icons/Entypo';
import Icon3 from 'react-native-vector-icons/FontAwesome';
import Icon4 from 'react-native-vector-icons/MaterialCommunityIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import { segmentLight } from '../../../redux/actions/streetLightAction';

const iconStreet = require('../../../../assets/images/street.png');
const iconLightOn = require('../../../../assets/images/lightsOn.png');
const iconLightOff = require('../../../../assets/images/lightOff.png');

const Item = (props) => {
  const { data, index, lights, module, segId, control } = props;
  const segment = useSelector(state => state.light.segment);
  const SegmentLightLoading = useSelector(state => state.light.SegmentLightLoading);
  const dispatch = useDispatch();
  const [Index, setIndex] = useState(null);

  useEffect(() => {
    if (lights[index] === '2') {
      setIndex(true);
    } else if (lights[index] === '0') {
      setIndex(false);
    }
  }, []);

  const toggle = () => {
    if (lights[index] === '0') {
      dispatch(segmentLight(segId, index, '2'));
    } else {
      dispatch(segmentLight(segment[module]._id, index, '0'));
    }
  };
  return (
    <View style={styles.itemContainer}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.itemName}>Light No: {index}</Text>
        {/* toggle */}

        <View 
          style={{ alignSelf: 'flex-end', marginLeft: wp('1.5%') }}
        >
          {lights[index] === '0' ? (
            <TouchableOpacity style={[styles.btnView, { backgroundColor: 'transparent' }]} onPress={() => toggle()}>
              <Icon3 name='toggle-on' color='red' size={22} />
            </TouchableOpacity>
              ) : (
                <TouchableOpacity style={[styles.btnView, { backgroundColor: 'transparent' }]} onPress={() => toggle()}>
                  <Icon3 name='toggle-on' color='green' size={22} />
                </TouchableOpacity>
                )}
        </View>
      </View>
      
      {/* Icon */}
      {lights[index] === '0'  ? (
        //  <Animatable.View animation="flash" iterationCount="infinite">
        <Image
          source={iconLightOff}
          // name="light-up"
          style={[
            styles.Icon,
            { alignSelf: 'center', color: '#000', marginTop: hp('1%'),width:wp('10%'),height:hp('10%') },
          ]}
        />
        // </Animatable.View>
      ) : (
        // <Animatable.View animation="flash" iterationCount="infinite">
        <Image
          source={iconLightOn}
          style={[
            styles.Icon,
            { alignSelf: 'center', color: '#FFCA28', marginTop: hp('1%'),width:wp('10%'),height:hp('10%')},
          ]}
        />
          //  <Icon2
          //   name="light-up"
          //   style={[
          //     styles.Icon,
          //     { alignSelf: 'center', color: '#FFCA28', marginTop: hp('3%') },
          //   ]}
          // /> 
          //  </Animatable.View>
        )}
     
     
      {/* Text */}
      {index >= 0 && lights[index] === '0' ? (
        <Text
          style={{
            alignSelf: 'center',
            color: '#d32f2f',
            fontSize: 20,
            marginTop: hp('0.5%'),
            fontWeight: 'bold',
          }}
        >
          OFF
        </Text>
      ) : (
        <Text
          style={{
              alignSelf: 'center',
              color: '#43A047',
              fontSize: 20,
              marginTop: hp('0.5%'),
              fontWeight: 'bold',
            }}
        >
          ON
        </Text>
        )}

      {lights[index] === '0' ? (
        <Text
          style={{
                        alignSelf: 'center',
                        color: 'black',
                        marginTop: hp('0.5%'),
                        fontSize: 10,
                      }}
        >
          Brightness: 0%
        </Text>
        ): (
          <Text
            style={{
                        alignSelf: 'center',
                        color: 'black',
                        marginTop: hp('0.5%'),
                        fontSize: 10,
                      }}
          >
            Brightness: {segment[module].dimLevel}%
          </Text>
        )}
        
      
    </View>
  );
};
export default Item;

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 10,
    backgroundColor: '#fff',
    elevation: 5,
    marginTop: 10,
    paddingVertical: hp('2%')
  },
  Icon: { fontSize: hp('4.5%'), color: 'white' },
  gridView: { marginTop: 10, flex: 1 },
  itemName: { fontSize: 10, color: '#000', fontWeight: '200', marginTop: hp('0.7%'), },
  btnView: { width: 27, height: 25, borderRadius: 14.5, alignItems: 'center', justifyContent: 'center',marginRight:wp('1%') }
});