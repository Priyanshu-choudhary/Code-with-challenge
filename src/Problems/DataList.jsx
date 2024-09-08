import React, { useState, useEffect, useContext } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { UserContext } from '../Context/UserContext';


function DataList({ id, title, Difficulty, Accuracy, tags, setProblems, problems, companies }) {
    const [percentage, setPercentage] = useState(0);
    const navigate = useNavigate(); // Initialize useNavigate hook
    const { role } = useContext(UserContext);
    const getRandomPercentage = (Difficulty) => {
        let min, max;

        switch (Difficulty) {
            case 'Easy':
                min = 80;
                max = 100;
                break;
            case 'Medium':
                min = 60;
                max = 80;
                break;
            case 'Hard':
                min = 30;
                max = 60;
                break;
            default:
                throw new Error('Invalid Difficulty level');
        }

        // Generate a random float number between min and max, with up to 2 decimal places
        const random = Math.random() * (max - min) + min;
        return parseFloat(random.toFixed(2));
    };

    const handleGenerate = () => {
        const result = getRandomPercentage(Difficulty);
        setPercentage(result);
    };

    useEffect(() => {
        handleGenerate();
    }, [Difficulty]);

    const handleEdit = () => {
        navigate(`/edit/${id}/ProblemSet`);
    };

    const handleProblemClick = () => {
        // Find the index of the problem with the current id

        navigate(`/question/${id}/ProblemSet`, {
            state: {
                problems: [problems],
                currentIndex: 0,
                navHistory: "no def",
                currentPage: "no current page",
                CourseDescription: "description",
                totalProblems: 0, // Pass the total number of problems
                language: ["java"]
            }
        });
    };

    const handleDeleteProblem = async () => {
        const confirmed = window.confirm("Are you sure you want to delete this problem?");
        if (confirmed) {
            try {
                const basicAuth = 'Basic ' + btoa(`ProblemSet:ProblemSet`);
                const response = await fetch(`https://hytechlabs.online:9090/Posts/id/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': basicAuth,
                    }
                });
                if (response.ok) {
                    // setProblems(problems?.filter(problem => problem.id !== id));
                    alert("Problem deleted successfully.");
                    window.location.reload(); // Optional, if you want to refresh the page
                } else {
                    alert("Failed to delete the problem.");
                }
            } catch (error) {
                console.error("Error deleting problem:", error);
                alert("An error occurred while deleting the problem.");
            }
        }
    };

    return (
        <div className="flex flex-col">
            <div className="hover:bg-slate-100 flex items-center py-2 px-2 cursor-pointer space-x-4" onClick={handleProblemClick}>
                {/* Title and Tags */}
                <div
                    className="flex flex-col text-left"
                    style={{ minWidth: `${Difficulty === "Medium" ? "305px" : "320px"}` }}
                >
                    <span className="font-medium">{title}</span>

                    <div style={{ fontSize: 12 }} className="text-gray-500">
                        {problems.tags.length > 3 ? (
                            <>
                                {problems.tags.slice(0, 3).join(", ")}{" "}
                                <span className='text-blue-400 font-bold text-sm'>
                                    +{problems.tags.length - 3}
                                </span>
                            </>
                        ) : (
                            problems.tags.join(", ")
                        )}
                    </div>

                    <div style={{ fontSize: 12 }} className="text-gray-500">
                        {problems.companies.length > 3 ? (
                            <>
                                {problems.companies.slice(0, 3).join(", ")}{" "}
                                <span className='text-blue-400 font-bold text-sm'>
                                    +{problems.companies.length - 3}
                                </span>
                            </>
                        ) : (
                            problems.companies.join(", ")
                        )}
                    </div>
                </div>


                {/* Difficulty */}
                <div className="flex-grow">
                    <span
                        className={`text-sm pr-6 ${Difficulty === "Easy"
                            ? "text-green-400"
                            : Difficulty === "Medium"
                                ? "text-orange-400"
                                : Difficulty === "Hard"
                                    ? "text-red-600"
                                    : ""
                            }`}
                    >
                        {Difficulty}
                    </span>
                </div>

                {/* Accuracy and Progress Bar */}
                <div className="flex flex-col items-center" style={{ minWidth: "80px" }}>
                    <span className="text-sm">{Accuracy || percentage}%</span>
                    <div className="w-full mt-1">
                        <LinearProgress
                            variant="determinate"
                            value={Accuracy || percentage}
                            sx={{ height: 4, borderRadius: 1 }}
                        />
                    </div>
                </div>

                {/* Actions */}
                {role === "ADMIN" ? (
                    <div className="flex space-x-2">
                        <button
                            style={{ borderRadius: 20 }}
                            className="border border-gray-300 px-2 text-sm hover:bg-blue-300"
                            onClick={(event) => {
                                event.stopPropagation();
                                handleDeleteProblem();
                            }}
                        >
                            Delete
                        </button>
                        <button
                            style={{ borderRadius: 20 }}
                            className="border border-gray-300 px-2 text-sm hover:bg-blue-300"
                            onClick={(event) => {
                                event.stopPropagation();
                                handleEdit();
                            }}
                        >
                            Edit
                        </button>
                    </div>
                ) : (
                    <div className="min-w-24"></div>
                )}
            </div>

            {/* Separator Line */}
            <p className="bg-gray-400" style={{ height: "1px", width: "100%" }}></p>
        </div>

    );
}

export default DataList;
