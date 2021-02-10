import React from 'react';

const onlyNumbers = (e, form) => 
/^\d+$/.test(e.target.value) && e.target.value.length > 0 ? 
form.setFieldValue(e.target.name, e.target.value) : 
form.setFieldValue(e.target.name, e.target.value.substring(0, e.target.value.length - 1));

const numbersLettersWithoutSpace = (e, form) => 
/^[A-Za-z0-9]+$/g.test(e.target.value) && e.target.value.length > 0 ? 
form.setFieldValue(e.target.name, e.target.value) : 
form.setFieldValue(e.target.name, e.target.value.substring(0, e.target.value.length - 1));

const normalizeFn = (rule, e, form) => {
    switch(rule){
        case "onlyNumbers":
            onlyNumbers(e, form);
        break;
        case "numbersLettersWithoutSpace":
            numbersLettersWithoutSpace(e, form);
        default:
        break;
    }
}

export const renderField = ({
    placeholder,
    type,
	field,
    className,
    maxLength,
    form: {touched, errors, setFieldValue},
    props,
    children,
    normalize
}) => {
	return (
        <div className="input-container">
            <input {...field} placeholder={placeholder} type={type} className={`form-control custom-form-input text-dp mt-1 ${className}`} onKeyUp={(e) => {normalizeFn(normalize, e, {setFieldValue})}} {...props}/>
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
