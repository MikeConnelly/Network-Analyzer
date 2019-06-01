import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class FilterButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      anchorEl: null
    };
    this.getPastTime = this.getPastTime.bind(this);
  }

  getPastTime = timeId => {
    const now = new Date();
    const twentyFourHourAgoTime = now.setDate(now.getDate() - 1);
    switch(timeId) {
      case 1:
        return twentyFourHourAgoTime;
      case 2:
        const lastWeekTime = now.setDate(now.getDate() - 7);
        return lastWeekTime;
      default:
        return twentyFourHourAgoTime; 
    }
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleClose = (event, timeId) => {
    this.setState({ anchorEl: null });
    if (timeId) {
      const pastTime = this.getPastTime(timeId);
      this.props.actions.getRecent(pastTime, Date.now());
    }
  }

  render() {
    const { anchorEl } = this.state;

    return (
      <div className="filter-button">
        <Button
          aria-owns={anchorEl ? 'filter-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}>
          Timeframe
        </Button>
        <Menu
          id="filter-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={e => this.handleClose(e, null)}>
          <MenuItem onClick={e => this.handleClose(e, 1)}>Past 24 hours</MenuItem>
          <MenuItem onClick={e => this.handleClose(e, 2)}>Past week</MenuItem>
        </Menu>
      </div>
    );
  }
}

export default FilterButton;
