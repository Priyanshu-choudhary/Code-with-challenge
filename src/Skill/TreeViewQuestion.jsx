import React, { useState, useContext } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { UserContext } from '/src/Context/UserContext';
import Dashboard from '../dashBoard/Dashboard';
import './TreeView.css';
import './topicsSkillList.css';

const sampleData = [
    {
        name: 'Step 1: Learn the basics',
        children: [
            {
                name: 'Lecture 1',
                children: [
                    { name: 'Question 1' },
                    { name: 'Question 2' }
                ]
            },
            {
                name: 'Lecture 2',
                children: [
                    { name: 'Question 3' },
                    { name: 'Question 4' }
                ]
            }
        ]
    },
    {
        name: 'Step 2: Learn important sorting techniques',
        children: [
            {
                name: 'Lecture 1',
                children: [
                    { name: 'Question 5' },
                    { name: 'Question 6' }
                ]
            }, {
                name: 'Lecture 2',
                children: [
                    { name: 'Question 7' },
                    { name: 'Question 8' }
                ]
            }
        ]
    },
    {
        name: 'Step 3: Solve problems on Arrays',
        children: [
            {
                name: 'Lecture 1',
                children: [
                    { name: 'Question 9' },
                    { name: 'Question 10' }
                ]
            }, {
                name: 'Lecture 2',
                children: [
                    { name: 'Question 11' },
                    { name: 'Question 12' }
                ]
            }
        ]
    }
];

const TopicsWiseSkill = () => {
    const [hoverIndex, setHoverIndex] = useState(null); // State to track which card is hovered
    const [expandedNodes, setExpandedNodes] = useState({}); // State to track expanded nodes

    const { bg, bc, dark, light, ibg, user, password, role, profileImage } = useContext(UserContext);

    const handleProblemClick = (nodeName) => {
        // Toggle the expansion of the node
        setExpandedNodes(prev => ({
            ...prev,
            [nodeName]: !prev[nodeName]
        }));
    };

    const renderTree = (nodes, parentKey = '') => {
        return nodes.map((node, index) => {
            const nodeKey = `${parentKey}${node.name}-${index}`;

            return (
                <div key={nodeKey} className="tree-Profileproblem" style={{
                    backgroundColor: hoverIndex === nodeKey ? bc : light,
                    transition: 'background-color 0.3s',
                    cursor: 'pointer',
                    color: ibg,
                    borderRadius: "5px",
                    marginTop:20,
                    marginLeft: parentKey ? '20px' : '0',
                    marginRight: parentKey ? '20px' : '0' // Indent children
                }}
                    onMouseEnter={() => setHoverIndex(nodeKey)}
                    onMouseLeave={() => setHoverIndex(null)}
                    onClick={() => handleProblemClick(nodeKey)}
                >
                    <div className="tree-Profileproblem-title">
                        {node.name}
                    </div>
                    {/* Render children if node is expanded */}
                    {expandedNodes[nodeKey] && node.children && (
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
                <div className='Profileheading' style={{ backgroundColor: dark, color: ibg }}>
                    <Grid container spacing={2}>
                        <Grid xs={10}>Problem Solved:</Grid>
                        {/* <Grid>{noOfQuestion}</Grid> */}
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
