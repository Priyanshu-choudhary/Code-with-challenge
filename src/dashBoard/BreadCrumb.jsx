import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import TerminalOutlinedIcon from '@mui/icons-material/TerminalOutlined';

export default function IconBreadcrumbs({currentPage='', title = '', question = '', history = [] }) {
  const navigate = useNavigate();

  const handleClick = (event, path, state) => {
    event.preventDefault();
    console.log("c>>>>"+currentPage);
    if(currentPage=="Problem Set"){
        path='/data';
        console.log("path> "+ path);
    }else if(currentPage=="Learn Skills"){
      path='/learn';
      console.log("path> "+ path);
  }
    navigate(path, { state });
  };

  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
          href="/"
          onClick={(e) => handleClick(e, {currentPage}, { history })}
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
         {currentPage}
        </Link>
      { title && <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
          href="/material-ui/getting-started/installation/"
          onClick={(e) => handleClick(e, '/learn', { history })}
        >
          <MenuBookOutlinedIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          {title}
        </Link>}
        {question && (
          <Typography
            sx={{ display: 'flex', alignItems: 'center' }}
            color="text.primary"
          >
            <TerminalOutlinedIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            {question}
          </Typography>
        )}
      </Breadcrumbs>
    </div>
  );
}
