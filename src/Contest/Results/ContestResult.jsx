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
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [participantDetails, setParticipantDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

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
          const participantsWithDetails = data.map(participant => ({
            name: participant.name,
            startTime: participant.contestDetails[0].date,
            endTime: participant.contestDetails[0].endTime,
            posts: participant.contestDetails[0].posts,

          }));

          // Sort participants based on end time
          participantsWithDetails.sort((a, b) => new Date(a.endTime) - new Date(b.endTime));

          // Find the user's rank
          const userIndex = participantsWithDetails.findIndex(participant => participant.name === user);
          setUserRank(userIndex);

          setParticipants(participantsWithDetails);
          setContestName(data[0].contestDetails[0].nameOfContest);
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

  const fetchParticipantDetails = async (selectedParticipant) => {
    const API_URL = `https://hytechlabs.online:9090/UserDetailsContest/${selectedParticipant}/${contest.nameOfContest}`;
    setDetailsLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setParticipantDetails(data);
        console.log("user "+selectedParticipant+" "+JSON.stringify(data));
      } else {
        setParticipantDetails(null);
      }
    } catch (error) {
      console.error('Error fetching participant details:', error);
      setParticipantDetails(null);
    } finally {
      setDetailsLoading(false);
    }
  };

  const handleParticipantClick = (participant) => {
    setSelectedParticipant(participant);
    fetchParticipantDetails(participant.name);
  };

  const formatDate = (isoDate) => {
    if (!isoDate) return 'N/A';
    const date = new Date(isoDate);
    return new Intl.DateTimeFormat('en-GB', {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    }).format(date);
  };

  const calculateTimeDifference = (startDate, endDate) => {
    if (!startDate || !endDate) return 'N/A';

    const start = new Date(startDate);
    const end = new Date(endDate);

    // Calculate the difference in milliseconds
    const diff = end - start;

    // Convert milliseconds difference to hours, minutes, and seconds
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  useEffect(() => {
    //  console.log(participants);
  }, [participants])

  return (
    <>
      <Dashboard />
      <div className="ProblemList-container" style={{ backgroundColor: light, color: ibg, width: "100%", height: "140vh" }}>
        <div className="ProblemList-items" style={{ backgroundColor: light, color: ibg }}>
          <div style={{ display: "flex", position: "absolute", right: 10, top: 120, backgroundColor: "white", borderRadius: 10 }}>
            <UserOwnResult totalParticipants={participants.length} yourRank={userRank + 1} />
          </div>
          <div className="ProblemList-items-head">
            <div style={{ display: "flex", gap: 0 }}>
              <p style={{ color: ibg }}>Participants List</p>
              <p style={{ color: ibg }}>/</p>
              <p style={{ color: ibg }}>{contest.nameOfContest} </p>
              {/* <img style={{ marginTop: 10, background: dark }} src="/checklist.gif" alt="problemList" width={40} /> */}
            </div>
          </div>
          <hr />
          <div className="ProblemList-items-head" style={{ marginLeft: 20 }}>
            <h2>Users</h2>
          </div>

          <div className="ProblemList-items-body">
            {participants.length === 0 && !loading && (
              <p style={{ color: "orange" }}>No participants found for this contest.</p>
            )}
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className='' style={{ marginTop: 15 }}>
                {participants.map((participant, index) => (
                  <div
                  className='miniProblem2'
                    key={index}
                    style={{
                      display: "flex",
                      gap: 50,
                      fontWeight: userRank === index ? 'bold' : 'normal',
                      color: userRank === index ? '#FE9900' : 'White',
                      cursor: 'pointer'
                    }}
                    onClick={() => handleParticipantClick(participant)}
                  >
                    <p>{index + 1}. {participant.name}</p>
                    {participant.endTime && <p style={{ position: "absolute", left: 300 }}>{formatDate(participant.endTime)}</p>}
                    {participant.startTime && participant.endTime && <p style={{ position: "absolute", left: 500 }}>{calculateTimeDifference(participant.startTime, participant.endTime)}</p>}
                    {participant && <p style={{ position: "absolute", left: 650 }}>{participant.posts.length}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>

          {selectedParticipant && (
            <div className="ParticipantDetails" style={{ marginTop: 20 }}>
              <h3>Participant Details: {selectedParticipant.name}</h3>
              {detailsLoading ? (
                <p>Loading details...</p>
              ) : (
                participantDetails ? (
                  <div style={{marginLeft:10}}>
                    {/* Render the participant details here */}
                    <p>Solution:</p>
                    {/* {participantDetails[0].posts.length && <pre style={{ borderWidth: 1, borderRadius: 10, width: "fit-content", marginTop: 20 }}> {participantDetails[0].posts[0].codeTemplates["java"].templateCode}</pre>} */}
                    {participantDetails[0].posts.map((problems, index) => (
                      <pre style={{ borderWidth: 1, borderRadius: 10, width: "fit-content", marginTop: 20 }}>{problems.solution["java"].solution}</pre>

                    ))}
                    {/* <p>No. question solve: {participantDetails[0].posts}</p> */}
                    {/* Add more details as needed */}
                  </div>
                ) : (
                  <p>Details not available.</p>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ContestResult;
