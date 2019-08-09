import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

class DateFilter extends Component {
  constructor(props) {
    super(props);
    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
  }

  handleChangeStart = date => {
    date = date.getTime();
    this.props.actions.setStartDate(date);
    this.props.actions.getRecent(date, this.props.endDate);
  }

  handleChangeEnd = date => {
    date = date.getTime();
    this.props.actions.setEndDate(date);
    this.props.actions.getRecent(this.props.startDate, date);
  }

  render() {
    const { startDate, endDate } = this.props;

    return (
      <div className="date-filter">
        <DatePicker
          selected={startDate}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          onChange={this.handleChangeStart}
          maxDate={endDate}
        />
        <DatePicker
          selected={endDate}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          onChange={this.handleChangeEnd}
          minDate={startDate}
        />
      </div>
    );
  }
}

export default DateFilter;
