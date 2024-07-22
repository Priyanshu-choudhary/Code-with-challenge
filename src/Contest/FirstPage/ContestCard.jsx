import React, { useContext } from 'react';
import { UserContext } from '/src/Context/UserContext';
import '/src/App.css';
import { useNavigate } from 'react-router-dom';
function ContestCard({ contest }) {
  const { bg, light, dark } = useContext(UserContext);
  const navigate = useNavigate();

  const handleContestClick = (id) => {
    console.log("click");
    navigate(`/ContestDetail/${id}`);
  };

  return (
    <div className="contest-card" onClick={() => handleContestClick(contest.id)}>
      <img src={contest.bannerImage} alt="Banner" />
      <div className="content3">
        <p className="divider"></p>
        <div >
          <p>{contest.nameOfContest}</p>
          <p>{new Date(contest.date).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}

export default ContestCard;
