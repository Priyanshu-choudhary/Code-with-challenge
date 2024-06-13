// src/components/QuestionApi.js
import { useLocation } from 'react-router-dom';
import "./ReceiveQuestion.css";
import Grid from '@mui/material/Unstable_Grid2';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useRef } from 'react';
import MyEditor from "./SoleSecEditor";
import Dashboard from '../dashBoard/Dashboard';
import IconBreadcrumbs from '../Leetcode/Test';

function QuestionApi() {
  const location = useLocation();
  const problem = location.state || {}; // Ensure problem is an object
  const { title = '', description = '', example = '', difficulty = '', answer = '', testcase = '', boilerCode = '', navHistory = '' } = problem;

  const containerRef = useRef(null);

  const scrollToBottom = () => {
    const container = containerRef.current;
    container.scrollTop = container.scrollHeight;
  };

  return (
    <>
      <Dashboard />
      {/* {navHistory &&  <p style={{ color: "grey", fontSize: '15px', fontFamily: 'revert-layer', fontWeight: 'bold' }}>
        {navHistory} {'>'}{title}
        <hr />
      </p>} */}
       <IconBreadcrumbs title={title} question={title}/>
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 scroll-container">
        <Container fluid>
          <Row>
            <Col className="editorsection" sm={2} style={{ height: "500px", width: "500px", overflow: "scroll" }}>
              <Grid container spacing={2}>
                <Grid className='title' xs={9.5}>
                  <pre>1.{title}</pre><hr />
                </Grid>
                <Grid xs={2.5}>
                  <p className={`button ${difficulty.toLowerCase()}`}>{difficulty}</p>
                </Grid>
                <Grid xs={14}>
                  <pre>  {description} </pre>
                </Grid>
                <Grid xs={0}></Grid>
                <Grid className='subtitle' xs={15}><hr />
                  Examples:
                </Grid>
                <Grid xs={16}>
                  <pre>{example}</pre>
                </Grid>
                <Grid className='subtitle' xs={15}><hr />
                  Output:
                </Grid>
                <Grid xs={16}>
                  {answer}
                </Grid>
              </Grid><hr />
              <Grid className='subtitle solution' xs={15}>
                Test Cases:
                <pre>{JSON.stringify(testcase)}</pre>
              </Grid>
            </Col>
            <Col sm className="editorsection" style={{ height: "500px", overflow: "scroll" }} id="scrollContainer" ref={containerRef}>
              <MyEditor myfun={scrollToBottom} answer={answer} title={title} description={description} example={example} difficulty={difficulty} testcase={testcase} boilerCode={boilerCode} />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default QuestionApi;
