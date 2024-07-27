import { useLocation, useNavigate, useParams } from 'react-router-dom';
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
import useCreateUserContestDetail from '/src/Contest/UserDetails/CreateUserDetails';
import { useUpdateCourse } from '../SolvingSection/UpdateCourse'; // Ensure this is correctly imported
import { Upload } from '@mui/icons-material';
import YouTubePlayer from './youtubeVideo';
import AnchorTemporaryDrawer from './SideDrover';
import Spinner from 'react-bootstrap/Spinner';
import HtmlRenderer from '../Leetcode/HtmlRenderer';
import MiniProblemDrawerComponent from './MiniProblemList';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

import TestModeHeading from './TestModeHeading';
import SecurityChecks from '../Contest/Security/SecurityChecks';
import SubmitButton from '../Buttons/SubmitButton';
function QuestionApi() {
  const { id, detailsType } = useParams();
  const { bc, ibg, bg, light, dark, currentthemes, setcurrentthemes, user, password } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { contest = '', timeLeft, language, CourseDescription = '', totalProblems = '', problems = [], currentIndex = 0, navHistory = '', currentPage = '' } = location.state || {};
  const [currentProblemIndex, setCurrentProblemIndex] = useState(currentIndex);
  const [problem, setProblem] = useState(problems[currentIndex] || {});
  const { title = '', description = '', example = '', difficulty = '', type = '', answer = '', optionA = '', optionB = '', optionC = '', optionD = '' } = problem;
  const [themes, setthemes] = useState("vs-dark");
  const [selectedOption, setSelectedOption] = useState('');
  const [flag, setflag] = useState("true");
  const [loading, setLoading] = useState(false); // State for button loading
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State for snackbar visibility
  const [currentans, setcurrentans] = useState('');
  const [state, setState] = useState(false);
  const [state2, setState2] = useState(false);
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
  const [selectedOption2, setSelectedOption2] = useState(language[0] == "java" ? language[0] : language[language.length - 1]);
  const [dropdownToggle, setdropdownToggle] = useState(false)
  const [resetMcq, setResetMcq] = useState(false);
  const [contestStartDate, setcontestStartDate] = useState("")
  const [UserDetailsContestId, setUserDetailsContestId] = useState()
  const [editorValue, seteditorValue] = useState()
  const [submitProblem, setsubmitProblem] = useState([])
  const [submitProblemTitle, setsubmitProblemTitle] = useState([])
  const [btnTitle, setBtnTitle] = useState("Submit Question");

  // console.log("type "+detailsType);
  const options = {
    option1: 'ChatGPT',
    option2: 'ChatGPT',
  };
  const handleSelect = (options) => {
    setSelectedOption(options);
    setResetMcq(true); // Trigger MCQ reset
  };
  useEffect(() => {
    const checkIfProblemAttempted = () => {
      const attempted = submitProblem.some(
        (doneproblem) => problem.title === doneproblem.title
      );
      setBtnTitle(attempted ? "Submit Again" : "Submit Question");
    };

    checkIfProblemAttempted();
  }, [currentProblemIndex, problem, submitProblem]);
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

  const openMiniProblemDrswer = () => {
    if (state2 == true) {
      setState2(false);
    } else {
      setState2(true);
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
    console.log("answer>> " + answer);
    console.log("selectedOption>> " + selectedOption);

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
    setResetMcq(true);
    if (currentProblemIndex < problems.length - 1) {
      setCurrentProblemIndex(currentProblemIndex + 1);
      setResetMcq(true);
      if (editorRef.current) {
        setResetMcq(true);
        editorRef.current.resetEditorState();
      }
    }
  };
  const setIndex = (index) => {
    setCurrentProblemIndex(index);
  }
  const handlePrevious = () => {
    setResetMcq(true);
    if (currentProblemIndex > 0) {
      setResetMcq(true);
      setCurrentProblemIndex(currentProblemIndex - 1);

      if (editorRef.current) {
        editorRef.current.resetEditorState();
        setResetMcq(true);
      }
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const UploadAnswer = (ans) => {
    // console.log("run automic", ans);
    if (ans.id) {
      setcurrentans(ans)
    }


  };


  const userContestDetailsCreate = async () => {
    try {
      // Make API call to create the contest
      // console.log(user + " " + password);
      const newContest = {
        nameOfContest: contest.nameOfContest,
        nameOfOrganization: contest.nameOfOrganization,
        date: new Date(),

      };

      const basicAuth = 'Basic ' + btoa(`${user}:${password}`);
      console.log("contest detail " + JSON.stringify(newContest));

      const response = await fetch(`https://hytechlabs.online:9090/UserDetailsContest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': basicAuth,
        },
        body: JSON.stringify(newContest)
      });

      const contentType = response.headers.get('content-type');
      let data;

      if (contentType && contentType.includes('application/json')) {
        data = await response.json();


      } else {
        const text = await response.text();
        console.error('Unexpected response format:', text);
        throw new Error('Failed to create contest: Unexpected response format');
      }
      if (response.ok) {
        setUserDetailsContestId(data);
      }
      if (!response.ok) {
        throw new Error('Failed to create contest');
      }


      console.log('contest created:', data);
      setcontestStartDate(data.date)


    } catch (error) {
      console.error('Error creating contest:', error);
      throw error; // Rethrow the error to handle it in the calling component
    }

  }
  useEffect(() => {
    console.log("ans " + answer);
  }, [])

  useEffect(() => {
    if (detailsType == "Contest") {
      userContestDetailsCreate();
    }

  }, [])


  function generateObjectId() {
    let timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    let machineId = 'xxxxxxxxxxxx'.replace(/[x]/g, function () {
      return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
    let processId = 'xx';
    let counter = 'xxxxxxxx'.replace(/[x]/g, function () {
      return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();

    return timestamp + machineId + processId + counter;
  }

  const handleSubmitContestQuestion = async () => {
    if (!currentans.id) {
      alert('Correctly Run the code First.');
    } else {
      try {
        setLoading(true);
        console.log("current ans: " + JSON.stringify(currentans));

        // Ensure currentans.solution is an object
        if (!currentans.solution) {
          currentans.solution = {};
        }

        // Add the Java solution to the currentans.solution object
        currentans.solution["java"] = {
          solution: editorValue
        };
        if (btnTitle == "Submit Question") {
          currentans.id = generateObjectId();
        }
        // currentans.id = generateObjectId();
        // Optional: You can add solutions for other languages similarly
        // currentans.solution["python"] = {
        //     solution: pythonEditorValue
        // };
        // console.log("current ans "+currentans);
        const response = await axios.post(
          `https://hytechlabs.online:9090/UserDetailsContest/${contest.nameOfContest}/username/${user}`,
          currentans,
          {

          }
        );
        console.log('Post created:', response.data);

        setLoading(false);
        // setSnackbarOpen(true);
        setcurrentans('');
      } catch (error) {
        console.error('Error upload post to user contest solving:', error);
        setLoading(false);
        setcurrentans('');
      }
    }
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
      console.log("code" + editorRef.current.getValue());
    }
  };

  const getSolution = (code) => {
    seteditorValue(code)
  };


  useEffect(() => {
    // console.log("id data> ", JSON.stringify(UserDetailsContestId.id));
  }, [UserDetailsContestId])
  const handleTestSubmit = async () => {
    try {
      const endTime = new Date().toISOString();;
      const response = await axios.put(
        `https://hytechlabs.online:9090/UserDetailsContest/id/${UserDetailsContestId.id}`,
        { endTime },
        {
          auth: {
            username: user,
            password: password,
          },
        }
      );
      if (response.status === 200) {
        console.log("End time updated successfully.");
      }
    } catch (error) {
      console.error("Error updating end time:", error);
    } finally {
      navigate("/contest")
    }
  };
  return (
    <div style={{ backgroundColor: bg, color: ibg, paddingBottom: 1 }}>
      <br />
      {detailsType == "Contest" && <SecurityChecks />}

      {detailsType == "Course" &&
        <IconBreadcrumbs currentPage={currentPage} title={navHistory} question={title} />
      }
      {detailsType == "Contest" &&
        <TestModeHeading initialTimeLeft={timeLeft} startedAt={contestStartDate} />
      }

      <div style={{ background: dark, color: ibg, height: "100vh" }}>
        <div className='' style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex" }}>
            <KeyboardDoubleArrowRightIcon fontSize='large' style={{ marginTop: 13, marginLeft: 20, borderRadius: 10, borderColor: ibg, borderRadius: "10px 10px 0px 0px", borderWidth: 1 }} onClick={() => state2 ? setState2(false) : setState2(true)} />
            <button style={{ marginTop: 3, marginLeft: 20, color: ibg, backgroundColor: btn1BG, paddingLeft: 10, paddingRight: 10, padding: 5, borderRadius: 10, borderRadius: "10px 10px 0px 0px" }} onClick={() => setinglevel(1)}>Problem</button>

            <div>
              <button style={{ marginTop: 3, marginLeft: 20, color: ibg, backgroundColor: btn2BG, paddingLeft: 10, paddingRight: 10, padding: 5, borderRadius: 10, borderRadius: "10px 10px 0px 0px" }} onClick={() => setinglevel(2)}>Solution/Hints</button>
              <button style={{ marginTop: 3, marginLeft: 20, color: ibg, backgroundColor: btn3BG, paddingLeft: 10, paddingRight: 10, padding: 5, borderRadius: 10, borderRadius: "10px 10px 0px 0px" }} onClick={() => setinglevel(3)}>Discuss</button>
            </div>

            <div style={{ marginTop: 15 }}>
              <MiniProblemDrawerComponent setsubmitProblemTitle={setsubmitProblemTitle} setsubmitProblem={setsubmitProblem} contestName={contest.nameOfContest} user={user} setIndex={setIndex} problems={problems} open={state2} onClose={() => { setState2(false) }} />
            </div>
          </div>

            <div style={{ position: "absolute", right: 10, top: 10 }}>
              <SubmitButton onClick={() => { handleTestSubmit(); }} />
            </div>
          }
          
          {!optionA &&
            <div>
              {language[0] && <div className='dropdown'>
                <button style={{ marginTop: 10, padding: 7, borderWidth: 1, borderRadius: 10, borderColor: ibg }} onClick={() => dropdownToggle ? setdropdownToggle(false) : setdropdownToggle(true)} class=" dropdown-toggle" type="button"   >
                  {selectedOption2}

                </button>
                {dropdownToggle &&
                  <div className='overlay' style={{ borderRadius: 5, marginTop: 5, background: light, color: ibg, borderRadius: 5, borderColor: bg }}>
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

                  {problem.input && <>
                    <Grid className='subtitle' xs={15}><hr />
                      Input Format:
                    </Grid>
                    <Grid xs={16}>
                      <pre style={{ background: dark }}>{problem.input}</pre>
                      {/* {typeof problem.solution === 'string' ? problem.solution : JSON.stringify(problem.solution, null, 2)} */}
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
                <Mcq title={"questionTitle"} problem={problem} options={questionOptions} onOptionSelect={handleOptionSelect} reset={resetMcq} />
                :
                <>
                  <MyEditor getSolution={getSolution} CourseLanguage={selectedOption2} spin={setiSubmit} ref={editorRef} input={problem.input} saveToDatabase={UploadAnswer} problem={problem} themes={themes} courseTitle={navHistory} answer={answer} title={title} description={description} example={example} difficulty={difficulty} />

                </>

              }
            </Col>
          </Row>
        </Container>
      </div>
      <div className="sticky-bottom-center" style={{ backgroundColor: light, width: "100%" }}>
        <div style={{ display: "flex", marginLeft: "30%" }}>
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

          >
            Run
            {iSubmit && <Spinner style={{ marginLeft: "5px" }} animation="border" size="sm" />}
          </Button>}

          {detailsType == "Course" ?
            <div>
              {optionA ?
                <Button onClick={checkAnswer} style={{ margin: "4px", backgroundColor: bc, color: ibg }}>
                  Submit mcq
                  {loading && <CircularProgress size={24} style={{ marginRight: 10 }} />}
                </Button>
                :
                <Button onClick={handleSubmit} style={{ margin: "4px", backgroundColor: bc, color: ibg }}>
                  Submit code
                  {loading && <CircularProgress size={24} style={{ marginRight: 10 }} />}
                </Button>
              }
            </div>
            :
            <Button onClick={handleSubmitContestQuestion} style={{ margin: "4px", backgroundColor: bc, color: ibg }}>

              {btnTitle}

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
