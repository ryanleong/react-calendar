import { GET_EVENTS } from '../actions/types';

const initialState = {};

export default (state = initialState, action) => {
    switch (action.type) {

    case GET_EVENTS:
        return { ...state, [action.payload.id]: action.payload };

    default:
        return state;
    }
};
