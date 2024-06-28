import React, { useState, useEffect, useContext } from 'react';
import Dashboard from '../dashBoard/Dashboard';
import imgUrl from "/myDroneMakingPhotoEDITED.jpg";
import HeadingSection from './headingSection';
import FeatureExample from './featureSection';
import Footer from './footer';
import Newsletter from './newsLetter';
import UserCount from './UserCount';
import { UserContext } from '../Context/UserContext';
import Typed from 'typed.js';
import mySvg from '/5570863.jpg'; // Ensure you have the SVG file in your project
import ScrollableCardList from './ScrollableCardList';
import Footer2 from './Footer2';
import "./home.css"
import { useNavigate } from 'react-router-dom';

function Home() {
  const [typedInstance, setTypedInstance] = useState(null);

  const { ibg, bc, bg, light, dark } = useContext(UserContext);
  const [theme, settheme] = useState(bc);
  const navigate = useNavigate();

  useEffect(() => {
    const options = {
      strings: ["Elevate Your Coding Skills"],
      typeSpeed: 50,
    };

    const typed = new Typed('.typing-element', options);
    setTypedInstance(typed);
    return () => { };
  }, []);

  const divStyle = {
    width: '100%',
    height: '100vh',
    backgroundImage: `url(${mySvg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  const Card = ({ onClick, background, hoverBackground, width, height, title, subtitle, imageUrl, imageWidth, imageHeight }) => {

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
          position: 'relative',
          background: background,
          marginTop: "20px",
          borderRadius: "10px",
          height: height,
          width: width,
          boxShadow: isHovered ? '8px 5px 8px #00B7FF' : '8px 5px 8px rgba(0, 0, 0, 0.1)',
          transform: isHovered ? 'translateY(-15px)' : 'translateY(0)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          marginLeft: "50px",
          
        }}
        onMouseEnter={handleHover}
        onMouseLeave={handleUnhover}
        onClick={onClick}
      >
        <p style={{ padding: "10px", fontSize: 20, fontWeight: "bolder" }}>{title}</p>
        <p style={{ paddingLeft: "10px", fontSize: 14 }}>{subtitle}</p>

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
            }}
          />
        )}
      </div>
    );
  };

  return (
    <div>
      <Dashboard />
      <div style={{}}>
          <section style={divStyle}>
          <div className="container" >
            <div className="row align-items-center">
              <div className="MyHeading col-12 col-md-5" style={{ marginTop: "150px" }}>
                <div className="headline typing-element" style={{ color: "black", fontSize: "50px", fontWeight: "bolder" }}>
                </div>
                <p style={{ color: "black", fontWeight: "bold" }}>Explore, code, compete: Courses, challenges, hackathons - your ultimate coding destination</p>
                <div className="cta-holder row gx-md-3 gy-3 gy-md-0">
                  <div className="col-12 col-md-auto">
                    <a className="btn btn-primary w-100" href="https://code-with-challenge.vercel.app/login">Sign Up</a>
                  </div>
                </div>
              </div>
              <div className="MyCards col-12 col-md-6">
                <div className="card-container " >
                  <div className="card-row">
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
                  <div className="card-column">
                    <Card
                      background="#98C2F6"
                      hoverBackground="lightgreen"
                      width="250px"
                      height="200px"
                      title="Compiler"
                      subtitle="A online Editor"
                      imageUrl="./girl.png"
                      imageWidth={110}
                      imageHeight={180}
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
          </div>
        </section>

        <div className="content-sections">
          <FeatureExample />
          <ScrollableCardList />
          <HeadingSection />
        </div>

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
