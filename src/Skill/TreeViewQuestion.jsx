import React, { useState, useContext } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { UserContext } from '/src/Context/UserContext';
import Dashboard from '../dashBoard/Dashboard';
import './TreeView.css';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

import sampleData from './ProblemData'; 


const TopicsWiseSkill = () => {
    const [hoverIndex, setHoverIndex] = useState(null);
    const [expandedNodes, setExpandedNodes] = useState([]);

    const { bg, bc, dark, light, ibg } = useContext(UserContext);

    const toggleNodeExpansion = (nodeKey) => {
        setExpandedNodes(prevState => {
            if (prevState.includes(nodeKey)) {
                return prevState.filter(key => key !== nodeKey);
            } else {
                return [...prevState, nodeKey];
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
                            <div className="border rounded-tl-md rounded-tr-md " style={{marginLeft:50,marginRight:50, backgroundColor: "#FFECA1", color: "black", borderColor: bg }}>
                                <div className="flex">
                                    <p style={{ width: 35 }}> </p>Question<spam   className='vertical-line border-black'>&nbsp; </spam>
                                    <p style={{ width: 23    }}> </p>Status<spam className='vertical-line'>&nbsp; </spam>
                                    <p style={{ width: 150 }}>Question Link</p><br /><spam className='vertical-line'>&nbsp; </spam>
                                    <p style={{ width: 60 }}></p><spam className='vertical-line'>&nbsp; </spam>
                                    <p className={`text-center font-bold`} style={{ width: 108 }}>{"Difficulty"}</p> <spam className='vertical-line '>&nbsp; </spam>
                                    <p className={`text-center font-bold`} style={{ width: 100 }}>{"Description"}</p>
                                </div>
                            </div>
                        )}
    
                        {isQuestion && (
                            <div className="question-details flex" style={{ paddingLeft: '20px', color: ibg }}>
                                <spam className='vertical-line p-2'>&nbsp; </spam>
                                <p style={{ width: 0 }}> </p>{node.status === "Complete" ? <CheckBoxOutlineBlankIcon style={{ marginRight: 20, marginTop: 10, color: ibg }} /> : <DoneIcon style={{ color: ibg,borderColor:ibg, borderRadius: 4, borderWidth: 2, marginRight: 22, marginLeft: 2, marginTop: 10 }} fontSize='small' />} <spam className='vertical-line'>&nbsp; </spam>
                                <a style={{ width: 150 }} href={node.link} target="_blank" rel="noopener noreferrer">Question Link</a><br /><spam className='vertical-line'>&nbsp; </spam>
                                <a style={{ width: 60 }} href={node.youtubeLink} target="_blank" rel="noopener noreferrer"><img className='mt-1' src="/youtube.svg" alt="youtube" width={45} /></a><spam className='vertical-line'>&nbsp; </spam>
                                <p className={`tree-Profileproblem-difficulty m-1 text-center ${node.hardness}`} style={{ width: 100 }}>{node.hardness}</p> <spam className='vertical-line '>&nbsp; </spam>
                                <p className={``} >{node.description}</p>
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
    

    return (
        <div>
            <Dashboard />
            <div className="tree-Profileheader">
                <div className="tree-Profiletags"></div>
            </div>
            <div className="tree-Profilecontent" style={{ backgroundColor: dark, color: ibg }}>
                <div className='Profileheading text-center' style={{ backgroundColor: dark, color: ibg }}>
                    <Grid container spacing={2}>
                        <Grid xs={10}>DSA:</Grid>
                    </Grid>
                </div>
                <div className="tree-Profileproblem-list" style={{ backgroundColor: light, color: ibg }}>
                    {sampleData ? renderTree(sampleData) : <p>No Data...</p>}
                </div>
            </div>
        </div>
    );
};

export default TopicsWiseSkill;
