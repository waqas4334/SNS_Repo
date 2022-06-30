// @flow
import { compose, withState } from 'recompose';
import { connect } from 'react-redux';

import LiquidHomeView from './LiquidHomeView';

import {getLmsSensors, updateLmsSensors,setLmsThreshold, setLmsUpperThreshold} from '../../../redux/actions/lmsActions';

mapStateToProps = (state) => ({
    user: state.auth.user,
    lms: state.lms.lms,
    loading: state.lms.generalLoading
});

export default compose(
    connect(mapStateToProps, {getLmsSensors, updateLmsSensors,setLmsThreshold,setLmsUpperThreshold})
    )(LiquidHomeView);
