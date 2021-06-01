import React from "react";
import { Field, ErrorMessage } from 'formik';

export const renderField = ({
  input,
  label,
  type,
  maxLength,
  value = "",
  minLength,
  df,
  cls,
  meta: { touched, error, warning },
}) => {
  return (
    <div className={cls}>
      <div className="input-container">
        {label === "RFC" && sessionStorage.type === "PF" ? (
          <input
            className="form-control custom-form-input text-dp mt-1 mb-0"
            {...input}
            value={value || input.value}
            placeholder={label}
            type={type}
            maxLength="10"
          />
        ) : label === "RFC" &&
          (sessionStorage.type === "RIF" || sessionStorage.type === "PFAE") ? (
          <input
            className="form-control custom-form-input text-dp mt-1 mb-0"
            {...input}
            value={value || input.value}
            placeholder={label}
            type={type}
            maxLength="13"
          />
        ) : label === "RFC de tu empresa o negocio" &&
          sessionStorage.type === "PM" ? (
          <input
            className="form-control custom-form-input text-dp mt-1 mb-0"
            {...input}
            value={value || input.value}
            placeholder={label}
            type={type}
            maxLength="12"
          />
        ) : label === "Teléfono" ? (
          <input
            className="form-control custom-form-input text-dp mb-0"
            value={value}
            {...input}
            placeholder={label + " de tu negocio"}
            type={type}
            maxLength="10"
          />
        ) : label === "Teléfono_Personal" ? (
          <input
            className="form-control custom-form-input text-dp mb-0"
            value={value}
            {...input}
            placeholder={"Ingresa tú número celular"}
            type={type}
            maxLength="10"
          />
        ) : label === "CP" ? (
          <input
            className="form-control custom-form-input text-dp mt-1 mb-0"
            {...input}
            value={value || input.value}
            placeholder={label}
            type={type}
            maxLength="5"
          />
        ) : label === "secret" ? (
          <input
            className="form-control custom-form-input text-dp mt-1 mb-0 d-none"
            {...input}
            value={value || input.value}
            placeholder={label}
            type={type}
            maxLength="5"
          />
        ) : (
          <input
            className="form-control custom-form-input text-dp mt-1 mb-0"
            {...input}
            value={value || input.value}
            placeholder={label}
            type={type}
          />
        )}
      </div>
      {((touched || error) && (
        <span id={input.name + "-error"}>
          <small className="error">{error}</small>
        </span>
      )) ||
        (warning && <span id={input.name + "-error"}>{warning}</span>)}
    </div>
  );
};

export const renderSelectField = ({
  input,
  label,
  type,
  disabled,
  df,
  cls,
  meta: { touched, error, warning },
  children,
  val,
}) => (
  <div className={cls}>
    {disabled ? (
      <div className="input-container">
        <select
          {...input}
          disabled={disabled}
          value={val}
          className="form-control custom-form-input text-dp mt-1"
        >
          {children}
        </select>
      </div>
    ) : (
      <div className="input-container">
        <select
          {...input}
          disabled={disabled}
          className="form-control custom-form-input text-dp mt-1"
        >
          {children}
        </select>
      </div>
    )}

    {((touched || error) && (
      <span id={input.name + "-error"}>
        <small className="error">{error}</small>
      </span>
    )) ||
      (warning && <span id={input.name + "-error"}>{warning}</span>)}
  </div>
);

//Reduccion de Codigo

export const renderFieldFull = ({
  input,
  label,
  type,
  maxLength,
  val,
  disabled,
  readOnly,
  big,
  meta: { touched, error, warning },
}) => (
  <div>
    <div className="input-container">
      {type !== "checkbox" &&
        (val ? (
          <input
            className="form-control custom-form-input text-dp mt-24"
            {...input}
            value={val ? val : ""}
            placeholder={label}
            type={type}
            maxLength={maxLength}
            disabled={disabled ? disabled : false}
            readOnly={readOnly ? readOnly : false}
          />
        ) : label === "CP" ? (
          <input
            className="form-control custom-form-input text-dp mt-24 "
            {...input}
            placeholder={label}
            type={type}
            maxLength="5"
            disabled={disabled ? disabled : false}
          />
        ) : label === "CIEC" ? (
          <input
            className="form-control custom-form-input text-dp mt-24 "
            {...input}
            id={label}
            placeholder={label}
            type={type}
            maxLength="8"
            minLength="8"
            disabled={disabled ? disabled : false}
          />
        ) : label === "edad" ? (
          <input className="diplay-none" />
        ) : (
          <input
            className="form-control custom-form-input text-dp mt-24"
            {...input}
            placeholder={label}
            type={type}
            maxLength={maxLength}
            disabled={disabled ? disabled : false}
            readOnly={readOnly ? readOnly : false}
          />
        ))}
      {type === "checkbox" && (
        <div className="d-flex">
          {big ? (
            <input type="checkbox" className="form-checkbox" {...input} />
          ) : (
            <input
              type="checkbox"
              style={{ width: "15px", height: "15px", marginTop: "5px" }}
              {...input}
            />
          )}
          <label className="fz16 text-dp text-msg-dp ml-2">{label}</label>
        </div>
      )}
    </div>
    {((touched || error) && (
      <span id={input.name + "-error"}>
        <small className="error">{error}</small>
      </span>
    )) ||
      (warning && <span id={input.name + "-error"}>{warning}</span>)}
  </div>
);

