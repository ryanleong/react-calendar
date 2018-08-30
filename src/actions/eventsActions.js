import { GET_EVENTS } from './types';

export const getEvents = date => dispatch => {

    dispatch({
        type: GET_EVENTS,
        payload: 'data'
    });

};