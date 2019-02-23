import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import {
    GET_DATA_SOURCE,
    GET_USER_DATA_SOURCES,
    SET_TEMPLATE_NAME,
    SET_TEMPLATE_DATA_SOURCE,
    SET_TEMPLATE_CHART_TYPE,
    SET_TEMPLATE_KEY_SELECTOR,
    SET_TEMPLATE_MAP_FUNCTION
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

const templateChartTypeReducer = (chartType = null, action) => {
    if(action.type === SET_TEMPLATE_CHART_TYPE){
        return action.payload;
    }

    return chartType;
}

const templateKeySelectorReducer = (keySelector = null, action) => {
    if(action.type === SET_TEMPLATE_KEY_SELECTOR){
        return action.payload;
    }

    return keySelector;
}

const templateMapFunctionReducer = (mapFunction = null, action) => {
    if(action.type === SET_TEMPLATE_MAP_FUNCTION){
        return action.payload;
    }

    return mapFunction;
}


export default combineReducers(
    {
        form: formReducer,
        currentDataSource: currentDataSourceReducer,
        userDataSources: userDataSourcesReducer,
        templateName: templateNameReducer,
        templateDataSource: templateDataSourceReducer,
        templateChartType: templateChartTypeReducer,
        templateKeySelector: templateKeySelectorReducer,
        templateMapFunction: templateMapFunctionReducer
    }
);