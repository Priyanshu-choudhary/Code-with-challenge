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


  return (

    <Card style={{ backgroundColor: light, color: ibg }} sx={{ borderRadius: "15px", maxWidth: 300, transition: 'transform 0.3s ease-in-out, background-color 0.3s ease-in-out', '&:hover': { opacity: "0.9", transform: 'scale(1.05)' } }}>
      <Box sx={{ height: 150, overflow: 'hidden' }}>
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
        <hr />
        <br />
        <div style={{display:"flex",justifyContent:"space-between"}}>
          <p>Questions: {totalQuestions}</p>
         {role=="ADMIN" && <button style={{backgroundColor:bc,padding:"5px",borderRadius:"10px"}}>{permission}</button>}
  </div>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained"
          color="error"
          sx={{
            backgroundColor: bc, 
            '&:hover': {
              backgroundColor: ibg,
              color: bg,
      
            },
          }}>Start</Button>

        <p style={{ marginLeft: 'auto', backgroundColor: bc, padding: '5px 15px', borderRadius: "10px", paddingLeft: '5px', fontWeight: 'bolder' }}>*Free</p>
      </CardActions>
    </Card>

  );
}
