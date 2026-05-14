import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// Inline chevron — replaces @fortawesome/react-fontawesome
const ChevronRight = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M9 18l6-6-6-6"/>
  </svg>
);
import { UserContext } from '/src/Context/UserContext';
import '/src/ProblemList.css';
import Dashboard from '../../dashBoard/Dashboard';
function ContestProblemList() {
    const navigate = useNavigate();
    const [problems, setProblems] = useState([]);
    const [responseOk, setResponseOk] = useState(true);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const { contest } = location.state || {}; // Default to an empty object if state is undefined
    const { bg, light, dark, ibg } = useContext(UserContext);
    // navigate(`/UploadQuestion/${contest.nameOfContest}`)
    useEffect(() => {
        const fetchProblems = async () => {
            const API_URL = `${import.meta.env.VITE_API_URL}/Posts/Contest/${contest.nameOfContest}/username/Contest`;
            setLoading(true);

            try {
                const response = await fetch(API_URL, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.status === 204) {
                    setProblems([]);
                } else if (response.status === 304) {
                    // Handle 304 Not Modified if you are caching responses
                    // setProblems(cachedData.problems);
                    setResponseOk(true);
                } else if (response.ok) {
                    const data = await response.json();
                    const sortedProblems = data.sort((a, b) => a.sequence - b.sequence);
                    setProblems(sortedProblems);
                    setResponseOk(true);
                } else {
                    setResponseOk(false);
                }
            } catch (error) {
                console.error('Error fetching problems:', error);
                setResponseOk(false);
            } finally {
                setLoading(false);
            }
        };

        fetchProblems();

    }, [])

    return (
        <>
            <Dashboard />
            <div className="ProblemList-container" style={{ backgroundColor: light, color: ibg, width: "100%", height: "100vh" }}>
                <div className="ProblemList-items" style={{ backgroundColor: light, color: ibg }}>
                    <div className="ProblemList-items-head">

                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <p style={{ color: ibg }}>Edit Problems List</p>
                            <img style={{ marginTop: 10, background: dark }} src="/checklist.gif" alt="problemList" width={40} />
                        </div>


                    </div>

                    <div className="ProblemList-items-body ">
                        {problems.map((problem, index) => (
                            <div className='miniProblem' style={{ display: "flex", marginTop: 15 }} onClick={() => { navigate(`/edit/${problem.id}/Contest`) }}>
                                <div>{index + 1}. {problem.title}</div>
                                <ChevronRight style={{ position: "absolute", right: 10 }} />
                            </div>
                        ))}
                    </div>
                </div>
                <button style={{ color: ibg, fontWeight: "bold", margin: 20, borderWidth: 1, borderColor: ibg, borderRadius: 5, padding: 5 }} onClick={() => { navigate(`/UploadQuestion/${contest.nameOfContest}`) }}>
                    + Add question
                </button>
            </div>
        </>
    )
}

export default ContestProblemList

