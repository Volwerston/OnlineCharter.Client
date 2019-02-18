import {
    CREATE_DATA_SOURCE,
    GET_DATA_SOURCE,
    UPDATE_DATA_SOURCE
} from '../constants/actionTypes'
import chartClient from '../api/charterClient'
import history from '../utils/history'

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
        console.log("DATA SOURCE NAME: " + dataSourceName);

        var response = await chartClient.patch(`/dataSource/${id}/update`, {
            name: dataSourceName
        });

        dispatch({ type: UPDATE_DATA_SOURCE, payload: id });
}
