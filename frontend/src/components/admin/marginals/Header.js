import React from 'react';
import {logOut} from "../authentication/oauth";

const Header = () => {
  return (
    <div className="admin-navbar bg-light">
      <img src="/images/admin-logo-scaled.png" className="icons" alt=""/>
      <a className="pull-right" href="admin/login" onClick={logOut}>Log out</a>
    </div>
  );
}

export default Header;