import React, { useState } from 'react';
import axios from 'axios';
import Dashboard from '../dashBoard/Dashboard';

function ImageUpload() {
  const [file, setFile] = useState(null);
const [UploadedimageUrl, setUploadedimageUrl] = useState()
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    console.log('Selected file:', selectedFile); // Log selected file details
    setFile(selectedFile);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!file) {
      console.warn('No file selected'); // Log warning if no file selected
      alert('Please select a file to upload.');
      return;
    }
    
    const formData = new FormData();
    formData.append('file', file);

    console.log('Submitting file upload request:', file); // Log before making the request

    try {
      const response = await axios.post('https://hytechlabs.online:9090/Files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Upload response:', response.data); // Log response data
     
        setUploadedimageUrl( response.data.fileUrl)
        console.log("url "+response.data.fileUrl);
      
      alert('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error.response ? error.response.data : error.message); // Log error details
      alert('Error uploading image!');
    }
  };

  return (
    <>
      <Dashboard />
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit">Upload</button>
        <img src={UploadedimageUrl|| ""} alt="" />
      </form>
    </>
  );
}

export default ImageUpload;
