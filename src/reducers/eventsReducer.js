import _ from 'lodash';

import { ADD_EVENT } from '../actions/types';

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

const updateWithNewEvent = (state, action) => {
    const formData = action.payload;
    if (formData === undefined || formData.date === '') return state;

    const randomNumber = Math.floor(Math.random()*90000) + 10000;
    const date = new Date(formData.date);

    return _.merge(state, {
        [date.getFullYear()]: {
            [date.getMonth()+1]: {
                [date.getDate()]: {
                    [randomNumber]: {
                        name: formData.eventName,
                        location: formData.location,
                        category: ''
                    }
                }
            }
        }
    });
};

export default (state = initialState, action) => {
    switch (action.type) {

    case ADD_EVENT:
        return updateWithNewEvent(state, action);

    default:
        return state;
    }
};
