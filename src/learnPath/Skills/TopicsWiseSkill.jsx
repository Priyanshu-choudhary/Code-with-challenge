import React, { Fragment, useEffect, useState, useContext, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '/src/Context/UserContext';
import { CourseContext } from '/src/Context/CourseContex.jsx';
import styled from 'styled-components';
import SkillsCard from './SkillsCard';

const PageContainer = styled.div`
  background-color: ${({ bg }) => bg};
  height: 100vh;
`;

function TopicsWiseSkill() {
    const navigate = useNavigate();
    const { ibg, user, password, bg, dark, role } = useContext(UserContext);
    const { updateCourses, officialCourses, setOfficialCourses, userCourses, setUserCourses, loading, setLoading } = useContext(CourseContext);
    const [maxCardWidth, setMaxCardWidth] = useState(0);

    const userCoursesRef = useRef(null);
    const officialCoursesRef = useRef(null);


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

    const fetchUserCourses = async () => {
        try {
            const response = await fetch(`https://hytechlabs.online:9090/Course/${user}/0/20`, {
                method: 'GET',
            });
            if (response.ok) {
                const data = await response.json();
                if (Array.isArray(data)) {
                    // localStorage.clear("");
                    localStorage.setItem('userCourses', JSON.stringify(data));
                    userCoursesRef.current = data;
                    setUserCourses(data[0].courses);
                    updateMaxCardWidth(data[0].courses);
                } else {
                    console.error('Fetched user data is not an array:', data);
                    setUserCourses([]);
                }
            } else {
                console.error('Failed to fetch user courses:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error fetching user courses:', error);
        }
    };

    return (
        <div>

            <div style={{ borderRadius: "15px", margin: '20px', padding: "10px", backgroundColor: dark }}>
                <p style={{ fontSize: '20px', fontFamily: 'revert-layer', fontWeight: 'bold', marginBottom: "20px" }}>
                    Topic wise Skills
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                    {/* {userCourses.map((course, index) => (
                            <YourProgressCard
                                key={index}
                                title={course.title}
                                progress={course.progress}
                                totalQuestions={course.totalQuestions}
                                rating={course.rating}
                                completeQuestions={course.completeQuestions}
                                course={course}
                                style={{ width: `${maxCardWidth}px` }}
                                width={45}
                            />
                        ))} */}
                    <SkillsCard title={"Data Structure and Algorithum"} />
                </div>
            </div>

        </div>
    )
}

export default TopicsWiseSkill
