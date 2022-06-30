import GeyserHomeScreen from './homeView';
import { connect } from 'react-redux';
import { getSensors, GeyserStatus } from '../../../redux/actions/geyserAction';

const mapStateToProps = state => ({
  user: state.auth.user,
  geyserModule: state.geyser.geyserModule,
  geyserLoading: state.geyser.geyserLoading,
  AllRoutineLoading: state.geyser.AllRoutineLoading,
  addRoutineLoading: state.geyser.addRoutineLoading
});

export default connect(mapStateToProps, { getSensors, GeyserStatus })(
  GeyserHomeScreen,
);
