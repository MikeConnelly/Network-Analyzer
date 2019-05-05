import React, {Component} from 'react';
import Graph from '../graph/Graph';
import Loader from 'react-loading-spinner';

class Home extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentRender = this.shouldComponentRender.bind(this);
  }

  shouldComponentRender() {
    const {loading} = this.props;
    return loading;
  }

  componentWillMount() {
    const {fetchRecent} = this.props;
    fetchRecent();
  }

  render() {
    const {data} = this.props;
    console.log(data);

    if (!this.shouldComponentRender()) {
      return (<Loader type="puff" color="#00BFFF" height="100" width="100" />);
    }

    return (
      <Graph data={data} />
    );
  }
}

export default Home;
