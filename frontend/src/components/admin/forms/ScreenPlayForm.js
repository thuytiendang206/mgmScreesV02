import React, {Component} from 'react';
import ScreenForm from './ScreenForm';
import ScreenLabel from './ScreenLabel';
import '../dashboard/AdminManagement.css';
import Header from '../marginals/Header';

class ScreenPlayForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.location.state ? this.props.location.state.data.id : undefined,
      name: this.props.location.state ? this.props.location.state.data.name : "",
      "display-time": this.props.location.state ? this.props.location.state.data["display-time"] : 1,
      screens: this.props.location.state ? this.props.location.state.data.screens : [],
      activatedScreenForm: false
    }
    this.showScreenForm = this.showScreenForm.bind(this);
    this.showAppForm = this.showAppForm.bind(this);
    this.addScreen = this.addScreen.bind(this);
    this.saveScreenPlay = this.saveScreenPlay.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onDisplayTimeChange = this.onDisplayTimeChange.bind(this);
    this.inputListener = this.inputListener.bind(this);
    this.deleteScreen = this.deleteScreen.bind(this);
    this.onRowsChange = this.onRowsChange.bind(this);
    this.onColsChange = this.onColsChange.bind(this);
  }

  showScreenForm(value, screen) {
    this.setState({
      activatedScreenForm: value,
      screen: screen,
      activatedAppForm: false,
      app: {}
    });
  }

  showAppForm(value, app) {
    if (app.parameters === undefined) {
      app.parameters = [];
    }
    this.setState({
      activatedAppForm: value,
      app: app
    });
  }

  addScreen() {
    let defaultScreen = {
      type: "Grid-layout",
      "animation-type": "slide-right",
      rows: 1,
      cols: 1,
      apps: [{
        type: "",
        parameters: []
      }]
    };
    this.setState({
      screens: [...this.state.screens, defaultScreen],
      activatedScreenForm: true,
      screen: defaultScreen,
      activatedAppForm: false,
      app: {}
    });
  }

  saveScreenPlay() {
    if (this.state.id) {
      this.props.update(this.state.id, this.state);
    } else {
      this.props.save(this.state);
    }
  }

  onNameChange(event) {
    this.setState({
      name: event.target.value
    });
  }

  onDisplayTimeChange(event){
    this.setState({
      "display-time": event.target.value
    });
  }

  deleteScreen(position) {
    this.setState({
      screens: [...this.state.screens.slice(0, position),
        ...this.state.screens.slice(position+1)]
    });
  }

  inputListener(type, key, value) {
    let data = this.state[type];
    data[key] = value;
    if (type === "screen") {
      this.setState({
        screen: data
      });
    } else {
      this.setState({
        app: data
      });
    }
  }

  async rowsColsListener(key, value) {
    let data = this.state.screen;
    data[key] = value;
    await this.setState({
      screen: data
    });
    let screen = this.state.screen;
    let currentSize = this.state.screen.apps.length;
    let futureSize = this.state.screen.rows * this.state.screen.cols;
    if (futureSize > currentSize) {
      for (let i = currentSize; i < futureSize; i++) {
        let app = {
          type: "",
          parameters: []
        }
        screen.apps = [...screen.apps, app];
      }
    }
    if (futureSize < currentSize) {
      for (let i = futureSize; i < currentSize; i++) {
        screen.apps = [...screen.apps.slice(0, screen.apps.length - 1)]
      }
    }
    this.setState({
      screen: {
        ...this.state.screen,
        apps: screen.apps
      }
    });
  }

  async onRowsChange(value){
    await this.rowsColsListener('rows', value);
  }

  async onColsChange(value){
    await this.rowsColsListener('cols', value);
  }

  render() {
    return (
      <div>
        <Header/>
        <div className="full-screen">
          <div className="row">
            <div className="col-md-4">
              <div className="panel panel-default">
                <div className="form-header panel-heading">
                  <h3>New ScreenPlay</h3>
                </div>
                <div className="panel-body">
                  <div className="form-horizontal">
                    <div className="form-group">
                      <label className="control-label col-md-2">Name:</label>
                      <div className="col-md-10">
                        <input type="text" className="form-control" placeholder="Enter name"
                               value={this.state["name"]} onChange={this.onNameChange} ref="name"/>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="control-label col-md-2">Display Time:</label>
                      <div className="col-md-10">
                        <input type="number" className="form-control" placeholder="Enter Display Time (second)"
                               value={this.state["display-time"]} min="1" onChange={this.onDisplayTimeChange}
                               ref="displayTime"/>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="control-label col-md-2">Screens:</label>
                      <div className="col-md-10 text-left">
                        <div className="tags">
                          {this.state.screens.map(
                                                    (element, index) => <ScreenLabel
                                                                            screen={element}
                                                                            key={index}
                                                                            index={index}
                                                                            deleteScreen={this.deleteScreen}
                                                                            onClick={this.showScreenForm}
                                                                        />
                                                    )
                          }
                        </div>
                        <button className="btn btn-primary" onClick={this.addScreen}>
                          <span><i className="fa fa-plus"/> Add New Screen</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="panel-footer">
                  <div className="text-right">
                    <a href="/admin" className="btn btn-danger margin15">
                      <span><i className="fa fa-ban"/> Cancel</span>
                    </a>
                    <button className="btn btn-success" onClick={this.saveScreenPlay}>
                      <span><i className="fa fa-floppy-o"/> Save</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              {
                this.state.activatedScreenForm
                ? <ScreenForm activatedAppForm={this.state.activatedAppForm}
                              appData={this.state.app}
                              screen={this.state.screen}
                              onRowsChange={this.onRowsChange}
                              onColsChange={this.onColsChange}
                              showScreenForm={this.showScreenForm}
                              showAppForm={this.showAppForm}
                              onChange={this.inputListener}
                />
                : undefined
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ScreenPlayForm;