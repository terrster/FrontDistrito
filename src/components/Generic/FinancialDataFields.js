import React from 'react';
// import { ErrorMessage } from 'formik';

export const renderField = ({
    placeholder,
    type,
	field,
    className,
    onKeyUp,
    maxLength,
    form: { errors },
    props,
    children
}) => {
	return (
        <div className="input-container">
            <input {...field} placeholder={placeholder} type={type} className={`form-control custom-form-input text-dp mt-1 ${className}`} onKeyUp={onKeyUp} maxLength={maxLength} {...props}/>
            {children}
            {
                errors[field.name] && <div id={field.name} className="error">{errors[field.name]}</div>
            }
            {/* <ErrorMessage name={field.name} render={msg => <div className="error">{msg}</div>}/> */}
        </div>
	)
};

export const renderFieldSelect = ({
    label,
	field,
    className,
    onChange,
    form: { errors, setFieldValue },
    props,
    children
}) => {
	return (
        <>
            <div className="input-container">
                {
                    label &&
                    <label>{label}</label>
                }
                <select {...field} className={`form-control custom-form-input text-dp mt-1 ${className}`} {...props} 
                    onChange={ e => {
                        setFieldValue(field.name, e.target.value);
                        onChange && onChange(e)
                    }}>  
                    {children}
                </select>
                {
                    errors[field.name] && <div id={field.name} className="error">{errors[field.name]}</div>
                }
                {/* <ErrorMessage name={field.name} render={msg => <div className="error">{msg}</div>} /> */}
            </div>
        </>
	)
};
