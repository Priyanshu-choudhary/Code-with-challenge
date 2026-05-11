import React, { useState, useContext } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { UserContext } from '/src/Context/UserContext';
import Dashboard from '../dashBoard/Dashboard';
import './TreeView.css';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CreateIcon from '@mui/icons-material/Create';
// import sampleData from './ProblemData'; 
import sampleData from './NewProblemData';
import { useNavigate, useLocation } from 'react-router-dom';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import HtmlRenderer from '../Leetcode/HtmlRenderer';

const TopicsWiseSkill = () => {
    const [hoverIndex, setHoverIndex] = useState(null);
    const [expandedNodes, setExpandedNodes] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const { course } = location.state || {};
    const { bg, bc, dark, light, ibg, role } = useContext(UserContext);

    const toggleNodeExpansion = (nodeKey) => {
        setExpandedNodes(prevState => {
            if (prevState.includes(nodeKey)) {
                return prevState.filter(key => key !== nodeKey);
            } else {
                return [...prevState, nodeKey];
            }
        });
    };
    const handleProblemClick = (problem, index) => {
        console.log("clicked!");

        navigate(`/question/${problem[0].id}/Course`, {
            state: {
                problems: problem,
                currentIndex: index,
                navHistory: "Topics wise skill",
                currentPage: "hello",
                CourseDescription: "Course description",
                totalProblems: 0,// Pass the total number of problems
                language: ["java"]
            }
        });
    };
    const renderTree = (nodes, parentKey = '') => {
        return nodes.map((node, index) => {
            const nodeKey = `${parentKey}${node.name}-${index}`;
            const isQuestion = !node.children;
            const hasQuestionChildren = node.children && node.children.some(child => !child.children);

            return (
                <div key={nodeKey} className={`${isQuestion ? "border" : "tree-Profileproblem"}`} style={{
                    backgroundColor: `${isQuestion ? bg : light}`,
                    transition: 'background-color 0.3s',
                    cursor: 'pointer',
                    color: ibg,
                    borderRadius: `${isQuestion ? "" : "5px"}`,
                    marginTop: `${isQuestion ? "" : "20px"}`,
                    marginLeft: parentKey ? '50px' : '0',
                    marginRight: parentKey ? '50px' : '0'
                }}
                    onMouseEnter={() => setHoverIndex(nodeKey)}
                    onMouseLeave={() => setHoverIndex(null)}
                >
                    <div className={`${isQuestion ? "flex pl-1 " : ""}`}>
                        <div style={{ display: "flex", justifyContent: "space-between" }} onClick={() => toggleNodeExpansion(nodeKey)}>
                            {node.name} &nbsp; &nbsp; &nbsp;{node.childrenCount ? `[${node.children.length}]` : ''}

                            {!isQuestion && <div className='border rounded' style={{ backgroundColor: hoverIndex === nodeKey ? bc : light }}>
                                {!expandedNodes.includes(nodeKey) ? <KeyboardArrowDownIcon fontSize='large' /> : <CloseIcon fontSize='large' />}
                            </div>}
                        </div>

                        {/* Render the heading if the node has question children */}
                        {hasQuestionChildren && expandedNodes.includes(nodeKey) && (
                            <div className="border rounded-tl-md rounded-tr-md " style={{ marginLeft: 50, marginRight: 50, backgroundColor: "#FFECA1", color: "black", borderColor: bg }}>
                                <div className="flex">
                                    <p style={{ width: 57 }}> </p>Question<spam className='vertical-line border-black'>&nbsp; </spam>
                                    <p style={{ width: 23 }}> </p>Status<spam className='vertical-line'>&nbsp; </spam>
                                    <p style={{ width: 150 }}>Question Link</p><br /><spam className='vertical-line'>&nbsp; </spam>
                                    <p style={{ width: 60 }}></p><spam className='vertical-line'>&nbsp; </spam>
                                    <p className={`text-center font-bold`} style={{ width: 108 }}>{"Difficulty"}</p> <spam className='vertical-line '>&nbsp; </spam>
                                    <p className={`text-center font-bold`} style={{ width: 100 }}>{"Description"}</p>
                                </div>
                            </div>
                        )}

                        {isQuestion && node.problem && (
                            <div className="question-details flex" style={{ paddingLeft: '20px', color: ibg }} onClick={() => handleProblemClick(node.problem, 0)}>
                                <spam className='vertical-line p-2'>&nbsp; </spam>
                                <p style={{ width: 0 }}> </p>{node.status === "Complete" ? <CheckBoxOutlineBlankIcon style={{ marginRight: 20, marginTop: 10, color: ibg }} /> : <DoneIcon style={{ color: ibg, borderColor: ibg, borderRadius: 4, borderWidth: 2, marginRight: 22, marginLeft: 2, marginTop: 10 }} fontSize='small' />} <spam className='vertical-line'>&nbsp; </spam>
                                <a style={{ width: 150 }} href={node.link} target="_blank" rel="noopener noreferrer">Question Link</a><br /><spam className='vertical-line'>&nbsp; </spam>
                                <a style={{ width: 60 }} href={node.youtubeLink} target="_blank" rel="noopener noreferrer"><img className='mt-1' src="/youtube.svg" alt="youtube" width={45} /></a><spam className='vertical-line'>&nbsp; </spam>
                                <p className={`tree-Profileproblem-difficulty m-1 text-center ${node.problem && node.problem[0].difficulty}`} style={{ width: 100 }}>{node.problem && node.problem[0].difficulty}</p> <spam className='vertical-line '>&nbsp; </spam>
                                <p className={``} >{node.problem && node.problem[0].title}</p>
                            </div>
                        )}
                    </div>
                    {expandedNodes.includes(nodeKey) && node.children && (
                        <div className="tree-Profilechildren">
                            {renderTree(node.children, `${nodeKey}-`)}
                        </div>
                    )}
                </div>
            );
        });
    };
    const handleDelete = async (courseId, courseName) => {
        if (window.confirm(`Are you sure you want to delete the course "${courseName}"?`)) {
            try {
                const basicAuth = 'Bearer ' + localStorage.getItem('token');
                const response = await fetch(`${import.meta.env.VITE_API_URL}/Course/id/${courseId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': basicAuth,
                    }
                });
                if (response.ok) {
                    navigate('/learn')
                } else {
                    console.error('Failed to delete course:', response.status, response.statusText);
                }
            } catch (error) {
                console.error('Error deleting course:', error);
            }
        }
    };


    return (
        <div>
            <Dashboard />
            <div className="tree-Profileheader">
                <div className="tree-Profiletags"></div>
            </div>
            <div className="tree-Profilecontent" style={{ backgroundColor: dark, color: ibg }}>
                <div className='Profileheading ' style={{ backgroundColor: dark, color: ibg }}>

                    {role == "ADMIN" && course &&
                        <div style={{ width: 400 }}>
                            <div className="button-86" style={{ position: "absolute", right: 10, top: 150, color: "black" }} >
                                <AddToPhotosIcon fontSize='large' onClick={() => { navigate(`/QuestionTypeSelector/${course.title}`) }} />
                            </div>
                            <div className="button-86" style={{ position: "absolute", right: 10, top: 90, color: "black" }} >
                                <CreateIcon fontSize='large' onClick={() => { navigate('/CourseEdit', { state: { courseDetail: course, auth: "Skills" } }); }} />
                            </div>
                            <div className="button-86" style={{ position: "absolute", right: 10, top: 210, color: "black" }} >
                                <DeleteForeverIcon fontSize='large' onClick={() => { handleDelete(course.id, course.title); }} />
                            </div>
                        </div>
                    }
                    {course &&
                        <div >
                            <div> {course.title} </div>
                            <hr />
                            <HtmlRenderer htmlContent={course.description || ""} />

                        </div>}
                </div>
                <div className="tree-Profileproblem-list" style={{ backgroundColor: light, color: ibg }}>
                    {sampleData ? renderTree(sampleData) : <p>No Data...</p>}
                </div>
            </div>
        </div>
    );
};

export default TopicsWiseSkill;

