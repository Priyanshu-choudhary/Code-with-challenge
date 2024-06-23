import React, { useState, useEffect, useContext } from 'react';
// import styles from './themes.module.css';
import Dashboard from '../dashBoard/Dashboard';
import imgUrl from "/myDroneMakingPhotoEDITED.jpg";
import logo from "/banner.png";
import logo3 from "/logo.jpg";
import styles from "/logo.jpg";
import HeadingSection from './headingSection';
import FeatureExample from './featureSection'
import Footer from './footer'
import Newsletter from './newsLetter'
import UserCount from './UserCount'
import { UserContext } from '../Context/UserContext';
import Typed from 'typed.js';
import mySvg from '/public/5570863.jpg'; // Ensure you have the SVG file in your project
import ScrollableCardList from './ScrollableCardList';
import Footer2 from './Footer2';

import { useNavigate, useLocation } from 'react-router-dom';



function Home() {
  const [typedInstance, setTypedInstance] = useState(null);

  const { ibg, bc, bg, light, dark } = useContext(UserContext);
  const [theme, settheme] = useState(bc);
  const navigate = useNavigate();

  useEffect(() => {
    const options = {
      strings: ["Elevate Your Coding Skills"],
      typeSpeed: 50,
      // backSpeed: 50,
      // loop: true
    };

    const typed = new Typed('.typing-element', options);
    setTypedInstance(typed);
    return () => { };
  }, []);

  const buttonStyles = {
    alignItems: 'center',
    appearance: 'none',
    backgroundColor: bc,
    borderRadius: '24px',
    borderStyle: 'none',
    // boxShadow: 'rgba(0, 0, 0, .2) 0 3px 5px -1px, rgba(0, 0, 0, .14) 0 6px 10px 0, rgba(0, 0, 0, .12) 0 1px 18px 0',
    boxSizing: 'border-box',
    color: ibg,
    cursor: 'pointer',
    display: 'inline-flex',
    fill: 'currentcolor',
    fontFamily: '"Google Sans", Roboto, Arial, sans-serif',
    fontSize: '14px',
    fontWeight: "bold",
    height: '48px',
    justifyContent: 'center',
    letterSpacing: '.25px',
    lineHeight: 'normal',
    maxWidth: '100%',
    overflow: 'visible',
    padding: '2px 44px',
    position: 'relative',
    textAlign: 'center',
    textTransform: 'none',
    transition: 'box-shadow 280ms cubic-bezier(.4, 0, .2, 1), opacity 15ms linear 30ms, transform 270ms cubic-bezier(0, 0, .2, 1) 0ms',
    userSelect: 'none',
    WebkitUserSelect: 'none',
    touchAction: 'manipulation',
    width: 'auto',
    willChange: 'transform, opacity',
    zIndex: 0,
    '&:hover': {
      background: '#F6F9FE',
      color: '#174ea6',
    },
    '&:active': {
      boxShadow: '0 4px 4px 0 rgb(60 64 67 / 30%), 0 8px 12px 6px rgb(60 64 67 / 15%)',
      outline: 'none',
    },
    '&:focus': {
      outline: 'none',
      border: '2px solid #4285f4',
    },
    '&:not(:disabled)': {
      boxShadow: 'rgba(60, 64, 67, .3) 0 1px 3px 0, rgba(60, 64, 67, .15) 0 4px 8px 3px',
    },
    '&:not(:disabled):hover': {
      boxShadow: 'rgba(60, 64, 67, .3) 0 2px 3px 0, rgba(60, 64, 67, .15) 0 6px 10px 4px',
    },
    '&:not(:disabled):focus': {
      boxShadow: 'rgba(60, 64, 67, .3) 0 1px 3px 0, rgba(60, 64, 67, .15) 0 4px 8px 3px',
    },
    '&:not(:disabled):active': {
      boxShadow: 'rgba(60, 64, 67, .3) 0 4px 4px 0, rgba(60, 64, 67, .15) 0 8px 12px 6px',
    },
    '&:disabled': {
      boxShadow: 'rgba(60, 64, 67, .3) 0 1px 3px 0, rgba(60, 64, 67, .15) 0 4px 8px 3px',
    },
  };
  const divStyle = {
    width: '100%',
    height: '100vh',
    backgroundImage: `url(${mySvg})`,
    backgroundSize: 'cover', // Adjust as needed
    backgroundPosition: 'center', // Adjust as needed
    backgroundRepeat: 'no-repeat', // Adjust as needed
  };

  const [color, setcolor] = useState("#ed6524")
  const [isHovered, setIsHovered] = useState(false);
  const Card = ({ onClick,background, hoverBackground, width, height, title, subtitle, imageUrl, imageWidth, imageHeight }) => {
  
    const [isHovered, setIsHovered] = useState(false);

    const handleHover = () => {
      setIsHovered(true);
    };

    const handleUnhover = () => {
      setIsHovered(false);
    };

    return (
      <div
        style={{
          position: 'relative', // Ensure position relative for absolute positioning of image
          background: background,
          marginTop: "20px",
          borderRadius: "10px",
          height: height,
          width: width,
          boxShadow: isHovered ? '8px 5px 8px rgba(0, 0, 0, 0.3)' : '8px 5px 8px rgba(0, 0, 0, 0.1)',
          transform: isHovered ? 'translateY(-15px)' : 'translateY(0)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          marginLeft: "10px",
        }}
        onMouseEnter={handleHover}
        onMouseLeave={handleUnhover}
        onClick={onClick}
      >
        <p style={{ padding: "10px", fontSize: 20, fontWeight: "bolder" }}>{title}</p>
        <p style={{ paddingLeft: "10px", fontSize: 14 }}>{subtitle}</p>

        {/* Image positioned in the bottom-right corner */}
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Small Image"
            style={{
              position: 'absolute',
              bottom: '0px',
              right: '5px',
              width: imageWidth ? `${imageWidth}px` : 'auto',
              height: imageHeight ? `${imageHeight}px` : 'auto',
              // borderRadius: '50%',
              // border: '2px solid white', // Example border styling
            }}
          />
        )}
      </div>
    );
  };


  return (
    <div >
      <Dashboard />
      <div >
        <section style={divStyle}>
          <div className="container" style={{ position: "relative", height: "100vh" }}>
            <div className="row align-items-center">
              <div className="col-12 col-md-5">
                <div className="headline typing-element" style={{ marginTop: "200px", color: "black", fontSize: "50px", fontWeight: "bolder" }}>
                  {/* Placeholder for headline content */}


                </div>
                <p style={{ color: "black", fontWeight: "bold" }}>Explore, code, compete: Courses, challenges, hackathons - your ultimate coding destination</p>
                <div className="cta-holder row gx-md-3 gy-3 gy-md-0">
                  <div className="col-12 col-md-auto">
                    <a className="btn btn-primary w-100" href="https://code-with-challenge.vercel.app/login" style={buttonStyles}>Sign Up</a>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6" style={{ position: "absolute", bottom: "100px", right: "0px", display: "flex" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Card
                    background="lightgreen"
                    hoverBackground="lightblue"
                    width="250px"
                    height="115px"
                    title="Learn"
                    subtitle="Skill Development"
                    imageUrl="./learn.png"
                    imageWidth={120}
                    imageHeight={100}
                    onClick={() => navigate('/learn')}
                   
                    

                  />
                  <Card
                    background="#DFB1EC"
                    hoverBackground="lightblue"
                    width="250px"
                    height="115px"
                    title="Practice"
                    subtitle="Skill Development"
                    imageUrl="./practice.png"
                    imageWidth={100}
                    imageHeight={100}
                    onClick={() => navigate('/data')}
                  />
                  <Card
                    background="#F7BF69"
                    hoverBackground="lightblue"
                    width="250px"
                    height="115px"
                    title="Courses"
                    subtitle="Skill Development"
                    imageUrl="./cources.png"
                    imageWidth={100}
                    imageHeight={100}
                    onClick={() => navigate('/learn')}
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "400px", marginLeft: "20px" }}>
                  <Card
                    background="#98C2F6"
                    hoverBackground="lightgreen"
                    width="250px"
                    height="200px"
                    title="Compiler"
                    subtitle="A online Editor"
                    imageUrl="./girl.png"
                    
                    // imageUrl="./myDroneMakingPhotoEDITED-removebg-preview.png"
                    imageWidth={110}
                    imageHeight={170}
                    onClick={() => navigate('/EditorComponent')}
                  />
                  <Card
                    background="#EFC3CA"
                    hoverBackground="lightgreen"
                    width="250px"
                    height="200px"
                    title="Compete"
                    subtitle="Creative Exploration"
                    imageUrl="./complete.webp"
                    imageWidth={180}
                    imageHeight={120}
                    onClick={() => navigate('/leaderboard')}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>


        <FeatureExample />

        <ScrollableCardList />

        <HeadingSection />

        <h2 className="section-heading text-center" style={{ fontSize: "40px", fontWeight: "bold" }}>User Count</h2>
        <UserCount />

        <Newsletter />

        <Footer />

        <Footer2 />
      </div>
    </div>
  );
}

export default Home;
