import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

class DateFilter extends Component {
  constructor(props) {
    super(props);
    const now = Date.now();
    this.state = {
      startDate: now,
      endDate: now
    };
    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
  }

  componentDidMount() {
    const now = new Date();
    const twentyFourHourAgoTime = now.setDate(now.getDate() - 1);
    this.setState({ startDate: twentyFourHourAgoTime, endDate: Date.now() });
    //this.props.actions.getRecent(twentyFourHourAgoTime, Date.now() );
  }

  handleChangeStart = async (date) => {
    date = date.getTime();
    await this.setState({ startDate: date });
    this.props.actions.getRecent(this.state.startDate, this.state.endDate);
  }

  handleChangeEnd = async (date) => {
    date = date.getTime();
    await this.setState({ endDate: date });
    this.props.actions.getRecent(this.state.startDate, this.state.endDate);
  }

  render() {
    return (
      <div className="date-filter">
        <DatePicker
          selected={this.state.startDate}
          selectsStart
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onChange={this.handleChangeStart}
        />
        <DatePicker
          selected={this.state.endDate}
          selectsEnd
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onChange={this.handleChangeEnd}
          minDate={this.state.startDate}
        />
      </div>
    );
  }
}

export default DateFilter;
