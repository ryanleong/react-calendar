import { ADD_EVENT, EDIT_EVENT, DELETE_EVENT } from './types';

export const addEvent = formData => dispatch => {
    const randomNumber = Math.floor(Math.random()*90000) + 10000;
    const date = new Date(formData.date);

    const data =  {
        allEvents: {
            [date.getFullYear()]: {
                [date.getMonth()+1]: {
                    [date.getDate()]: {
                        [randomNumber]: {
                            eventName: formData.eventName,
                            location: formData.location,
                            category: ''
                        }
                    }
                }
            }
        }
    };

    dispatch({
        type: ADD_EVENT,
        payload: data
    });
};

export const deleteEvent = event => dispatch => {
    dispatch({
        type: DELETE_EVENT,
        payload: event
    });
};


export const editEvent = data => dispatch => {
    dispatch({
        type: EDIT_EVENT,
        payload: data
    });
};