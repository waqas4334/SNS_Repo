import HomeScreen from './overview';
import{connect} from 'react-redux';
import {getModule,getLogs} from '../../../redux/actions/securityAction';

const mapStateToProps = (state) => ({
    user : state.auth.user,
    module : state.security.module,
    moduleLoading :state.security.moduleLoading,
    logs: state.security.logs,
    logsLoading : state.security.logsLoading
})
export default  connect (mapStateToProps,{getModule,getLogs})(HomeScreen);