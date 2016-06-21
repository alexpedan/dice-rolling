export const APP_LEAD = "APP_LEAD";
export const APP_LISTENER = "APP_LISTENER";
export const APP_SET_DICES = "APP_SET_DICES";

export const appSetLead = (leadKey) => ({
    type: APP_LEAD,
    payload: {
        startDate: +new Date,
        leadKey
    }
});

export const appAddListener = () => ({
    type: APP_LISTENER
});

export const appSetDices = (dices) => ({
    type: APP_SET_DICES,
    payload: {
        dices
    }
});
