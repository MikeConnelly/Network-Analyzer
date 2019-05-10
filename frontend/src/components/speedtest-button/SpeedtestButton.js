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
    
  }

  render() {
    const { classes } = this.props;
    
    return (
      <div className='test-speed'>
        <Button
          onClick={this.handleClick}
          size='variant'
          variant='contained'
          classes={{ root: classes.root }}>
          test speed now
        </Button>
      </div>
    );
  }
}

SpeedtestButton.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SpeedtestButton);
