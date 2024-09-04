import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import axios from 'axios';
import Dashboard from '../dashBoard/Dashboard';
import { useParams } from 'react-router-dom';
import Tinymce from '../TinyMCE/TinyMCE';

export default function EditLecture() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    headings: [
      {
        title: '',
        subHeadings: [
          { title: '', content: '' }
        ]
      }
    ]
  });
  const [alert, setAlert] = useState({ show: false, message: '', severity: '' });
  const [loading, setLoading] = useState(false);
  const [activeHeading, setActiveHeading] = useState(null);
  const [activeSubHeading, setActiveSubHeading] = useState(null);

  useEffect(() => {
    const fetchLectureData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://hytechlabs.online:9090/Lecture/id/${id}`, {
          headers: { 'Content-Type': 'application/json' },
          auth: {
            username: 'testleacture', // Replace with your actual username
            password: 'testleacture'  // Replace with your actual password
          }
        });
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching lecture:', error);
        setAlert({ show: true, message: `Failed to fetch lecture data`, severity: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchLectureData();
  }, [id]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleHeadingChange = (headingIndex, field, value) => {
    const newHeadings = formData.headings.map((heading, i) =>
      i === headingIndex ? { ...heading, [field]: value } : heading
    );
    setFormData({ ...formData, headings: newHeadings });
  };

  const handleSubHeadingChange = (headingIndex, subHeadingIndex, field, value) => {
    const newHeadings = formData.headings.map((heading, i) => {
      if (i === headingIndex) {
        const newSubHeadings = heading.subHeadings.map((subHeading, j) =>
          j === subHeadingIndex ? { ...subHeading, [field]: value } : subHeading
        );
        return { ...heading, subHeadings: newSubHeadings };
      }
      return heading;
    });
    setFormData({ ...formData, headings: newHeadings });
  };

  const handleAddHeading = () => {
    setFormData((prevData) => ({
      ...prevData,
      headings: [...prevData.headings, { title: '', subHeadings: [{ title: '', content: '' }] }],
    }));
  };

  const handleAddSubHeading = (headingIndex) => {
    const newHeadings = formData.headings.map((heading, i) =>
      i === headingIndex
        ? { ...heading, subHeadings: [...heading.subHeadings, { title: '', content: '' }] }
        : heading
    );
    setFormData({ ...formData, headings: newHeadings });
  };

  const handleHeadingClick = (index) => {
    setActiveHeading(index === activeHeading ? null : index);
    setActiveSubHeading(null);
  };

  const handleSubHeadingClick = (index) => {
    setActiveSubHeading(index === activeSubHeading ? null : index);
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const response = await axios.put(
        `https://hytechlabs.online:9090/Lecture/id/${id}`,
        formData,
        {
          headers: { 'Content-Type': 'application/json' },
          auth: {
            username: 'testleacture', // Replace with your actual username
            password: 'testleacture'  // Replace with your actual password
          }
        }
      );

      console.log('Response:', response.data);
      setAlert({ show: true, message: `Lecture updated successfully!`, severity: 'success' });
    } catch (error) {
      console.error('Error updating lecture:', error);
      setAlert({ show: true, message: `Failed to update lecture`, severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dashboard />
      <Box className="lecture-form-container">
        {alert.show && <Alert severity={alert.severity}>{alert.message}</Alert>}

        <TextField
          id="title"
          label="Lecture Title"
          fullWidth
          value={formData.title}
          onChange={handleChange}
          margin="normal"
        />

        <TextField
          id="author"
          label="Author"
          fullWidth
          value={formData.author}
          onChange={handleChange}
          margin="normal"
        />

        <List>
          {formData.headings.map((heading, headingIndex) => (
            <div key={headingIndex}>
              <ListItem button onClick={() => handleHeadingClick(headingIndex)}>
                <ListItemText primary={`Heading ${headingIndex + 1}`} />
              </ListItem>
              <Collapse in={activeHeading === headingIndex} timeout="auto" unmountOnExit>
                <div className='ml-5'>
                  <TextField
                    id="heading"
                    label={`Heading ${headingIndex + 1} Title`}
                    fullWidth
                    value={heading.title}
                    onChange={(e) => handleHeadingChange(headingIndex, 'title', e.target.value)}
                    margin="normal"
                  />

                  {heading.subHeadings.map((subHeading, subHeadingIndex) => (
                    <div key={subHeadingIndex} className='ml-5'>
                      <ListItem button onClick={() => handleSubHeadingClick(subHeadingIndex)}>
                        <ListItemText primary={`Subheading ${subHeadingIndex + 1}`} />
                      </ListItem>
                      <Collapse in={activeSubHeading === subHeadingIndex} timeout="auto" unmountOnExit>
                        <TextField
                          id="subheading"
                          label={`Subheading ${subHeadingIndex + 1} Title`}
                          fullWidth
                          value={subHeading.title}
                          onChange={(e) =>
                            handleSubHeadingChange(headingIndex, subHeadingIndex, 'title', e.target.value)
                          }
                          margin="normal"
                        />
                        {!loading && (
                          <Tinymce
                            initialValue={subHeading.content}
                            setDescription={(value) =>
                              handleSubHeadingChange(headingIndex, subHeadingIndex, 'content', value)
                            }
                          />
                        )}
                      </Collapse>
                    </div>
                  ))}

                  <Button variant="contained" color="secondary" onClick={() => handleAddSubHeading(headingIndex)}>
                    Add Subheading
                  </Button>
                </div>
              </Collapse>
            </div>
          ))}
        </List>

        <Button variant="contained" color="primary" onClick={handleAddHeading}>
          Add Heading
        </Button>

        <Button
          style={{ width: "100%", marginTop: "20px" }}
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Update Lecture'}
        </Button>
      </Box>
    </>
  );
}
