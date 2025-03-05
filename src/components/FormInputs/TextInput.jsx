import { TextField } from '@mui/material';
import React from 'react';

const TextInput = ({ onChange, name, value, type = 'text' }) => {
  return (
    <div>
      <TextField
        slotProps={{
          input: { className: 'h-10 px-3 py-2' },
          htmlInput: { className: '!p-0' },
        }}
        onChange={onChange}
        name={name}
        value={value}
        type={type}
      />
    </div>
  );
};

export default TextInput;
