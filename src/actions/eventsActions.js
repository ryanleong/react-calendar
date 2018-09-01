import { ADD_EVENT } from './types';

export const openAddEventPopup = () => dispatch => {

    dispatch({
        type: ADD_EVENT,
        payload: ''
    });

};