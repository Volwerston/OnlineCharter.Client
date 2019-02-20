import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';

import { GET_DATA_SOURCE, GET_USER_DATA_SOURCES } from '../constants/actionTypes'

const currentDataSourceReducer = (currentDataSource = null, action) => {
    if(action.type === GET_DATA_SOURCE){
        return action.payload;
    }

    return currentDataSource;
}

const userDataSourcesReducer = (userDataSources = [], action) => {
    if(action.type === GET_USER_DATA_SOURCES){
        return action.payload.dataSources;
    }

    return userDataSources;
}

export default combineReducers(
    {
        form: formReducer,
        currentDataSource: currentDataSourceReducer,
        userDataSources: userDataSourcesReducer
    }
);