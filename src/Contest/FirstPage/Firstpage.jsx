import React, { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '/src/Context/UserContext';
import Dashboard from '/src/dashBoard/Dashboard';
import ContestCard from '/src/Contest/ContestCard';
import NavBar from './navbar';
import Footer2 from '../../home/Footer2';
import "/src/App.css";

function Firstpage() {
  const [contests, setContests] = useState([]);
  const { bg, light, dark, ibg } = useContext(UserContext);
  const [navbar, setNavbar] = useState(0);
  const [navHeading, setNavHeading] = useState("Upcoming Contests");
  const scrollContainerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const headings = [
      "Upcoming Contests",
      "Recent Contests",
      "Your Favorites",
      "Tests",
      "Quiz",
      "Hackathon",
      "Give Test to get Certificate"
    ];
    setNavHeading(headings[navbar]);
  }, [navbar]);

  useEffect(() => {
    axios.get('https://hytechlabs.online:9090/Contest')
      .then(response => {
        setContests(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the contest data!', error);
      });
  }, []);

  const handleContestClick = (id) => {
    console.log("click");
    navigate(`/ContestDetails/${id}`);
  };

  const scroll = (scrollOffset) => {
    scrollContainerRef.current.scrollLeft += scrollOffset;
  };

  useEffect(() => {
    const autoScroll = setInterval(() => {
      scroll(1);
    }, 10);

    return () => clearInterval(autoScroll);
  }, []);

  return (
    <div className="main-container">
      <Dashboard />
      <section className="featured-opportunities">
        <p className="separator"></p>
        <img src="Designer (1).png" alt="CFC Contest page" />
        <p className="separator"></p>

        <div className="heading">
          <h2>Featured Opportunities from Leading Organizations</h2>
          <p style={{ color: "grey" }}><i>Explore through carefully selected opportunities from leading organizations.</i></p>
          <p className="separator"></p>
          <h2><u>Latest</u></h2>
          <div className="contest-list" ref={scrollContainerRef}>
            {contests.map(contest => (
              contest.id === '669568c5857e730fbb67141c' && 
              <ContestCard key={contest.id} contest={contest}   />
            ))}
          </div>
        </div>
        <div className="navbar-container">
          <p className="separator"></p>
          <NavBar setnavbar={setNavbar} />
          <h2>{navHeading}</h2>
          <div className="contest-list2" ref={scrollContainerRef}>
            <button className="scroll-button left" onClick={() => scroll(-300)}>&lt;</button>
            {contests.map(contest => (
              <ContestCard key={contest.id} contest={contest} onClick={() => handleContestClick(contest.id)} />
            ))}
            <button className="scroll-button right" onClick={() => scroll(300)}>&gt;</button>
          </div>
        </div>
      </section>
      <Footer2 />
    </div>
  );
}

export default Firstpage;
