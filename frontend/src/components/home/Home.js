import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loading-spinner';
import Graph from '../graph/Graph';
import SpeedtestButton from '../speedtest-button/SpeedtestButton';
import SpeedtestResults from '../speedtest-results/SpeedtestResults';
import './Home.css';


class Home extends Component {

  componentDidMount() {
    const currentDateTime = Date.now();
    const now = new Date();
    const twentyFourHourAgoTime = now.setDate(now.getDate() - 1);
    this.props.actions.getRecent(twentyFourHourAgoTime, currentDateTime);
  }

  graphClicked = event => {
    window.location = `/detail/${event.activePayload[0].payload.dateTime}`;
  }

  render() {
    const { recentData, recentIsFetching, speedtestData, speedtestIsFetching } = this.props;
    
    if (recentIsFetching) {
      return (<Loader type="puff" color="#00BFFF" height="100" width="100" />);
    }

    recentData.forEach(result => {
      const date = new Date(result.dateTime);
      result.dateObject = date;
      result.dateObject.xaxis = date.getDate();
    });

    return (
      <div className="home">
        <Graph actions={this.props.actions} data={recentData} openDetail={this.graphClicked} />
        <SpeedtestButton actions={this.props.actions} disabled={speedtestIsFetching} />
        <SpeedtestResults data={speedtestData} isFetching={speedtestIsFetching} />
      </div>
    );
  }
}

Home.propTypes = {
  actions: PropTypes.shape({
    getRecent: PropTypes.func.isRequired,
    speedTest: PropTypes.func.isRequired
  }),
  recentData: PropTypes.array,
  recentIsFetching: PropTypes.bool,
  speedtestData: PropTypes.object,
  speedtestIsFetching: PropTypes.bool
};

Home.defaultProps = {
  actions: {
    getRecent: () => {},
    speedTest: () => {}
  },
  recentData: [],
  recentIsFetching: false,
  speedtestData: {},
  speedtestIsFetching: false
};

export default Home;
