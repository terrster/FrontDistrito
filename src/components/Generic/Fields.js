import React from 'react';

export const renderField = ({
	input,
	label,
	type,
	maxLength,
	value = '',
	minLength,
	df,
	cls,
	meta: { touched, error, warning }
}) => {
	return (<div className={cls}>
		<div className="input-container">
			{label === 'RFC' && sessionStorage.type === 'PF' ? (
				<input
					className="form-control custom-form-input brandonReg mt-1 mb-0"
					{...input}
					value={ value || input.value}
					placeholder={label}
					type={type}
					maxLength="10"
				/>
			) : label === 'RFC' &&
			  (sessionStorage.type === 'RIF' || sessionStorage.type === 'PFAE') ? (
				<input
					className="form-control custom-form-input brandonReg mt-1 mb-0"
					{...input}
					value={ value || input.value}
					placeholder={label}
					type={type}
					maxLength="13"
					
				/>
			) : label === 'RFC de tu empresa o negocio' &&
			  sessionStorage.type === 'PM' ? (
				<input
					className="form-control custom-form-input brandonReg mt-1 mb-0"
					{...input}
					value={ value || input.value}
					placeholder={label}
					type={type}
					maxLength="12"
					
				/>
			) : label === 'Teléfono' ? (
				<input
					className="form-control custom-form-input brandonReg mb-0"
					value={value}
					{...input}
					placeholder={label + " de tu negocio"}
					type={type}
					maxLength="10"
				/>
			) : label === 'CP' ? (
				<input
					className="form-control custom-form-input brandonReg mt-1 mb-0"
					{...input}
					value={ value || input.value}
					placeholder={label}
					type={type}
					maxLength="5"
				/>
			) : (
				<input
					className="form-control custom-form-input brandonReg mt-1 mb-0"
					{...input}
					value={value || input.value}
					placeholder={label}
					type={type}
				/>
			)}
		</div>
		{touched &&
			((error && (
				<span>
					<small className="error">{error}</small>
				</span>
			)) ||
				(warning && <span>{warning}</span>))}
	</div>)
};

export const renderSelectField = ({
	input,
	label,
	type,
	disabled,
	df,
	cls,
	meta: { touched, error, warning },
	children
}) => (
	<div className={cls}>
		<div className="input-container">
			<select
				{...input}
				className="form-control custom-form-input brandonReg mt-1"
			>
				{children}
			</select>
		</div>
		{touched &&
			((error && (
				<span>
					<small className="error">{error}</small>
				</span>
			)) ||
				(warning && <span>{warning}</span>))}
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
	big,
	meta: { touched, error, warning }
}) => (
	<div>
		<div className="input-container">
			{type !== 'checkbox' &&
				(val ? (
					<input
						className="form-control custom-form-input brandonReg mt-24 "
						{...input}
						value={val ? val : ''}
						placeholder={label}
						type={type}
						maxLength={maxLength}
						disabled={disabled ? disabled : false}
					/>
				) : label === 'CP' ? (
					<input
						className="form-control custom-form-input brandonReg mt-24 "
						{...input}
						placeholder={label}
						type={type}
						maxLength="5"
						disabled={disabled ? disabled : false}
					/>
				) : label === 'CIEC' ? (
					<input
						className="form-control custom-form-input brandonReg mt-24 "
						{...input}
						id={label}
						placeholder={label}
						type={type}
						maxLength="8"
						minLength="8"
						disabled={disabled ? disabled : false}
					/>
				) : label === 'edad' ? (
					<input className="diplay-none" />
				) : (
					<input
						className="form-control custom-form-input brandonReg mt-24"
						{...input}
						placeholder={label}
						type={type}
						maxLength={maxLength}
						disabled={disabled ? disabled : false}
					/>
				))}
			{type === 'checkbox' && (
				<div className="d-flex">
					{big ? (
						<input
							type="checkbox"
							style={{ width: '60px', height: '60px', marginTop: '-15px' }}
							{...input}
						/>
					) : (
						<input
							type="checkbox"
							style={{ width: '15px', height: '15px', marginTop: '5px' }}
							{...input}
						/>
					)}
					<label className="fz16 gray50 brandonReg ml-2">{label}</label>
				</div>
			)}
		</div>
		{touched &&
			((error && (
				<span>
					<small className="error">{error}</small>
				</span>
			)) ||
				(warning && <span>{warning}</span>))}
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
	children
}) => (
	<div>
		<div className="input-container">
			<select
				{...input}
				className={`form-control custom-form-input brandonReg ${clases}`}
			>
				{children}
			</select>
		</div>
		{touched &&
			((error !== 'Debes tener entre 18 y 71 años para poder continuar' ? (
				<span>
					<small className="error">{error}</small>
				</span>
			) : (
				<span>
					<small className="error extend-error">{error}</small>
				</span>
			)) ||
				(warning && <span>{warning}</span>))}
	</div>
);
