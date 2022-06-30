// @flow
import { compose, withState } from 'recompose';
import { connect } from 'react-redux';
import {get_Em_sensor,getEmLogs} from '../../../redux/actions/energyActions';
import LogsView from './LogsView';

const emData = [

    'Va',
    'Vb',
    'Vc',
    'Ia',
    'Ib',
    'Ic',
    'Pf',
    'PA',
    'PR',
    'U',
];

const mapStateToProps = (state) => ({
  user: state.auth.user,
  sensor:state.energy.sensor,
  isLoading:state.energy.isLoading,
  logsLoading: state.energy.logsLoading,
  logs:state.energy.logs
  }); 

export default compose(
    connect(mapStateToProps, {get_Em_sensor,getEmLogs}),
    withState('emData', 'setData', emData),
    )(LogsView);
