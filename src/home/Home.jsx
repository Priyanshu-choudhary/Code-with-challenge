import React, { useState ,useEffect,useContext} from 'react';
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


function Home() {
  const [typedInstance, setTypedInstance] = useState(null);
 
  const {ibg, bc,bg, light,dark } = useContext(UserContext);
  const [theme, settheme] = useState(bc);
  useEffect(() => {
    const options = {
      strings: ["Welcome to: Code-for-Challenge: Elevate Your Coding Skills"],
      typeSpeed: 30,
      // backSpeed: 50,
      // loop: true
    };

    const typed = new Typed('.typing-element', options);
    setTypedInstance(typed);

    // No cleanup function, Typed instance won't be destroyed

    // Return empty function to avoid eslint warning about missing dependencies
    return () => {};
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


  const [color, setcolor] = useState("#ed6524")
  return (
    <div style={{backgroundColor:bg,color:ibg}}>
      <Dashboard />
      <div >
       
        <header className={styles.header}>
          {/* <img style={{ display: "flex", justifyContent: "center", alignItems: "center", overflow: "hidden", height: "300px", width: "100%" }} src={logo} alt="image" /> */}
        </header>

        <section className={styles.heroSection}>
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-7 pt-5 mb-5 align-self-center">
                <div className="promo pe-md-3 pe-lg-5">
                  {/* <h1 className="headline mb-3" style={{ fontSize: "40px", fontWeight: "bolder" }}>
                  
                    Welcome to: <br />Code-for-Challenge: Elevate Your Coding Skills
                   
                  </h1> */}
                  <div className="headline mb-3 typing-element" style={{ fontSize: "40px", fontWeight: "bolder" }}>
  {/* Text will be rendered here by Typed.js */}
</div>

                  <div className="subheadline mb-3" style={{ fontSize: "20px" }}>
                    What sets us apart? Our commitment to excellence. With a vast library of challenges covering various programming languages, algorithms, and problem-solving techniques, Code for Challenge ensures that every coder finds their perfect match. Join us today and embark on a transformative journey towards coding mastery.
                  </div>
                  <div className="cta-holder row gx-md-3 gy-3 gy-md-0">
                    <div className="col-12 col-md-auto">
                      <a className="btn btn-primary w-100" href="https://code-with-challenge.vercel.app/data" style={buttonStyles}>Sign Up</a>
                    </div>
                    <div className="col-12 col-md-auto">
                      <a className="btn btn-secondary scrollto w-100" href="#benefits-section" style={{
                        alignItems: 'center',
                        appearance: 'none',
                        backgroundColor: 'white',
                        borderRadius: '24px',
                        borderStyle: "solid",
                        borderWidth: "2px",
                        borderColor: theme,
                        // borderStyle: 'none',
                        // boxShadow: 'rgba(0, 0, 0, .2) 0 3px 5px -1px, rgba(0, 0, 0, .14) 0 6px 10px 0, rgba(0, 0, 0, .12) 0 1px 18px 0',
                        boxSizing: 'border-box',
                        color: 'black',
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
                          background: '#ed6524',
                          color: 'white',
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
                      }}>Login In</a>
                    </div>
                  </div>
                  <div className="hero-quotes mt-5">
                    <div id="quotes-carousel" className="quotes-carousel carousel slide carousel-fade mb-5" data-bs-ride="carousel" data-bs-interval="8000">
                      <div className="carousel-inner">
                        <div className="carousel-item active">
                          <blockquote className="quote p-4 theme-bg-light" style={{ backgroundColor: "#f6f8fc", borderLeft: `5px solid ${theme}`,height: "100%",color:"black" }}>
                            "Code for Challenge has exceeded my expectations in every aspect. It has not only equipped me with the skills needed to tackle real-world coding tasks but has also instilled in me a newfound confidence in my abilities as a coder. I highly recommend Code for Challenge to anyone looking to embark on a rewarding journey towards coding mastery."
                          </blockquote>
                          <div className="source row gx-md-3 gy-3 gy-md-0 align-items-center">
                            <div className="col-12 col-md-auto text-center text-md-start">
                              <img className={styles.sourceProfile} style={{ display: "flex", justifyContent: "center", alignItems: "center", overflow: "hidden", height: "50px", width: "50px", borderRadius: "50%" }} src={imgUrl} alt="image" />
                            </div>
                            <div className="col source-info text-center text-md-start">
                              <div className={styles.sourceName}>Yadi Choudhary</div>
                              <div className={styles.sourceTitle}>Co-Founder, Startup</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-5 mb-5 align-self-center">
                <div className={styles.bookCoverHolder}>
                  <img className="img-fluid book-cover" src={editorphoto} alt="book cover" />
                  <div className="book-badge d-inline-block shadow"style={{ backgroundColor: "#5cb377",textAlign:"center",overflow: "hidden", height: "100px",  width: "100px", borderRadius: "50%",padding:"15px", display: "flex", fontSize:"20px",fontWeight:"bolder",color:"white"}}>
                    New <br /> Release
                  </div>
                </div>
                <div className="text-center">
                  <a className="theme-link scrollto" href="https://code-with-challenge.vercel.app/EditorComponent">Online Editor</a>
                </div>
              </div>
            </div>
          </div>
        </section>
<FeatureExample/>
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

        <HeadingSection/>
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
    <UserCount/>


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
<div style={{marginBottom:"3px"}}>
       <Newsletter/>
       </div>
        <Footer/>

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
