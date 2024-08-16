import React, { useState } from 'react';
import documentData from './Documentdata';
import './Doc.css';

import Button from '@mui/material/Button';

function Document() {
    const [expanded, setExpanded] = useState({});

    const toggleReadMore = (id) => {
        setExpanded((prevState) => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    return (
        <div>
        
            <div className="doc-container">
                <h1 className="doc-heading">Important Documents</h1>
                <div className="doc-list">
                    {documentData.map((doc) => (
                        <div key={doc.id} className="doc-item">
                            <h2 className="doc-title">{doc.title}</h2>
                            <pre className="doc-content">
                                {expanded[doc.id] ? doc.content : `${doc.content.substring(0, 100)}...`}
                            </pre>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                onClick={() => toggleReadMore(doc.id)}
                                style={{ marginTop: '10px' }}
                            >
                                {expanded[doc.id] ? "Read Less" : "Read More"}
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Document;
