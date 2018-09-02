import _ from 'lodash';

import { ADD_EVENT, EDIT_EVENT } from '../actions/types';

const initialState = {
    currentEditEvent: {},
    allEvents: JSON.parse(localStorage.getItem('eventData')) || {}
};

const addNewEvent = (state, action) => {
    const newState = _.merge(state, action.payload);
    localStorage.setItem('eventData', JSON.stringify(newState.allEvents));
    return newState;
};

export default (state = initialState, action) => {
    switch (action.type) {

    case ADD_EVENT:
        return addNewEvent(state, action);

    case EDIT_EVENT:
        return {
            ...state,
            currentEditEvent: action.payload
        };

    default:
        return state;
    }
};
