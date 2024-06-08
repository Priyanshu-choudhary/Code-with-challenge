import React from 'react';
import './theme.css';
import Dashboard from '../dashBoard/Dashboard';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'font-awesome/css/font-awesome.min.css';

function Home() {
  return (
<>   
<Dashboard/>
 <div style={{overflow:"scroll",height:"100vh"}}>
      <header className="header">
        <div className="branding">
          <div className="container-fluid position-relative py-3">
            <div className="logo-wrapper">
              <div className="site-logo">
                <a className="navbar-brand" href="index.html">
                  <img className="logo-icon me-2" src="assets/images/site-logo.svg" alt="logo" />
                  <span className="logo-text">CFC</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="hero-section">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-7 pt-5 mb-5 align-self-center">
              <div className="promo pe-md-3 pe-lg-5">
                <h1 className="headline mb-3">
                  Welcome no: <br />Code-for-Challenge: Elevate Your Coding Skills
                </h1>
                <div className="subheadline mb-4">
                What sets us apart? Our commitment to excellence. With a vast library of challenges covering various programming languages, algorithms, and problem-solving techniques, Code for Challenge ensures that every coder finds their perfect match. Join us today and embark on a transformative journey towards coding mastery
                  </div>
                <div className="cta-holder row gx-md-3 gy-3 gy-md-0">
                  <div className="col-12 col-md-auto">
                    <a className="btn btn-primary w-100" href="https://themes.3rdwavemedia.com/bootstrap-templates/startup/devbook-free-bootstrap-5-book-ebook-landing-page-template-for-developers/">Give a try</a>
                  </div>
                  <div className="col-12 col-md-auto">
                    <a className="btn btn-secondary scrollto w-100" href="#benefits-section">Learn More</a>
                  </div>
                </div>
                <div className="hero-quotes mt-5">
                  <div id="quotes-carousel" className="quotes-carousel carousel slide carousel-fade mb-5" data-bs-ride="carousel" data-bs-interval="8000">
                    <div className="carousel-indicators">
                      <button type="button" data-bs-target="#quotes-carousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                      <button type="button" data-bs-target="#quotes-carousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                      <button type="button" data-bs-target="#quotes-carousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                      <div className="carousel-item active">
                        <blockquote className="quote p-4 theme-bg-light">
                          "Code for Challenge has exceeded my expectations in every aspect. It has not only equipped me with the skills needed to tackle real-world coding tasks but has also instilled in me a newfound confidence in my abilities as a coder. I highly recommend Code for Challenge to anyone looking to embark on a rewarding journey towards coding mastery."
                           </blockquote>
                        <div className="source row gx-md-3 gy-3 gy-md-0 align-items-center">
                          <div className="col-12 col-md-auto text-center text-md-start">
                            <img className="source-profile" src="assets/images/profiles/profile-1.png" alt="image" />
                          </div>
                          <div className="col source-info text-center text-md-start">
                            <div className="source-name">Yadi choudhary</div>
                            <div className="soure-title">Co-Founder, Startup</div>
                          </div>
                        </div>
                      </div>
                      <div className="carousel-item">
                        <blockquote className="quote p-4 theme-bg-light">
                          "Highly recommended consectetur adipiscing elit. Proin et auctor dolor, sed venenatis massa. Vestibulum ullamcorper lobortis nisi non placerat praesent mauris neque"
                        </blockquote>
                        <div className="source row gx-md-3 gy-3 gy-md-0 align-items-center">
                          <div className="col-12 col-md-auto text-center text-md-start">
                            <img className="source-profile" src="assets/images/profiles/profile-2.png" alt="image" />
                          </div>
                          <div className="col source-info text-center text-md-start">
                            <div className="source-name">Jean Doe</div>
                            <div className="soure-title">Co-Founder, Startup Week</div>
                          </div>
                        </div>
                      </div>
                      <div className="carousel-item">
                        <blockquote className="quote p-4 theme-bg-light">
                          "Awesome! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam euismod nunc porta urna facilisis tempor. Praesent mauris neque, viverra quis erat vitae."
                        </blockquote>
                        <div className="source row gx-md-3 gy-3 gy-md-0 align-items-center">
                          <div className="col-12 col-md-auto text-center text-md-start">
                            <img className="source-profile" src="assets/images/profiles/profile-3.png" alt="image" />
                          </div>
                          <div className="col source-info text-center text-md-start">
                            <div className="source-name">Andy Doe</div>
                            <div className="soure-title">Frontend Developer, Company Lorem</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-5 mb-5 align-self-center">
              <div className="book-cover-holder">
                <img className="img-fluid book-cover" src="assets/images/devbook-cover.png" alt="book cover" />
                <div className="book-badge d-inline-block shadow">
                  New<br />Release
                </div>
              </div>
              <div className="text-center">
                <a className="theme-link scrollto" href="#reviews-section">See all</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="benefits-section" className="benefits-section theme-bg-light-gradient py-5">
        <div className="container py-5">
          <h2 className="section-heading text-center mb-3">What Will You Get From This Website?</h2>
          <div className="section-intro single-col-max mx-auto text-center mb-5">"Coding platform, where your journey to mastery begins! Dive into a wealth of Data Structures and Algorithms challenges, explore diverse topics with our filter options, and engage in specialized courses tailored to your interests. With our intuitive code editor, you can practice coding anytime, anywhere. Track your progress seamlessly, compete in thrilling hackathons and contests, and unlock your full potential as a coder. Join us today and embark on a rewarding journey towards coding excellence!"
          
          </div>
          <div className="row text-center">
            <div className="item col-12 col-md-6 col-lg-4">
              <div className="item-inner p-3 p-lg-4">
                <div className="item-header mb-3">
                  <div className="item-icon"><i className="fas fa-laptop-code"></i></div>
                  <h3 className="item-heading">DSA</h3>
                </div>
                <div className="item-desc">
                Data Structures and Algorithms Challenges: Sharpen your problem-solving skills with a wide range of DSA challenges. </div>
              </div>
            </div>
            <div className="item col-12 col-md-6 col-lg-4">
              <div className="item-inner p-3 p-lg-4">
                <div className="item-header mb-3">
                  <div className="item-icon"><i className="fab fa-js-square"></i></div>
                  <h3 className="item-heading">Topic-Based Filtering:</h3>
                </div>
                <div className="item-desc">
                 Explore specific coding topics such as arrays, competitive programming, and strings effortlessly. </div>
              </div>
            </div>
            <div className="item col-12 col-md-6 col-lg-4">
              <div className="item-inner p-3 p-lg-4">
                <div className="item-header mb-3">
                  <div className="item-icon"><i className="fab fa-rocketchat"></i></div>
                  <h3 className="item-heading">Specialized Courses:</h3>
                </div>
                <div className="item-desc">
                 Dive deep into focused subjects with our curated selection of specialized courses. </div>
              </div>
            </div>
            <div className="item col-12 col-md-6 col-lg-4">
              <div className="item-inner p-3 p-lg-4">
                <div className="item-header mb-3">
                  <div className="item-icon"><i className="fab fa-angular"></i></div>
                  <h3 className="item-heading">Online Code Editor:</h3>
                </div>
                <div className="item-desc">
                 Code anytime, anywhere with our user-friendly online code editor.</div>
              </div>
            </div>
            <div className="item col-12 col-md-6 col-lg-4">
              <div className="item-inner p-3 p-lg-4">
                <div className="item-header mb-3">
                  <div className="item-icon"><i className="fab fa-vuejs"></i></div>
                  <h3 className="item-heading">Progress Tracking:</h3>
                </div>
                <div className="item-desc">
                 Monitor your growth and improvement with personalized progress tracking tools.
</div>
              </div>
            </div>
            <div className="item col-12 col-md-6 col-lg-4">
              <div className="item-inner p-3 p-lg-4">
                <div className="item-header mb-3">
                  <div className="item-icon"><i className="fab fa-react"></i></div>
                  <h3 className="item-heading">Hackathons</h3>
                </div>
                <div className="item-desc">
                Hackathons and Contests: Compete in exhilarating hackathons and contests to test your skills and win rewards.  </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>

  );
}

export default Home;
