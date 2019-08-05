import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as getFrequencyActions from '../../../actions/frequency/getFrequency';
import * as setFrequencyActions from '../../../actions/frequency/setFrequency';
import FrequencyForm from './FrequencyForm';

export const FrequencyFormContainer = ({ actions, getFrequency }) => {
  return (
    <FrequencyForm
      actions={actions}
      frequency={getFrequency.data}
      frequencyIsFetching={getFrequency.pending}
    />
  );
}

const mapStateToProps = state => {
  return {
    getFrequency: state.getFrequency
  };
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({ ...getFrequencyActions, ...setFrequencyActions }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FrequencyFormContainer);
