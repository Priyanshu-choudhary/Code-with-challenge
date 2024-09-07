import React, { useEffect, useState } from 'react';
import Dashboard from '../dashBoard/Dashboard';
import ProblemOfTheDay from './ProblemOfTheDay';
import './ProblemSet.css';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import DataList from './DataList';
import Filter from './Filter';
import BoxLoader from '../Loader/BoxLoader';
import Skeleton from './Skeleton';
import Card from './Ads/CourseAds';
import ContestAds from './Ads/ContestAds';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook


function ProblemSet() {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [PODindex, setPODindex] = useState(0);
    const navigate = useNavigate(); // Initialize useNavigate hook

    // Fetch data from the API
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch("https://hytechlabs.online:9090/Posts/username/ProblemSet");
                const data = await response.json();
                setQuestions(data); // Assume the data is an array of questions
                
                
            } catch (error) {
                console.error("Error fetching questions:", error);
            } finally {
                setLoading(false); // Stop the loader once data is fetched
            }
        };

        fetchQuestions();
    }, []);
    const handleRandomClick = () => {
        // Find the index of the problem with the current id
      let  min = Math.ceil(0);
      let  max = Math.floor(questions.length);
        
        // Generate a random integer between min (inclusive) and max (inclusive)
        let index= Math.floor(Math.random() * (max - min + 1)) + min;

        navigate(`/question/${questions[index].id}/ProblemSet`, {
            state: {
                problems:[questions[index]],
                currentIndex: 0,
                navHistory: "no def",
                currentPage: "no current page",
                CourseDescription: "description",
                totalProblems: 0, // Pass the total number of problems
                language: ["java"]
            }
        });
    };


    const handlePODClick = () => {
  
    
        navigate(`/question/${questions[PODindex].id}/ProblemSet`, {
            state: {
                problems:[questions[PODindex]],
                currentIndex: 0,
                navHistory: "no def",
                currentPage: "no current page",
                CourseDescription: "description",
                totalProblems: 0, // Pass the total number of problems
                language: ["java"]
            }
        });
    };

    
    return (
        <div>
            <Dashboard />
          
            <div className='md:flex'>
                <div>
                   <Filter />
                   <ContestAds/>
                </div>
                <div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <ProblemOfTheDay  handlePODClick={handlePODClick}length={questions.length} setPODindex={setPODindex} Accuracy={80.4} Diffculity={"Medium"} />
                    </div>

                    <div className='pt-4 flex  md:gap-48' style={{ display: "flex", justifyContent: "center" }}>
                        <div>
                            <input type="text" className="custom-input" placeholder="Search Question" />
                        </div>
                        <div>
                            <button onClick={()=>{handleRandomClick();}} style={{ borderRadius: 20 }} className='flex gap-2 border-2 border-gray-300 px-2 py-1.5 font-bold hover:bg-blue-200'>
                                <ShuffleIcon /> Random
                            </button>
                        </div>
                    </div>

                    <div className='mt-2' style={{ display: "flex", justifyContent: "center" }}>
                        <div className='bg-blue-50 rounded-t-lg flex gap-5 space-x-4 py-3 px-2'>
                            <span style={{ minWidth: 250 }}>Title</span>
                            <span>Difficulty</span>
                            <span>Accuracy</span>
                            <span>Action</span>
                        </div>
                    </div>

                    <div
                        className=""
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center"
                        }}
                    >
                        {loading ? (
                            <div className='w-full'>
                                <Skeleton/>
                                <Skeleton/>
                                <Skeleton/>

                            </div>
                            
                        ) : (
                            questions.map((question) => (
                                <DataList
                                    id={question.id}
                                    title={question.title}
                                    Difficulty={question.difficulty || "Unknown"} // Use "Unknown" if difficulty is null
                                    Accuracy={question.accuracy}         // Use "N/A" if accuracy is not available
                                    tags={question.tags.join(', ')}               // Join tags if they exist
                                    problems={question}
                                />
                            ))
                        )}
                    </div>
                    
                </div>
                <div className='ml-6 my-2'>
                    {/* leaderBoard */}
                    <Card/>
                </div>
            </div>
        </div>
    );
}

export default ProblemSet;
