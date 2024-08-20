// src/OurCrew.js
import React from 'react';
import './Ourcrew.css'; // Import the CSS file for styling
import { Description } from '@headlessui/react';

const crewMembers = [
     { name: 'Yadi Chaudhary', photo: 'path/to/yadi-photo.jpg' , Description: 'Founder' },
     { name: 'Prince Gupta', photo: 'path/to/prince-photo.jpg',Description:'Co-Founder' },
     { name: 'Hem Chandra Jha', photo: 'path/to/hem-photo.jpg',Description:'Co-Founder' },
     { name: 'Pranjali Jaiswal', photo: 'path/to/pranjali-photo.jpg',Description:'---' },
     { name: 'Rimjhim Singh', photo: 'path/to/pranjali-photo.jpg',Description:'---' },
];

const OurCrew = () => {
    return (
        <div className="our-crew">
            
            <div className="crew-list">
                {crewMembers.map((member, index) => (
                    <div className="crew-member" key={index}>
                        <img src={member.photo} alt={member.name} className="crew-photo" />
                        <h3>{member.name}</h3>
                        <h4>{member.Description}</h4>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OurCrew;
