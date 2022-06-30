// @flow
import { compose, withState } from 'recompose';
import { connect } from 'react-redux';

import LogsView from './LogsView';

// const mapStateToProps = (state) => ({
//     isAuthenticated : state.auth.isAuthenticated,
//     user: state.auth.user,
//     sensors: state.fuel.sensors,
//     logs: state.fuel.logs,
//     loading: state.fuel.loading
//   }); 

export default compose(
    connect(),
    // withState('fmsData', 'setData', fmsData),
    )(LogsView);
