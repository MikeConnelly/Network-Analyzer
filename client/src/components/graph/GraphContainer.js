import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as getRecentActions from '../../actions/speeds/getRecent';
import * as getOneActions from '../../actions/speeds/getOne';
import * as dateRangeActions from '../../actions/datepicker/setDateRange';
import Graph from './Graph';
import DateFilter from './DateFilter';
import './GraphWrapper.css';

class GraphContainer extends Component {
  constructor(props) {
    super(props);
    this.graphClicked = this.graphClicked.bind(this);
  }

  componentDidMount() {
    if (!window.location.pathname.includes('detail')) {
      const currentDateTime = Date.now();
      const now = new Date();
      const twentyFourHourAgoTime = now.setDate(now.getDate() - 1);
      this.props.actions.getRecent(twentyFourHourAgoTime, currentDateTime);
      this.props.actions.setStartDate(twentyFourHourAgoTime);
      this.props.actions.setEndDate(currentDateTime);
    }
  }

  graphClicked(event) {
    if (event && event.activePayload) {
      const speedtestDateTime = event.activePayload[0].payload.dateTime;
      if (!window.location.pathname.includes('detail')) {
        window.location = `/detail/${speedtestDateTime}`;
      } else {
        window.history.replaceState({}, '', `/detail/${speedtestDateTime}`);
        this.props.actions.getOne(speedtestDateTime);
      }
    }
  }

  render() {
    const { actions, recent, dateRange } = this.props;

    return (
      <div className="graph-wrapper">
        <Graph recentData={recent.data} recentIsFetching={recent.loading} openDetail={this.graphClicked} />
        <DateFilter actions={actions} startDate={dateRange.startDate} endDate={dateRange.endDate} />
      </div>
    );
  }
}

GraphContainer.propTypes = {
  actions: PropTypes.shape({
    getRecent: PropTypes.func.isRequired,
    getOne: PropTypes.func.isRequired
  }),
  recent: PropTypes.shape({
    data: PropTypes.array,
    loading: PropTypes.bool
  })
};

const mapStateToProps = state => {
  return {
    recent: state.getRecent,
    dateRange: state.setDateRange
  };
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({
      ...getRecentActions,
      ...getOneActions,
      ...dateRangeActions
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GraphContainer);
