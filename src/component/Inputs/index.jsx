export default ({
  placeholder,
  onChange,
  value,
  type,
  width,
  height,
  name,
  id,
  outline,
}) => {
  return (
    <input
      id={id}
      style={{
        width: width ? width : '150px',
        height: height ? height : '30px',
        outline: outline ? outline : 'none',
      }}
      placeholder={placeholder}
      name={name && name}
      value={value}
      onChange={onChange}
      type={type ? type : 'text'}
    />
  );
};
