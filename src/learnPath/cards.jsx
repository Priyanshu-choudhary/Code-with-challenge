import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import { useContext } from 'react';
import { UserContext } from '../Context/UserContext';
export default function ImgMediaCard({ title, image, description, progress }) {
  const {ibg,bc, bg, light,dark } = useContext(UserContext);

  return (
    <Card style={{backgroundColor:light,color:ibg}}sx={{ borderRadius:"15px",maxWidth: 345, transition: 'transform 0.3s ease-in-out, background-color 0.3s ease-in-out', '&:hover': {opacity: "0.9", transform: 'scale(1.05)' } }}>
      <Box sx={{ height: 180, overflow: 'hidden' }} >
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
        <Typography variant="body2" >
          {description}
        </Typography>
        <hr />
        <br />
        <p>Questions: 30</p>

      </CardContent>
      <CardActions>
        <Button size="small">Star</Button>
        <p style={{ marginLeft: 'auto', backgroundColor: bc, padding: '5px 15px',borderRadius:"10px", paddingLeft: '5px', fontWeight: 'bolder' }}>*Free</p>
      </CardActions>
    </Card>
  );
}
