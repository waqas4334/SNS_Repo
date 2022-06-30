// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import {logout} from '../../redux/actions/authActions';

import ProfileView from './ProfileView';

const mapStateToProps = (state) => ({

    isAuthenticated : state.auth.isAuthenticated,
    user: state.auth.user,

});

export default compose(connect(mapStateToProps, {logout}))(ProfileView);
