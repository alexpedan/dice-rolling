import { USER_FETCH_ALL, USER_CREATE, USER_ROL, USER_REMOVE, USER_SET_WINNER } from './UserActions';
import { nextFirebaseResult, successType } from '../utils';
import { database } from '../constance';

export default (store) => (next) => (action) => {
    const _nextFirebaseResult = nextFirebaseResult.bind(null, next, action);
    next(action);

    switch (action.type) {
        case USER_FETCH_ALL:
            return database.ref('users').on('value', _nextFirebaseResult);

        case USER_CREATE:
            const newRecord = database.ref('users').push();
            return newRecord.set(action.payload).then(() => {
                next({
                    payload: {
                        ...action.payload,
                        key: newRecord.key
                    },
                    type: successType(action.type)
                })
            });

        case USER_ROL:
            return database.ref(`/users/${action.payload.userKey}`).update({
                rol: action.payload.rol
            });
        case USER_REMOVE:
            return database.ref(`/users/${action.payload.userKey}`).remove();
        case USER_SET_WINNER:
            database.ref('app').update({ winner: action.payload.winner });
            return database.ref(`/users/${action.payload.userKey}`).update({
                wins: action.payload.wins
            })
    }
}
