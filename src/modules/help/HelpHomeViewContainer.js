// @flow
import { compose, withState } from 'recompose';
import { connect } from 'react-redux';

import HelpHomeView from './HelpHomeView';

export default compose(
    connect(null, null)
    )(HelpHomeView);
