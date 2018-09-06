import React from 'react';
import _ from 'lodash';

import './Events.css';

const Events = (props) => {
    return _.map(props.events, (event, id) => {
        return (
            <div className="event" key={id} data-id={id} onClick={() => props.eventOnClick(event, id, props.dateToday)}>
                {event.eventName}
            </div>
        );
    });
};

export default Events;
