
import { useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import "./Question.css";
import Grid from '@mui/material/Unstable_Grid2';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import "./editorsection.css";
import React, { useState, useRef } from 'react';

import MyEditor from "./MyEditor";
import Dashboard from '../dashBoard/Dashboard';


function QuestionApi() {
  const location = useLocation();
  const { title, description, example, difficulty, answer } = location.state;

  const containerRef = useRef(null);
  console.log("inside DB rerender");
  const scrollToBottom = () => {
    const container = containerRef.current;
    container.scrollTop = container.scrollHeight;


    


  };
  return (
    <>
      <Dashboard />
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 scroll-container"  >
        <Container fluid>
          <Row>
            <Col className="editorsection" sm={2} style={{ height: "500px", width: "500px", overflow: "scroll" }} >

              <Grid container spacing={2}>
                <Grid className='title' xs={9.5}>
                  <div>1.{title}</div><hr />
                </Grid>
                <Grid xs={2.5}>
                  <p className={`button ${difficulty.toLowerCase()}`}>{difficulty}</p>
                </Grid>
                <Grid xs={14}>
                  {description}
                </Grid>
                <Grid xs={0}></Grid>
                <Grid className='subtitle' xs={15}><hr />
                  Example 1:
                </Grid>
                <Grid xs={16}>

                {example.split(/Input:|Output:/).map((part, index) => (
    <React.Fragment key={index}>
      {/* {index > 0 && <br />} Add new line if not the first occurrence */}
      {index > 0 && (example.includes('Input:') && index % 2 === 0) && <strong><br />Input:</strong> } {/* Bold "Input" except for the first occurrence */}
      {index > 0 && (example.includes('Output:') && index % 2 === 0) && <strong><br />Output:</strong> } {/* Bold "Output" except for the first occurrence */}
      {part}
    </React.Fragment>
  ))}
                </Grid>
                <Grid className='subtitle' xs={15}><hr />
                  Output:
                </Grid>
                <Grid xs={16}>
                  {answer}
                </Grid>
              </Grid><hr />
              <Grid className='subtitle solution' xs={15}>
                <Button variant='secondary'>Get Solution</Button>
              </Grid>

            </Col>
            {/* <Col sm style={{ height: "500px", boxShadow: "0px 20px 20px rgba(0,0,0,0.3)" ,overflow: "scroll" } }id="scrollContainer" ref={containerRef}><MyEditor myfun={scrollToBottom}/> */}
            <Col sm className="editorsection" style={{ height: "500px", overflow: "scroll" }} id="scrollContainer" ref={containerRef}><MyEditor myfun={scrollToBottom} answer={answer} title={title} description={description} example={example} difficulty={difficulty}/>



            </Col>

          </Row>
        </Container>

      </div>

    </>
  );
}

export default QuestionApi;
