
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./editorsection.css";
import React, { useState, useRef } from 'react';



import MyEditor from "../editor/MyEditor";
import QuestionApi from '../question/QuestionApi';

function InsideDBBody() {
  const containerRef = useRef(null);
  console.log("inside DB rerender");
  const scrollToBottom = () => {
      const container = containerRef.current;
      container.scrollTop = container.scrollHeight;
    };

  return (
    <div>
       <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 scroll-container"  >
                        <Container fluid>
                            <Row>
                                <Col className ="editorsection" sm={2}style={{ height: "500px", width: "500px", overflow: "scroll" }} >
                                  
                                  <QuestionApi/>
                                  
                                  </Col>
                                {/* <Col sm style={{ height: "500px", boxShadow: "0px 20px 20px rgba(0,0,0,0.3)" ,overflow: "scroll" } }id="scrollContainer" ref={containerRef}><MyEditor myfun={scrollToBottom}/> */}
                                <Col sm className ="editorsection"  style={{ height: "500px" ,overflow: "scroll" } }id="scrollContainer" ref={containerRef}><MyEditor myfun={scrollToBottom}/>
                              
                               
                                
                                </Col>
                                
                            </Row>
                        </Container>
                        
                    </div>
    </div>
  )
}

export default  React.memo(InsideDBBody)
