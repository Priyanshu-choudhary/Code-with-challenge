import { useLocation, useNavigate } from 'react-router-dom';
import "./ReceiveQuestion.css";
import axios from 'axios';
import Grid from '@mui/material/Unstable_Grid2';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useRef, useContext, useEffect, useState } from 'react';
import MyEditor from "./SoleSecEditor";
import { UserContext } from '../Context/UserContext';
import Button from '@mui/material/Button';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import IconBreadcrumbs from '../dashBoard/BreadCrumb';
import Mcq from './Mcq';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import useCreateCourse from '../learnPath/CourseCreateApi';
import { useUpdateCourse } from '../SolvingSection/UpdateCourse'; // Ensure this is correctly imported
import { Upload } from '@mui/icons-material';

function QuestionApi() {
  const { bc, ibg, bg, light, dark, currentthemes, setcurrentthemes, user, password } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { CourseDescription, totalProblems, problems = [], currentIndex = 0, navHistory = '', currentPage = '' } = location.state || {};
  const [currentProblemIndex, setCurrentProblemIndex] = useState(currentIndex);
  const [problem, setProblem] = useState(problems[currentIndex] || {});
  const { title = '', description = '', example = '', difficulty = '', type = '', answer = '', testcase = '', boilerCode = '', optionA = '', optionB = '', optionC = '', optionD = '' } = problem;
  const [themes, setthemes] = useState("vs-dark");
  const [selectedOption, setSelectedOption] = useState('');
  const [flag, setflag] = useState("true");
  const [loading, setLoading] = useState(false); // State for button loading
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State for snackbar visibility
  const [currentans, setcurrentans] = useState('');

  const createCourse = useCreateCourse();
  const updateCourse = useUpdateCourse();
  // console.log(JSON.stringify(problem));
  const containerRef = useRef(null);

  const scrollToBottom = () => {
    const container = containerRef.current;
    container.scrollTop = container.scrollHeight;
  };

  useEffect(() => {
    document.body.classList.add('no-scroll');
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('currentthemes');
    if (savedTheme !== null) {
      setcurrentthemes(JSON.parse(savedTheme));
    }
  }, [setcurrentthemes]);

  useEffect(() => {
    setProblem(problems[currentProblemIndex] || {});
    setSelectedOption('');
  }, [currentProblemIndex, problems]);

  const questionOptions = [
    { value: 'optionA', label: optionA },
    { value: 'optionB', label: optionB },
    { value: 'optionC', label: optionC },
    { value: 'optionD', label: optionD },
  ];

  const update = async () => {
    // Start loading spinner

    // Update course if already created
    const progress = 1; // Example progress value, replace with actual logic
    const completeQuestions = [problem.id]; // Initialize with the current problem ID

    // Rating calculation based on difficulty
    let rating = 10; // Default rating
    if (difficulty) {
      const lowerDifficulty = difficulty.toLowerCase();
      if (lowerDifficulty === 'easy') {
        rating = 30;
      } else if (lowerDifficulty === 'medium') {
        rating = 60;
      } else if (lowerDifficulty === 'hard') {
        rating = 80;
      }
    }

    try {
      // Find the course ID matching navHistory

      const existingCourses = JSON.parse(localStorage.getItem("courses") || "[]");
      const courseToUpdate = existingCourses.find(course => course.title === navHistory);
      if (courseToUpdate) {
        const result = await updateCourse(courseToUpdate.id, progress, completeQuestions, rating, totalProblems);
        if (result.success) {
          setSnackbarOpen(true); // Show snackbar on successful update
        } else {
          alert(`Error updating course: ${result.error}`);
        }
      } else {
        alert(`Course with title '${navHistory}' not found.`);
      }
    } catch (updateError) {
      console.error('Error updating course:', updateError);
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  const checkAnswer = async () => {
    setLoading(true);
    if (selectedOption === answer) {
      try {
        const progress = 0; // Example progress value, replace with actual logic
        const completeQuestions = [problem.id]; // Initialize with the current problem ID

        const response = await createCourse(navHistory, description);
        console.log('Course created:', response);
        // alert('You got it!');
        if (flag) {
          update();
          setflag("false");
        }

      } catch (error) {
        console.error('Error creating course:', error);
        update();
        // alert('You got it!');
        console.log(CourseDescription);
      }
    } else if (selectedOption) {
      alert('Sorry, wrong answer!');
      setLoading(false);
    } else {
      alert('Please select an option.');
      setLoading(false);
    }
  };

  const handleOptionSelect = (value) => {
    setSelectedOption(value);
  };

  const getDifficultyLabel = () => {
    if (difficulty) {
      return difficulty.toLowerCase();
    } else if (type) {
      return type;
    } else {
      return 'Unknown';
    }
  };

  const handleNext = () => {
    if (currentProblemIndex < problems.length - 1) {
      setCurrentProblemIndex(currentProblemIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentProblemIndex > 0) {
      setCurrentProblemIndex(currentProblemIndex - 1);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const UploadAnswer = (ans) => {
    console.log("run automic", ans);
    if (ans.id) {
      setcurrentans(ans)
    }

    console.log(currentans);
  };


  const handleSubmit = async () => {
    if (!currentans.id) {
      alert('Run the code First.');
    } else {
      console.log(currentans.id);
      try {
        setLoading(true);
        setSnackbarOpen(true); 
        const response = await axios.post(
          'https://testcfc.onrender.com/Posts',
          currentans,
          {
            auth: {
              username: user,
              password: password,
            },
          }
        );
        console.log('Post created:', response.data);
        setLoading(false);
        alert('Correct Answer.');
        setcurrentans('');
      } catch (error) {
        console.error('Error upload post:', error);
        setLoading(false);
        setcurrentans('');
      }

    }
  };






  return (
    <div style={{ backgroundColor: bg, color: bg }}>
      <br />
      <IconBreadcrumbs currentPage={currentPage} title={navHistory} question={title} />
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 scroll-container" style={{ background: dark, color: ibg }}>
        <Container fluid>
          <Row>
            <Col className="editorsection" sm={2} style={{ height: "460px", width: "500px", overflowY: "scroll" }}>
              <Grid container spacing={2}>
                <Grid className='title' xs={9.5} >
                  <pre style={{ background: dark }}>{currentProblemIndex + 1}.{title}</pre><hr />
                </Grid>
                <Grid xs={2.5}>
                  <p className={`button ${getDifficultyLabel()}`} style={{ color: ibg }} >{getDifficultyLabel()}</p>
                </Grid>
                <Grid xs={14}>
                  <pre style={{ background: dark }}>  {description} </pre>
                </Grid>
                <Grid xs={0}></Grid>

                {example && <>
                  <Grid className='subtitle' xs={15}><hr />
                    Examples:
                  </Grid>
                  <Grid xs={16}>
                    <pre style={{ background: dark }}>{example}</pre>
                  </Grid>
                </>}

                {problem.solution && <>
                  <Grid className='subtitle' xs={15}><hr />
                    Input Format:
                  </Grid>
                  <Grid xs={16}>
                    <pre style={{ background: dark }}>{problem.solution}</pre>
                  </Grid>
                </>}
                {optionA ? <></> : <Grid className='subtitle' xs={15}><hr />
                  Constrain:

                  <br />
                  <pre> {problem.constrain}</pre>
                </Grid>}

              </Grid>

            </Col>
            <Col sm className="editorsection" style={{ height: "460px", overflowY: "scroll" }} id="scrollContainer" ref={containerRef}>
              {optionA ?
                <Mcq title={"questionTitle"} options={questionOptions} onOptionSelect={handleOptionSelect} />
                :
                <MyEditor input={problem.solution} saveToDatabase={UploadAnswer} myfun={scrollToBottom} problem={problem} themes={themes} courseTitle={navHistory} answer={answer} title={title} description={description} example={example} difficulty={difficulty} testcase={testcase} boilerCode={boilerCode} />
              }
            </Col>
          </Row>
        </Container>
      </div>
      <div style={{ justifyContent: "center", alignItems: "center", display: "flex", paddingBottom: "100px", gap: "50px", background: bg }}>
        <Button
          startIcon={<SkipPreviousIcon />}
          style={{ margin: "4px", backgroundColor: bc, color: ibg }}
          onClick={handlePrevious}
          disabled={currentProblemIndex === 0}
        >
          Previous
        </Button>
        {optionA ?
          <Button onClick={checkAnswer} style={{ margin: "4px", backgroundColor: bc, color: ibg }}>
            Submit
            {loading && <CircularProgress size={24} style={{ marginRight: 10 }} />}
          </Button>
          :
          <Button onClick={handleSubmit} style={{ margin: "4px", backgroundColor: bc, color: ibg }}>
            Submit
            {loading && <CircularProgress size={24} style={{ marginRight: 10 }} />}
          </Button>
        }
        <Button
          endIcon={<SkipNextIcon />}
          style={{ paddingLeft: "20px", paddingRight: "20px", margin: "4px", backgroundColor: bc, color: ibg }}
          onClick={handleNext}
          disabled={currentProblemIndex === problems.length - 1}
        >
          Next
        </Button>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Correct answer!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default QuestionApi;
