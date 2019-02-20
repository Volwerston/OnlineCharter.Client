import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import {
    GET_DATA_SOURCE,
    GET_USER_DATA_SOURCES,
    SET_TEMPLATE_NAME,
    SET_TEMPLATE_DATA_SOURCE
} from '../constants/actionTypes'

const currentDataSourceReducer = (currentDataSource = null, action) => {
    if (action.type === GET_DATA_SOURCE) {
        return action.payload;
    }

    return currentDataSource;
}

const userDataSourcesReducer = (userDataSources = [], action) => {
    if (action.type === GET_USER_DATA_SOURCES) {
        return action.payload.dataSources;
    }

    return userDataSources;
}

const templateNameReducer = (templateName = null, action) => {
    if (action.type === SET_TEMPLATE_NAME) {
        return action.payload;
    }

    return templateName;
}

const templateDataSourceReducer = (templateDataSource = null, action) => {
    if (action.type === SET_TEMPLATE_DATA_SOURCE) {
        return action.payload;
    }

    return templateDataSource;
}

export default combineReducers(
    {
        form: formReducer,
        currentDataSource: currentDataSourceReducer,
        userDataSources: userDataSourcesReducer,
        templateName: templateNameReducer,
        templateDataSource: templateDataSourceReducer
    }
);