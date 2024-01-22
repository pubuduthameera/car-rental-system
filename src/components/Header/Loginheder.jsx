import React,{ useRef, useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';


const Loginheder = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
   location.href = '/login';
  };
  const handleaccontsetting = () => {
   location.href = '/book';
  };


  return (

    <AppBar position="static">
    <Toolbar>
      <Avatar
        alt="Profile Picture"
        src="/path/to/profile-picture.jpg"
        onClick={handleClick}
        position="right"
        style={{alignItems:"right",marginLeft:"auto"}}
      />
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleaccontsetting}>Account Details</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Toolbar>
  </AppBar>


  )
};

export default Loginheder
