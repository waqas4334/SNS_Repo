// @flow
import { compose, withState } from 'recompose';
import { connect } from 'react-redux';

import CNCHomeView from './CNCHomeView';

export default compose(
    connect(null, null)
    )(CNCHomeView);
