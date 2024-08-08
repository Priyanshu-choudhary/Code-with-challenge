import React, { useState } from 'react';
import { Treebeard } from 'react-treebeard';
import './TreeView.css';
import Dashboard from '../dashBoard/Dashboard';
import ToggleButton2 from './ToggleButton2';

const sampleData = {
    name: 'DSA Course',
    toggled: true,
    children: [
        {
            name: 'Array',
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
            name: 'Linked List',
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
        }
    ]
};
const TopicsWiseSkill = () => {
    const [data, setData] = useState(sampleData);
    const [cursor, setCursor] = useState(null);

    const onToggle = (node, toggled) => {
        if (cursor) {
            cursor.active = false;
        }
        node.active = true;
        if (node.children) {
            node.toggled = toggled;
        }
        setCursor(node);
        setData(Object.assign({}, data));
    };

    const customHeader = (node, style) => {
        return (
            <div style={style.base}>
                <div style={style.title}>
                    <ToggleButton
                        onClick={() => onToggle(node, !node.toggled)}
                        isOpen={node.toggled}
                    />
                    {node.name}
                </div>
            </div>
        );
    };

    return (
        <div>
            <Dashboard />
            <div className="tree-container">
                <Treebeard
                    data={data}
                    onToggle={onToggle}
                    decorators={{
                        ...Treebeard.decorators,
                        Header: customHeader,
                    }}
                    style={{
                        tree: {
                            base: {
                                listStyle: 'none',
                                backgroundColor: '#f9f9f9',
                                margin: 0,
                                padding: 10,
                                color: '#333',
                                fontFamily: 'Arial, sans-serif',
                                fontSize: '18px'
                            },
                            node: {
                                base: {
                                    position: 'relative'
                                },
                                link: {
                                    cursor: 'pointer',
                                    position: 'relative',
                                    padding: '5px 5px',
                                    display: 'block'
                                },
                                activeLink: {
                                    background: '#e6f7ff',
                                    border: '1px solid #91d5ff',
                                    borderRadius: '4px'
                                },
                                toggle: {
                                    base: {
                                        position: 'relative',
                                        display: 'inline-block',
                                        verticalAlign: 'top',
                                        marginLeft: '-5px',
                                        height: '24px',
                                        width: '24px'
                                    },
                                    wrapper: {
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        margin: '-7px 0 0 -7px',
                                        height: '14px'
                                    },
                                    height: 14,
                                    width: 14,
                                    arrow: {
                                        fill: '#9DA5AB',
                                        strokeWidth: 0
                                    }
                                },
                                header: {
                                    base: {
                                        display: 'inline-block',
                                        verticalAlign: 'top',
                                        color: '#333'
                                    },
                                    connector: {
                                        width: '2px',
                                        height: '12px',
                                        borderLeft: 'solid 2px black',
                                        borderBottom: 'solid 2px black',
                                        position: 'absolute',
                                        top: '0px',
                                        left: '-21px'
                                    },
                                    title: {
                                        lineHeight: '24px',
                                        verticalAlign: 'middle'
                                    }
                                },
                                subtree: {
                                    listStyle: 'none',
                                    paddingLeft: '19px'
                                },
                                loading: {
                                    color: '#E2C089'
                                }
                            }
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default TopicsWiseSkill;
