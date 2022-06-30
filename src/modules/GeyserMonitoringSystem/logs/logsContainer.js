import LogScreen from './logs';
import {getSensors,getLogs} from '../../../redux/actions/geyserAction';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
    user : state.auth.user,
    geyserModule : state.geyser.geyserModule,
    geyserLoading: state.geyser.geyserLoading,
    logs :state.geyser.logs,
    logsLoading :state.geyser.logsLoading
})

export default connect(mapStateToProps,{getSensors,getLogs})(LogScreen);