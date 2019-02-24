import {
    CREATE_DATA_SOURCE,
    GET_DATA_SOURCE,
    UPDATE_DATA_SOURCE,
    REMOVE_DATA_SOURCE,
    GET_USER_DATA_SOURCES,
    SET_TEMPLATE_NAME,
    SET_TEMPLATE_DATA_SOURCE,
    SET_TEMPLATE_CHART_TYPE,
    SET_TEMPLATE_KEY_SELECTOR,
    SET_TEMPLATE_MAP_FUNCTION,
    SET_TEMPLATE_DATA_SOURCE_FILTER_LEFT_VALUE,
    SET_TEMPLATE_DATA_SOURCE_FILTER_COMPARATOR,
    SET_TEMPLATE_DATA_SOURCE_FILTER_RIGHT_VALUE
} from '../constants/actionTypes'
import chartClient from '../api/charterClient'
import history from '../utils/history'
import charterClient from '../api/charterClient';

export const createDataSource = formValues => async dispatch => {
    var formData = new FormData();

    formData.append('name', formValues.name);
    formData.append('file', formValues.dataSource);

    var response = await chartClient.post('/dataSource/create', formData);

    dispatch({ type: CREATE_DATA_SOURCE, payload: response.data.id });

    history.push(`/dataSource/${response.data.id}`);
}

export const getDataSource = id => async dispatch => {
    var response = await chartClient.get(`/dataSource/${id}`);

    dispatch({ type: GET_DATA_SOURCE, payload: response.data });
}

export const updateDataSource = (id, dataSourceName) => async dispatch => {
    var response = await chartClient.patch(`/dataSource/${id}/update`, {
        name: dataSourceName
    });

    dispatch({ type: UPDATE_DATA_SOURCE, payload: id });
}

export const removeDataSource = id => async dispatch => {
    var response = await charterClient.delete(`/dataSource/${id}/remove`);

    history.push('/');

    dispatch({ type: REMOVE_DATA_SOURCE, payload: id });
}

export const getUserDataSources = userId => async dispatch => {
    var response = await chartClient.get(`/dataSource/user/${userId}/all`);

    dispatch({ type: GET_USER_DATA_SOURCES, payload: response.data });
}

export const setTemplateName = templateName => {
    return {
        type: SET_TEMPLATE_NAME,
        payload: templateName
    };
}

export const setTemplateDataSource = dataSourceId => (dispatch, getState) => {
    var dataSources = getState().userDataSources;
    console.log("Data sources: " + dataSources);

    var selectedDataSource = dataSources.filter(ds => ds.id === dataSourceId)[0];
    if(!selectedDataSource){
        selectedDataSource = null;
    }

    dispatch({ type: SET_TEMPLATE_DATA_SOURCE, payload: selectedDataSource });
}

export const setTemplateChartType = chartType => {
    return {
        type: SET_TEMPLATE_CHART_TYPE,
        payload: chartType
    };
}

export const setTemplateKeySelector = keySelector => {
    return {
        type: SET_TEMPLATE_KEY_SELECTOR,
        payload: keySelector
    };
}

export const setTemplateMapFunction = mapFunction => {
    return {
        type: SET_TEMPLATE_MAP_FUNCTION,
        payload: mapFunction
    };
}

export const setTemplateDataSourceFilterLeftValue = leftValue => {
    return {
        type: SET_TEMPLATE_DATA_SOURCE_FILTER_LEFT_VALUE,
        payload: leftValue
    };
}

export const setTemplateDataSourceFilterComparator = comparator => {
    return {
        type: SET_TEMPLATE_DATA_SOURCE_FILTER_COMPARATOR,
        payload: comparator
    };
}

export const setTemplateDataSourceFilterRightValue = rightValue => {
    return {
        type: SET_TEMPLATE_DATA_SOURCE_FILTER_RIGHT_VALUE,
        payload: rightValue
    };
}