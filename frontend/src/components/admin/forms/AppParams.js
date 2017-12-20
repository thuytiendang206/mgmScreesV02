import React from 'react';

const AppForm = (props) => {
  return (
    <div className="form-group">
      <label className="control-label col-md-2">Key:</label>
      <div className="col-md-4">
        <input type="text" className="form-control" value={props.parameter.key}
               onChange={evt => props.onChange(props.index, true, evt.target.value)} placeholder="Enter Key"/>
      </div>
      <label className="control-label col-md-2">Value:</label>
      <div className="col-md-4">
        <input type="text" className="form-control" value={props.parameter.value}
               onChange={evt => props.onChange(props.index, false, evt.target.value)} placeholder="Enter Value"/>
      </div>
    </div>
  )
}

export default AppForm;