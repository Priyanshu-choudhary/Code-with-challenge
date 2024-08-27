import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IconBreadcrumbs from '../dashBoard/BreadCrumb';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import HtmlRenderer from '../Leetcode/HtmlRenderer';

function Lecture() {
    const { title, LectureId } = useParams();
    const [lectureData, setLectureData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLectureData = async () => {
            try{
                 const response = await fetch('https://hytechlabs.online:9090/users/getUser', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + btoa('testleacture:testleacture') // Replace with your actual credentials
                }
            });
                const data = await response.json();
                setLectureData(data);  // Assuming data.sections contains the lecture sections
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchLectureData();
    }, [LectureId]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <IconBreadcrumbs currentPage={"Tutorial"} title={"learn"} question={title || 'Default Title'} />
            <hr />
            {lectureData}
            {/* <div className='md:flex'>
                <div className='mt-10 ml-5 md:mt-20 md:ml-5'>
                    <p className='font-bold my-5 mx-1 text-lg flex'>Topics in this Lecture <p className='ml-3 text-gray-400'>[{lectureData.length}]</p></p>
                    <ul>
                        {lectureData.map((section, index) => (
                            <li className='flex mt-2' key={section.id}>
                                <RadioButtonCheckedIcon fontSize='sm' className='mt-1.5 mr-1 text-blue-500' />
                                <a href={`#${section.id}`} className='text-blue-500 underline'>{section.heading}</a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div style={{ borderLeft: "1px solid #000", marginLeft: 20 }}></div>
                <div>
                    <div className='uppercase text-gray-500 underline decoration-sky-600 md:decoration-blue-400 rounded ml-5 mt-5 md:mx-5 md:mt-20 font-bold text-3xl'>{title}</div>

                    {lectureData.map((section, index) => (
                        <div key={section.id} id={section.id} className='ml-1 mt-5 md:ml-10 md:mt-20'>
                            <h2 className='text-2xl font-bold flex'>
                                <div className='text-base font-normal border-1 bg-black text-white mr-2 px-2.5 pt-0.5' style={{ borderRadius: "50%" }}>
                                    {index + 1}
                                </div>
                                {section.heading}
                            </h2>
                            <hr />
                            <p className='text-lg text-gray-500'><HtmlRenderer htmlContent={section.content || ""} /></p>
                        </div>
                    ))}
                </div>
            </div> */}
        </div>
    );
}

export default Lecture;
