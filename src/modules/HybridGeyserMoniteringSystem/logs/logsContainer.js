import LogScreen from './logs';
import {getSensors,getLogs} from '../../../redux/actions/hybridgeyserAction';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
    user : state.auth.user,
    geyserModule : state.hybridgeyser.geyserModule,
    geyserLoading: state.hybridgeyser.geyserLoading,
    logs :state.hybridgeyser.logs,
    logsLoading :state.hybridgeyser.logsLoading
})

export default connect(mapStateToProps,{getSensors,getLogs})(LogScreen);