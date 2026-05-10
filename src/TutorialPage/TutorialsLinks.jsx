import React from 'react';
import { useNavigate } from 'react-router-dom';
import TerminalIcon from '@mui/icons-material/Terminal';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import CalculateIcon from '@mui/icons-material/Calculate';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

const sections_A = [
    {
        title: 'Languages',
        icon: <TerminalIcon />,
        links: ['Java', 'C', 'C++', 'Python', 'JavaScript', 'HTML', 'CSS'],
    },
    {
        title: 'Maths',
        icon: <CalculateIcon />,
        links: ['Basics coding Maths', 'Advance coding Maths'],
    },
    {
        title: 'Skills',
        icon: <RocketLaunchIcon />,
        links: ['Data Structure', 'Algorithm', "OOP's concept", 'DataBase'],
    },
];

const sections_B = [
    {
        title: 'Frameworks',
        icon: <AccountTreeIcon />,
        links: ['React', 'Spring Boot', 'Express', 'Bootstrap'],
    },
    {
        title: 'Databases',
        icon: <CalculateIcon />,
        links: ['MySQL', 'PostgreSQL', 'MongoDB'],
    },
    {
        title: 'CSE Subjects',
        icon: <MenuBookIcon />,
        links: ['DSA', 'DA', 'Data Management System', 'Cyber Security'],
    },
];

const Section = ({ title, icon, links, onLinkClick }) => (
    <div className='text-xl md:text-1xl font-bold flex gap-1'>
        <div>{icon}</div>
        <div>{title}
            <div className='text-base font-thin underline text-blue-500 mt-3'>
                {links.map((link, index) => (
                    <p
                        key={index}
                        className='py-1 cursor-pointer flex gap-1'
                        onClick={() => onLinkClick(link)}
                    >
                        <RadioButtonCheckedIcon fontSize='sm' /> {link}
                    </p>
                ))}
            </div>
        </div>
    </div>
);

function TutorialsLinks() {
    const navigate = useNavigate();

    const handleClick = (linkName) => {
        navigate(`/lecture/${linkName}`);
    };

    return (
        <div>
            <div className='mt-20 ml-10 md:flex md:gap-80'>
                {sections_A.map((section, index) => (
                    <Section
                        key={index}
                        title={section.title}
                        icon={section.icon}
                        links={section.links}
                        onLinkClick={handleClick}
                    />
                ))}
            </div>

            <div className='mt-20 ml-10 md:flex md:gap-80'>
                {sections_B.map((section, index) => (
                    <Section
                        key={index}
                        title={section.title}
                        icon={section.icon}
                        links={section.links}
                        onLinkClick={handleClick}
                    />
                ))}
            </div>
        </div>
    );
}

export default TutorialsLinks;

