import React, { createContext, useState } from 'react';

export const nestedFormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    codeTemplates: {},
    solution: {},
    selectedLanguage: 'java',
  });

  const updateFormData = (updatedData) => {
    setFormData((prevData) => ({
      ...prevData,
      ...updatedData,
    }));
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData }}>
      {children}
    </FormContext.Provider>
  );
};

