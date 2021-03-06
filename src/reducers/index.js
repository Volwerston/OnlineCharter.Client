import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import {
    GET_DATA_SOURCE,
    GET_USER_DATA_SOURCES,
    SET_TEMPLATE_NAME,
    SET_TEMPLATE_DATA_SOURCE,
    SET_TEMPLATE_CHART_TYPE,
    SET_TEMPLATE_KEY_SELECTOR,
    SET_TEMPLATE_MAP_FUNCTION,
    SET_TEMPLATE_DATA_SOURCE_FILTER_LEFT_VALUE,
    SET_TEMPLATE_DATA_SOURCE_FILTER_COMPARATOR,
    SET_TEMPLATE_DATA_SOURCE_FILTER_RIGHT_VALUE,
    SET_TEMPLATE_AGGREGATE_FUNCTION,
    GET_TEMPLATE,
    CALCULATE_TEMPLATE,
    LOGIN,
    LOGOUT,
    CREATE_DATA_SOURCE,
    CREATE_TEMPLATE,
    UPDATE_DATA_SOURCE,
    REMOVE_DATA_SOURCE,
    REMOVE_TEMPLATE,
    GET_USER_TEMPLATES,
    GET_DATA_SOURCE_UPLOAD_PROCESS
} from '../constants/actionTypes'

const currentDataSourceReducer = (currentDataSource = null, action) => {
    if (action.type === GET_DATA_SOURCE) {
        return action.payload;
    }

    return currentDataSource;
}

const dataSourceUploadProcessReducer = (uploadProcess = null, action) => {
    if(action.type === GET_DATA_SOURCE_UPLOAD_PROCESS){
        return action.payload;
    }

    return uploadProcess;
}

const userDataSourcesReducer = (userDataSources = null, action) => {
    if (action.type === GET_USER_DATA_SOURCES) {
        return action.payload;
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

const templateChartTypeReducer = (chartType = "pie", action) => {
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

const templateDataSourceFilterLeftValueReducer = (leftValue = null, action) => {
    if(action.type === SET_TEMPLATE_DATA_SOURCE_FILTER_LEFT_VALUE){
        return action.payload;
    }

    return leftValue;
}

const templateDataSourceFilterComparatorReducer = (comparator = "=", action) => {
    if(action.type === SET_TEMPLATE_DATA_SOURCE_FILTER_COMPARATOR){
        return action.payload;
    }

    return comparator;
}

const templateDataSourceFilterRightValueReducer = (rightValue = null, action) => {
    if(action.type === SET_TEMPLATE_DATA_SOURCE_FILTER_RIGHT_VALUE){
        return action.payload;
    }

    return rightValue;
}

const templateAggregateFunctionReducer = (aggregateFunction = "percent", action) => {
    if(action.type === SET_TEMPLATE_AGGREGATE_FUNCTION){
        return action.payload;
    }

    return aggregateFunction;
}

const currentTemplateReducer = (currentTemplate = null, action) => {
    if(action.type === GET_TEMPLATE){
        return action.payload;
    }

    return currentTemplate;
}

const templateCalculationResultReducer = (calculationResult = null, action) => {
    if(action.type === CALCULATE_TEMPLATE){
        return action.payload;
    }

    return calculationResult;
}

const authReducer = (state = {
    user: '',
    isAuthenticated: false
}, action) => {
    switch (action.type) {
        case LOGIN:
            state = { ...state, user: action.payload, isAuthenticated: true };
            break;
        case LOGOUT:
            state = { ...state, user: { token: '', id: '', name: ''}, isAuthenticated: false };
            break;
        default:
            break;
    };
    return state;
};

const createDataSourceResultReducer = (result = null, action) => {
    if(action.type === CREATE_DATA_SOURCE){
        return action.payload;
    }

    return result;
};

const createTemplateResultReducer = (result = null, action) => {
    if(action.type === CREATE_TEMPLATE){
        return action.payload;
    }

    return result;
};

const updateDataSourceResultReducer = (result = null, action) => {
    if(action.type === UPDATE_DATA_SOURCE){
        return action.payload;
    }

    return result;
};

const removeDataSourceResultReducer = (result = null, action) => {
    if(action.type === REMOVE_DATA_SOURCE){
        return action.payload;
    }

    return result;
};

const removeTemplateResultReducer = (result = null, action) => {
    if(action.type === REMOVE_TEMPLATE){
        return action.payload;
    }

    return result;
};

const getUserTemplatesResultReducer = (result=null, action) => {
    if(action.type === GET_USER_TEMPLATES){
        return action.payload;
    }

    return result;
};

export default combineReducers(
    {
        form: formReducer,
        currentDataSource: currentDataSourceReducer,
        userDataSources: userDataSourcesReducer,
        templateName: templateNameReducer,
        templateDataSource: templateDataSourceReducer,
        templateChartType: templateChartTypeReducer,
        templateKeySelector: templateKeySelectorReducer,
        templateMapFunction: templateMapFunctionReducer,
        templateDataSourceFilterLeftValue: templateDataSourceFilterLeftValueReducer,
        templateDataSourceFilterComparator: templateDataSourceFilterComparatorReducer,
        templateDataSourceFilterRightValue: templateDataSourceFilterRightValueReducer,
        templateAggregateFunction: templateAggregateFunctionReducer,
        currentTemplate: currentTemplateReducer,
        templateCalculationResult: templateCalculationResultReducer,
        auth: authReducer,
        createDataSourceResult: createDataSourceResultReducer,
        createTemplateResult: createTemplateResultReducer,
        updateDataSourceResult: updateDataSourceResultReducer,
        removeDataSourceResult: removeDataSourceResultReducer,
        removeTemplateResult: removeTemplateResultReducer,
        getUserTemplatesResult: getUserTemplatesResultReducer,
        dataSourceUploadProcessResult: dataSourceUploadProcessReducer
    }
);