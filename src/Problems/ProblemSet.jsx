import React, { useEffect, useState,useContext } from 'react';
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
import { UserContext } from '../Context/UserContext';

function ProblemSet() {
    const [questions, setQuestions] = useState([]);
    const [filteredQuestions, setFilteredQuestions] = useState([]); // For storing filtered questions
    const [searchQuery, setSearchQuery] = useState(''); // To handle search input
    const [loading, setLoading] = useState(true);
    const [PODindex, setPODindex] = useState(0);
    const navigate = useNavigate(); // Initialize useNavigate hook
    const { role } = useContext(UserContext);


    // Fetch data from the API
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch("https://hytechlabs.online:9090/Posts/username/ProblemSet");
                const data = await response.json();
                setQuestions(data); // Assume the data is an array of questions
                setFilteredQuestions(data); // Initially show all questions
            } catch (error) {
                console.error("Error fetching questions:", error);
            } finally {
                setLoading(false); // Stop the loader once data is fetched
            }
        };

        fetchQuestions();
    }, []);

    // Handle search input
    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.length >= 3) {
            const filtered = questions.filter((question) => {
                const lowerCaseQuery = query.toLowerCase();
                const titleMatch = question.title.toLowerCase().includes(lowerCaseQuery);
                const tagMatch = question.tags.join(', ').toLowerCase().includes(lowerCaseQuery);
                return titleMatch || tagMatch;
            });
            setFilteredQuestions(filtered);
        } else {
            setFilteredQuestions(questions); // Show all questions if input is less than 3 characters
        }
    };

    const handleRandomClick = () => {
        let min = Math.ceil(0);
        let max = Math.floor(questions.length);

        let index = Math.floor(Math.random() * (max - min + 1)) + min;

        navigate(`/question/${questions[index].id}/ProblemSet`, {
            state: {
                problems: [questions[index]],
                currentIndex: 0,
                navHistory: "no def",
                currentPage: "no current page",
                CourseDescription: "description",
                totalProblems: 0,
                language: ["java"]
            }
        });
    };

    const handlePODClick = () => {
        navigate(`/question/${questions[PODindex].id}/ProblemSet`, {
            state: {
                problems: [questions[PODindex]],
                currentIndex: 0,
                navHistory: "no def",
                currentPage: "no current page",
                CourseDescription: "description",
                totalProblems: 0,
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
                    <ContestAds />
                </div>
                <div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <ProblemOfTheDay handlePODClick={handlePODClick} length={questions.length} setPODindex={setPODindex} Accuracy={80.4} Difficulty={"Medium"} />
                    </div>

                    <div className='pt-4 flex md:gap-14' style={{ display: "flex", justifyContent: "center" }}>
                        <div>
                            <input
                                type="text"
                                className="custom-input"
                                placeholder="Search Question"
                                value={searchQuery} // Bind input value
                                onChange={handleSearchChange} // Trigger search logic on change
                            />
                        </div>
                        <div className='flex gap-4'>
                            {role =="ADMIN" ?<button onClick={()=>{navigate(`/UploadQuestion/ProblemSet`)}}
                                class="rounded-3xl relative w-32 h-10 cursor-pointer flex items-center border border-green-400 bg-green-400 group hover:bg-green-400 active:bg-green-400 active:border-green-400"
                            >
                                <span
                                    class="text-white  font-semibold ml-8 transform group-hover:translate-x-1 transition-all duration-300"
                                >Add
                                </span>
                                <span
                                    class="absolute right-0 h-full w-10 rounded-lg bg-green-500 flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300 rounded-3xl"
                                >
                                    <svg
                                        class="svg w-8 text-white"
                                        fill="none"
                                        height="24"
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        viewBox="0 0 24 24"
                                        width="24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <line x1="12" x2="12" y1="5" y2="19"></line>
                                        <line x1="5" x2="19" y1="12" y2="12"></line>
                                    </svg>
                                </span>
                            </button>:
                            <div className=' min-w-32 '>

                            </div>
}
                            <button onClick={handleRandomClick} style={{ borderRadius: 20 }} className='flex gap-2 border-2 border-gray-300 px-2 py-1.5 font-bold hover:bg-blue-200'>
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

                    <div className="" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                        {loading ? (
                            <div className='w-full'>
                                <Skeleton />
                                <Skeleton />
                                <Skeleton />
                            </div>
                        ) : (
                            filteredQuestions.map((question) => (
                                <DataList
                                    key={question.id}
                                    id={question.id}
                                    title={question.title}
                                    Difficulty={question.difficulty || "Unknown"}
                                    Accuracy={question.accuracy}
                                    tags={question.tags.join(', ')}
                                    problems={question}
                                  
                                />
                            ))
                        )}
                    </div>
                </div>
                <div className='ml-6 my-2'>
                    <Card />
                </div>
            </div>
        </div>
    );
}

export default ProblemSet;
