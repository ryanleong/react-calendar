import React from 'react';

import './Dates.css';
import Events from './Events';

const Dates = (props) => {
    const dates = getListofDays(props.currentDate);


    return dates.map(date => {
        let todaysEvents;

        try {
            todaysEvents = props.events[date.getFullYear()][date.getMonth() + 1][date.getDate()];
        }
        catch(e) {
            // console.log('TCL: catch -> e', e);
        }

        return (
            <div className="date" key={date.toString()}>
                <div className="dateNum">
                    {date.getDate()}
                </div>

                <div className="events">
                    <Events events={todaysEvents} />
                </div>
            </div>
        );
    });
};

const getListofDays = (currentDate) => {
    const dayList = [];
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDay();

    let offset = (firstDayOfMonth > 1) ? (firstDayOfMonth - 1) : 0;
    const start = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1 - (offset));
    offset = (lastDayOfMonth !== 0) ? (7 - lastDayOfMonth) : 0;
    const end = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0 + (offset));

    let current = new Date(start);

    dayList.push(start);
    current = new Date(start);

    while(current < end) {
        dayList.push(current);
        current = new Date(current.setDate(current.getDate() + 1));
    }

    return dayList;
};

export default Dates;
