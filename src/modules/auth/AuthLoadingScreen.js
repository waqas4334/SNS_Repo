import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import {loadUser} from '../../redux/actions/authActions';

class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    this._bootstrapAsync();    
  }

  componentDidUpdate(prevProps) {
    if(this.props !== prevProps) {
        const {isAuthenticated} = this.props;
        if(isAuthenticated) {
            // console.log('authenticated');
            this.props.navigation.navigate('App');
        }            
    }
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    let userToken = await AsyncStorage.getItem('userToken');
    //AsyncStorage.setItem('userToken', null);
    //userToken = null;
    //console.log(userToken);
    if(userToken) {
        await this.props.loadUser(userToken);
        this.props.navigation.navigate('App');
    }
    else {
        this.props.navigation.navigate('Auth');
    }
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    //this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };
  // Render any loading content that you like here
  render() {    
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
}); 

export default connect(mapStateToProps,{loadUser})(AuthLoadingScreen);