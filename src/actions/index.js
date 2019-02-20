import {
    CREATE_DATA_SOURCE,
    GET_DATA_SOURCE,
    UPDATE_DATA_SOURCE,
    REMOVE_DATA_SOURCE,
    GET_USER_DATA_SOURCES
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