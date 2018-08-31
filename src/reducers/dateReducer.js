import { GO_TO_MONTH } from '../actions/types';

const initialState = {
    today: new Date(),
    monthView: new Date()
};

export default (state = initialState, action) => {
    switch (action.type) {

    case GO_TO_MONTH:
        return { ...state, monthView: action.payload };

    default:
        return state;
    }
};
