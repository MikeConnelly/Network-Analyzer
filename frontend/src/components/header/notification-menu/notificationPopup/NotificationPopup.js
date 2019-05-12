import React, { Component } from 'react'
import Popup from 'reactjs-popup';


class NotificationPopup extends Component {
  render() {
    return (
      <div class="notification-popup">
        <Popup 
          open={this.props.open}
          closeOnDocumentClick
          onClose={this.props.close}>
          <div>
            HELLO
          </div>
        </Popup>
      </div>
    );
  }
}

export default NotificationPopup;
