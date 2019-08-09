import React, { Component } from 'react'
import PropTypes from 'prop-types';
import _isEmpty from 'lodash/isEmpty';
import DeleteIcon from '@material-ui/icons/Delete';
import { 
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from '@material-ui/core';

class MailList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emails: []
    };
    this.handleRemoveEmail = this.handleRemoveEmail.bind(this);
    this.generateEmailListItems = this.generateEmailListItems.bind(this);
  }

  componentDidMount() {
    this.props.actions.getEmails();
  }

  componentWillReceiveProps(nextProps) {
    if (!_isEmpty(nextProps.emails) && nextProps.emails !== this.props.emails) {
      this.setState({ emails: nextProps.emails });
    }
  }

  handleRemoveEmail(address) {
    this.props.actions.removeEmail(address, err => {
      if (err) {
        this.props.openSnackbar(false);
      } else {
        const newEmails = this.state.emails.filter(email => email.address !== address);
        this.setState({ emails: newEmails });
        this.props.openSnackbar(true);
      }
    });
  }

  generateEmailListItems() {
    return this.state.emails.map(email => (
      <ListItem key={email.address}>
        <ListItemText className="item-text" primary={email.address} />
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="Delete" onClick={() => this.handleRemoveEmail(email.address)}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    ));
  }

  render() {
    const list = !_isEmpty(this.state.emails)
      ? (
        <List dense={true}>
          {this.generateEmailListItems()}
        </List>
      ) : (
        <Typography>
          no email addresses set up for notifications
        </Typography>
      );

    return (
      <div className="settings-category">
        <Typography variant="h6">
          Update Mail List
        </Typography>
        <div id="maillist">
          {list}
        </div>
      </div>
    );
  }
}

MailList.propTypes = {
  actions: PropTypes.shape({
    getEmails: PropTypes.func.isRequired,
    removeEmail: PropTypes.func.isRequired
  }),
  emails: PropTypes.array
}

export default MailList;
