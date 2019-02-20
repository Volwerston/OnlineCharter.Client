import React from 'react'

export const renderField = ({
    input,
    type,
    label,
    placeholder,
    id,
    name,
    meta: { touched, error, warning } }) => (
        <div className="form-group">
            <label htmlFor={id}>{label}:</label>
            <input {...input} 
            placeholder={placeholder} 
            type={type} 
            className="form-control" 
            id={id}
            name={name}/>
            {touched && ((error && <span style={{color: 'darkred'}}>{error}</span>) 
            || (warning && <span style={{color: 'darkred'}}>{warning}</span>))}
        </div>
    )