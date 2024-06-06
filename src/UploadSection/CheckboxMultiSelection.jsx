import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function CheckboxLabels() {
  return (
    <>
    <div>
      <Checkbox {...label}  />array
      <Checkbox {...label} />Dsa
      <Checkbox {...label} />map
    </div><div>
      <Checkbox {...label}  />array
      <Checkbox {...label} />Dsa
      <Checkbox {...label} />Hash map
    </div><div>
      <Checkbox {...label}  />array
      <Checkbox {...label} />Dsa
      <Checkbox {...label} />Hash map
    </div> <div>
      <Checkbox {...label}  />array
      <Checkbox {...label} />Dsa
      <Checkbox {...label} />map
    </div><div>
      <Checkbox {...label}  />array
      <Checkbox {...label} />Dsa
      <Checkbox {...label} />Hash map
    </div>
    </>
  );
}
