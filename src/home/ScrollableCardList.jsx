import * as React from 'react';
// import { Navigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';
import './home.css'; // Ensure the CSS file is imported

const ImgMediaCard = styled(({ title, description, image, onHover, onLeave, onClick, ...otherProps }) => (
  <Card
    {...otherProps}
    onMouseEnter={onHover}
    onMouseLeave={onLeave}
    onClick={onClick}
    sx={{
      maxWidth: 300,
      m: 2,
      transition: 'transform 0.3s ease-in-out',
      cursor: 'pointer',
    }}
  >
    <CardMedia
      component="img"
      alt={title}
      height="140"
      image={image}
      sx={{ height: '200px', objectFit: 'cover' }}
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Enroll</Button>
      <Button size="small">Learn More</Button>
      <p style={{ marginLeft: 'auto', backgroundColor: 'gold', padding: '5px 15px', borderRadius: '10px', paddingLeft: '5px', width:"55px" ,fontSize:"18px"}}>*Free</p>
    </CardActions>
  </Card>
))(({ theme }) => ({
  '&:hover': {
    transform: 'scale(1.05) translateY(-15px)',
  },
}));

const ScrollableCardList = () => {
  const scrollRef = React.useRef(null);
  const intervalRef = React.useRef(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    const scrollContainer = scrollRef.current;
    const scrollStep = 1;
    const delay = 20;

    const scroll = () => {
      if (scrollContainer.scrollLeft + scrollContainer.offsetWidth >= scrollContainer.scrollWidth) {
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft += scrollStep;
      }
    };

    intervalRef.current = setInterval(scroll, delay);

    return () => clearInterval(intervalRef.current);
  }, []);

  const handleMouseEnter = () => {
    clearInterval(intervalRef.current);
  };

  const handleMouseLeave = () => {
    const scrollContainer = scrollRef.current;
    const scrollStep = 1;
    const delay = 20;

    const scroll = () => {
      if (scrollContainer.scrollLeft + scrollContainer.offsetWidth >= scrollContainer.scrollWidth) {
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft += scrollStep;
      }
    };

    intervalRef.current = setInterval(scroll, delay);
  };

  const handleCardClick = (title) => {
    navigate(`/learn/`);
  };

  const cardsData = [
    {
      title: 'DSA',
      description: 'Data Structures and Algorithms: Learn the essential concepts and techniques for efficient problem-solving.',
      image: 'DSA.png',
    },
    {
      title: 'Java Basics',
      description: 'Java Basics: Understand the fundamentals of Java programming language.',
      image: '/Designer.png',
    },
    {
      title: 'WebDev',
      description: 'Web Development: Explore the world of web technologies and build dynamic websites.',
      image: 'R.jpeg',
    },
    {
      title: 'React',
      description: 'React: Learn how to build interactive user interfaces using React.',
      image: 'react.jpg',
    },
    // Add more card data as needed
  ];

  return (
    <div className='MyImgMediaCard'>
      <p style={{ marginLeft: '30px', fontSize: '30px', fontWeight: 'bold', color: 'black' }}>Our Courses</p>
      <Box ref={scrollRef} sx={{ display: 'hidden', overflowX: 'scroll', padding: 2 }}>
        {cardsData.map((card, index) => (
          <ImgMediaCard
            key={index}
            title={card.title}
            description={card.description}
            image={card.image}
            onHover={handleMouseEnter}
            onLeave={handleMouseLeave}
            onClick={() => handleCardClick(card.title)}
          />
        ))}
      </Box>
    </div>
  );
};

export default ScrollableCardList;
