import React from 'react';
import './css/style.css';

class Error extends React.Component {
    render() {
        return(
        <div className="wrap">
            <img className="logo" alt="logo" src="./images/mgm-logo.png"/>
            <div className="banner">
                <img src="./images/banner.png" alt="" />
            </div>
            <div className="page">
                <h2>Hey guys, we can't find that page!</h2>
            </div>
        </div>
        )
    }
}
export default Error;
