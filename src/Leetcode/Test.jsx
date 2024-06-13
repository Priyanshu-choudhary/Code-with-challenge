import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import TerminalOutlinedIcon from '@mui/icons-material/TerminalOutlined';

export default function IconBreadcrumbs({ title = '', question = '' }) {
  const navigate = useNavigate();

  const handleClick = (event, path) => {
    event.preventDefault();
    navigate(path);
  };

  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
          href="/"
          onClick={(e) => handleClick(e, '/learn')}
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Learn Skills
        </Link>
        <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
          href="/material-ui/getting-started/installation/"
          onClick={(e) => handleClick(e, '/learn')}
        >
          <MenuBookOutlinedIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          {title}
        </Link>
        {question && <Typography
          sx={{ display: 'flex', alignItems: 'center' }}
          color="text.primary"
        >
          <TerminalOutlinedIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          {question}
        </Typography>}
      </Breadcrumbs>
    </div>
  );
}
