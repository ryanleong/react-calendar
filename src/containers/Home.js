import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './Home.css';
import Dates from '../components/Dates';
import EventPopup from './EventPopup';

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            formIsOpen: false,
            dates: {
                today: new Date(),
                monthView: new Date()
            }
        };

        this.handleNext = this.handleNext.bind(this);
        this.handlePrev = this.handlePrev.bind(this);

        this.openAddEventForm = this.openAddEventForm.bind(this);
        this.closeAddEventForm = this.closeAddEventForm.bind(this);
    }

    handlePrev(evt) {
        const today = this.state.dates.monthView;
        this.setState({
            dates: {
                ...this.state.dates,
                monthView: new Date(today.getFullYear(), today.getMonth() - 1, 1)
            }
        });
    }

    handleNext(evt) {
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
            formIsOpen: false
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
                        <Dates currentDate={this.state.dates.monthView} events={this.props.events} />
                    </div>
                </div>

                <EventPopup formIsOpen={this.state.formIsOpen} closeFormFunc={this.closeAddEventForm} />
            </React.Fragment>
        );
    }
}

Home.propTypes = {
    events: PropTypes.object,
};

const mapStateToProps = state => ({
    events: state.events
});

export default connect(mapStateToProps, { })(Home);
