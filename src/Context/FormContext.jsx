import React, { createContext, useState } from 'react';

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    example: '',
    answer: '',
    difficulty: '',
    constrain: '',
    time: '',
    TC: '',
    tags: [],
    testcases: {},
    permission: '',
    codeTemplates: {}, // Object to store code templates for different languages
    selectedLanguage: 'java', // Default selected language
  });

  const updateFormData = (newData) => {
    setFormData((prevData) => {
      // Check if new data is different from the current data to prevent unnecessary updates
      const isDifferent = Object.keys(newData).some(
        key => newData[key] !== prevData[key]
      );
      if (isDifferent) {
        return { ...prevData, ...newData };
      }
      return prevData;
    });
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData }}>
      {children}
    </FormContext.Provider>
  );
};
