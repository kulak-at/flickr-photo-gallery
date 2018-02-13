import { PHOTOS_GET } from 'actions/actionTypes';

const defaultState = {
    list: []
};

export default function photosReducer (state = defaultState, action) {
    switch (action.type) {
    case PHOTOS_GET:
        state = {...state, list: action.payload};
        break;

    default:
        break;
    }

    return state;
}