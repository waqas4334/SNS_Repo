import LogScreen from './logs';
import {getSensors,getLogs} from '../../../redux/actions/gasAction';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
    user : state.auth.user,
    gasModule : state.gas.gasModule,
    logs :state.gas.logs,
    logsLoading :state.gas.logsLoading
})

export default connect(mapStateToProps,{getSensors,getLogs})(LogScreen);
