import { combineReducers } from 'redux';

import photosReducer from './photosReducer';
import alertReducer from './alertReducer';

export default combineReducers({
    photos: photosReducer,
    alert: alertReducer
});
