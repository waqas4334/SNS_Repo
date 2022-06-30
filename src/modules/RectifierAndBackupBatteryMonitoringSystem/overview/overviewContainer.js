import HomeScreen from './overview';
import {getModule} from '../../../redux/actions/rectifierAction';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
    user : state.auth.user,
    module : state.rectifier.module,
    moduleLoading: state.rectifier.moduleLoading
})
export default  connect (mapStateToProps,{getModule})(HomeScreen);