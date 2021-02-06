import React from 'react';

export const renderField = ({
    placeholder,
    type,
	field,
    className,
    onKeyUp,
    maxLength,
    form: {touched, errors, setTouched},
    props,
    children
}) => {
	return (
        <div className="input-container">
            <input {...field} placeholder={placeholder} type={type} className={`form-control custom-form-input text-dp mt-1 ${className}`} onKeyUp={onKeyUp} /*onTouchStart={() => setTouched({...touched, [field.name.split(".")[0]+"-"+field.name.split(".")[2]]: true})}*/ {...props}/>
            {children}
            {
                (touched.hasOwnProperty(field.name.split(".")[0]) && touched[field.name.split(".")[0]].hasOwnProperty('values') && touched[field.name.split(".")[0]].values.hasOwnProperty(field.name.split(".")[2])) && errors[field.name] ? <div className="error">{errors[field.name]}</div> : null
            }
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
            </div>
        </>
	)
};
