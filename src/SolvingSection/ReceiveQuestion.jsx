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
import SettingsIcon from '@mui/icons-material/Settings';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import Timer from './timer'; // Adjust the import path as necessary
import useCreateCourse from '../learnPath/CourseCreateApi';
import { useUpdateCourse } from '../SolvingSection/UpdateCourse'; // Ensure this is correctly imported
import { Upload } from '@mui/icons-material';
import YouTubePlayer from './youtubeVideo';
import AnchorTemporaryDrawer from './SideDrover';
import Spinner from 'react-bootstrap/Spinner';
import HtmlRenderer from '../Leetcode/HtmlRenderer';

function QuestionApi() {
  const { bc, ibg, bg, light, dark, currentthemes, setcurrentthemes, user, password } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { language, CourseDescription, totalProblems, problems = [], currentIndex = 0, navHistory = '', currentPage = '' } = location.state || {};
  const [currentProblemIndex, setCurrentProblemIndex] = useState(currentIndex);
  const [problem, setProblem] = useState(problems[currentIndex] || {});
  const { title = '', description = '', example = '', difficulty = '', type = '', answer = '', testcase = '', boilerCode = '', optionA = '', optionB = '', optionC = '', optionD = '' } = problem;
  const [themes, setthemes] = useState("vs-dark");
  const [selectedOption, setSelectedOption] = useState('');
  const [flag, setflag] = useState("true");
  const [loading, setLoading] = useState(false); // State for button loading
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State for snackbar visibility
  const [currentans, setcurrentans] = useState('');
  const [state, setState] = useState(false);
  const [iSubmit, setiSubmit] = useState(false);

  const createCourse = useCreateCourse();
  const updateCourse = useUpdateCourse();

  const containerRef = useRef(null);
  const dividerRef = useRef(null); // Ref for the divider
  const [dragging, setDragging] = useState(false);
  const [dividerPosition, setDividerPosition] = useState(40); // Initial position in percentage
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [level, setlevel] = useState(1);
  const [btn1BG, set1btnBG] = useState(light);
  const [btn2BG, set2btnBG] = useState(light);
  const [btn3BG, set3btnBG] = useState(light);
  const [selectedOption2, setSelectedOption2] = useState(language[0]);
  const [dropdownToggle, setdropdownToggle] = useState(false)

  const options = {
    option1: 'ChatGPT',
    option2: 'ChatGPT',
  };
  const handleSelect = (options) => {
    setSelectedOption(options);
  };

  const toggleTimer = () => {
    setIsTimerRunning(prevState => !prevState);
  };

  const openSetting = () => {
    if (state == true) {
      setState(false);
    } else {
      setState(true);
    }

  };
  const setinglevel = (val) => {
    setlevel(val);
  }



  useEffect(() => {
    if (level == 1) {
      set1btnBG("grey");

      set2btnBG(light);
      set3btnBG(light);
    } else if (level == 2) {
      set2btnBG("grey");

      set1btnBG(light);
      set3btnBG(light);
    }
    else if (level == 3) {
      set3btnBG("grey");

      set1btnBG(light);
      set2btnBG(light);
    }


  }, [level, light])

  useEffect(() => {

    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });

    }, 250); // 1 second delay
   
    return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
  }, []); // Empty dependency array ensures this runs only once on mount



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
    console.log("answer"+answer);
    if (selectedOption == answer) {
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

      if (editorRef.current) {
        editorRef.current.resetEditorState();
      }
    }
  };

  const handlePrevious = () => {
    if (currentProblemIndex > 0) {
      setCurrentProblemIndex(currentProblemIndex - 1);
      setCurrentProblemIndex(currentProblemIndex - 1);
      if (editorRef.current) {
        editorRef.current.resetEditorState();
      }
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
      alert('Correctly Run the code First.');
    } else {
      console.log(currentans.id);
      try {
        setLoading(true);
        try { const response1 = await createCourse(navHistory, description); }
        catch (error) {
          const response2 = await update();
        }
        const response2 = await update();
        const response = await axios.post(
          'https://hytechlabs.online:9090/Posts',
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
        // setSnackbarOpen(true);
        setcurrentans('');
      } catch (error) {
        console.error('Error upload post:', error);
        setLoading(false);
        setcurrentans('');
      }

    }
  };

  const editorRef = useRef();

  const handleRunCode = () => {
    if (editorRef.current) {
      editorRef.current.getCode();
    }
  };
  return (
    <div style={{ backgroundColor: bg, color: bg, paddingBottom: 1 }}>
      <br />


      <IconBreadcrumbs currentPage={currentPage} title={navHistory} question={title} />
      <div style={{ background: dark, color: ibg }}>
        <div className='tollBar' style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex" }}>

            <button style={{ marginTop: 3, marginLeft: 20, color: ibg, backgroundColor: btn1BG, paddingLeft: 10, paddingRight: 10, padding: 5, borderRadius: 10, borderRadius: "10px 10px 0px 0px" }} onClick={() => setinglevel(1)}>Problem</button>
            <button style={{ marginTop: 3, marginLeft: 20, color: ibg, backgroundColor: btn2BG, paddingLeft: 10, paddingRight: 10, padding: 5, borderRadius: 10, borderRadius: "10px 10px 0px 0px" }} onClick={() => setinglevel(2)}>Solution/Hints</button>
            <button style={{ marginTop: 3, marginLeft: 20, color: ibg, backgroundColor: btn3BG, paddingLeft: 10, paddingRight: 10, padding: 5, borderRadius: 10, borderRadius: "10px 10px 0px 0px" }} onClick={() => setinglevel(3)}>Discuss</button>
          </div>



          {!optionA &&
            <div>
              {language[0] && <div className='dropdown'>
                <button style={{ marginTop: 10, padding: 7, borderWidth: 1, borderRadius:10 ,borderColor:ibg }} onClick={() => dropdownToggle ? setdropdownToggle(false) : setdropdownToggle(true)} class=" dropdown-toggle" type="button"   >
                  {selectedOption2}

                </button>
                {dropdownToggle &&
                  <div className='overlay' style={{ borderRadius: 5, marginTop: 5 ,background:light,color:ibg,borderRadius:5,borderColor:bg}}>
                    <button className='LanguagebuttonMenu' style={{ padding: 5 }} onClick={() => { setSelectedOption2(language[0]); setdropdownToggle(false) }}>
                      {language[0]}
                    </button>

                    <button className='LanguagebuttonMenu' style={{ padding: 5 }} onClick={() => { setSelectedOption2(language[1]); setdropdownToggle(false) }}>
                      {language[1]}
                    </button>

                    <button className='LanguagebuttonMenu' style={{ padding: 5 }} onClick={() => { setSelectedOption2(language[2]); setdropdownToggle(false) }}>
                      {language[2]}
                    </button>

                    <button className='LanguagebuttonMenu' style={{ padding: 5 }} onClick={() => { setSelectedOption2(language[3]); setdropdownToggle(false) }}>
                      {language[3]}
                    </button>

                  </div>}

              </div>
              }
            </div>
          }


          <div style={{ display: "flex" }}>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 10 }}>
              <AlarmOnIcon onClick={toggleTimer} />
              <Timer running={isTimerRunning} />
              <SettingsIcon onClick={openSetting} />
              <RestartAltIcon />
              <AnchorTemporaryDrawer open={state} />
            </div>
          </div>
        </div>
        <Container fluid>
          <Row>
            <Col className="questionSection no-scroll" sm={2} style={{ height: "70vh", width: `${dividerPosition}%`, overflowY: "scroll" }}>

              <Grid container spacing={2}>
                <Grid className='title' xs={9.5} >
                  <pre style={{ background: dark }}>{currentProblemIndex + 1}.{title}</pre><hr />
                </Grid>
                <Grid xs={2.5}>
                  <p className={`button ${getDifficultyLabel()}`} style={{ color: ibg }} >{getDifficultyLabel()}</p>
                </Grid>
                {level == 1 && <div>
                  <Grid xs={14} style={{ width: "100%" }}>
                    <pre style={{ background: dark }}>  <HtmlRenderer htmlContent={description} /> </pre>
                  </Grid>
                  <Grid xs={0}></Grid>

                  {example && <>
                    <Grid className='subtitle' xs={15} style={{}}><hr />
                      Examples:
                    </Grid>
                    <Grid xs={16}>
                      <pre style={{ background: dark, width: "80%" }}>{example}</pre>
                    </Grid>
                  </>}

                  {problem.solution && <>
                    <Grid className='subtitle' xs={15}><hr />
                      Input Format:
                    </Grid>
                    <Grid xs={16}>
                      {/* <pre style={{ background: dark }}>{problem.solution}</pre> */}
                      {typeof problem.solution === 'string' ? problem.solution : JSON.stringify(problem.solution, null, 2)}
                    </Grid>
                  </>}
                  {problem.constrain && <Grid className='subtitle' xs={15}><hr />
                    Constrain:

                    <br />
                    <pre> {problem.constrain}</pre>
                  </Grid>}
                </div>
                }
                {level == 2 && <div>
                  {problem.videoUrl ? <Grid className='subtitle' xs={15}>
                    Solution Video:
                    <br />
                    <div style={{ marginTop: 20 }}>
                      <YouTubePlayer url={problem.videoUrl} />
                    </div>
                  </Grid> : <p style={{ marginLeft: 20 }}>No Solution for this question.</p>}
                </div>}
                {level == 3 &&
                  <p style={{ marginLeft: 20 }}>No discuss for this question.</p>
                }
              </Grid>


            </Col>
            {/* <div 
              ref={dividerRef} 
              className="divider" 
              onMouseDown={handleMouseDown}
            /> */}
            <Col sm className="editorsection no-scroll" style={{ height: "80vh", overflowY: "scroll", width: `${100 - dividerPosition}%` }} id="scrollContainer" ref={containerRef}>
              {optionA ?
                <Mcq title={"questionTitle"} options={questionOptions} onOptionSelect={handleOptionSelect} />
                :
                <>
                  <MyEditor CourseLanguage={selectedOption2 } spin={setiSubmit} ref={editorRef} input={problem.solution} saveToDatabase={UploadAnswer} problem={problem} themes={themes} courseTitle={navHistory} answer={answer} title={title} description={description} example={example} difficulty={difficulty}  />
                </>

              }
            </Col>
          </Row>
        </Container>
      </div>
      <div className="sticky-bottom-center" style={{ backgroundColor: light, borderRadius: 10, width: "100%", marginLeft: 10, marginRight: 10 }}>
        <Button
          startIcon={<SkipPreviousIcon />}
          style={{ margin: "4px", backgroundColor: light, color: ibg }}
          onClick={handlePrevious}
          disabled={currentProblemIndex === 0}
        >
          Previous
        </Button>
        {!optionA && <Button
          // startIcon={<SkipPreviousIcon />}
          style={{ margin: "4px", backgroundColor: dark, color: ibg }}
          onClick={handleRunCode}
          disabled={currentProblemIndex === 0}
        >
          Run
          {iSubmit && <Spinner style={{ marginLeft: "5px" }} animation="border" size="sm" />}
        </Button>}
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
          style={{ paddingLeft: "20px", paddingRight: "20px", margin: "4px", backgroundColor: light, color: ibg }}
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
