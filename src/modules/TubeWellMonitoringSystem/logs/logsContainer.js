import LogScreen from './logs';
import {getSensors,getLogs} from '../../../redux/actions/tubewellAction';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
    user : state.auth.user,
    sensors : state.tubewell.sensors,
    Logs: state.tubewell.Logs,
    logsLoading :state.tubewell.logsLoading
})

export default connect(mapStateToProps,{getSensors,getLogs})(LogScreen);