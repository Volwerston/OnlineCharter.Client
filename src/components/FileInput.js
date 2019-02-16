import React from 'react'

const adaptFileEventToValue = delegate => e => delegate(e.target.files[0]);

const FileInput = ({
  input: { value: omitValue, onChange, onBlur, ...inputProps },
  label,
  id,
  meta: { touched, error, warning },
  ...props
}) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}:</label>
      <br/>
      <input
        onChange={adaptFileEventToValue(onChange)}
        onBlur={adaptFileEventToValue(onBlur)}
        type="file"
        id={id}
        {...props.input}
        {...props}
      />
      <br/>
      {touched && ((error && <span style={{color: 'darkred'}}>{error}</span>) 
            || (warning && <span style={{color: 'darkred'}}>{warning}</span>))}
    </div>
  );
};

export default FileInput;
