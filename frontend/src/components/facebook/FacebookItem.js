import React, { Component } from 'react';

class FacebookItem extends Component {
  
  loadMediaItem() {
    return this.props.item.type === "video"
      ? <iframe
        title="fb-video"
        className="fb-video"
        src={this.props.item.source}
      />
      : <img
        className="timelinePhoto"
        src={this.props.item.full_picture}
        alt=""
      />;
  }

  render() {
    return (
      <div className="col-sm-5">
        <div className="panel panel-default">
          <div className="fb-heading panel-heading">
            <div>
              {this.props.item.name}
              <p className="pull-right">{this.props.item.created_time.substring(0, 10)}</p>
            </div>
          </div>
          <div className="panel-body">
            <p>{this.props.item.message}</p>
            <p>{this.props.item.description}</p>
            <div className="media">
              {this.loadMediaItem()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FacebookItem;