// import { ADD_EVENT } from '../actions/types';

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

    // case ADD_EVENT:
    //     return (state.formIsOpen) ? { ...state, formIsOpen: false } : { ...state, formIsOpen: true };

    default:
        return state;
    }
};
