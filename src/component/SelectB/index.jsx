import React from 'react';

export default ({
  onChange,
  value,
  width,
  height,
  outline,
  title,
  options = [],
  marginLeft,
}) => {
  return (
    <select
      style={{
        width: width ? width : '688px',
        height: height ? height : '30px',
        outline: outline ? outline : 'none',
        marginLeft: marginLeft ? marginLeft : '8px',
      }}
      value={value}
      onChange={onChange}
    >
      <option value=''>{title}</option>
      <option value='Ali'>{'Ali'}</option>
      <option value='Muxammad'>{'Muxammad'}</option>
      <option value='Asror'>{'Asror'}</option>
      <option value='Bekmurod'>{'Bekmurod'}</option>
      <option value='Aliya'>{'Aliya'}</option>
      {options.map((option) => (
        <option key={option} value={option.value}>
          {option.title}
        </option>
      ))}
    </select>
  );
};
