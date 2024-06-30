import * as React from 'react';
import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';
import { UserContext } from '../Context/UserContext';
export default function SwipeableTemporaryDrawer({ open }) {
  const { setFontSize,fontSize,user, setcurrentthemes, currentthemes, light, ibg } = useContext(UserContext);
  

  const [state, setState] = React.useState({
    right: open,
  });

  React.useEffect(() => {
    setState({ right: open });
  }, [open]);
  useEffect(() => {
    const savedTheme = localStorage.getItem('currentthemes');
    if (savedTheme !== null) {
      setcurrentthemes(JSON.parse(savedTheme));
    }
  }, [setcurrentthemes]);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const handleSwitchChange = (event) => {
    const isChecked = event.target.checked;
    console.log("Switch value:", isChecked);
    setcurrentthemes(isChecked);
    localStorage.setItem('currentthemes', JSON.stringify(isChecked));
  };
  
  const handleFontSizeChange = (e) => {
    setFontSize(e.target.value);
  };

  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(22px)',
        '& .MuiSwitch-thumb:before': {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            '#fff',
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
      width: 32,
      height: 32,
      '&::before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      borderRadius: 20 / 2,
    },
  }));

  const list = (anchor) => (
    <Box style={{ backgroundColor: light, height: "100%", color: ibg }}
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <p className='title' style={{ margin: 20 }}>Settings</p>
      <div style={{ display: "flex", borderWidth: 1, borderRadius: 20, margin: 5, borderColor: "grey" }}>

        <p style={{ margin: 20, marginRight: 70 }}>Theme</p>
        <FormControlLabel
          control={<MaterialUISwitch checked={currentthemes} />}
          onChange={handleSwitchChange}
        />
      </div>

      <div style={{ borderWidth: 1, borderRadius: 20, margin: 5, borderColor: "grey" }}>

        <p style={{ margin: 10 }}>Choose Font Size:</p>

        <label style={{ margin: 5 }} htmlFor="fontSizeInput"></label>

        <input style={{ width: 20 }}
          type="radio"
          id="fontSize12"
          value="12px"
          checked={fontSize === '12px'}
          onChange={handleFontSizeChange}
        />

        <label htmlFor="fontSize12">Small(12px)</label>

        <div>
          <input style={{ width: 20, marginLeft: 10 }}
            type="radio"
            id="fontSize14"
            value="14px"
            checked={fontSize === '14px'}
            onChange={handleFontSizeChange}
          />
          <label htmlFor="fontSize14">Medium(14px)</label>
        </div>
        <div>
          <input style={{ width: 20, marginLeft: 10 }}
            type="radio"
            id="fontSize17"
            value="17px"
            checked={fontSize === '17px'}
            onChange={handleFontSizeChange}
          />
          <label htmlFor="fontSize17">Large(17px)</label>
        </div>
      </div>
      <div style={{ margin:10,borderWidth: 1, borderRadius: 20, margin: 5, borderColor: "grey" }}>
        <p style={{margin:10}}>Shortcuts</p>
      </div>



    </Box>
  );

  return (
    <div style={{ backgroundColor: light }}>
      <SwipeableDrawer
        anchor="right"
        open={state.right}
        onClose={toggleDrawer('right', false)}
        onOpen={toggleDrawer('right', true)}
      >
        {list('right')}
      </SwipeableDrawer>
    </div>
  );
}

SwipeableTemporaryDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
};
