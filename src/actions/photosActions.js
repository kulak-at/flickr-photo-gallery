import { PHOTOS_GET, PHOTO_GET_DETAILS, PHOTOS_CLEAR } from 'actions/actionTypes';

export function photosGet (data) {
    return {
        type: PHOTOS_GET,
        payload: data
    };
}

export function photoGetDetails (data) {
    return {
        type: PHOTO_GET_DETAILS,
        payload: data
    };
}

export function photosClear () {
    return {
        type: PHOTOS_CLEAR
    };
}