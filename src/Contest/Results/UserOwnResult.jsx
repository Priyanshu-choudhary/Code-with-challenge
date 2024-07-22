import React,{useState,useEffect} from 'react'
import "/src/UserOwnResult.css"
function UserOwnResult({totalParticipants,yourRank,username,nameOfContest}) {
  const fetchParticipantDetails = async (username) => {
    const [selectedParticipant, setSelectedParticipant] = useState(null);
    const [participantDetails, setParticipantDetails] = useState(null);
    const [detailsLoading, setDetailsLoading] = useState(false);
  
    const API_URL = `https://hytechlabs.online:9090/UserDetailsContest/${username}/${nameOfContest}`;
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


  return (
    <div className="results-summary-container">
          <div className="confetti">
            <div className="confetti-piece" />
            <div className="confetti-piece" />
            <div className="confetti-piece" />
            <div className="confetti-piece" />
            <div className="confetti-piece" />
            <div className="confetti-piece" />
            <div className="confetti-piece" />
            <div className="confetti-piece" />
            <div className="confetti-piece" />
            <div className="confetti-piece" />
            <div className="confetti-piece" />
            <div className="confetti-piece" />
            <div className="confetti-piece" />
            <div className="confetti-piece" />
            <div className="confetti-piece" />
            <div className="confetti-piece" />
            <div className="confetti-piece" />
            <div className="confetti-piece" />
            <div className="confetti-piece" />
          </div>
          <div className="results-summary-container__result">
            <div className="heading-tertiary">Your Result</div>
            <div className="result-box">
              <div className="heading-primary">{yourRank}</div>
              <p className="result">out of {totalParticipants}</p>
            </div>
            <div className="result-text-box">
              <div className="heading-secondary">excellent</div>
              <p className="paragraph">
                You are in Top <strong style={{color:"yellow"}}>{((totalParticipants-yourRank+1)/totalParticipants*100).toFixed(2)}% </strong>of the people who have taken these tests.
              </p>
            </div>
          </div>
          <div className="results-summary-container__options">
            <div className="heading-secondary heading-secondary--blue">Summary</div>
            <div className="summary-result-options">
              <div className="result-option result-option-reaction">
                <div className="icon-box">
                  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" viewBox="0 0 20 20">
                    <path stroke="#F55" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" d="M10.833 8.333V2.5l-6.666 9.167h5V17.5l6.666-9.167h-5Z" />
                  </svg>
                  <span className="reaction-icon-text">Reaction</span>
                </div>
                <div className="result-box"><span>82</span> / 100</div>
              </div>
              <div className="result-option result-option-memory">
                <div className="icon-box">
                  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" viewBox="0 0 20 20">
                    <path stroke="#FFB21E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" d="M5.833 11.667a2.5 2.5 0 1 0 .834 4.858" />
                    <path stroke="#FFB21E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" d="M3.553 13.004a3.333 3.333 0 0 1-.728-5.53m.025-.067a2.083 2.083 0 0 1 2.983-2.824m.199.054A2.083 2.083 0 1 1 10 3.75v12.917a1.667 1.667 0 0 1-3.333 0M10 5.833a2.5 2.5 0 0 0 2.5 2.5m1.667 3.334a2.5 2.5 0 1 1-.834 4.858" />
                    <path stroke="#FFB21E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" d="M16.447 13.004a3.334 3.334 0 0 0 .728-5.53m-.025-.067a2.083 2.083 0 0 0-2.983-2.824M10 3.75a2.085 2.085 0 0 1 2.538-2.033 2.084 2.084 0 0 1 1.43 2.92m-.635 12.03a1.667 1.667 0 0 1-3.333 0" />
                  </svg>
                  <span className="memory-icon-text">Memory</span>
                </div>
                <div className="result-box"><span>94</span> / 100</div>
              </div>
              <div className="result-option result-option-verbal">
                <div className="icon-box">
                  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" viewBox="0 0 20 20">
                    <path stroke="#00BB8F" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" d="M7.5 10h5M10 18.333A8.333 8.333 0 1 0 1.667 10c0 1.518.406 2.942 1.115 4.167l-.699 3.75 3.75-.699A8.295 8.295 0 0 0 10 18.333Z" />
                  </svg>
                  <span className="verbal-icon-text">Verbal</span>
                </div>
                <div className="result-box"><span>66</span> / 100</div>
              </div>
              <div className="result-option result-option-Visual">
                <div className="icon-box">
                  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" viewBox="0 0 20 20">
                    <path stroke="#1125D6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" d="M10 11.667a1.667 1.667 0 1 0 0-3.334 1.667 1.667 0 0 0 0 3.334Z" />
                    <path stroke="#1125D6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" d="M17.5 10c-1.574 2.492-4.402 5-7.5 5s-5.926-2.508-7.5-5C4.416 7.632 6.66 5 10 5s5.584 2.632 7.5 5Z" />
                  </svg>
                  <span className="visual-icon-text">Visual</span>
                </div>
                <div className="result-box"><span>72</span> / 100</div>
              </div>
              <div className="summary__cta">
                <button className="Resultbtn btn__continue">Continue</button>
              </div>
            </div>
          </div>
        </div>
  )
}

export default UserOwnResult
