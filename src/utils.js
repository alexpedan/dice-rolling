

export const successType = (type)  => {
	return type + "_SUCCESS";
};

export const errorType = (type) => {
	return type + "_ERROR";
};

export const createReducer = (initialState, handlers) => {
	return function reducer(state = initialState, action) {
		if (handlers.hasOwnProperty(action.type)) {
			return handlers[action.type](state, action)
		} else {
			return state
		}
	}
};

export const nextFirebaseResult = (next, action, snapshot) =>  {
    const { type, payload } = action;
    let response = snapshot.val();

    if (response && typeof response === 'object') {
        response.key = snapshot.key;
    }


    next({
        type: response ? successType(type) : errorType(type),
        payload: {
            ...payload,
            response
        }
    });
};
