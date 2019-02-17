import { CREATE_DATA_SOURCE } from '../constants/actionTypes'
import chartClient from '../api/charterClient'

export const createDataSource = formValues => async dispatch => {
    console.log(formValues);

    var formData = new FormData();

    formData.append('name', formValues.name);
    formData.append('file', formValues.dataSource);

    var response = await chartClient.post('/dataSource/create', formData);

    console.log("Data source ID: " + response.data.id);

    dispatch({ type: CREATE_DATA_SOURCE, payload: {} });
}
