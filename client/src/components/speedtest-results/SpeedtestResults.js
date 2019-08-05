import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { LinearProgress, withStyles, Typography, Switch, FormControlLabel } from '@material-ui/core';
import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';
import ReactJson from 'react-json-view';
import './SpeedtestResults.css';

const styles = {
  root: {
    flexGrow: 1
  }
};

class SpeedtestResults extends Component {

  simpleResults(data) {
    return (
      <div className="results" id="simple">
        <Typography variant="body1">
          Download: {_get(data, 'speeds.download', '')} Mbps
        </Typography>
        <Typography variant="body1">
          Upload: {_get(data, 'speeds.download', '')} Mbps
        </Typography>
      </div>
    );
  }

  advancedResults(data) {
    return (
      <div className="results">
        <div className="result-section" id="speeds">
          <ReactJson 
            src={_get(data, 'speeds', '')} 
            name="speeds"
            displayDataTypes={false}
            displayObjectSize={false}
            enableAdd={false}
            enableDelete={false}
            enableEdit={false}
          />
        </div>
        <div className="result-section" id="client">
          <ReactJson 
            src={_get(data, 'client', '')} 
            name="client info"
            displayDataTypes={false}
            displayObjectSize={false}
            enableAdd={false}
            enableDelete={false}
            enableEdit={false}
          />
        </div>
        <div className="result-section" id="server">
          <ReactJson 
            src={_get(data, 'server', '')} 
            name="server info"
            displayDataTypes={false}
            displayObjectSize={false}
            enableAdd={false}
            enableDelete={false}
            enableEdit={false}
          />
        </div>
      </div>
    );
  }

  render() {
    const { classes, data, isFetching, advanced } = this.props;

    const resultFormat = advanced ? this.advancedResults(data) : this.simpleResults(data);

    return (
      <div className="speedtest-results">
        {isFetching 
          ? <div className={classNames(classes.root, 'fetching')}><LinearProgress variant="query" /></div>
          : (_isEmpty(data)
            ? <div className="results-empty" />
            : <>
                <FormControlLabel
                  control={
                    <Switch 
                      color="primary"
                      checked={advanced}
                      value="advanced"
                      label="advanced"
                      onChange={() => this.props.handleChange(advanced)}
                    />
                  }
                  label="advanced"
                />
                {resultFormat}
              </>
           )
        }
      </div>
    );
  }
}

SpeedtestResults.propTypes = {
  data: PropTypes.object,
  isFetching: PropTypes.bool,
  advanced: PropTypes.bool,
  handleChange: PropTypes.func.isRequired
}

SpeedtestResults.defaultProps = {
  data: {},
  isFetching: false,
  advanced: false,
  handleChange: () => {}
}

export default withStyles(styles)(SpeedtestResults);
