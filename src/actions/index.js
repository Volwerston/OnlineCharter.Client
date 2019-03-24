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
    SET_TEMPLATE_DATA_SOURCE_FILTER_RIGHT_VALUE,
    SET_TEMPLATE_AGGREGATE_FUNCTION,
    CREATE_TEMPLATE,
    GET_TEMPLATE,
    REMOVE_TEMPLATE,
    CALCULATE_TEMPLATE,
    LOGIN,
    LOGOUT
} from '../constants/actionTypes'
import chartClient from '../api/charterClient'
import history from '../utils/history'
import charterClient from '../api/charterClient';

export const createDataSource = formValues => async (dispatch, getState) => {
    var state = getState();

    if(!state.auth.isAuthenticated){
        return;
    }
    
    var token = state.auth.user.token;

    var formData = new FormData();

    formData.append('name', formValues.name);
    formData.append('file', formValues.dataSource);

    var response = await chartClient.post(
        `/dataSource/create`, 
        formData,
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

    dispatch({ type: CREATE_DATA_SOURCE, payload: response.data });

    if(response.data.result){
        history.push(`/data-source/${response.data.result.id}/info`);
    }
}

export const getDataSource = id => async (dispatch, getState) => {
    var state = getState();

    if(!state.auth.isAuthenticated){
        return;
    }
    
    var token = state.auth.user.token;

    var response = await chartClient.get(
        `/dataSource/${id}`,
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

    dispatch({ type: GET_DATA_SOURCE, payload: response.data });
}

export const updateDataSource = (id, dataSourceName) => async (dispatch, getState) => {
    var state = getState();

    if(!state.auth.isAuthenticated){
        return;
    }
    
    var token = state.auth.user.token;

    var response = await chartClient.patch(`/dataSource/${id}/update`, 
    {
        name: dataSourceName
    },
    {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    dispatch({ type: UPDATE_DATA_SOURCE, payload: id });
}

export const removeDataSource = id => async (dispatch, getState) => {
    var state = getState();

    if(!state.auth.isAuthenticated){
        return;
    }
    
    var token = state.auth.user.token;

    await charterClient.delete(
        `/dataSource/${id}/remove`,
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

    history.push('/');

    dispatch({ type: REMOVE_DATA_SOURCE, payload: id });
}

export const getUserDataSources = () => async (dispatch, getState) => {
    var state = getState();

    if(!state.auth.isAuthenticated){
        return;
    }
    
    var token = state.auth.user.token;

    var response = await chartClient.get(
        `/dataSource/user/all`,
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

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
    if (!selectedDataSource) {
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

export const setTemplateAggregateFunction = aggregateFunction => {
    return {
        type: SET_TEMPLATE_AGGREGATE_FUNCTION,
        payload: aggregateFunction
    };
};

export const getTemplate = templateId => async (dispatch, getState) => {
    var state = getState();

    if(!state.auth.isAuthenticated){
        return;
    }
    
    var token = state.auth.user.token;

    var response = await chartClient.get(
        `/template/${templateId}`,
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

    dispatch({ type: GET_TEMPLATE, payload: response.data });
};

export const createTemplate = () => async (dispatch, getState) => {
    var state = getState();

    if(!state.auth.isAuthenticated){
        history.push('/');
    }
    
    var token = state.auth.user.token;

    var template = {
        name: state.templateName,
        dataSourceId: state.templateDataSource.id,
        templateChartType: state.templateChartType,
        templateKeySelector: state.templateKeySelector,
        templateMapFunction: state.templateMapFunction,
        dataSourceFilter: {
            leftValue: state.templateDataSourceFilterLeftValue,
            comparator: state.templateDataSourceFilterComparator,
            rightValue: state.templateDataSourceFilterRightValue
        },
        templateAggregateFunction: state.templateAggregateFunction
    };

    var response = await chartClient.post(
        '/template/create', 
        template, 
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

    dispatch({ type: CREATE_TEMPLATE, payload: response.data.id });

    history.push(`/template/${response.data.id}/info`);
};

export const removeTemplate = templateId => async (dispatch, getState) => {
    var state = getState();

    if(!state.auth.isAuthenticated){
        history.push('/');
    }
    
    var token = state.auth.user.token;

    var response = await chartClient.delete(
        `/template/${templateId}`,
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

    dispatch({ type: REMOVE_TEMPLATE, payload: templateId });

    history.push('/template/create');
};

export const calculateTemplate = templateId => async (dispatch, getState) => {
    var state = getState();

    if(!state.auth.isAuthenticated){
        history.push('/');
    }
    
    var token = state.auth.user.token;

    var response = await chartClient.get(
        `/template/${templateId}/calculate`,
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

    dispatch({ type: CALCULATE_TEMPLATE, payload: response.data });
};

export const login = loginPayload => dispatch => {
    dispatch({
        type: LOGIN,
        payload: loginPayload
    });
};

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT,
        payload: ''
    });

    history.push('/');
};

export const clearResults = () => dispatch => {
    dispatch({
        type: CREATE_DATA_SOURCE,
        payload: null
    });
};