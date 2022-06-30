/* eslint-disable arrow-body-style */
import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
} from 'react-native';

import { Bars } from 'react-native-loader';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import Item from './AlertItem';
import { colors } from '../../../styles';
import { getAlerts } from '../../../redux/actions/envActions';

const AlertScreen = props => {
  const { navigation } = props;
  const dispatch = useDispatch();

  const user = useSelector(state => state.auth.user);
  const alertData = useSelector(state => state.env.alertData);
  const alertLoading = useSelector(state => state.env.alertLoading);

  useEffect(() => {
    dispatch(getAlerts(user.id));
    navigation.addListener('didFocus', async () => {
      dispatch(getAlerts(user.id));
    });
  }, []);

  return (
    <View style={styles.container}>
      {alertLoading ? (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Bars size={15} color={colors.primary} />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          {alertData.length > 0 ? (
            <FlatList
              data={alertData}
              renderItem={({ item }) => (
                <Item date={item.created_at} message={item.message} />
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : (
            <View
              style={{
                flex: 0.9,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={styles.Text}>NO RECENT ALERTS!</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default AlertScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  btnText: { fontSize: hp('2%'), fontWeight: 'bold', color: '#fff' },

  Image: { width: wp('50%'), height: hp('60%') },

  Dropdown: {
    width: wp('80%'),
    height: hp('4%'),
    alignSelf: 'center',
    marginTop: hp('1.5%'),
  },
  Text: { color: colors.gray, fontWeight: 'bold', fontSize: hp('2%') },
});
