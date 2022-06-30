import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, } from 'react-native';
import { Bars } from 'react-native-loader';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { withNavigation } from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux';
import { getSecurityAlerts } from '../../../redux/actions/securityAction';
import Item from './AlertItem';
import { colors } from '../../../styles';

const AlertScreen = props => {
  const dispatch = useDispatch();
  const { navigation } = props;

  const user = useSelector(state => state.auth.user);
  const alert = useSelector(state => state.security.alerts);
  const AlertLoading = useSelector(state => state.security.alertLoading);

  const fetchAlertsData = async () => {
    console.log('idddddddddddddddd',user.id)
    await dispatch(getSecurityAlerts(user.id));
  };

  useEffect(() => {
    fetchAlertsData();
    navigation.addListener('didFocus', async () => {
      fetchAlertsData();
    });
  }, []);

  return (
    <View style={styles.container}>
      {AlertLoading ? (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Bars size={15} color={colors.primary} />
        </View>
      ) : (
          <View style={{ flex: 1 }}>
            {alert !== undefined && alert.length > 0 ? (
              <FlatList
                data={alert}
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

export default withNavigation(AlertScreen);
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
