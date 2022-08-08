import React from 'react';
import { reduxForm, Field } from 'redux-form'
import {Button} from 'react-bootstrap'

const validate = values => {
	const errors = {}

	if (!values.email) {
        errors.email = 'Ingresa un correo'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Ingresa un correo válido'
    }
	return errors;
}

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div>
      <div className="input-container">
				<input className="form-control custom-form-input mt-24" {...input} placeholder={label} type={type}/>
      </div>
      {touched &&
          ((error && <span><small className="error">{error}</small></span>) ||
            (warning && <span>{warning}</span>))}
    </div>
  )

let ResetPasswordForm = props => {

	const { handleSubmit, submitting} = props
 	const submitButtonClass = (submitting) ? "btn-blue-general mt-30 disabled" : "btn-blue-general mt-30"

	return (
		<div className="container">
			<form onSubmit={handleSubmit} className="mr-auto ml-auto" style={{maxWidth : '690px'}}>
				<Field component={renderField} type="email" name="email" label="Correo electrónico"/>
				<div className="text-center">
					<Button type="submit" className={submitButtonClass} disabled={submitting} style={{width: '250px'}}>enviar email</Button>
				</div>
			</form>
		</div>
	)
}


ResetPasswordForm = reduxForm({
	form: 'recoverPasswordForm', // a unique identifier for this form
	validate, // <--- validation function given to redux-form
  })(ResetPasswordForm)

export default ResetPasswordForm