import _ from 'lodash';

import { ADD_EVENT, EDIT_EVENT, DELETE_EVENT } from '../actions/types';

const initialState = {
    currentEditEvent: {},
    allEvents: JSON.parse(localStorage.getItem('eventData')) || {}
};

const addNewEvent = (state, action) => {
    const newState = _.merge(state, action.payload);
    localStorage.setItem('eventData', JSON.stringify(newState.allEvents));
    return newState;
};

const deleteEvent = (state, event) => {
    const eventDate = event.date;

    try {
        const newState = { ...state };
        delete newState['allEvents'][eventDate.getFullYear()][eventDate.getMonth()+1][eventDate.getDate()][event.id];

        localStorage.setItem('eventData', JSON.stringify(newState.allEvents));

        return newState;
    }
    catch(e) {
        return state;
    }
};

export default (state = initialState, action) => {
    switch (action.type) {

    case ADD_EVENT:
        return addNewEvent(state, action);

    case DELETE_EVENT:
        return deleteEvent(state, action.payload);

    case EDIT_EVENT:
        return {
            ...state,
            currentEditEvent: action.payload
        };

    default:
        return state;
    }
};
