import { ADD_EVENT, EDIT_EVENT } from './types';

export const addEvent = formData => dispatch => {
    dispatch({
        type: ADD_EVENT,
        payload: formData
    });
};

export const editEvent = data => dispatch => {
    dispatch({
        type: EDIT_EVENT,
        payload: data
    });
};