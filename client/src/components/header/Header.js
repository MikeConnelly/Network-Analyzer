import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Button, Typography, withStyles } from '@material-ui/core'
import classNames from 'classnames';
import AddEmailPopup from './add-popup/AddEmailPopup';
import './Header.css';

const styles = {
  detailTitle: {
    textDecoration: 'underline'
  }
};

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popup: false,
      underlined: ''
    };
    this.openPopup = this.openPopup.bind(this);
    this.closePopup = this.closePopup.bind(this);
    this.setUnderlined = this.setUnderlined.bind(this);
  }

  componentDidMount() {
    if (window.location.href.indexOf('detail') > -1) {
      this.setState({ underlined: 'detail' });
    } else if (window.location.href.indexOf('settings') > -1) {
      this.setState({ underlined: 'settings' });
    } else {
      this.setState({ underlined: 'home' });
    }
  }

  openPopup() {
    this.setState({ popup: true });
  }

  closePopup() {
    this.setState({ popup: false });
  }

  setUnderlined(page) {
    this.setState({ underlined: page });
  }

  render() {
    const { classes } = this.props;
    let homeUnderlined = false;
    let detailUnderlined = false;
    let settingsUnderlined = false;

    switch(this.state.underlined) {
      case 'home':
        homeUnderlined = true;
        break;
      case 'detail':
        detailUnderlined = true;
        break;
      case 'settings':
        settingsUnderlined = true;
        break;
      default:
        break;
    }

    return (
      <div className="header">
        <AppBar id="appbar" position="static">
          <Link to='/'style={{ textDecoration: 'none' }}>
            <Button
              id="home-page-button"
              className="header-button"
              onClick={() => this.setUnderlined('home')}>
              <Typography
                className={classNames(homeUnderlined && classes.detailTitle)}
                variant="h6"
                color="secondary">
                Home
              </Typography>
            </Button>
          </Link>
          <Link to='/detail'style={{ textDecoration: 'none' }}>
            <Button
              id="detail-page-button"
              className="header-button"
              onClick={() => this.setUnderlined('detail')}>
              <Typography
                className={classNames(detailUnderlined && classes.detailTitle)}
                variant="h6"
                color="secondary">
                Details
              </Typography>
            </Button>
          </Link>
          <Link to='/settings'style={{ textDecoration: 'none' }}>
            <Button
              id="settings-page-button"
              className="header-button"
              onClick={() => this.setUnderlined('settings')}>
              <Typography 
                className={classNames(settingsUnderlined && classes.detailTitle)} 
                variant="h6"
                color="secondary">
                Settings
              </Typography>
            </Button>
          </Link>
          <Button
            id="notification-button"
            className="header-button"
            onClick={this.openPopup}>
            <i className="material-icons">notifications</i>
          </Button>
          <AddEmailPopup open={this.state.popup} close={this.closePopup} addEmail={this.props.actions.addEmail} />
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(Header);
