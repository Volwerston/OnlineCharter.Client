import { CREATE_DATA_SOURCE } from '../constants/actionTypes'

export function createDataSource(formValues){
    return {
        action: CREATE_DATA_SOURCE,
        payload: {
            name: formValues.name,
            file: formValues.file
        }
    };
}