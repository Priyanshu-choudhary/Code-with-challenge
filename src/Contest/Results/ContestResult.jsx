import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { UserContext } from '/src/Context/UserContext';
import '/src/ProblemList.css';
import Dashboard from '../../dashBoard/Dashboard';
import UserOwnResult from './UserOwnResult';

function ContestResult() {
  const [participants, setParticipants] = useState([]);
  const [contestName, setContestName] = useState("");
  const [responseOk, setResponseOk] = useState(true);
  const [loading, setLoading] = useState(true);
  const [userRank, setUserRank] = useState(null);
  const location = useLocation();
  const { contest } = location.state || {}; // Default to an empty object if state is undefined
  const { light, dark, ibg, user } = useContext(UserContext);

  useEffect(() => {
    const fetchUserBasedOnContestName = async () => {
      const API_URL = `https://hytechlabs.online:9090/UserDetailsContest/findby/${contest.nameOfContest}`;
      setLoading(true);

      try {
        const response = await fetch(API_URL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 204) {
          setParticipants([]);
        } else if (response.status === 304) {
          setResponseOk(true);
        } else if (response.ok) {
          const data = await response.json();
          console.log("data "+JSON.stringify(data));
          const participantNames = data.map(participant => participant.name);
          const userIndex = participantNames.indexOf(user); // Assuming `user.name` is available in context

          setParticipants(participantNames);
          setContestName(data[0].contestDetails[0].nameOfContest);
          setUserRank(userIndex); 
          setResponseOk(true);
        } else {
          setResponseOk(false);
        }
      } catch (error) {
        console.error('Error fetching participants:', error);
        setResponseOk(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUserBasedOnContestName();
  }, [contest.nameOfContest, user]);

  return (
    <>
      <Dashboard />
      <div className="ProblemList-container" style={{ backgroundColor: light, color: ibg, width: "100%", height: "140vh" }}>
        <div className="ProblemList-items" style={{ backgroundColor: light, color: ibg }}>
          <div style={{display:"flex",position:"absolute",right:10,top:120,backgroundColor:"white",borderRadius:10}}>
            <UserOwnResult totalParticipants={participants.length} yourRank={userRank+1} />
          </div>
          <div className="ProblemList-items-head">
            <div style={{ display: "flex", gap:0 }}>
              <p style={{ color: ibg }}>Participants List</p>
              <p style={{ color: ibg }}>/</p>
              <p style={{ color: ibg }}>{contest.nameOfContest} </p>
              {/* <img style={{ marginTop: 10, background: dark }} src="/checklist.gif" alt="problemList" width={40} /> */}
            </div>
          </div>
          <hr />
          <div className="ProblemList-items-head"style={{ marginLeft: 20 }}>
            <h2>Users</h2>

          </div>

          <div className="ProblemList-items-body">
            {participants.length === 0 && !loading && (
              <p style={{color:"orange"}}>No participants found for this contest.</p>
            )}
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className='miniProblem2' style={{  marginTop: 15 }}>
                {participants.map((participant, index) => (
                  <p 
                    key={index} 
                    style={{
                      fontWeight: userRank === index ? 'bold' : 'normal',
                      color: userRank === index  ? '#FE9900' : 'White'
                    }}
                  >
                    {index + 1}. {participant}
                  </p>
                ))}
                {/* <p style={{ position: "absolute", left: 500 }}>{contestName}</p> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ContestResult;
