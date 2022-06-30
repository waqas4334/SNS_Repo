import React from 'react';
import { StyleSheet, View, Text, ImageBackground ,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

import { Button } from '../../components';
import { fonts, colors } from '../../styles';
import AsyncStorage from '@react-native-community/async-storage';

export default class ProfileScreen extends React.Component {

  
  handleLogout = () => {
    AsyncStorage.removeItem('userToken')
        .then(()=> {
          console.log('removed');
        })
        this.props.logout();
        this.props.navigation.navigate('Auth');
  }

  render(){
    const {user} = this.props;
    return (
      <View style={styles.container}>
        <ImageBackground
          resizeMode="cover"
          source={require('../../../assets/images/profile.jpg')}
          style={[styles.section, styles.header]}
        >
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={styles.title}>{user.name}</Text>
            <View>
              <Text style={styles.position}>Developer</Text>
              <Text style={styles.company}>Rubitron Labs</Text>
            </View>
          </View>
         
        </ImageBackground>
        <View style={styles.section}>
          <LinearGradient
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            colors={[colors.profileGradientStart, colors.profileGradientEnd]}
            style={styles.quickFacts}
          >
            <View style={styles.quickInfoItem}>
              <Text style={styles.quickInfoText}>{user.dashboards.length}</Text>
              <Text style={styles.quickInfoText}>Dashboards</Text>
            </View>

          </LinearGradient>

          <View style={{ flex: 1 }}>
            <View style={styles.infoRow}>
              <Icon2
                style={styles.infoIcon}
                name="email-variant"
                size={20}
                color="#c3c3c3"
              />
              <Text>{user.email}</Text>
            </View>
            <View style={styles.hr} />

            <View style={styles.infoRow}>
              <Icon
                style={styles.infoIcon}
                name="instagram"
                size={20}
                color="#c3c3c3"
              />
              <Text>Rubitron Labs</Text>
            </View>
            <View style={styles.hr} />

            <View style={styles.infoRow}>
              <Icon
                style={styles.infoIcon}
                name="youtube"
                size={20}
                color="#c3c3c3"
              />
              <Text>Rubitron Labs</Text>
            </View>
            <View style={styles.hr} />
            <View style={[styles.infoRow,{marginBottom:5}]}
            >
            <Icon
                style={styles.infoIcon}
                name="key"
                size={20}
                color="#c3c3c3"
              />
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate('ChangePassword')}>
            <Text>Change Password</Text>
            </TouchableOpacity>
            </View>
          </View>
        

        </View>
      </View>
    );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flex: 2,
    padding: 20,
  },
  section: {
    flex: 3,
    position: 'relative',
  },
  title: {
    color: colors.white,
    fontFamily: fonts.primaryBold,
    fontSize: 25,
    letterSpacing: 0.04,
    marginBottom: 10,
  },
  lightText: {
    color: colors.white,
  },
  quickFacts: {
    height: 60,
    flexDirection: 'row',
  },
  quickFact: {
    flex: 1,
  },
  infoSection: {
    flex: 1,
  },
  infoRow: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  hr: {
    borderBottomColor: '#e3e3e3',
    borderBottomWidth: 1,
    marginLeft: 20,
  },
  infoIcon: {
    marginRight: 20,
  },
  bottomRow: {
    height: 80,
    flexDirection: 'row',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  position: {
    color: colors.white,
    fontFamily: fonts.sprimaryLight,
    fontSize: 16,
    marginBottom: 3,
  },
  company: {
    color: colors.white,
    fontFamily: fonts.primaryRegular,
    fontSize: 16,
  },
  quickInfoItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  quickInfoText: {
    color: colors.white,
    fontFamily: fonts.primaryRegular,
  },
  bottomImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
