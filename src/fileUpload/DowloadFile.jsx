import React, { useState } from 'react';
import axios from 'axios';

const FileDownload = () => {
  const [filename, setFilename] = useState('');

  const handleInputChange = (event) => {
    setFilename(event.target.value);
  };

  const handleDownload = async () => {
    if (!filename) {
      alert('Please enter a filename');
      return;
    }

    try {
      // Make GET request to download file
      const response = await axios({
        url: `https://hytechlabs.online:9090/files/${filename}`,
        method: 'GET',
        responseType: 'blob', // Important for file download
      });

      // Create a URL for the file
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Create a link element and trigger download
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename); // Specify the file name

      // Append link to body and click it to trigger download
      document.body.appendChild(link);
      link.click();

      // Clean up
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading file:', error);
      alert('Failed to download file');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={filename}
        onChange={handleInputChange}
        placeholder="Enter filename"
      />
      <button onClick={handleDownload}>
        Download
      </button>
    </div>
  );
};

export default FileDownload;
