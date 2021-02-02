import React from 'react';
import { ErrorMessage } from 'formik';

export const renderField = ({
    placeholder,
    type,
	field,
    className,
    onKeyUp,
    maxLength,
    form: { touched, errors },
    props,
    children
}) => {
	return (
        <div className="input-container">
            <input {...field} placeholder={placeholder} type={type} className={`form-control custom-form-input text-dp mt-1 ${className} ${errors[field.name] && touched[field.name] ? ' is-invalid' : null}`} onKeyUp={onKeyUp} maxLength={maxLength} {...props}/>
            {children}
            <ErrorMessage name={field.name.toString()} render={msg => <div className="error">{msg}</div>} />
        </div>
	)
};

export const renderFieldSelect = ({
    label,
	field,
    className,
    onChange,
    form: { touched, errors, setFieldValue },
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
                <select {...field} className={`form-control custom-form-input text-dp mt-1 ${className} ${errors[field.name] && touched[field.name] ? ' is-invalid' : null}`} {...props} 
                onChange={ e => {
                    setFieldValue(field.name, e.target.value);
                    onChange && onChange(e)
                }}>  
                    {children}
                </select>
                {/* <ErrorMessage name={field.name} render={msg => <div className="error">{msg}</div>} /> */}
            </div>
        </>
	)
};
