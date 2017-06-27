import React, {Component} from 'react';

export default class Website extends Component {
  static getType() {
    return "Website";
  }
  render() {
    return (
        <div >
            <iframe
              title="website"
              src={this.props.url}
              scrolling="no"
              frameBorder="0"
              style={{
                border: 0,
                overflow: 'hidden', width: 100 + '%', height: 99 + 'vh'
              }}
              allowTransparency="true"
            />
        </div>
    )
  }
}