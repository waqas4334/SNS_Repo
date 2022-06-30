import LogScreen from './logs';
import {getSensors,getLogs,getLogsFan} from '../../../redux/actions/tempAction';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
    user : state.auth.user,
    tempModule : state.Temperature.tempModule,
    logs :state.Temperature.logs,
    logsLoading :state.Temperature.logsLoading
})

export default connect(mapStateToProps,{getSensors,getLogs,getLogsFan})(LogScreen);
