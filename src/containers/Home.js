import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { goToMonthView } from '../actions/dateActions';

import './Home.css';
import Dates from '../components/Dates';

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            events: {
                1535730874055: {
                    name: 'My first event',
                    location: '20 albert street',
                    category: ''
                }
            },
        };

        this.handleNext = this.handleNext.bind(this);
        this.handlePrev = this.handlePrev.bind(this);
    }

    handlePrev(evt) {
        const today = this.props.date.monthView;
        this.props.goToMonthView(new Date(today.getFullYear(), today.getMonth() - 1, 1));
    }

    handleNext(evt) {
        const today = this.props.date.monthView;
        this.props.goToMonthView(new Date(today.getFullYear(), today.getMonth() + 1, 1));
    }

    render() {
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        return (
            <React.Fragment>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-10">
                            <h1 className="month">{monthNames[this.props.date.monthView.getMonth()]}</h1>
                        </div>

                        <div className="col-2">
                            <div className="month-change">
                                <div className="prev" onClick={this.handlePrev}>{'<'}</div>
                                <div className="next" onClick={this.handleNext}>{'>'}</div>
                            </div>
                        </div>
                    </div>

                    <div className="dates">
                        <Dates currentDate={this.props.date.monthView} events={this.props.events} />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

Home.propTypes = {
    goToMonthView: PropTypes.func,
    date: PropTypes.object,
    events: PropTypes.object,
};

const mapStateToProps = state => ({
    date: state.date,
    events: state.events
});

export default connect(mapStateToProps, { goToMonthView })(Home);
