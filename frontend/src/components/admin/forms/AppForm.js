import React, {Component} from 'react';
import AppParams from './AppParams';

class AppForm extends Component {

  constructor(props) {
    super(props);
    this.saveParameters = this.saveParameters.bind(this);
    this.reset = this.reset.bind(this);
    this.typeChangeListener = this.typeChangeListener.bind(this);
    this.addParameter = this.addParameter.bind(this);
  }

  reset(){
    this.props.onChange("app", "type", "");
    this.props.onChange("app", "parameters", []);
  }

  addParameter() {
    let parameter = {
      key: "",
      value: ""
    }
    let parameters = [...this.props.data.parameters, parameter];
    this.props.onChange("app", "parameters", parameters);
  }

  saveParameters(position, isKey, value) {
    let parameters = this.props.data.parameters;
    if (isKey) {
      parameters[position].key = value;
    } else {
      parameters[position].value = value;
    }
    this.props.onChange("app","parameters",parameters);
  }

  typeChangeListener(event) {
    this.props.onChange("app", "type", event.target.value);
  }

  render() {
    return (
      <div className="col-md-6">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3>New App</h3>
          </div>
          <div className="panel-body">
            <div className="form-horizontal">
              <div className="form-group">
                <label className="control-label col-md-2">Type:</label>
                <div className="col-md-10">
                  <input type="text" className="form-control" placeholder="Enter Type"
                         value={this.props.data.type}
                         onChange={this.typeChangeListener}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="control-label col-md-2">Parameters:</label>
                <div className="col-md-10 text-right">
                  <button className="btn btn-primary" onClick={this.addParameter}>
                    <span><i className="fa fa-plus"/></span>
                  </button>
                </div>
              </div>
              {
                this.props.data.parameters.map(
                                      (element, index) => <AppParams
                                                              parameter={element}
                                                              key={index}
                                                              index={index}
                                                              onChange={this.saveParameters}/>
                )
              }
            </div>
          </div>
          <div className="panel-footer">
            <div className="text-right">
              <button className="btn btn-danger margin15" onClick={this.reset}>
                <span><i className="fa fa-refresh"/> Reset</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AppForm;