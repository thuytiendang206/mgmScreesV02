import React from 'react';
import './AdminManagement.css';
import ScreenPlayRow from './ScreenPlayRow';
import Header from '../marginals/Header';

const AdminManagement = (props) => {
  return (
    <div>
      <Header/>
      <div className="container">
        <div className="row">
          <h1 className="screenplay-title">mgmScreens Dashboard</h1>
        </div>
        <div className="row">
          <div className="col-md-12">
            <a className="btn btn-primary pull-right" href={`${props.match.url}/screenplay`}>Add new
              screenplay</a>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Display Time</th>
              <th>Screens</th>
              <th>Apps</th>
              <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {
              props.data.map(
                        (element, index) => <ScreenPlayRow
                                                key={index}
                                                data={element}
                                                delete={props.delete}
                                                index={index + 1}
                                            />
                        )
            }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminManagement;