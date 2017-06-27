import React, {Component} from 'react';
export default class FacebookItem extends Component {
  renderMedia() {
    return this.props.item.type === "video"
      ? <iframe
        title="fb-video"
        src={this.props.item.source}
        frameBorder="0"
        style={{ width: 100 + '%', height: 70 + 'vh' }}
      />
      : <img
        className="timelinePhoto"
        src={this.props.item.full_picture}
        alt=""
      />;
  }

  render() {
    return(
      <div className="col-sm-5">
        <div className="panel panel-default">
          <div className="panel-heading">
            <p> 
              {this.props.item.name} 
              <p className="pull-right">{this.props.item.created_time.substring(0, 10)}</p>
            </p>
          </div>
          <div className="panel-body">
            <p>{this.props.item.message}</p>
            <p>{this.props.item.description}</p>
            <div className="media">
              {this.renderMedia()} 
            </div>
          </div>
        </div>
      </div>
    );
  }
}