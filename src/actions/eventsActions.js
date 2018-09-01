import { ADD_EVENT } from './types';

export const addEvent = formData => dispatch => {
    dispatch({
        type: ADD_EVENT,
        payload: formData
    });
};