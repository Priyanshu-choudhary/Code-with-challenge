import React, { useState, useEffect, useContext } from 'react';
// import styles from './themes.module.css';
import Dashboard from '../dashBoard/Dashboard';
import imgUrl from "/myDroneMakingPhotoEDITED.jpg";
import logo from "/banner.png";
import logo3 from "/logo.jpg";
import styles from "/logo.jpg";
import editorphoto from "/editorphoto.png";
import HeadingSection from './headingSection';
import FeatureExample from './featureSection'
import Footer from './footer'
import Newsletter from './newsLetter'
import UserCount from './UserCount'
import { UserContext } from '../Context/UserContext';
import Typed from 'typed.js';
import mySvg from '/public/5570863.jpg'; // Ensure you have the SVG file in your project



function Home() {
  const [typedInstance, setTypedInstance] = useState(null);

  const { ibg, bc, bg, light, dark } = useContext(UserContext);
  const [theme, settheme] = useState(bc);
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
  const Card = ({ background, hoverBackground, width, height, title, subtitle, imageUrl, imageWidth, imageHeight }) => {

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
              bottom: '5px',
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
    <div style={{ backgroundColor: bg, color: ibg }}>
      <Dashboard />
      <div >


        <section style={divStyle}>
          <div className="container" style={{ position: "relative", height: "100vh" }}>
            <div className="row align-items-center">
              <div className="col-12 col-md-5">
                <div className="headline typing-element" style={{ marginTop: "200px", color: "black", fontSize: "50px", fontWeight: "bolder" }}>
                  {/* Placeholder for headline content */}
                   

                </div>
                <div className="cta-holder row gx-md-3 gy-3 gy-md-0">
                    <div className="col-12 col-md-auto">
                      <a className="btn btn-primary w-100" href="https://code-with-challenge.vercel.app/data" style={buttonStyles}>Sign Up</a>
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
                    subtitle="Skill Development Space"
                    imageUrl="./code.png"
                    imageWidth={70}
                    imageHeight={70}
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
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "400px", marginLeft: "20px" }}>
                  <Card
                    background="#98C2F6"
                    hoverBackground="lightgreen"
                    width="250px"
                    height="200px"
                    title="Discover"
                    subtitle="Creative Exploration"
                    imageUrl="./descover.png"
                    imageWidth={220}
                    imageHeight={180}
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
                  />
                </div>
              </div>
            </div>
          </div>
        </section>


        <FeatureExample />
        <section id="benefits-section" className={`${styles.benefitsSection} theme-bg-light-gradient py-5`}>
          <div className="container py-5">
            <h2 className="section-heading text-center mb-3" style={{ fontSize: "40px" }}>What Will You Get From This Website?</h2>
            <div className="section-intro single-col-max mx-auto text-center mb-5">"Coding platform, where your journey to mastery begins! Dive into a wealth of Data Structures and Algorithms challenges, explore diverse topics with our filter options, and engage in specialized courses tailored to your interests. With our intuitive code editor, you can practice coding anytime, anywhere. Track your progress seamlessly, compete in thrilling hackathons and contests, and unlock your full potential as a coder. Join us today and embark on a rewarding journey towards coding excellence!"
            </div>
            <div className="row text-center">
              <div className="item col-12 col-md-6 col-lg-4">
                <div className="item-inner p-3 p-lg-4">
                  <div className="item-header mb-3">
                    <div className="item-icon"><i className="fas fa-laptop-code"></i></div>
                    <h3 className="item-heading" style={{ fontSize: "20px" }}>DSA</h3>
                  </div>
                  <div className="item-desc">
                    Data Structures and Algorithms Challenges: Sharpen your problem-solving skills with a wide range of DSA challenges.
                  </div>
                </div>
              </div>
              <div className="item col-12 col-md-6 col-lg-4">
                <div className="item-inner p-3 p-lg-4">
                  <div className="item-header mb-3">
                    <div className="item-icon"><i className="fab fa-js-square"></i></div>
                    <h3 className="item-heading" style={{ fontSize: "20px" }}>Topic-Based Filtering:</h3>
                  </div>
                  <div className="item-desc">
                    Explore specific coding topics such as arrays, competitive programming, and strings effortlessly.
                  </div>
                </div>
              </div>
              <div className="item col-12 col-md-6 col-lg-4">
                <div className="item-inner p-3 p-lg-4">
                  <div className="item-header mb-3">
                    <div className="item-icon"><i className="fab fa-rocketchat"></i></div>
                    <h3 className="item-heading" style={{ fontSize: "20px" }}>Specialized Courses:</h3>
                  </div>
                  <div className="item-desc">
                    Dive deep into focused subjects with our curated selection of specialized courses.
                  </div>
                </div>
              </div>
              <div className="item col-12 col-md-6 col-lg-4">
                <div className="item-inner p-3 p-lg-4">
                  <div className="item-header mb-3">
                    <div className="item-icon"><i className="fab fa-angular"></i></div>
                    <h3 className="item-heading" style={{ fontSize: "20px" }}>Online Code Editor:</h3>
                  </div>
                  <div className="item-desc">
                    Code anytime, anywhere with our user-friendly online code editor.
                  </div>
                </div>
              </div>
              <div className="item col-12 col-md-6 col-lg-4">
                <div className="item-inner p-3 p-lg-4">
                  <div className="item-header mb-3">
                    <div className="item-icon"><i className="fab fa-vuejs"></i></div>
                    <h3 className="item-heading" style={{ fontSize: "20px" }}>Progress Tracking:</h3>
                  </div>
                  <div className="item-desc">
                    Monitor your growth and improvement with personalized progress tracking tools.
                  </div>
                </div>
              </div>
              <div className="item col-12 col-md-6 col-lg-4">
                <div className="item-inner p-3 p-lg-4">
                  <div className="item-header mb-3">
                    <div className="item-icon"><i className="fab fa-react"></i></div>
                    <h3 className="item-heading" style={{ fontSize: "20px" }}>Hackathons</h3>
                  </div>
                  <div className="item-desc">
                    Hackathons and Contests: Compete in exhilarating hackathons and contests to test your skills and win rewards.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <HeadingSection />
        <section id="content-section" className={styles.contentSection}>
          <div className="container">
            <div className="single-col-max mx-auto">
              <h2 className="section-heading text-center mb-5" style={{ fontSize: "40px" }}>What's Included</h2>
              <div className="row">
                <div className="col-12 col-md-6">
                  <div className="figure-holder mb-5">
                    <img className="img-fluid" style={{ display: "flex", justifyContent: "center", alignItems: "center", overflow: "hidden", height: "300px", width: "400px", borderRadius: "5%" }} src={logo3} alt="image" />
                  </div>
                </div>
                <div className="col-12 col-md-6 mb-5">
                  <div className="key-points mb-4 text-center">
                    <ul className="key-points-list list-unstyled mb-4 mx-auto d-inline-block text-start" style={{ padding: "40px", fontSize: "20px" }}>
                      {[
                        " Data Structures and Algorithms Challenges",
                        " Topic-Based Filtering",
                        "Specialized Courses",
                        "Online Code Editor",
                        "Progress Tracking",
                        " Hackathons and Contests",
                      ].map((text, index) => (
                        <li key={index}>

                          {text}
                        </li>
                      ))}
                    </ul>
                    <div className="text-center">
                      <a className="btn btn-primary" style={buttonStyles} role='button' href="https://themes.3rdwavemedia.com/bootstrap-templates/startup/devbook-free-bootstrap-5-book-ebook-landing-page-template-for-developers/">
                        try it
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        <h2 className="section-heading text-center" style={{ fontSize: "40px" }}>User Count</h2>
        <UserCount />


        <section id="audience-section" className={`${styles.audienceSection} py-5`}>
          <div className="container">
            <h2 className="section-heading text-center mb-4" style={{ fontSize: "40px", margin: "20px" }}>Who This Website Is For</h2>
            <div className="section-intro single-col-max mx-auto text-center mb-5" style={{ fontSize: "20px", margin: "20px" }}>
              "Code-For-Challenge is for coding enthusiasts, including college students. Whether you're a beginner or a seasoned developer, our platform offers challenges, tutorials, and contests to enhance your skills and excel in coding interviews, competitive programming, and problem-solving."
            </div>
            <div className="audience mx-auto">
              {[
                { title: 'Collage Students', },
                { title: 'Beginners/seasoned', },
                { title: 'Professional', },
                { title: 'Hobbyist', },
              ].map((item, index) => (
                <div className="item row gx-3" key={index} style={{ fontSize: "20px", margin: "20px" }}>
                  <div className="col-auto item-icon"></div>
                  <div className="col">
                    <h4 className="item-title">{item.title}</h4>
                    <div className="item-desc">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <div style={{ marginBottom: "3px" }}>
          <Newsletter />
        </div>
        <Footer />

        {/* <section id="author-section" className={`py-5`} style={{ backgroundColor: color }} >
          <div className="container py-3" style={{ borderColor: color }}>
            <div className="author-profile text-center mb-5" style={{ display: "flex", justifyContent: "center", alignItems: "center", overflow: "hidden", height: "250px", width: "250px", borderRadius: "50%" }}>
              <img className="author-pic" src={imgUrl} alt="image" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>

            <h2 className="section-heading text-center text-white mb-3" style={{ fontSize: "30px" }}>About The Developer</h2>
            <div className="author-bio single-col-max mx-auto">
              <p style={{ color: "white" }}>
                "I am Yadi Choudhary, a passionate student of the Computer Science and Engineering department. In my pursuit of enhancing coding skills and fostering a culture of continuous learning, I embarked on a journey to create Code-For-Challenge. This platform, born from my love for coding and innovation, stands as a testament to my commitment to empower fellow enthusiasts and aspiring developers. With Code-For-Challenge, I aimed to bridge the gap between theory and practice, offering a space where individuals can immerse themselves in a world of coding challenges, contests, and growth opportunities. Join me on this exhilarating journey as we unlock the endless possibilities of coding together.
              </p>
              <div className="author-links text-center pt-4">
                <h5 className="text-white mb-4">Follow Author</h5>
                <ul className="social-list list-unstyled" style={{color:"black", fontWeight:"bolder"}}>
                  <li className="list-inline-item"><a href="#">Twitter</a></li>
                  <li className="list-inline-item"><a href="https://github.com/Priyanshu-choudhary">GitHub</a></li>
                  <li className="list-inline-item"><a href="https://broyadi23.wixsite.com/my-site-1">Blog-Website</a></li>
                </ul>
              </div>
            </div>
          </div>
        </section> */}
      </div>
    </div>
  );
}

export default Home;
