import { APP_LEAD, APP_LISTENER } from './AppActions';

import { createReducer, successType } from '../utils';
import Immutable from 'immutable';

const appInitialState = Immutable.fromJS({
    leadKey: undefined
});

export default createReducer(appInitialState, {
    [successType(APP_LEAD)]: (state, action) => {
        return state.set('leadKey', action.payload.key)
    },
    [successType(APP_LISTENER)]: (state, action) => {
        return state.merge(action.payload.response);
    }
});
