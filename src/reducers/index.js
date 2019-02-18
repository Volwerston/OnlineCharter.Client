import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';

import { GET_DATA_SOURCE } from '../constants/actionTypes'

const currentDataSourceReducer = (currentDataSource = null, action) => {
    if(action.type === GET_DATA_SOURCE){
        return action.payload;
    }

    return currentDataSource;
}

export default combineReducers(
    {
        form: formReducer,
        currentDataSource: currentDataSourceReducer
    }
);