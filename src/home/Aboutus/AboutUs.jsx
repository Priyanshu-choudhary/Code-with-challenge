// src/AboutUs.js
import React from "react";
import "./AboutUs.css"; // Optional: for custom styling
import Dashboard from "../../dashBoard/Dashboard";
import OurCrew from "./Ourcrew";
import Footer2 from "../Footer2";

const AboutUs = () => {
  return (
    <div>
      <Dashboard />
      <div className="about-us">
        <div className="aboutUsInfo ">
          <h1
            id="headingAbout"
            className="text-gray-500 underline decoration-sky-600 md:decoration-blue-400 rounded ml-5 mt-5 md:mx-5 md:mt-20 font-bold text-3xl"
          >
            About us
          </h1>
          <div className="relative">
            <h1 className="font-size: text-8xl line-height: text-2xl rounded ml-5 mt-5 md:mx-5 md:mt-20 font-bold text-3xl relative z-10">
              WE ARE CFCIANS
            </h1>
            <p
              className="bg-red-500 absolute  left-0 transform -translate-y-1/2 z-1"
              style={{ width: 400, height: 15, marginLeft: "400px", top: 78 }}
            ></p>
          </div>

          <br />
        </div>

        <div>
          <h2
            id="headingAbout"
            className="text-gray-500 underline decoration-sky-600 md:decoration-blue-400 rounded  mt-60   md:mt-20 font-bold text-3xl " style={{marginRight:1000}}
          >
            Our Story
          </h2>
          <p className="storySection ">
            <hr />
            <br />
            CFC started in a way that few would expect. We weren’t the top of
            our class, nor did we have a prestigious background. We were simply
            a group of average, mischievous students from a tier 3 college,
            navigating through our first-year BTech semester exams. While others
            buried themselves in books, we found our minds wandering, not
            towards the exams, but towards something bigger—something that could
            change the way people perceive students like us. Tech was the one
            thing we were truly passionate about, the one skill we knew we had.
            We didn’t feel like studying for the exams, but we knew we had to do
            something meaningful. So, amidst the stress of exams and the
            pressures of being just "average" , we decided to take a leap of
            faith and start something of our own. Without any guidance or
            external help, we dove into learning and implementing our ideas,
            driven by a simple yet powerful belief: that students from tier 3
            colleges have just as much potential, if not more, than those from
            top tech schools. Our journey wasn’t easy, but it was ours. We faced
            countless challenges, yet each obstacle only strengthened our
            resolve. We wanted to prove to the world—and to ourselves—that where
            you come from doesn’t define where you can go.
            <br />
            Today, CFC stands for every student who has ever felt overlooked or
            underestimated. We invite all students to join us, to learn from our
            courses, practice on our platform, and unlock the doors to
            high-paying jobs or even start their own ventures. Our vision is
            clear: to promote education, empower the underrepresented, and show
            that greatness lies within all of us, waiting to be discovered.{" "}
          </p>
        </div>
      </div>

      <div>
        {" "}
        <h2
          id="headingAbout"
          className="text-gray-500 underline decoration-sky-600 md:decoration-blue-400 rounded ml-16     mt-20  font-bold text-3xl"
        >
          Our Crew
        </h2>
      </div>

      <div className="relative ml-5">
        <h1 className="font-size: text-6xl font-bold text-left mt-5 absolute text-3xl  z-10">
          Making it happen
        </h1>
        <p
          className="bg-red-500 absolute  left-0 transform -translate-y-1/2 z-1"
          style={{ width: 300, height: 15, marginLeft: "100px", top: 100 }}
        ></p>
      </div>
      <div className="mt-44">
      <OurCrew/>
      </div>
      <Footer2/>
    </div>
     
  );
};

export default AboutUs;

