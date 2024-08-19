import React from 'react';
import { useParams } from 'react-router-dom';
import IconBreadcrumbs from '../dashBoard/BreadCrumb';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

function WebDoc() {
    const { title } = useParams();
    
    const lectureData = [
        {
            id: 'introduction',
            heading: 'Introduction',
            content: 'This section introduces the concepts of GitHub Codespaces, why it\'s useful, and how you can get started quickly.'
        },
        {
            id: 'creating-your-codespace',
            heading: 'Creating your codespace',
            content: 'In this section, you\'ll learn how to create a new codespace, select a repository, and start coding.'
        },
        {
            id: 'running-the-application',
            heading: 'Running the application',
            content: 'Here we go over how to run the application within the codespace environment, including setting up dependencies.'
        },
        {
            id: 'editing-and-viewing-changes',
            heading: 'Edit the application and view changes',
            content: 'This section shows how to edit the code and instantly see the changes reflected in your running application.'
        }
    ];

    return (
        <div>
          
            
            <div className='md:flex'>
            <div className='mt-10 ml-5 md:mt-20 md:ml-5'>
                    <p className='font-bold my-5 text-lg    '>Topics</p>
                    <ul>
                        {lectureData.map((section) => (
                            <li className='flex mt-2' key={section.id}>
                               <RadioButtonCheckedIcon fontSize='sm' className='mt-1.5 mr-1 text-blue-500'/> <a href={`#${section.id}`} className=' text-blue-500 underline'>
                                    {section.heading}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <div className='uppercase text-gray-500 underline decoration-sky-600 md:decoration-blue-400 rounded ml-5 mt-5 md:mx-20 md:mt-20 font-bold text-3xl'>{title}</div>
                    
                    {lectureData.map((section) => (
                        <div key={section.id} id={section.id} className='ml-1 mt-5 md:mx-20 md:mt-20'>
                            <h2 className='text-2xl font-bold'>{section.heading}</h2>
                            <hr />
                            <p className='text-lg text-gray-500'>{section.content}</p>
                        </div>
                    ))}
                </div>
                
            </div>
        </div>
    );
}

export default WebDoc;
