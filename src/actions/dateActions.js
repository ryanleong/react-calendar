import { GO_TO_MONTH } from './types';

export const goToMonthView = date => dispatch => {
    dispatch({
        type: GO_TO_MONTH,
        payload: date
    });
};