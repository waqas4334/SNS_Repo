// @flow
import { compose, withState } from 'recompose';
import { connect } from 'react-redux';
import {getLmsSensors,getLmsTableData} from '../../../redux/actions/lmsActions';

import LogsView from './LogsView';

const lmsData = [
 
    'ph',
    'tds',  
];


const mapStateToProps = (state) => ({
    isAuthenticated : state.auth.isAuthenticated,
    user: state.auth.user,
    lms: state.lms.lms,
    logs: state.lms.logs,
    isLoading: state.lms.isLoading
  }); 

export default compose(
    connect(mapStateToProps, {getLmsTableData,getLmsSensors}),
    withState('lmsData', 'setData', lmsData),
    )(LogsView);
