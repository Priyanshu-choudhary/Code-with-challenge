import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useContext, useState } from 'react';
import { UserContext } from '../Context/UserContext';
import ReactMarkdown from 'react-markdown';

import { Delete } from '@mui/icons-material';


export default function ImgMediaCard({ id,permission, title, image, description, totalQuestions, handleDelete, courseId, courseName }) {
  const { bg, ibg, bc, light, role,dark } = useContext(UserContext);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [currentPermission, setCurrentPermission] = useState(permission);


  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };
  const handlePermissionChange = async () => {
    const newPermission = currentPermission === 'public' ? 'private' : 'public';
    const url = `https://hytechlabs.online:9090/Course/id/${id}`;
    const basicAuth = 'Basic ' + btoa(`OfficialCources:OfficialCources`);

    try {
      const response = await fetch(url, {
        method: 'PUT', // Use PATCH to update only the permission field
        headers: {
          'Content-Type': 'application/json',
          'Authorization': basicAuth,
        },
        body: JSON.stringify({ permission: newPermission }),
      });

      if (response.ok) {
        setCurrentPermission(newPermission); // Update the permission state if the request was successful
      } else {
        console.error('Failed to update permission:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error updating permission:', error);
    }
  };
console.log(id);
  return (

    <Card style={{ backgroundColor: light, color: ibg }} sx={{ borderRadius: "15px", maxWidth: 345, transition: 'transform 0.3s ease-in-out, background-color 0.3s ease-in-out', '&:hover': { opacity: "0.9", transform: 'scale(1.05)' } }}>
      <Box sx={{ height: 180, overflow: 'hidden' }}>
        <CardMedia
          component="img"
          alt={title}
          image={image}
          sx={{ height: '100%', objectFit: 'cover' }}
        />
      </Box>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          <p style={{ fontWeight: 'bolder' }}>{title}</p>
        </Typography>
        <Typography variant="body2" component="div">
          <pre style={{
            height: showFullDescription ? 'auto' : '6em',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: showFullDescription ? 'none' : '4',
            WebkitBoxOrient: 'vertical'
          }}> <ReactMarkdown>{description}</ReactMarkdown></pre>
          <Button size="small" onClick={toggleDescription}>
            {showFullDescription ? 'Show less' : 'Read more'}
          </Button>
        </Typography>
        <hr />
        <br />
        <div style={{display:"flex",justifyContent:"space-between"}}>
          <p>Questions: {totalQuestions}</p>
         {role=="ADMIN" && <button style={{backgroundColor:bc,padding:"5px",borderRadius:"10px"}}onClick={() => handlePermissionChange()}>{permission}</button>
  }</div>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained"
          color="error" // Using 'error' for a red color, which is suitable for actions that could be considered 'dangerous'
          sx={{
            backgroundColor: bc, // Custom red color
            '&:hover': {
              backgroundColor: ibg,
              color: bg,
              // Darker shade on hover
            },
          }}>Star</Button>
        {role == "ADMIN" ? <Button
          variant="contained"
          color="primary" // Using 'error' for a red color, which is suitable for actions that could be considered 'dangerous'
          sx={{
            backgroundColor: '#f44336', // Custom red color
            '&:hover': {
              backgroundColor: '#d32f2f', // Darker shade on hover
            },
          }}
          size="small" onClick={() => handleDelete(courseId, courseName)}>Delete</Button> : <></>}

        <p style={{ marginLeft: 'auto', backgroundColor: bc, padding: '5px 15px', borderRadius: "10px", paddingLeft: '5px', fontWeight: 'bolder' }}>*Free</p>
      </CardActions>
    </Card>

  );
}
