import { USER_FETCH_ALL, USER_CREATE, USER_REMOVE } from './UserActions';

import { createReducer, successType } from '../utils';
import Immutable from 'immutable';

const userInitialState = Immutable.fromJS({
    record: JSON.parse(localStorage.getItem('user')) || {},
    list: []
});

export default createReducer(userInitialState, {
    [successType(USER_FETCH_ALL)](store, action) {
        let { response } = action.payload;
        delete response.key;
        const data = Object.keys(response).map((key, index) =>
            Object.assign({key}, response[key])
        );

        return store.set('list', Immutable.fromJS(data));
    },

    [successType(USER_CREATE)](store, action) {
        localStorage.setItem('user', JSON.stringify(action.payload));

        return store.set('record', Immutable.fromJS(action.payload));
    },

    [USER_REMOVE]: (store) => {
        localStorage.removeItem('user');
        return store;
    }
})
