import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { useContext, useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import TerminalOutlinedIcon from '@mui/icons-material/TerminalOutlined';
import logo from "/logo2.png"

import { UserContext } from '../Context/UserContext';

export default function IconBreadcrumbs({ currentPage = '', title = '', question = '', history = [] }) {
  const navigate = useNavigate();

  const { ibg,light } = useContext(UserContext);

  const handleClick = (event, path, state) => {
    event.preventDefault();
    console.log("c>>>>" + currentPage);
    // console.log("title>>>",title);
    if (currentPage == "Problem Set") {
      path = '/data';
      console.log("path> " + path);
    } else if (currentPage == "Learn Skills") {
      path = '/learn';
      console.log("path> " + path);
    }
    navigate(path, { state });
  };

  return (
    <div role="presentation" style={{ display: "flex" }}>
     
        <a href="/">
          <img height={40} width={70} src={logo} style={{ marginLeft: 5,padding:5 }} alt='logo' />
        </a>
       
     
      <Breadcrumbs aria-label="breadcrumb" style={{ paddingTop: 7 }}>
        <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="grey"
          href="/"
          onClick={(e) => handleClick(e, { currentPage }, { history })}
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          {currentPage}
        </Link>
        {title[0] && <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="grey"
          href="/material-ui/getting-started/installation/"
          onClick={(e) => handleClick(e, '/learn', { history })}
        >
          <MenuBookOutlinedIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          {title}
        </Link>}
        {question && (
          <Typography
            sx={{ display: 'flex', alignItems: 'center' }}
            color="grey"
          >
            <TerminalOutlinedIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            {question}
          </Typography>
        )}
      </Breadcrumbs>
    </div>
  );
}
