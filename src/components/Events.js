import React from 'react';
import _ from 'lodash';

const Events = (props) => {
    return _.map(props.events, (event, id) => {
        return (
            <div className="event" key={id}>
                {event.name}
            </div>
        );
    });
};

export default Events;
