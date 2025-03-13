import React from 'react';
import { TextField } from '@mui/material';

const TextInput = ({ onChange, name, value, type = 'text', error }) => {
  return (
    <div>
      <TextField
        fullWidth
        slotProps={{
          input: { className: 'h-10 px-3 py-2' },
          htmlInput: { className: '!p-0' },
        }}
        onChange={onChange}
        name={name}
        value={value}
        type={type}
        error={error}
      />
    </div>
  );
};

export default TextInput;
