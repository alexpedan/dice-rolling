import { APP_LEAD, APP_LISTENER, APP_SET_DICES } from './AppActions';
import { database } from '../constance';
import { nextFirebaseResult } from '../utils';

export default (store) => (next) => (action) => {
    next(action);
    const _nextFirebaseResult = nextFirebaseResult.bind(null, next, action);

    switch(action.type) {
        case APP_LEAD:
            return database.ref('app').update(action.payload);
        case APP_LISTENER:
            return database.ref('app').on('value', _nextFirebaseResult);
        case APP_SET_DICES:
            return database.ref('app').update(action.payload);
    }
};
