import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';


const styles = {
  root: {
    background: '#1dd13e',
    height: 48
  }
}

class SpeedtestButton extends Component {

  handleClick = () => {
    this.props.actions.speedTest();
  }

  render() {
    const { classes, disabled } = this.props;
    
    return (
      <div className='test-speed'>
        <Button
          onClick={this.handleClick}
          disabled={disabled}
          size='large'
          variant='contained'
          classes={{ root: classes.root }}>
          test speed now
        </Button>
      </div>
    );
  }
}

SpeedtestButton.propTypes = {
  classes: PropTypes.object.isRequired,
  disabled: PropTypes.bool
}

SpeedtestButton.defaultProps = {
  classes: {},
  disabled: false
}

export default withStyles(styles)(SpeedtestButton);
