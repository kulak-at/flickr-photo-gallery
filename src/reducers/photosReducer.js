const defaultState = {
    photos: []
};

export default function photosReducer (state = defaultState, action) {
    switch (action.type) {
    case 'PHOTOS_SHOW':
        state = {...state};
        break;

    default:
        break;
    }

    return state;
}