export const validateGeneralInfo = values => {
	const errors = {};

	if (!values.name) {
		errors.name = 'Ingresa tu nombre';
	} else if (!/^[A-Za-záéíóúñ\s]+$/g.test(values.name)) {
		errors.name = 'Nombre inválido';
	}

	if (!values.lastname) {
		errors.lastname = 'Ingresa tu apellido paterno';
	} else if (!/^[A-Za-záéíóúñ\s]+$/g.test(values.lastname)) {
		errors.lastname = 'Apellido inválido';
	}

	if (!values.secondLastname) {
		errors.secondLastname = 'Ingresa tu apellido materno';
	} else if (!/^[A-Za-záéíóúñ\s]+$/g.test(values.secondLastname)) {
		errors.secondLastname = 'Apellido inválido';
	}
	if (!values.civilStatus) {
		errors.civilStatus = 'Estado civil...';
	} else if (values.civilStatus === 'Selecciona...') {
		errors.civilStatus = 'Estado civil...';
	}

	if (!values.day) {
		errors.day = 'Selecciona el día';
	}

	if (!values.month) {
		errors.month = 'Selecciona el mes';
	}

	if (!values.year) {
		errors.year = 'Selecciona el año';
	} else {
		let day = values.day;
		let month = values.month;
		let year = values.year;
		let fecha1 = new Date(year + '/' + month + '/' + day);
		let fecha2 = new Date();
		let resta = fecha2.getTime() - fecha1.getTime();
		let edad = Math.round(resta / (1000 * 60 * 60 * 24)) / 365;
		if (edad < 18) {
			errors.edad = 'Debes de ser mayor de 18 años';
		}
	}

	if (!values.rfcPerson) {
		errors.rfcPerson = 'Ingresa tu RFC Personal';
	} else {
		if (!/^[A-Z]{4}(\d{6})([A-Z|\d]{3})$/.test(values.rfcPerson)) {
			errors.rfcPerson = 'Ingresa un RFC válido';
		}
	}

	if (!values.name1) {
		errors.name1 = 'Ingresa el nombre de la referencia';
	} else if (!/^[A-Za-záéíóúñ\s]+$/g.test(values.name1)) {
		errors.name1 = 'Nombre inválido';
	}

	if (!values.name2) {
		errors.name2 = 'Ingresa el nombre de la referencia';
	} else if (!/^[A-Za-záéíóúñ\s]+$/g.test(values.name2)) {
		errors.name2 = 'Nombre inválido';
	}

	if (!values.phone1) {
		errors.phone1 = 'Ingresa el teléfono de la referencia';
	} else if (
		!/^[0-9]\d+$/.test(values.phone1) ||
		values.phone1.length > 10 || values.phone1.length < 10
	) {
		errors.phone1 = 'Ingresa un número válido';
	}

	if (!values.phone2) {
		errors.phone2 = 'Ingresa el teléfono de la referencia';
	} else if (
		!/^[0-9]\d+$/.test(values.phone2) ||
		values.phone2.length > 10 || values.phone2.length < 10
	) {
		errors.phone2 = 'Ingresa un número válido';
	}

	if (!values.relative1) {
		errors.relative1 = 'Ingresa el tipo de la referencia';
	}

	if (!values.relative2) {
		errors.relative2 = 'Ingresa el tipo de la referencia';
	}

	if (!values.mortgageCredit) {
		errors.mortgageCredit = 'Selecciona una opción';
	}

	if (!values.carCredit) {
		errors.carCredit = 'Selecciona una opción';
	}

	if (!values.creditCard) {
		errors.creditCard = 'Selecciona una opción';
	}
	if (values.creditCard === 1 && !values.last4) {
		errors.last4 = 'Ingresa los números de tu tarjeta';
	} else if (!/^[0-9]{3}\d$/.test(values.last4)) {
		errors.last4 = 'Ingresa un número válido';
	}

	if (!values.sameAddress) {
		if (!values.street) {
			errors.street = 'Ingresa la calle de tu negocio';
		}

		if (!values.extNumber) {
			errors.extNumber = 'Ingresa el número exterior de tu negocio';
		}

		if (!values.town) {
			errors.town = 'Ingresa la colonia donde se ubica tu negocio';
		}

		if (!values.phone) {
			errors.phone = 'Ingresa el teléfono de tu negocio';
		} else if (
			!/^[0-9]\d+$/.test(values.phone) ||
			values.phone.length > 10 || values.phone.length < 10
		) {
			errors.phone = 'Ingresa un número de teléfono válido';
		}

		if (!values.zipCode) {
			errors.zipCode = 'Ingresa el código postal de tu negocio';
		} else if (
			!/^[0-9]\d{4,5}/.test(values.zipCode) ||
			values.zipCode.length > 5 || values.zipCode.length < 5
		) {
			errors.zipCode = 'Ingresa un código postal valido';
		}
	}
	if (!values.tyc) {
		errors.tyc = 'Debes aceptar para avanzar';
	}

	if (!values.ciec) {
		errors.ciec = '';
	} else if (!/^[a-zA-Z0-9]+$/.test(values.ciec) || values.ciec.length < 8) {
		errors.ciec = 'Ingresa un CIEC valido';
	}

	return errors;
};