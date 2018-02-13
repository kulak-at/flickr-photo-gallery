import { ALERT_SHOW, ALERT_HIDE } from 'actions/actionTypes';

const defaultState = {
    message: ''
};

export default function alertReducer (state = defaultState, action) {
    switch (action.type) {
    case ALERT_SHOW:
        state = {...state, message: action.payload};
        break;

    case ALERT_HIDE:
        state = {...state, message: ''};
        break;

    default:
        break;
    }

    return state;
}