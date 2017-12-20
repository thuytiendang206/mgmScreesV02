import React from 'react';
import {BrowserRouter as Router, Link} from 'react-router-dom';

const ScreenPlayRow = (props) => {
  let appList = [];
  return (
    <tr>
      <td>{props.index}</td>
      <td>{props.data.name}</td>
      <td>{props.data["display-time"]}</td>
      <td>
        {props.data["screens"].map(function (screen, index) {
          appList.push(screen.apps);
          return (
            <div key={index}>
              <p>{screen.type}</p>
              {
                screen.apps.map(function (app, count) {
                  return <br key={count}/>
                })
              }
            </div>
          )
        })}
      </td>
      <td>
        {appList.map(function (apps, index) {
          return (
            <div key={index}>
              {
                apps.map(function (app, count) {
                  return <p key={count}>{app.type}</p>
                })
              }
            </div>
          )
        })}
      </td>
      <td><span className="icon-action-size">
							<Link to={{pathname: 'admin/screenplay', state: {data: props.data}}}>
                <i className="fa fa-pencil-square"/>
              </Link>
							<a onClick={() => props.delete(props.data.id, (props.index - 1))}>
                <i className="fa fa-trash"/>
              </a>
					</span>
      </td>
    </tr>
  );
}

export default ScreenPlayRow;
