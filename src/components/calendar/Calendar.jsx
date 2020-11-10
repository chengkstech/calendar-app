import React, { Component } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import holidays from '../../data/holidays.json';
import Todo from '../todolist/Todo'
import activeStartDate from 'react-calendar';
import './Calendar.scss';

class CalendarApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            holiday: holidays,
            activeStartDate: activeStartDate,
            showToDo: true,
            arrayofDates: [],
            dateClicked: new Date()
        }
        this.showToDoList = this.showToDoList.bind(this);
        this.dateClicked = this.dateClicked.bind(this);
    }

    handleHolidayColors = ({ date, view }) => {
        for (var i = 0; i < holidays.length; i++) {
            if (view === 'month' && date.getTime() === new Date(holidays[i].date).getTime()) {
                return 'holidays';
            }
        }
    }

    printOutFirstHolidayInitial = ({ date, view }) => {
        let holidayStrings = []
        for (var i = 0; i < holidays.length; i++) {
            if (view === 'month' && date.getTime() === new Date(holidays[i].date).getTime()) {
                holidayStrings.push(holidays[i].name.slice(0, 1));
                return <span><br />{holidayStrings}</span>
            }
        }
    }
    showToDoList(value) {
        if (this.state.dateClicked.getMonth() === value.getMonth() &&
            this.state.dateClicked.getDate() === value.getDate()) {
            console.log("test");
            this.setState({
                showToDo: !this.state.showToDo
            })
        } 

        this.setState({
            dateClicked: value
        })
    }

    dateClicked = (value, event) => this.showToDoList(value);

    render() {
        return (
            <div>
                <div className="calendar-container">
                    <Calendar
                        onChange={this.onChange}
                        value={this.state.dateClicked}
                        tileClassName={this.handleHolidayColors}
                        tileContent={this.printOutFirstHolidayInitial}
                        onClickDay={this.dateClicked} />
                    {this.state.showToDo ? <Todo value={this.state.dateClicked} /> : null}
                </div>
            </div>
        )
    }
}

export default CalendarApp;