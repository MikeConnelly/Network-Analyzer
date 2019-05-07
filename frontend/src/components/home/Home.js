import React, {Component} from 'react';
import Graph from '../graph/Graph';
import PropTypes from 'prop-types';
import Loader from 'react-loading-spinner';

class Home extends Component {

  componentDidMount() {
    const currentDateTime = Date.now();
    const now = new Date();
    const twentyFourHourAgoTime = now.setDate(now.getDate() - 1);
    this.props.actions.getRecent(twentyFourHourAgoTime, currentDateTime);
  }

  render() {
    const { data, isFetching } = this.props;

    if (isFetching) {
      return (<Loader type="puff" color="#00BFFF" height="100" width="100" />);
    }

    data.forEach(result => {
      const date = new Date(result.dateTime);
      result.dateObject = date;
      result.dateObject.xaxis = date.getDate();
    });

    return (
      <Graph data={data} />
    );
  }
}

Home.propTypes = {
  actions: PropTypes.shape({
    getRecent: PropTypes.func
  }),
  data: PropTypes.object,
  isFetching: PropTypes.bool
};

Home.defaultProps = {
  actions: PropTypes.shape({
    getRecent: () => {}
  }),
  data: {},
  isFetching: false
};

export default Home;
