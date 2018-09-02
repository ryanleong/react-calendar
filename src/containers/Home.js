import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './Home.css';
import { editEvent } from '../actions/eventsActions';

import Dates from '../components/Dates';
import EventPopup from './EventPopup';

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            formIsOpen: false,
            isEditMode: false,
            dates: {
                today: new Date(),
                monthView: new Date()
            },
            currentEditEvent: {}
        };

        this.handleNext = this.handleNext.bind(this);
        this.handlePrev = this.handlePrev.bind(this);

        this.openAddEventForm = this.openAddEventForm.bind(this);
        this.closeAddEventForm = this.closeAddEventForm.bind(this);
        this.handleEventEdit = this.handleEventEdit.bind(this);
    }

    handlePrev() {
        const today = this.state.dates.monthView;
        this.setState({
            dates: {
                ...this.state.dates,
                monthView: new Date(today.getFullYear(), today.getMonth() - 1, 1)
            }
        });
    }

    handleNext() {
        const today = this.state.dates.monthView;
        this.setState({
            dates: {
                ...this.state.dates,
                monthView: new Date(today.getFullYear(), today.getMonth() + 1, 1)
            }
        });
    }

    openAddEventForm() {
        (this.state.formIsOpen) ? this.setState({ formIsOpen: false }) : this.setState({ formIsOpen: true });
    }

    closeAddEventForm() {
        this.setState({
            formIsOpen: false,
            isEditMode: false,
            currentEditEvent: {}
        });
    }

    handleEventEdit(event, id, date) {
        this.setState({
            formIsOpen: true,
            isEditMode: true,
            currentEditEvent: {
                event: event,
                id: id,
                date: date
            }
        });
    }

    render() {
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        return (
            <React.Fragment>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-10">
                            <h1 className="month">{monthNames[this.state.dates.monthView.getMonth()]}</h1>
                        </div>

                        <div className="col-2">
                            <div className="month-change">
                                <div className="prev" onClick={this.handlePrev}>{'<'}</div>
                                <div className="next" onClick={this.handleNext}>{'>'}</div>
                            </div>

                            <div id="addEvent" onClick={this.openAddEventForm}>+</div>
                        </div>
                    </div>

                    <div className="dates">
                        <Dates currentDate={this.state.dates.monthView} events={this.props.events.allEvents} eventOnClick={this.handleEventEdit} />
                    </div>
                </div>

                <EventPopup formIsOpen={this.state.formIsOpen} isEditMode={this.state.isEditMode} closeFormFunc={this.closeAddEventForm} currentEditEvent={this.state.currentEditEvent} />
            </React.Fragment>
        );
    }
}

Home.propTypes = {
    events: PropTypes.object,
    editEvent: PropTypes.func,
};

const mapStateToProps = state => ({
    events: state.events
});

export default connect(mapStateToProps, { editEvent })(Home);
