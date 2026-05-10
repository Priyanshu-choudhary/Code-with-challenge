import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
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
        const response = await axios.get(`http://localhost:9090/Lecture/id/${id}`, {
          headers: { 'Content-Type': 'application/json' },
          auth: {
            username: 'testleacture',
            password: 'testleacture'
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

  const handleDelete = async (headingTitle, subHeadingTitle) => {
    const confirmation = window.confirm(
      `Are you sure you want to delete ${subHeadingTitle ? `subheading "${subHeadingTitle}"` : `heading "${headingTitle}"`
      }?`
    );
    if (!confirmation) return;

    setLoading(true);
    try {
      const data = {
        headingsToRemove: headingTitle ? [headingTitle] : [],
        subHeadingsToRemove: subHeadingTitle ? [subHeadingTitle] : []
      };

      // console.log(`http://localhost:9090/Lecture/removeHeadings/id/${id}`+"  >> "+JSON.stringify(data));

      await axios.put(
        `http://localhost:9090/Lecture/removeHeadings/id/${id}`,
        data,
        {
          headers: { 'Content-Type': 'application/json' },
          auth: {
            username: 'testleacture',
            password: 'testleacture'
          }
        }
      );
      setAlert({ show: true, message: 'Deleted successfully!', severity: 'success' });

      // Remove heading or subheading from formData
      if (headingTitle) {
        setFormData((prevData) => ({
          ...prevData,
          headings: prevData.headings.filter((heading) => heading.title !== headingTitle)
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          headings: prevData.headings.map((heading) => ({
            ...heading,
            subHeadings: heading.subHeadings.filter(
              (subHeading) => subHeading.title !== subHeadingTitle
            )
          }))
        }));
      }
    } catch (error) {
      console.error('Error deleting:', error);
      setAlert({ show: true, message: 'Failed to delete', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };


  const handleSubmit = async () => {
    let validationError = false;

    // Validate all headings and subheadings (only title, skip content)
    for (let i = 0; i < formData.headings.length; i++) {
      const heading = formData.headings[i];

      if (!heading.title || heading.title.trim() === '') {
        setAlert({ show: true, message: `Heading ${i + 1} title cannot be empty.`, severity: 'error' });
        validationError = true;
        break;
      }

      for (let j = 0; j < heading.subHeadings.length; j++) {
        const subHeading = heading.subHeadings[j];

        if (!subHeading.title || subHeading.title.trim() === '') {
          setAlert({ show: true, message: `Subheading ${j + 1} of Heading ${i + 1} title cannot be empty.`, severity: 'error' });
          validationError = true;
          break;
        }

        // Skip content validation for subHeadings
      }

      if (validationError) break; // Stop validation if any error is found
    }

    if (validationError) return; // Prevent form submission if validation fails

    setLoading(true);
    try {
      await axios.put(
        `http://localhost:9090/Lecture/id/${id}`,
        formData,
        {
          headers: { 'Content-Type': 'application/json' },
          auth: {
            username: 'testleacture',
            password: 'testleacture'
          }
        }
      );
      setAlert({ show: true, message: 'Lecture updated successfully!', severity: 'success' });
    } catch (error) {
      console.error('Error updating lecture:', error);
      setAlert({ show: true, message: 'Failed to update lecture', severity: 'error' });
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
              <div className='flex border-2 m-2 px-2 rounded-lg border-black bg-blue-50'>
                <p className='text-md mt-3 text-gray-600'>
                  H{headingIndex + 1}-
                </p>
                <ListItem button onClick={() => handleHeadingClick(headingIndex)}>
                  <ListItemText primary={heading.title || `Heading ${headingIndex + 1}`} />
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDelete(heading.title, null)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              </div>
              <Collapse in={activeHeading === headingIndex} timeout="auto" unmountOnExit>
                <div className="ml-5">
                  <TextField
                    id="heading"
                    label={`Heading ${headingIndex + 1} Title`}
                    fullWidth
                    value={heading.title}
                    onChange={(e) => handleHeadingChange(headingIndex, 'title', e.target.value)}
                    margin="normal"
                  />

                  {heading.subHeadings.map((subHeading, subHeadingIndex) => (
                    <div key={subHeadingIndex} className="ml-5 border-2 m-2 px-2 rounded-lg bg-yellow-50">
                      <div className='flex'>
                        <p className='text-xl mt-3 text-gray-600'>{subHeadingIndex + 1}</p>
                        <ListItem button onClick={() => handleSubHeadingClick(subHeadingIndex)}>
                          <ListItemText
                            primary={subHeading.title || `Subheading ${subHeadingIndex + 1}`}
                          />
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => handleDelete(null, subHeading.title)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ListItem>
                      </div>
                      <Collapse in={activeSubHeading === subHeadingIndex} timeout="auto" unmountOnExit>
                        <div className='flex'>

                          <TextField
                            id="subheading"
                            label={`Subheading Topics ${subHeadingIndex + 1} Title`}
                            fullWidth
                            value={subHeading.title}
                            onChange={(e) =>
                              handleSubHeadingChange(headingIndex, subHeadingIndex, 'title', e.target.value)
                            }
                            margin="normal"
                          />
                        </div>
                        <Tinymce
                          initialValue={subHeading.content}
                          setDescription={(value) =>
                            handleSubHeadingChange(headingIndex, subHeadingIndex, 'content', value)
                          }
                        />
                      </Collapse>
                    </div>
                  ))}

                  <Button variant="outlined" onClick={() => handleAddSubHeading(headingIndex)}>
                    Add Subheading
                  </Button>
                </div>
              </Collapse>
            </div>
          ))}
        </List>

        <Button variant="outlined" onClick={handleAddHeading}>
          Add Heading
        </Button>

      </Box>
      <div style={{ position: 'sticky', bottom: 0, right: 10, zIndex: 10000 }}>
        <Button variant="contained" onClick={handleSubmit} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Submit'}
        </Button>
      </div>
    </>
  );
}

