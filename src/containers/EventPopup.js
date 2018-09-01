import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './EventPopup.css';
import { addEvent } from '../actions/eventsActions';

class EventPopup extends Component {

    constructor(props) {
        super(props);

        this.state = {
            eventName: '',
            date: '',
            location: ''
        };

        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleOnChange(evt) {
        this.setState({
            [evt.target.id]: evt.target.value
        });
    }

    handleFormSubmit(evt) {
        evt.preventDefault();

        // Check if fields are filled
        if (this.state.eventName === '' || this.state.eventName === undefined ||
            this.state.date === '' || this.state.date === undefined ||
            this.state.location === '' || this.state.location === undefined
        ) { return; }

        this.props.addEvent(this.state);

        this.setState({
            eventName: '',
            date: '',
            location: ''
        });

        this.props.closeFormFunc();
    }

    render() {
        const openClass = this.props.formIsOpen ? 'open' : '';

        return (
            <div id="EventPopup" className={openClass}>

                <div className="close" onClick={this.props.closeFormFunc}>x</div>

                <div className="eventpopup-wrapper">


                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <h2>Add Event</h2>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <form onSubmit={this.handleFormSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="eventName">Event Name</label>
                                        <input type="text" className="form-control" id="eventName" value={this.state.eventName} onChange={this.handleOnChange} />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="date">Date</label>
                                        <input type="date" className="form-control" id="date" value={this.state.date} onChange={this.handleOnChange} />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="location">Location</label>
                                        <input type="text" className="form-control" id="location" value={this.state.location} onChange={this.handleOnChange} />
                                    </div>

                                    <button type="submit" className="btn btn-primary">Submit</button>

                                    <a className="btn btn-danger">Delete</a>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

EventPopup.propTypes = {
    formIsOpen: PropTypes.bool,
    closeFormFunc: PropTypes.func,
    addEvent: PropTypes.func,
};

export default connect(null, { addEvent })(EventPopup);
