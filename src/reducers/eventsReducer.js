import _ from 'lodash';

import { ADD_EVENT, EDIT_EVENT } from '../actions/types';

const initialState = {
    currentEditEvent: {},
    allEvents: JSON.parse(localStorage.getItem('eventData')) || {}
};

const updateWithNewEvent = (state, action) => {
    const formData = action.payload;
    if (formData === undefined || formData.date === '') return state;

    const randomNumber = Math.floor(Math.random()*90000) + 10000;
    const date = new Date(formData.date);

    const newState = _.merge(state, {
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
    });

    localStorage.setItem('eventData', JSON.stringify(newState.allEvents));

    return newState;
};

export default (state = initialState, action) => {
    switch (action.type) {

    case ADD_EVENT:
        return updateWithNewEvent(state, action);

    case EDIT_EVENT:
        return {
            ...state,
            currentEditEvent: action.payload
        };

    default:
        return state;
    }
};
