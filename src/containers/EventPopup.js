import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';

import './EventPopup.css';
import { addEvent, deleteEvent, editEvent } from '../actions/eventsActions';

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
        this.handleCloseForm = this.handleCloseForm.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    static getDerivedStateFromProps(props, state) {

        if (!_.isEmpty(props.currentEditEvent)) {
            if (state.eventName === '' &&
                state.date === '' &&
                state.location === '') {

                return {
                    ...state,
                    eventName: props.currentEditEvent.event.eventName,
                    date: moment(props.currentEditEvent.date).format('YYYY-MM-DD'),
                    location: props.currentEditEvent.event.location
                };
            }
        }

        return state;
    }

    handleOnChange(evt) {
        this.setState(_.merge(this.state, {
            [evt.target.id]: evt.target.value
        }));
    }

    handleFormSubmit(evt) {
        evt.preventDefault();

        // Check if fields are filled
        if (this.state.eventName === '' || this.state.eventName === undefined ||
            this.state.date === '' || this.state.date === undefined ||
            this.state.location === '' || this.state.location === undefined
        ) { return; }

        if (this.props.isEditMode) {
            this.props.editEvent(this.state, this.props.currentEditEvent);
        }
        else {
            this.props.addEvent(this.state);
        }


        this.setState({
            eventName: '',
            date: '',
            location: ''
        });

        this.props.closeFormFunc();
    }

    handleCloseForm() {
        this.setState({
            eventName: '',
            date: '',
            location: ''
        });

        this.props.closeFormFunc();
    }

    handleDelete() {
        this.props.deleteEvent(this.props.currentEditEvent);

        this.props.closeFormFunc();
    }

    render() {
        const openClass = this.props.formIsOpen ? 'open' : '';
        const deletebtn = this.props.isEditMode ? (<a className="btn btn-danger" onClick={this.handleDelete}>Delete</a>) : '';

        return (
            <div id="EventPopup" className={openClass}>

                <div className="close" onClick={this.handleCloseForm}>x</div>

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

                                    {deletebtn}
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
    isEditMode: PropTypes.bool,
    closeFormFunc: PropTypes.func,
    addEvent: PropTypes.func,
    deleteEvent: PropTypes.func,
    editEvent: PropTypes.func,
    currentEditEvent: PropTypes.object
};

export default connect(null, { addEvent, deleteEvent, editEvent })(EventPopup);
