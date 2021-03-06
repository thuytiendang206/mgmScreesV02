import React from 'react';
import Assessment from 'material-ui/svg-icons/action/assessment';
import PermIdentity from 'material-ui/svg-icons/action/perm-identity';
import Group from 'material-ui/svg-icons/social/group';
import AccountBalance from 'material-ui/svg-icons/action/account-balance';
import Web from 'material-ui/svg-icons/av/web';
import MenuItem from 'material-ui/MenuItem';

const data = {
  menus: [
    { text: 'DashBoard', icon: <Assessment/>, link: '/admin/dashboard' },
    { text: 'Screens', icon: <Web/>, link: '/admin/form' },
    { text: 'Information', icon: <PermIdentity/>, link: '/admin/infor'},
    { text: 'User', icon: <Group/>,link: '/admin/user' },
    { text: 'About us', icon: <AccountBalance/> , link: '/admin/about_us'}

  ],
  componentName:[
    <MenuItem value={"Weather"} key={1} primaryText="Weather" />,
    <MenuItem value={"Clock"} key={2} primaryText="Clock" />,
    <MenuItem value={"Facebook"} key={3} primaryText="Facebook" />,
    <MenuItem value={"Holiday"} key={4} primaryText="Holiday" />,
    <MenuItem value={"Calendar"} key={5} primaryText="Calendar" />,
    <MenuItem value={"Website"} key={6} primaryText="Website" />
  ],
  animationType:[
    <MenuItem value={"fade"} key={1} primaryText="fade" />,
    <MenuItem value={"slide-right"} key={2} primaryText="slide-right" />,
    <MenuItem value={"slide-left"} key={3} primaryText="slide-left" />
  ],
  parameters:{
    Clock:[
      {key:"city", value: ""},
      {key:"utc-diff",value:""}
    ],
    Weather:[
      {key:"city",value:""},
      {key:"degrees",value:""},
    ],
    Facebook:[
      {key:"url",value:"mgmTechnologyPartnersVietnam"},
      {key:"start-day",value:""},
      {key:"end-day",value:""},
    ],
    Holiday:[
    ],
    Calendar:[
      {key:"name",value:""},
      {key:"time-min",value:""},
      {key:"time-max",value:""},
      {key:"number-of-calendars",value:""},
      {key:"calendar-id-1",value:""},
      {key:"color-1",value:""},
    ],
    Website:[
      
    ]
  }
};

export default data;
