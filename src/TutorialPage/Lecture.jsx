import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import IconBreadcrumbs from '../dashBoard/BreadCrumb';
import HtmlRenderer from '../Leetcode/HtmlRenderer';
import { UserContext } from '../Context/UserContext';
import Dashboard from '../dashBoard/Dashboard';
import BoxLoader from '../Loader/BoxLoader';
import InPageEditor from './InPageEditor';
import CreateIcon from '@mui/icons-material/Create';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
// import { Editor } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import './Leacture.css'
function Lecture() {
    const { title } = useParams();
    const [lectureData, setLectureData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [leactureId, setleactureId] = useState('')
    const [error, setError] = useState(null);
    const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
    const [currentSubheadingIndex, setCurrentSubheadingIndex] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();
    const { bc, ibg, bg, light, dark, user, password, role } = useContext(UserContext);
    const [NavHide, setNavHide] = useState(true);

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
                setleactureId(data.id)
                setLectureData(data.headings || []);
                setLoading(false);
            } catch (error) {
                setError(error.message || 'An error occurred while fetching data');
                setLoading(false);
            }
        };

        fetchLectureData();
    }, [title]);

    if (loading) {
        return <div>
            <Dashboard />
            <BoxLoader />
        </div>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    const handleDelete = async () => {
        if (window.confirm(`Are you sure you want to delete the lecture "${title}"?`)) {
            try {
                const basicAuth = 'Basic ' + btoa(`testleacture:testleacture`);
                const response = await fetch(`https://hytechlabs.online:9090/Lecture/id/${leactureId}`, {
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
        if (currentSubheadingIndex < lectureData[currentSectionIndex].subHeadings.length - 1) {
            setCurrentSubheadingIndex((prevIndex) => prevIndex + 1);
        } else if (currentSectionIndex < lectureData.length - 1) {
            setCurrentSectionIndex((prevIndex) => prevIndex + 1);
            setCurrentSubheadingIndex(0);
        }
    };

    const handlePrevious = () => {
        if (currentSubheadingIndex > 0) {
            setCurrentSubheadingIndex((prevIndex) => prevIndex - 1);
        } else if (currentSectionIndex > 0) {
            setCurrentSectionIndex((prevIndex) => prevIndex - 1);
            setCurrentSubheadingIndex(lectureData[currentSectionIndex - 1].subHeadings.length - 1);
        }
    };

    const handleSectionClick = (sectionIndex, subheadingIndex = 0) => {
        setCurrentSectionIndex(sectionIndex);
        setCurrentSubheadingIndex(subheadingIndex);
        document.getElementById(lectureData[sectionIndex].subHeadings[subheadingIndex].id).scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className='min-h-dvh' style={{ backgroundColor: bg, color: ibg }}>
            <Dashboard />
            <IconBreadcrumbs currentPage={"Tutorial"} title={"learn"} question={title || 'Default Title'} />
            <hr />
            <InPageEditor />
            {role === "ADMIN" &&
                <div>
                    <div className="button-86" style={{ position: "absolute", right: 10, top: 110, color: "black" }} >
                        <CreateIcon fontSize='large' onClick={() => { navigate(`/EditLecture/${leactureId}`); }} />
                    </div>
                    <div className="button-86" style={{ position: "absolute", right: 10, top: 180, color: "black" }} >
                        <DeleteForeverIcon fontSize='large' onClick={handleDelete} />
                    </div>
                </div>
            }
            <div className='md:flex min-h-dvh'>
                {!NavHide &&
                    <div style={{backgroundColor:dark}}>
                        
                        <div className='border-1 border-black rounded-md h-fit w-fit px-1 m-1 mt-3 '><DoubleArrowIcon  onClick={() => { NavHide ? setNavHide(false) : setNavHide(true) }} /></div>
                        <div style={{ borderLeft: "1px solid #000" }}></div>
                    </div>
                }
                {NavHide && <div style={{
                    backgroundColor: dark,
                    position: 'sticky',
                    top: '0px',
                    height: '100vh',
                    width: '100%',
                    maxWidth: 200,
                
                    padding: '10px',
                    zIndex: 1000,
                    overflowY: 'scroll',
                    
                }} className='pt-2 pl-2 md:w-56 side-navbar '>
                    <p className='font-bold mb-3 text-lg flex'>Topics in this Lecture <span className='mr-3 text-gray-400'>[{lectureData.length}]</span><div className='border-1 border-black rounded-md h-fit w-fit px-1 '><CloseFullscreenIcon fontSize='sm ' onClick={() => { NavHide ? setNavHide(false) : setNavHide(true) }} /></div></p>

                    <ul>
                        {lectureData.map((section, sectionIndex) => (
                            <div key={sectionIndex}>
                                <div style={{ backgroundColor: "black", width: "100%", height: 1, marginTop: 5 }}></div>
                                <li
                                    style={{
                                        marginTop: 5,
                                        backgroundColor: sectionIndex === currentSectionIndex ? '#f0f8ff' : 'transparent',
                                        color: sectionIndex === currentSectionIndex ? '#000' : '#4a90e2',
                                    }}
                                    className='py-0 flex  hover:bg-blue-50 p-0 rounded-lg'
                                    onClick={() => handleSectionClick(sectionIndex)}
                                >
                                    <div className="flex" >
                                        <div
                                            className={`max-h-fit ${sectionIndex === currentSectionIndex ? 'bg-orange-500 ' : 'bg-blue-500'} ${sectionIndex === 0 ? 'w-0.5 ' : 'w-0.5'}`}
                                        ></div>
                                        <div className="pl-1">
                                            <a
                                                href={`#${sectionIndex}`}
                                                className={`text-blue-500 text-sm ${sectionIndex === currentSectionIndex ? 'font-bold' : ''}`}
                                            >
                                                {section.title}
                                            </a>
                                            {sectionIndex === currentSectionIndex && (
                                                <ul className='mt-1'>
                                                    {section.subHeadings.map((subHeading, subHeadingIndex) => (
                                                        <li
                                                            key={subHeadingIndex}
                                                            className='pl-5 py-1 hover:bg-blue-50 text-sm truncate max-w-40 '
                                                            onClick={(event) => {
                                                                event.stopPropagation(); // Prevent event bubbling
                                                                handleSectionClick(sectionIndex, subHeadingIndex);
                                                            }}
                                                            style={{
                                                                backgroundColor: sectionIndex === currentSectionIndex && subHeadingIndex === currentSubheadingIndex ? '#f0f8ff' : 'transparent',
                                                                color: sectionIndex === currentSectionIndex && subHeadingIndex === currentSubheadingIndex ? 'darkorange' : '#4a90e2',
                                                                cursor: "pointer",
                                                            }}
                                                        >
                                                            <SubdirectoryArrowRightIcon fontSize='sm' />{subHeading.title}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </div>
                                </li>
                            </div>
                        ))}
                        <div style={{ backgroundColor: "black", width: "100%", height: 1, marginTop: 5 }}></div>
                    </ul>

                </div>}
                <div style={{ borderLeft: "1px solid #000" }}></div>
                <div>
                    <div style={{ backgroundColor: bc, width: "fit-content" }} className='uppercase rounded ml-5 md:mx-5 mt-5 md:mt-20 font-bold text-3xl px-3'>{title}</div>
                    <div key={lectureData[currentSectionIndex]?.subHeadings[currentSubheadingIndex]?.id} id={lectureData[currentSectionIndex]?.subHeadings[currentSubheadingIndex]?.id} className='ml-1 mt-5 md:ml-10 md:mt-20'>
                        <h2 className='text-2xl font-bold flex'>
                            <div className='text-base font-normal border-1 bg-black text-white mr-2 px-2.5 pt-0.5' style={{ borderRadius: "50%", maxHeight: 30 }}>
                                {currentSectionIndex + 1}.{currentSubheadingIndex + 1}
                            </div>
                            {lectureData[currentSectionIndex]?.subHeadings[currentSubheadingIndex]?.title}
                        </h2>
                        <p className={`text-lg p-3`}><HtmlRenderer renderAsHtml={false} htmlContent={lectureData[currentSectionIndex]?.subHeadings[currentSubheadingIndex]?.content || ""} /></p>
                    </div>
                    <div className="flex justify-between mt-4">
                        <button
                            onClick={handlePrevious}
                            disabled={currentSectionIndex === 0 && currentSubheadingIndex === 0}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded"
                        >
                            Previous
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={currentSectionIndex === lectureData.length - 1 && currentSubheadingIndex === lectureData[currentSectionIndex].subHeadings.length - 1}
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
