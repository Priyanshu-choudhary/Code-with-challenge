import React from 'react';
import Dashboard from '../dashBoard/Dashboard';
import TutorialsLinks from './TutorialsLinks';
import Footer2 from '../home/Footer2';

function TutorialMain() {
  return (
    <div>
      <Dashboard />
      <div className="flex flex-col md:flex-row bg-slate-100">
        <div className="m-5 md:m-20 pb-20">
          <h2 className="text-xl md:text-3xl text-cyan-900  font-extrabold">Learn with CFC</h2>
          <h3 className="mt-4 md:mt-10 text-lg md:text-xl">
            Help for wherever you are on your coding journey.
          </h3>
        </div>
        <div className="flex justify-center md:justify-end mt-5 md:mt-0">
          <img 

            className="w-full md:w-auto md:max-w-lg md:absolute md:right-0 md:top-12" 
            src="./tutorial.png" 
            alt="tutorial page" 
          />
        </div>
      </div>
      <TutorialsLinks/>
      <Footer2/>
    </div>
  );
}

export default TutorialMain;
