import { ALERT_SHOW, ALERT_HIDE } from 'actions/actionTypes';

export function alertShow (message) {
    return {
        type: ALERT_SHOW,
        payload: message
    };
}

export function alertHide () {
    return {
        type: ALERT_HIDE
    };
}
