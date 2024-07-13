import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../Context/UserContext';

export default function Mcq({ title, options, onOptionSelect, reset }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');
  const { ibg, light } = useContext(UserContext);

  const handleRadioChange = (event) => {
    const selectedValue = event.target.value;
    setValue(selectedValue);
    setHelperText(' ');
    setError(false);
    onOptionSelect(value);
  };

  useEffect(() => {
    if (reset) {
      setValue('');
      setHelperText('');
      setError(false);
    }
    // console.log("mcq select  "+value);
  }, [options]);

  return (
    <div style={{ display: "flex" }}>
      <div style={{ backgroundColor: ibg, width: "1px" }}></div>
      <FormControl sx={{ m: 2, color: ibg, width: '100%', overflowY: 'hidden' }} error={error}>
        {/* <FormLabel id="demo-error-radios" sx={{ color: ibg, fontWeight: 'bolder' }}>{title}</FormLabel> */}
        <RadioGroup
          aria-labelledby="demo-error-radios"
          name="quiz"
          value={value}
          onChange={handleRadioChange}
          sx={{ width: '100%' }}
        >
          {options.map((option, index) => (
            <FormControlLabel
              key={index}
              sx={{ borderRadius: "6px", backgroundColor: light, margin: '5px 0', width: '100%' }}
              value={option.value}
              control={<Radio sx={{ color: ibg, '&.Mui-checked': { color: ibg } }} />}
              label={option.label}
            />
          ))}
        </RadioGroup>
        <FormHelperText sx={{ color: error ? 'red' : 'purple' }}>{helperText}</FormHelperText>
      </FormControl>

      <style jsx global>{`
        /* Hide scrollbar for Chrome, Safari, and Opera */
        ::-webkit-scrollbar {
          display: none;
        }

        /* Hide scrollbar for IE, Edge, and Firefox */
        body {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
    </div>
  );
}
