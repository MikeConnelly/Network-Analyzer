import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';
import ReactJson from 'react-json-view';
import {
  LinearProgress,
  withStyles,
  Typography,
  Switch,
  FormControlLabel
} from '@material-ui/core';
import './SpeedtestResults.css';

const styles = {
  root: {
    flexGrow: 1
  }
};

function simpleResults(data) {
  const dateWithTimezone = new Date(_get(data, 'dateTime', 0)).toString();
  const dateString = dateWithTimezone.substr(0, dateWithTimezone.indexOf('GMT') - 1);

  return (
    <div className="results" id="simple-results">
      <Typography variant="body1">
        Download: {_get(data, 'speeds.download', '')} Mbps
      </Typography>
      <Typography variant="body1">
        Upload: {_get(data, 'speeds.download', '')} Mbps
      </Typography>
      <Typography variant="body1">
        Date & Time: {dateString}
      </Typography>
    </div>
  );
}

function advancedResults(data) {
  const epochTime = _get(data, 'dateTime', 0);
  const dateWithTimezone = new Date(epochTime).toString();

  return (
    <div className="results" id="advanced-results">
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
      <div className="result-section" id="datetime">
        <ReactJson
          src={{
            epochTime: epochTime,
            dateTime: dateWithTimezone
          }}
          name="date & time"
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

const SpeedtestResults = ({ ...props }) => {
  const { classes, data, isFetching, advanced } = props;
  const resultFormat = advanced ? advancedResults(data) : simpleResults(data);

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
                    onChange={() => props.handleChange(advanced)}
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
