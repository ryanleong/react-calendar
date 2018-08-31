import { GET_EVENTS } from '../actions/types';

const initialState = {
    2018: {
        9: {
            15: {
                29384: {
                    name: 'My first event',
                    location: '20 albert street',
                    category: ''
                },
                25384: {
                    name: 'My 2nd event',
                    location: '20 albert street',
                    category: ''
                },
            }
        }
    }
};

export default (state = initialState, action) => {
    switch (action.type) {

    case GET_EVENTS:
        return { ...state, [action.payload.id]: action.payload };

    default:
        return state;
    }
};