export const renderSelectFieldFull = ({
  input,
  label,
  type,
  disabled,
  value,
  clases,
  meta: { touched, error, warning },
  children,
}) => (
  <div>
    <div className="input-container">
      <select
        {...input}
        className={`form-control custom-form-input text-dp ${clases}`}
      >
        {children}
      </select>
    </div>
    {(touched || error) !==
    "Debes tener entre 18 y 71 años para poder continuar" ? (
      <span id={input.name + "-error"}>
        <small className="error">{error}</small>
      </span>
    ) : (
      (
        <span id={input.name + "-error"}>
          <small className="error extend-error">{error}</small>
        </span>
      ) ||
      (warning && <span>{warning}</span>)
    )}
  </div>
);

/*
* FORMIK
*/

export const FieldText = ({
  name,
  label,
  className,
  placeholder,
  maxLength,
  labelFooter,
  props
}) => {
  return (
    <Field name={name}>
      {({field}) => (
        <div className="form-group">
          {
            label &&
              <div className="fz16 metropolisReg mb-2 text-left">{label}</div>
          }
          <input
            className={`form-control custom-form-input text-dp ${className}`}
            placeholder={placeholder}
            type="text"
            maxLength={maxLength}
            {...field}
            {...props}
          />
          {
            labelFooter &&
              <div className="label-footer">{labelFooter}</div>
          }
          <ErrorMessage name={field.name} render={msg => <div id={`${field.name}-error`} className="error mt-1">{msg}</div>}/>
        </div>
      )}
    </Field>
  )
};

export const FieldTextArea = ({
  name,
  label,
  className,
  placeholder,
  maxLength,
  labelFooter,
  props
}) => {
  return (
    <Field name={name}>
      {({field}) => (
        <div className="form-group">
          {
            label &&
              <div className="fz16 metropolisReg mb-2 text-left">{label}</div>
          }
          <textarea
            className={`form-control custom-form-input text-dp ${className}`}
            placeholder={placeholder}
            type="text"
            maxLength={maxLength}
            {...field}
            {...props}
          >
          </textarea>
          {
            labelFooter &&
              <div className="label-footer">{labelFooter}</div>
          }
          <ErrorMessage name={field.name} render={msg => <div id={`${field.name}-error`} className="error mt-1">{msg}</div>}/>
        </div>
      )}
    </Field>
  )
};

export const FieldPassword = ({
  name,
  label,
  placeholder,
  props,
  showPassword,
  setShowPassword
}) => {
  return (
    <Field name={name}>
      {({field}) => (
        <div className="form-group">
          {
            label &&
              <div className="fz16 metropolisReg mb-2 text-left">{label}</div>
          }
          <div className="input-group form-group center-flex">
            <input
              className="form-control custom-form-input text-dp center-flex-input"
              placeholder={placeholder}
              type={showPassword ? "text" : "password"}
              {...field}
              {...props}
            />
            <span className={`${showPassword ? "eye-slash" : "eye"} icon-style`} onClick={() => setShowPassword(!showPassword)}/>
          </div>
          <ErrorMessage name={field.name} render={msg => <div className="error mt-1">{msg}</div>}/>
        </div>
      )}
    </Field>
  )
};

export const FieldSelect = ({
  name,
  label,
  onChange,
  props,
  children,
  labelFooter
}) => {
return (
      <Field name={name}>
        {({field, form: { setFieldValue }}) => (
          <div className="form-group">
              {
                label &&
                  <div className="fz16 metropolisReg text-left">{label}</div>
              }
              <select {...field} className="form-control custom-form-input text-dp" {...props} 
              onChange={ e => {
                  setFieldValue(field.name, e.target.value);
                  onChange && onChange(e)
              }}>
                  {children}
              </select>
              {
                labelFooter &&
                  <div className="label-footer">{labelFooter}</div>
              }
              <ErrorMessage name={field.name} render={msg => <div className="error mt-1">{msg}</div>} />
          </div>
        )}
      </Field>
)
};

export const FieldCheck = ({
  name,
  checked,
  label,
  props
}) => {
  return (
    <Field name={name}>
      {({field}) => (
        <div className="form-group">
          <div className="form-check">  
              <input
                id={field.name}
                className="form-check-input text-dp"
                type="checkbox"
                defaultChecked={checked}
                {...field}
                {...props}
              />
            <label className="form-check-label fz16 metropolisReg" htmlFor={field.name}>
              {label}
            </label>
          </div>
          <ErrorMessage name={field.name} render={msg => <div className="error mt-1">{msg}</div>}/>
        </div>
      )}
    </Field>
  )
};

export const FieldRadio = ({
  name,
  checked,
  value,
  label,
  props
}) => {
  return (
    <Field name={name}>
      {({field, form}) => (
        <div className="form-group">
          <div className="form-check">  
            <label className="form-check-label fz16 metropolisReg">
              <input
                className="form-check-input"
                type="radio"
                defaultChecked={checked}
                value={value}
                onClick={() => {
                  form.setFieldValue(field.name, value)
                }}
                {...field}
                {...props}
              />
              {label}
            </label>
          </div>
          <ErrorMessage name={field.name} render={msg => <div className="error mt-1">{msg}</div>}/>
        </div>
      )}
    </Field>
  )
};