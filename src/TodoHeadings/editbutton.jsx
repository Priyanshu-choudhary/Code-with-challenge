import React from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

    

function BasicButtons() {
  return (
    <Stack spacing={2} direction="row">
      <Button variant="contained">Accept</Button>
      <Button variant="outlined">Delete</Button>
    </Stack>
  );


}
export default BasicButtons;