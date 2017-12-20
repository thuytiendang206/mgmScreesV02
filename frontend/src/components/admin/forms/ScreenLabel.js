import React from 'react';

const ScreenLabel = (props) => {
  let name = props.screen.type;
  if (props.screen.apps.length === 1 && props.screen.apps[0].type !== "") {
    name = props.screen.apps[0].type;
  }
  return (
    <span className="label label-success">
      <strong onClick={() => props.onClick(true, props.screen)}>
        {name}
      </strong>
      <button className="btn btn-success" onClick={() => props.deleteScreen(props.index)}><i
          className="fa fa-times"/></button>
    </span>
  )
}

export default ScreenLabel;