import React from 'react';
import { reduxForm, Field } from 'redux-form'
import {Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'

const validate = values => {
	const errors = {}

	if (!values.email) {
    errors.email = 'Ingresa un correo'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Ingresa un correo válido'
	}
	if(!values.password){
		errors.password = "Ingresa token"
	} 
	return errors;
}

const ShowHide = () => {
	var x = document.getElementById("password");
	if (x.type === "password") {
	  x.type = "text";
	} else {
	  x.type = "password";
	}
  } 

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div>
      <div className="input-container form-group">
	  	{ (type === 'password') 
				? 	<div className="input-group form-group center-flex mt-24">
						<input className="form-control custom-form-input text-dp center-flex-input" {...input} placeholder={label} type={type} name="password" autocomplete="off" id="password" data-toggle="password"/>
						<div style={{height: '10px', width: '100vw'}}> </div>
					</div>
				:	<input className="form-control custom-form-input text-dp mt-24" {...input} placeholder={label} autocomplete="off" type={type}/>
					
		}	
		{touched &&
          ((error && <span><small className="error">{error}</small></span>) ||
			(warning && <span>{warning}</span>))
		}
    	</div>
    </div>
  )

let DeleteForm = props => {

	const { handleSubmit, submitting} = props
 	const submitButtonClass = (submitting) ? "btn-blue-general mt-30 disabled" : "btn-blue-general mt-30";
	const validateEmail = (nextValue, previousValue) => /^$|^[^\s]*[\w-\.\@]+$/i.test(nextValue) ? nextValue : previousValue;
	const validatePassword = (nextValue, previousValue) => /^[^\s]*$/i.test(nextValue) ? nextValue : previousValue;

	return (
		<div className="container">
			<form onSubmit={handleSubmit} className="mr-auto ml-auto" style={{maxWidth : '690px'}}>
			<input style={{display:'none'}}/>
			<input type="password" style={{display:'none'}}/>

				<Field component={renderField} type="text" name="email" label="Correo electrónico" normalize={validateEmail}/>
				<Field component={renderField} type="password" name="token" label="token" normalize={validatePassword}/>
				{/* <div className="mb-1 text-center">
					<Link to="/reset-password" className="fw500 fz12 blue-primary">¿Olvidaste tu Contraseña?</Link>
				</div> */}
				<div className="text-center">
					<Button type="submit" className={submitButtonClass} disabled={submitting} style={{ width: '250px' }}>continuar</Button>
				</div>
			</form>
		</div>
	)
}


DeleteForm = reduxForm({
	form: 'deleteForm', // a unique identifier for this form
	validate, // <--- validation function given to redux-form
  })(DeleteForm)

export default DeleteForm
