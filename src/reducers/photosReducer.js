import { PHOTOS_GET, PHOTO_GET_DETAILS, PHOTOS_CLEAR } from 'actions/actionTypes';

const defaultState = {
    list: []
};

export default function photosReducer (state = defaultState, action) {
    console.log(action.payload);
    switch (action.type) {
    case PHOTOS_GET:
        state = {...state, list: action.payload};
        break;
    
    case PHOTO_GET_DETAILS:
        state = {
            ...state,
            list: state.list.map((
                (item) => item.id === action.payload.id ? {...item, details: action.payload} : item
            ))
        };
        break;
    
    case PHOTOS_CLEAR:
        state = {...state, list: []};
        break;

    default:
        break;
    }

    return state;
}