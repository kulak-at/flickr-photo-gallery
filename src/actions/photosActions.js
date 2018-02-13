import { PHOTOS_GET } from 'actions/actionTypes';

export function photosGet (data) {
    return {
        type: PHOTOS_GET,
        payload: data
    };
}