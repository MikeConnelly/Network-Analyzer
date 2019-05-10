import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loading-spinner';
import './Home.css';
import Graph from '../graph/Graph';
import SpeedtestButton from '../speedtest-button/SpeedtestButton';
import SpeedtestResults from '../speedtest-results/SpeedtestResults';


class Home extends Component {

  componentDidMount() {
    const currentDateTime = Date.now();
    const now = new Date();
    const twentyFourHourAgoTime = now.setDate(now.getDate() - 1);
    this.props.actions.getRecent(twentyFourHourAgoTime, currentDateTime);
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
        <Graph actions={this.props.actions} data={recentData} />
        <SpeedtestButton actions={this.props.actions} disabled={speedtestIsFetching} />
        <SpeedtestResults data={speedtestData} />
      </div>
    );
  }
}

Home.propTypes = {
  actions: PropTypes.shape({
    getRecent: PropTypes.func.isRequired,
    speedtest: PropTypes.func.isRequired
  }),
  recentData: PropTypes.array,
  recentIsFetching: PropTypes.bool
};

Home.defaultProps = {
  actions: {
    getRecent: () => {},
    speedtest: () => {}
  },
  recentData: [],
  recentIsFetching: false,
  speedtestData: {},
  speedtestIsFetching: false
};

export default Home;
