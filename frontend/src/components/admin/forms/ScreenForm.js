import React, {Component} from 'react';
import AppForm from './AppForm';
import ErrorMessage from './ErrorMessage';

class ScreenForm extends Component {

  min = 1;
  max = 4;

  constructor(props) {
    super(props);
    this.state = {
      errorMessage: ""
    };
    this.cancelForm = this.cancelForm.bind(this);
    this.checkRows = this.checkRows.bind(this);
    this.checkCols = this.checkCols.bind(this);
    this.onAnimationChange = this.onAnimationChange.bind(this);
  }

  checkRows(event) {
    let value = parseInt(event.target.value, 10);
    if (value > this.max || value < this.min) {
      this.setState({
        errorMessage: `${value} is invalid number for rows. The value is between ${this.min} and ${this.max}`
      });
    } else {
      this.props.onRowsChange(value);
      this.setState({
        errorMessage: ""
      });
    }
  }

  checkCols(event) {
    let value = parseInt(event.target.value, 10);
    if (value > this.max || value < this.min) {
      this.setState({
        errorMessage: `${value} is invalid number for cols. The value is between ${this.min} and ${this.max}`
      });
    } else {
      this.props.onColsChange(value);
      this.setState({
        errorMessage: ""
      });
    }
  }

  onAnimationChange(event) {
    this.props.onChange("screen","animation-type",event.target.value)
  }

  cancelForm() {
    this.props.showScreenForm(false, {});
  }

  render() {
    let rows = [];
    for (let i = 0; i < this.props.screen.rows; i++) {
      let cells = [];
      for (let j = 0; j < this.props.screen.cols; j++) {
        let num = this.props.screen.cols * i + j;
        let name = this.props.screen.apps[num]
          ? this.props.screen.apps[num].type
          : undefined;
        if (!name) {
          name = <i className="fa fa-plus-circle"/>;
        }
        cells.push(
          <td className="text-center pointer" key={num}
              onClick={() => this.props.showAppForm(true, this.props.screen.apps[num])}>
            {name}
          </td>
        )
      }
      rows.push(<tr key={i}>{cells}</tr>)
    }

    return (
      <div className="row">
        <div className="col-md-6">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3>New Screen</h3>
            </div>
            <div className="panel-body">
              <div className="form-group">
                <ErrorMessage message={this.state.errorMessage}/>
              </div>
              <div className="form-horizontal">
                <div className="form-group">
                  <label className="control-label col-md-2">Type:</label>
                  <div className="col-md-10">
                    <input type="text" className="form-control" placeholder="Enter Type"
                           defaultValue={this.props.screen.type} disabled/>
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-md-2">Animation Type:</label>
                  <div className="col-md-10">
                    <select type="text" className="form-control"
                            defaultValue={this.props.screen["animation-type"]}
                            onChange={this.onAnimationChange}>
                      <option>slide-right</option>
                      <option>slide-left</option>
                      <option>fade</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-md-2">Rows:</label>
                  <div className="col-md-10">
                    <input type="number" className="form-control" placeholder="Enter Rows"
                           value={this.props.screen.rows} max={this.max} min={this.min}
                           onChange={this.checkRows}/>
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-md-2">Columns:</label>
                  <div className="col-md-10">
                    <input type="number" className="form-control" placeholder="Enter Columns"
                           value={this.props.screen.cols} max={this.max} min={this.min}
                           onChange={this.checkCols}/>
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-md-2">Apps:</label>
                  <div className="col-md-10 text-left">
                    <table className="table table-bordered">
                      <tbody>
                      {rows}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="panel-footer">
              <div className="text-right">
                <button className="btn btn-danger margin15" onClick={this.cancelForm}>
                  <span><i className="fa fa-ban"/> Cancel</span></button>
              </div>
            </div>
          </div>
        </div>
        {
          this.props.activatedAppForm
          ? <AppForm data={this.props.appData}
                     showAppForm={this.props.showAppForm}
                     onChange={this.props.onChange}
                     addParameter={this.props.addParameter} />
          : undefined
        }
      </div>
    );
  }
}

export default ScreenForm;