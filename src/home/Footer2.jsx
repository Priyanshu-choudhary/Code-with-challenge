import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

export default function Footer2() {
  return (
    <MDBFooter  className='text-center text-lg-start text-muted' style={{backgroundImage:"linear-gradient(to top, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%)",marginTop:50}}>
       <p style={{ width: "100%", height: 2, backgroundColor: "#BA0103" }}></p>
      <section className='d-flex justify-content-center justify-content-lg-between  '>
     

        <div>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="facebook-f" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="twitter" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="google" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="instagram" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="linkedin" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="github" />
          </a>
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start '>
          <MDBRow className='mt-2'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon icon="gem" className="me-3" />
                Code For Challenge 
              </h6>
              <img src="/public/logo2.png" alt="codeforchallenge logo" width={200}/>
            </MDBCol>


            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
              <p>
                <a href='#!' className="me-3" >
                  Pricing
                </a>
              </p>
              <p>
                <a href='#!' className="me-3" >
                  Settings
                </a>
              </p>
              <p>
                <a href='#!' className="me-3" >
                  Contact
                </a>
              </p>
              <p>
                <a href='#!' className="me-3" >
                  Help
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                <MDBIcon icon="home" className="me-3" />
                New Delhi, India
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                codeforchallenge@gmail.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> +91-7818071134
              </p>
              {/* <p>
                <MDBIcon icon="print" className="me-3" /> + 01 234 567 89
              </p> */}
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2024 Copyright:
        <a className='text-reset fw-bold' href='#'>
          CodeForChallenge.com
        </a>
      </div>
    </MDBFooter>
  );
}