import React from 'react';
import PropTypes from 'prop-types';
import CreateButton from '../Buttons/CreateButton';
const PromoBanner = ({ message, onButtonClick, buttonText }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center text-black text-center w-full h-21 md:h-20 mt-3 md:mt-5" 
         style={{ clipPath: "polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)", backgroundColor: "gold" }}>
      <p className="text-lg md:text-xl pt-2 md:pt-7">{message}</p>
      <div className="pt-2 md:pt-3 md:pl-12 pb-2">
        <CreateButton onClick={onButtonClick} value={buttonText} />
      </div>
    </div>
  );
};

PromoBanner.propTypes = {
  message: PropTypes.string.isRequired,
  onButtonClick: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
};

export default PromoBanner;

