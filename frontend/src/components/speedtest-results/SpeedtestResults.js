import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';
import ReactJson from 'react-json-view';


class SpeedtestResults extends Component {
  render() {
    const { data, isFetching } = this.props;

    return (
      <div className="speedtest-results">
        {isFetching 
          ? <div className="fetching">testing...</div>
          : (_isEmpty(data)
              ? <></>
              : <>
                  <div id="speeds">
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
                  <div id="client">
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
                  <div id="server">
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
                </>
            )
        }
      </div>
    );
  }
}

SpeedtestResults.propTypes = {
  data: PropTypes.object,
  isFetching: PropTypes.bool
}

SpeedtestResults.defaultProps = {
  data: {},
  isFetching: false
}

export default SpeedtestResults;
