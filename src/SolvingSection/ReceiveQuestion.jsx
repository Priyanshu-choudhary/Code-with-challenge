// src/components/QuestionApi.js
import { useLocation } from 'react-router-dom';
import "./ReceiveQuestion.css";
import Grid from '@mui/material/Unstable_Grid2';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useRef,useContext } from 'react';
import MyEditor from "./SoleSecEditor";
import Dashboard from '../dashBoard/Dashboard';
import { UserContext } from '../Context/UserContext';

import IconBreadcrumbs from '../dashBoard/BreadCrumb';
function QuestionApi() {
  const { bg, light,dark } = useContext(UserContext);
  const location = useLocation();
  const problem = location.state || {}; // Ensure problem is an object
  const { title = '', description = '', example = '', difficulty = '', answer = '', testcase = '', boilerCode = '', navHistory = '',currentPage='' } = problem;

  const containerRef = useRef(null);

  const scrollToBottom = () => {
    const container = containerRef.current;
    container.scrollTop = container.scrollHeight;
  };

  return (
    <div style={{backgroundColor:bg, color:bg}}>
    <br />
     
       <IconBreadcrumbs currentPage={currentPage} title={navHistory} question={title}/>
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 scroll-container" style={{background:dark,color:"white"}}>
        <Container fluid>
          <Row>
            <Col className="editorsection" sm={2} style={{ height: "500px", width: "500px", overflow: "scroll" }}>
              <Grid container spacing={2}>
                <Grid className='title' xs={9.5} >
                  <pre style={{background:dark}}>1.{title}</pre><hr />
                </Grid>
                <Grid xs={2.5}>
                  <p className={`button ${difficulty.toLowerCase()}`}>{difficulty}</p>
                </Grid>
                <Grid xs={14}>
                  <pre style={{background:dark}}>  {description} </pre>
                </Grid>
                <Grid xs={0}></Grid>
                <Grid className='subtitle' xs={15}><hr />
                  Examples:
                </Grid>
                <Grid xs={16}>
                  <pre style={{background:dark}}>{example}</pre>
                </Grid>
                <Grid className='subtitle' xs={15}><hr />
                  Output:
                </Grid>
                <Grid xs={16} style={{background:dark}}>
                  {answer}
                </Grid>
              </Grid><hr />
              <Grid className='subtitle solution' xs={15}>
                Test Cases:
                <pre style={{background:dark}}>{JSON.stringify(testcase)}</pre>
              </Grid>
            </Col>
            <Col sm className="editorsection" style={{ height: "500px", overflow: "scroll" }} id="scrollContainer" ref={containerRef}>
              <MyEditor myfun={scrollToBottom} courseTitle={navHistory} answer={answer} title={title} description={description} example={example} difficulty={difficulty} testcase={testcase} boilerCode={boilerCode} />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default QuestionApi;
