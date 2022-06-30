// @flow
import { compose, withState } from 'recompose';
import { connect } from 'react-redux';

import {logout} from '../../redux/actions/authActions';
import {addNotification,clearNotifications} from '../../redux/actions/notificationActions';

import NotificationsView from './NotificationsView';
import { withInAppNotification } from 'react-native-in-app-notification';

const mapStateToProps = (state) => ({
  isAuthenticated : state.auth.isAuthenticated,
  user: state.auth.user,
  notification: state.notification.notifications
});  

export default compose(
    connect(mapStateToProps, {logout,addNotification,clearNotifications}),
    withInAppNotification    
    
    )(NotificationsView);