import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, withStyles} from '@material-ui/core';
import GraphWrapper from '../graph/GraphWrapper';
import SpeedtestResultsWrapper from '../speedtest-results/SpeedtestResultsWrapper';
import './Home.css';

const styles = theme => ({
  root: {
    height: 48
  }
});

class Home extends Component {

  componentDidMount() {
    const currentDateTime = Date.now();
    const now = new Date();
    const twentyFourHourAgoTime = now.setDate(now.getDate() - 1);
    this.props.actions.getRecent(twentyFourHourAgoTime, currentDateTime);
  }

  render() {
    const { classes, recentData, recentIsFetching, speedtestData, speedtestIsFetching } = this.props;

    if (recentIsFetching) {
      return <div className="home"></div>;
    }

    recentData.forEach(result => {
      const date = new Date(result.dateTime);
      result.dateObject = date;
      result.dateObject.xaxis = date.getDate();
    });

    return (
      <div className="home">
        <GraphWrapper actions={this.props.actions} data={recentData} />
        <Button
          onClick={this.props.actions.speedTest}
          disabled={speedtestIsFetching}
          size='large'
          variant='contained'
          color="secondary"
          classes={{ root: classes.root }}>
          test speed now
        </Button>
        <SpeedtestResultsWrapper data={speedtestData} isFetching={speedtestIsFetching} />
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

export default withStyles(styles)(Home);
