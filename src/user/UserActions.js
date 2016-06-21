export const USER_FETCH_ALL = "USER_FETCH_ALL";
export const USER_CREATE = "USER_CREATE";
export const USER_REMOVE = "USER_REMOVE";
export const USER_ROL = "USER_ROLE";
export const USER_SET_WINNER = "USER_SET_WINNER";

export const userFetchAll = () => ({
	type: USER_FETCH_ALL
});


export const userCreate = (username) => ({
    type: USER_CREATE,
    payload: {
        username,
        wins: 0,
        available: true
    }
});

export const userRemove = (userKey) => ({
    type: USER_REMOVE,
    payload: {
        userKey
    }
});

export const userRol = (userKey, rol) => ({
    type: USER_ROL,
    payload: {
        userKey,
        rol
    }
});

export const setWinner = (userKey, wins, winner) => ({
    type: USER_SET_WINNER,
    payload: {
        userKey,
        winner,
        wins
    }
});
