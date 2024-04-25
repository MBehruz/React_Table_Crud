import { FormControl, InputAdornment, OutlinedInput } from '@mui/material';
import React from 'react';

const Price = ({
  placeholder,
  onChange,
  value,
  type,
  width,
  height,
  id,
  outline,
}) => {
  return (
    <div>
      <input
        id={id}
        style={{
          width: width && width,
          height: height && height,
          outline: outline && outline,
        }}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type={type ? type : 'text'}
      />
    </div>
  );
};

export default Price;
