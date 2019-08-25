import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, withStyles} from '@material-ui/core';
import GraphContainer from '../graph/GraphContainer';
import SpeedtestResultsContainer from '../speedtest-results/SpeedtestResultsContainer';
import './Home.css';

const styles = {
  root: {
    height: 48
  }
};

class Home extends Component {

  render() {
    const { classes, speedtestData, speedtestIsFetching } = this.props;

    return (
      <div className="home">
        <GraphContainer />
        <Button
          onClick={this.props.actions.speedTest}
          disabled={speedtestIsFetching}
          size='large'
          variant='contained'
          color="secondary"
          classes={{ root: classes.root }}>
          test speed now
        </Button>
        <SpeedtestResultsContainer data={speedtestData} isFetching={speedtestIsFetching} />
      </div>
    );
  }
}

Home.propTypes = {
  actions: PropTypes.shape({
    speedTest: PropTypes.func.isRequired
  }),
  speedtestData: PropTypes.object,
  speedtestIsFetching: PropTypes.bool
};

Home.defaultProps = {
  actions: {
    speedTest: () => {}
  },
  speedtestData: {},
  speedtestIsFetching: false
};

export default withStyles(styles)(Home);
