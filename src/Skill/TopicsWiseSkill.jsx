import React, { Fragment, useEffect, useState, useContext, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '/src/Context/UserContext';
import { CourseContext } from '/src/Context/CourseContex.jsx';
import styled from 'styled-components';
import SkillsCard from './SkillsCard';
import CreateButton from '../Buttons/CreateButton';
import YourProgressCard from '../learnPath/YourProgressCard';
import { Topic } from '@mui/icons-material';
import PromoBanner from '../Banners/Banner';
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
            const response = await fetch('http://localhost:9090/TopicWiseSkills/OfficialTopics', {
                method: 'GET',
            });
            if (response.ok) {
                const data = await response.json();
                if (Array.isArray(data)) {
                    console.log("> " + JSON.stringify(data));
                    setTopics(data[0].name);
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

        navigate(`/TopicWiseSkill/CreateForm`, {
            state: {
                uploadUrl: "Skills",
            }
        });
    };

    return (
        <div>

            <PromoBanner
                message="Add your own  Topics."
                onButtonClick={handleCreateContestClick}
                buttonText="Create New" />

            <div style={{ borderRadius: "15px", margin: '20px', padding: "10px", backgroundColor: dark }}>

                <p style={{ fontSize: '20px', fontFamily: 'revert-layer', fontWeight: 'bold', marginBottom: "20px" }}>
                    Topic wise Skills
                </p>

                <div
                    style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                    {Topics.map((course, index) => (
                        // <SkillsCard title={Topics[index].title}  />
                        <div onClick={() => {
                            navigate(`/TreeView`, { state: { course: course } });
                        }} >
                            <SkillsCard title={course.title} />
                        </div>
                    ))}

                </div>
            </div>

        </div>
    )
}

export default TopicsWiseSkill

