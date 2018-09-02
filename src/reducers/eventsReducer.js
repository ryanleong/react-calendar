import _ from 'lodash';

import { ADD_EVENT, EDIT_EVENT, DELETE_EVENT } from '../actions/types';

const initialState = JSON.parse(localStorage.getItem('eventData')) || {};

const addNewEvent = (state, action) => {
    const newState = _.merge(state, action.payload);
    localStorage.setItem('eventData', JSON.stringify(newState));
    return newState;
};

const deleteEvent = (state, event) => {
    const eventDate = event.date;

    try {
        const newState = { ...state };
        delete newState[eventDate.getFullYear()][eventDate.getMonth()+1][eventDate.getDate()][event.id];

        localStorage.setItem('eventData', JSON.stringify(newState));

        return newState;
    }
    catch(e) {
        return state;
    }
};

const editEvent = (state, payload) => {
    try {
        let newState = { ...state };

        const prevEventDate = payload.prevEvent.date;
        delete newState[prevEventDate.getFullYear()][prevEventDate.getMonth()+1][prevEventDate.getDate()][payload.eventId];

        newState = _.merge(newState, payload.changes);
        localStorage.setItem('eventData', JSON.stringify(newState));

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
        return editEvent(state, action.payload);
        // return state;

    default:
        return state;
    }
};
