import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import IconBreadcrumbs from '../dashBoard/BreadCrumb';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import HtmlRenderer from '../Leetcode/HtmlRenderer';
import { UserContext } from '../Context/UserContext';
import DoneIcon from '@mui/icons-material/Done';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import CreateIcon from '@mui/icons-material/Create';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate, useLocation } from 'react-router-dom';
import Dashboard from '../dashBoard/Dashboard';
import BoxLoader from '../Loader/BoxLoader';
import InPageEditor from './InPageEditor';
// import DraggableTextComponent from './DragableComponent';
import DraggableResizableText from './DragableComponent';

function Lecture() {
    const { title, LectureId } = useParams();
    const [lectureData, setLectureData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [id, setId] = useState(null);
    const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();
    const { bc, ibg, bg, light, dark, user, password, role } = useContext(UserContext);

    useEffect(() => {
        const fetchLectureData = async () => {
            try {
                const response = await fetch(`https://hytechlabs.online:9090/Lecture/Findby/testleacture/${title}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setId(data);
                setLectureData(data.sections || []);
                setLoading(false);
            } catch (error) {
                setError(error.message || 'An error occurred while fetching data');
                setLoading(false);
            }
        };

        fetchLectureData();
    }, [LectureId, title]);

    if (loading) {
        return <div>
            <Dashboard />
            <BoxLoader />
        </div>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    const handleDelete = async (courseId, courseName) => {
        if (window.confirm(`Are you sure you want to delete the lecture "${id.title}"?`)) {
            try {
                const basicAuth = 'Basic ' + btoa(`testleacture:testleacture`);
                const response = await fetch(`https://hytechlabs.online:9090/Lecture/id/${id.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': basicAuth,
                    }
                });
                if (response.ok) {
                    navigate('/Tutorials');
                } else {
                    console.error('Failed to delete lecture:', response.status, response.statusText);
                }
            } catch (error) {
                console.error('Error deleting lecture:', error);
            }
        }
    };

    const handleNext = () => {
        setCurrentSectionIndex((prevIndex) => Math.min(prevIndex + 1, lectureData.length - 1));
    };

    const handlePrevious = () => {
        setCurrentSectionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    const handleSectionClick = (index) => {
        setCurrentSectionIndex(index);
        document.getElementById(lectureData[index].id).scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div style={{ backgroundColor: bg, color: ibg }}>
            <Dashboard />
            <IconBreadcrumbs currentPage={"Tutorial"} title={"learn"} question={title || 'Default Title'} />
            <hr />
            <InPageEditor/>
            {role === "ADMIN" &&
                <div>
                    <div className="button-86" style={{ position: "absolute", right: 10, top: 110, color: "black" }} >
                        <CreateIcon fontSize='large' onClick={() => { navigate(`/EditLecture/${id.id}`); }} />
                    </div>
                    <div className="button-86" style={{ position: "absolute", right: 10, top: 180, color: "black" }} >
                        <DeleteForeverIcon fontSize='large' onClick={() => { handleDelete(id.id, id.title); }} />
                    </div>
                </div>
            }
            <div className='md:flex'>
                <div style={{
                    backgroundColor: dark,
                    position: 'sticky',        //    Change to sticky
                    top: '0px',              // Sticks at 110px from the top
                    height: 'fit-content',     // Height will be determined by content
                    width: '100%',
                    maxWidth:200,              // Fixed width for the sidebar
                    overflowY: 'auto',         // Enable vertical scrolling
                    padding: '10px',

                    zIndex: 1000               // Ensure it's on top of other elements
                }} className='pt-2 pl-2 md:w-56 side-navbar'>
                    <p className='font-bold mb-3 text-lg flex'>Topics in this Lecture <span className='ml-3 text-gray-400'>[{lectureData.length}]</span></p>
                    <ul>
                        {lectureData.map((section, index) => (
                            <div key={section.id}>
                                <div style={{ backgroundColor: "black", width: "100%", height: 1,marginTop:5 }}></div>
                                <li
                                    style={{
                                        marginTop: 5,
                                        backgroundColor: index === currentSectionIndex ? '#f0f8ff' : 'transparent', // Highlight the current section
                                        color: index === currentSectionIndex ? '#000' : '#4a90e2', // Change text color for the current section
                                    }}
                                    className='py-1 flex pl-1 hover:bg-blue-50 p-2 rounded-lg'
                                    onClick={() => handleSectionClick(index)} // Handle section click
                                >
                                    <div className="flex">
                                        <div
                                            className={`h-16 ${index === currentSectionIndex ? 'bg-orange-500 ' : 'bg-blue-500'} ${index === 0 ? 'w-1 ' : 'w-0.5'}`}
                                        ></div>
                                        <div className="pl-2">
                                            <a
                                                href={`#${section.id}`}
                                                className={`text-blue-500 ${index === currentSectionIndex ? 'font-bold' : ''}`}
                                            >
                                                {section.heading}
                                            </a>
                                        </div>
                                    </div>

                                </li>
                            </div>
                        ))}
                        <div style={{ backgroundColor: "black", width: "100%", height: 1 ,marginTop:5}}></div>
                    </ul>

                </div>
                <div style={{ borderLeft: "1px solid #000" }}></div>
                <div>
                   
                    <div style={{ backgroundColor: bc, width: "fit-content" }} className='uppercase rounded ml-5 md:mx-5 mt-5 md:mt-20 font-bold text-3xl px-3'>{title}</div>
                    <div key={lectureData[currentSectionIndex]?.id} id={lectureData[currentSectionIndex]?.id} className='ml-1 mt-5 md:ml-10 md:mt-20'>
                        <h2 className='text-2xl font-bold flex'>
                            <div className='text-base font-normal border-1 bg-black text-white mr-2 px-2.5 pt-0.5' style={{ borderRadius: "50%", maxHeight: 30 }}>
                                {currentSectionIndex + 1}
                            </div>
                            {lectureData[currentSectionIndex]?.heading}
                        </h2>
                        {/* <hr /> */}
                        <p className={`text-lg p-3`}><HtmlRenderer htmlContent={lectureData[currentSectionIndex]?.content || ""} /></p>
                    </div>
                    <div className="flex justify-between mt-4">
                        <button
                            onClick={handlePrevious}
                            disabled={currentSectionIndex === 0}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded"
                        >
                            Previous
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={currentSectionIndex === lectureData.length - 1}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Lecture;
