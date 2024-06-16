import { useLocation } from 'react-router-dom';
import "./ReceiveQuestion.css";
import Grid from '@mui/material/Unstable_Grid2';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useRef, useContext, useEffect, useState } from 'react';
import MyEditor from "./SoleSecEditor";
import Dashboard from '../dashBoard/Dashboard';
import { UserContext } from '../Context/UserContext';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import IconBreadcrumbs from '../dashBoard/BreadCrumb';
import Mcq from './Mcq';

function QuestionApi() {
  const { bc, ibg, bg, light, dark, currentthemes, setcurrentthemes } = useContext(UserContext);
  const location = useLocation();
  const problem = location.state || {}; // Ensure problem is an object
  const { title = '', description = '', example = '', difficulty = '', type = '', answer = '', testcase = '', boilerCode = '', navHistory = '', currentPage = '', optionA = '', optionB = '', optionC = '', optionD = '' } = problem;
  const [themes, setthemes] = useState("vs-dark");
  const [selectedOption, setSelectedOption] = useState('');

  const containerRef = useRef(null);

  const scrollToBottom = () => {
    const container = containerRef.current;
    container.scrollTop = container.scrollHeight;
  };

  useEffect(() => {
    // Add 'no-scroll' class to body
    document.body.classList.add('no-scroll');

    // Clean up function to remove 'no-scroll' class when component unmounts
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount

  useEffect(() => {
    const savedTheme = localStorage.getItem('currentthemes');
    if (savedTheme !== null) {
      setcurrentthemes(JSON.parse(savedTheme));
    }
  }, [setcurrentthemes]);

  const questionOptions = [
    { value: 'optionA', label: optionA },
    { value: 'optionB', label: optionB },
    { value: 'optionC', label: optionC },
    { value: 'optionD', label: optionD },
  ];

  const checkAnswer = () => {
    if (selectedOption === answer) {
      alert('You got it!');
    } else if (selectedOption) {
      alert('Sorry, wrong answer!');
    } else {
      alert('Please select an option.');
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
                  <pre style={{ background: dark }}>1.{title}</pre><hr />
                </Grid>
                <Grid xs={2.5}>
                  <p className={`button ${getDifficultyLabel()}`}  >{getDifficultyLabel()}</p>
                </Grid>
                <Grid xs={14}>
                  <pre style={{ background: dark }}>  {description} </pre>
                </Grid>
                <Grid xs={0}></Grid>
                <Grid className='subtitle' xs={15}><hr />
                  Examples:
                </Grid>
                <Grid xs={16}>
                  <pre style={{ background: dark }}>{example}</pre>
                </Grid>
                <Grid className='subtitle' xs={15}><hr />
                  Output:
                </Grid>
                <Grid xs={16} style={{ background: dark }}>
                  {answer}
                </Grid>
              </Grid><hr />
              <Grid className='subtitle solution' xs={15}>
                Test Cases:
                <pre style={{ background: dark }}>{JSON.stringify(testcase)}</pre>
              </Grid>
            </Col>
            <Col sm className="editorsection" style={{ height: "460px", overflowY: "scroll" }} id="scrollContainer" ref={containerRef}>
              {/* <MyEditor myfun={scrollToBottom} themes={themes} courseTitle={navHistory} answer={answer} title={title} description={description} example={example} difficulty={difficulty} testcase={testcase} boilerCode={boilerCode} /> */}
              <Mcq title={"questionTitle"} options={questionOptions} onOptionSelect={handleOptionSelect} />
            </Col>
          </Row>
        </Container>
      </div>
      <div style={{ justifyContent: "center", alignItems: "center", display: "flex", paddingBottom: "100px", gap: "50px", background: bg }}>
        <Button startIcon={<SkipPreviousIcon />} style={{ margin: "4px", backgroundColor: bc, color: ibg }}>
          Previous
        </Button>
        <Button onClick={checkAnswer} style={{ margin: "4px", backgroundColor: bc, color: ibg }}>
          Submit
        </Button>
        <Button endIcon={<SkipNextIcon />} style={{ paddingLeft: "20px", paddingRight: "20px", margin: "4px", backgroundColor: bc, color: ibg }}>
          Next
        </Button>
      </div>
    </div>
  );
}

export default QuestionApi;
