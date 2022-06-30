// @flow
import { compose, withState } from 'recompose';
import { connect } from 'react-redux';

import WaterQualityHomeView from './WaterQualityHomeView';
import {getLmsSensors, updateLmsSensors,setLmsThreshold, setLmsUpperThreshold} from '../../../redux/actions/lmsActions';

mapStateToProps = (state) => ({
    user: state.auth.user,
    lms: state.lms.lms
});

export default compose(
    connect(mapStateToProps, {getLmsSensors, updateLmsSensors,setLmsThreshold,setLmsUpperThreshold})
    )(WaterQualityHomeView);
