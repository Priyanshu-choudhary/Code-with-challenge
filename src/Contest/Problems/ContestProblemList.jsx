import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
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
            const API_URL = `https://hytechlabs.online:9090/Posts/Contest/${contest.nameOfContest}/username/Contest`;
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
                                <FontAwesomeIcon icon={faAngleRight} style={{ position: "absolute", right: 10 }} />
                            </div>
                        ))}
                    </div>
                </div>
                <button style={{color:ibg,fontWeight:"bold",margin:20,borderWidth:1,borderColor:ibg,borderRadius:5,padding:5}} onClick={()=>{navigate(`/UploadQuestion/${contest.nameOfContest}`)}}>
                    + Add question
                </button>
            </div>
        </>
    )
}

export default ContestProblemList
