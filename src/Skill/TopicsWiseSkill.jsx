import React, { Fragment, useEffect, useState, useContext, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '/src/Context/UserContext';
import { CourseContext } from '/src/Context/CourseContex.jsx';
import styled from 'styled-components';
import SkillsCard from './SkillsCard';
import CreateButton from '../Buttons/CreateButton';
import YourProgressCard from '../learnPath/YourProgressCard';
import { Topic } from '@mui/icons-material';
const PageContainer = styled.div`
  background-color: ${({ bg }) => bg};
  height: 100vh;
`;

function TopicsWiseSkill() {
    const navigate = useNavigate();
    const { ibg, user, password, bg, dark, role } = useContext(UserContext);
    // const { updateCourses, Topics, setTopics, userCourses, setUserCourses, loading, setLoading } = useContext(CourseContext);
    const [maxCardWidth, setMaxCardWidth] = useState(0);

    const [Topics, setTopics] = useState([]);
    const [userCourses, setUserCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    const userCoursesRef = useRef(null);
    const TopicsRef = useRef(null);


    const updateMaxCardWidth = useCallback((courses) => {
        let maxWidth = 0;
        courses.forEach((course) => {
            const textWidth = Math.max(
                course.title.length,
                `${((course.progress / course.totalQuestions) * 100).toFixed(2)}%`.length,
                `[${course.progress}/${course.totalQuestions}]`.length,
                `Rating: ${course.rating}`.length
            );
            if (textWidth > maxWidth) {
                maxWidth = textWidth;
            }
        });
        setMaxCardWidth(maxWidth * 10); // Adjust the multiplier to account for font size and padding
    }, []);

    const fetchTopics = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://hytechlabs.online:9090/Course/Skills/0/10', {
                method: 'GET',
            });
            if (response.ok) {
                const data = await response.json();
                if (Array.isArray(data)) {
                    console.log("> " + JSON.stringify(data[0].courses));
                    setTopics(data[0].courses);
                } else {
                    console.error('Fetched official data is not an array:', data);
                    setTopics([]);
                }
            } else {
                console.error('Failed to fetch official courses:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error fetching official courses:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTopics();
    }, []);


    const handleCreateContestClick = () => {

        navigate(`/CourseForm`, {
            state: {
                uploadUrl: "Skills",
            }
        });
    };

    return (
        <div>
            <div style={{ color: "black", display: "flex", textAlign: "center", justifyContent: "center", alignContent: "center", width: "100%", height: 80, backgroundColor: "gold", clipPath: "polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)", marginTop: 20 }}>
                <p style={{ paddingTop: 30, fontSize: "20px" }}>Add your own  Topics </p>
                <div style={{ paddingTop: 10, paddingLeft: 50 }}> <CreateButton onClick={handleCreateContestClick} value={"Create New"} /></div>
            </div>
            <div style={{ borderRadius: "15px", margin: '20px', padding: "10px", backgroundColor: dark }}>
                <p style={{ fontSize: '20px', fontFamily: 'revert-layer', fontWeight: 'bold', marginBottom: "20px" }}>
                    Topic wise Skills
                </p>
                <div onClick={() => {
                            navigate(`/TreeView`);
                        }} style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                    {Topics.map((course, index) => (
                        <SkillsCard title={Topics[index].title}  />

                    ))}

                </div>
            </div>

        </div>
    )
}

export default TopicsWiseSkill
