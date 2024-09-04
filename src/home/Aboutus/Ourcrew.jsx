// src/OurCrew.js
import React from 'react';
import './Ourcrew.css'; // Import the CSS file for styling
import { Description } from '@headlessui/react';

const crewMembers = [
     { name: 'Yadi Chaudhary', photo: './myDroneMakingPhotoEDITED.jpg' , Description: 'Founder' ,mail:"broyadi23@gmail.com",Number:"+91-7818071134" },
     { name: 'Prince Gupta', photo: 'path/to/prince-photo.jpg',Description:'Co-Founder',mail:"princegupta0132004@gmail.com" ,Number:"+91-7618871414"},
     { name: 'Hem Chandra Jha', photo: 'path/to/hem-photo.jpg',Description:'Co-Founder',mail:"",Number:"" },
     { name: 'Pranjali Jaiswal', photo: 'path/to/pranjali-photo.jpg',Description:'---',mail:"",Number:"" },
    //  { name: 'Rimjhim Singh', photo: 'path/to/pranjali-photo.jpg',Description:'---' },
];

const OurCrew = () => {
    return (
        <div className="our-crew">
            
            <div className="crew-list ">
                {crewMembers.map((member, index) => (
                    <div className="crew-member max-h-96" key={index}>
                        <img src={member.photo} alt={member.name} className="crew-photo" />
                        <h3 className='font-bold'>{member.name}</h3>
                        <h4>{member.Description}</h4>
                      <div className='border-1 mt-3  rounded-sm'>
                      <p className='text-sm'>{member.mail}</p>
                      <p className='text-sm'>{member.Number}</p>
                      </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OurCrew;
