import React from 'react';

export default ({
  backgroundColor,
  color,
  outline,
  border,
  borderRadius,
  cursor,
  height,
  width,
  fontSize,
  marginTop,
  onClick,
  icon,
  paddingTop,
  title,
  marginRight,
}) => {
  return (
    <div>
      <button
        style={{
          backgroundColor: backgroundColor ? backgroundColor : 'red',
          color: color,
          outline: outline ? outline : 'none',
          border: border ? border : 'none',
          cursor: cursor ? cursor : 'pointer',
          height: height,
          width: width,
          fontSize: fontSize ? fontSize : '25px',
          marginTop: marginTop ? marginTop : '52px',
          paddingTop: paddingTop ? paddingTop : '3px',
          borderRadius: borderRadius ? borderRadius : '5px',
          marginRight: marginRight,
        }}
        onClick={onClick}
      >
        {icon}
        {title}
      </button>
    </div>
  );
};
