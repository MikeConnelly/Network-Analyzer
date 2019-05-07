import React, {Component} from 'react';
import Graph from '../graph/Graph';
import PropTypes from 'prop-types';
import Loader from 'react-loading-spinner';

class Home extends Component {

  componentDidMount() {
    this.props.actions.getRecent();
  }

  render() {
    const { data, isFetching } = this.props;
    console.log(data);

    if (isFetching) {
      return (<Loader type="puff" color="#00BFFF" height="100" width="100" />);
    }

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
