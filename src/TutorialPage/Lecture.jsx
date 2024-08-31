import React, { useEffect, useState,useContext } from 'react';
import { useParams } from 'react-router-dom';
import IconBreadcrumbs from '../dashBoard/BreadCrumb';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import HtmlRenderer from '../Leetcode/HtmlRenderer';
import { UserContext } from '../Context/UserContext';
import DoneIcon from '@mui/icons-material/Done'; // Import done icon
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import CreateIcon from '@mui/icons-material/Create';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate, useLocation } from 'react-router-dom';
import Dashboard from '../dashBoard/Dashboard';
function Lecture() {
    const { title, LectureId } = useParams();
    const [lectureData, setLectureData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [id, setid] = useState()
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
                // console.log(data);
                setid(data) // Check the structure of the fetched data
                setLectureData(data.sections || []); // Adjust according to the actual structure
                setLoading(false);
            } catch (error) {
                setError(error.message || 'An error occurred while fetching data');
                setLoading(false);
            }
        };

        fetchLectureData();
    }, [LectureId, title]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

const handleDelete = async (courseId, courseName) => {
    if (window.confirm(`Are you sure you want to delete the leacture "${id.title}"?`)) {
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
          // Remove the course from state
          navigate('/Tutorials') 
        } else {
          console.error('Failed to delete course:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error deleting course:', error);
      }
    }
  };

    return (
        <div style={{backgroundColor:bg, color:ibg}}>
            <Dashboard/>
            <IconBreadcrumbs currentPage={"Tutorial"} title={"learn"} question={title || 'Default Title'} />
            <hr />
            {role == "ADMIN" &&
                  <div>
                    <div className="button-86" style={{ position: "absolute", right: 10, top: 110, color: "black" }} >
                      <CreateIcon fontSize='large' onClick={() => { navigate(`/EditLecture/${id.id}`); }} />
                    </div>
                    <div className="button-86" style={{ position: "absolute", right: 10, top: 180, color: "black" }} >
                      <DeleteForeverIcon fontSize='large' onClick={() => { handleDelete(id.id, id.title);}} />
                    </div>
                  </div>
                }     
            <div  className='md:flex'>
                <div style={{backgroundColor:dark}}className='pt-2 pl-2'>
                    <p className='font-bold mb-3  text-lg flex'>Topics in this Lecture <span className='ml-3 text-gray-400'>[{lectureData.length}]</span></p>
                    <ul>
                        {lectureData.map((section, index) => (
                            <li className='flex ml-3 hover:bg-blue-50 p-2 rounded-lg' key={section.id}>
                                <RadioButtonCheckedIcon fontSize='small' className='mt-0.5 mr-1 text-blue-500' />
                                <a href={`#${section.id}`} className='text-blue-500 '>{section.heading}</a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div style={{ borderLeft: "1px solid #000"}}></div>
                <div>
                    <div style={{backgroundColor:bc ,width:"fit-content"}} className='uppercase rounded ml-5  md:mx-5 mt-5 md:mt-20 font-bold text-3xl px-3'>{title}</div>
                    {lectureData.map((section, index) => (
                        <div key={section.id} id={section.id} className='ml-1 mt-5 md:ml-10 md:mt-20'>
                            <h2 className='text-2xl font-bold flex'>
                                <div className='text-base font-normal border-1 bg-black text-white mr-2 px-2.5 pt-0.5' style={{ borderRadius: "50%" }}>
                                    {index + 1}
                                </div>
                                {section.heading}
                            </h2>
                            <hr />
                            <p className='text-lg p-3 text-gray-500'><HtmlRenderer htmlContent={section.content || ""} /></p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Lecture;
