const RFCPF = /^([A-ZÑ\x26]{4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))(([-|\s])?([A-Z\d]{3}))?$/;
const RFCPM = /^([A-ZÑ\x26]{3}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))(([-|\s])?([A-Z\d]{3}))?$/;

function validDay(day, month) {
	let valid = true;
	const intMonth = parseInt(month);
	const intDay = parseInt(day);
	if (intMonth === 2 && intDay > 29) {
		valid = false;
	}
	return valid;
}

export const validateComercialInfo = values => {
	let errors = {};
	if (!values.zipCode){
		errors.zipCode = "Ingresar código postal"
	}
	if (!values.town){
		errors.town = "Seleccione una colonia"
	}
	if (!values.comercialName) {
		errors.comercialName = 'Ingresa el nombre de tu negocio';
	}
	if (!values.businessName) {
		errors.businessName = 'Ingresa la razón social de tu negocio';
	}
	if (!values.gyre) {
		errors.gyre = 'Selecciona el giro de tu negocio';
	}

	if (!values.specific) {
		errors.specific = 'Escribe el giro específico de tu negocio';
	} else if (!/^[A-Za-z0-9áéíóú\s]+$/g.test(values.specific)) {
		errors.specific = 'Ingresa un giro válido';
	}
	if (!values.rfc) {
		errors.rfc = 'Ingresa el RFC de tu negocio';
	} else {
		if (sessionStorage.type === 'PF') {
			const day = values.rfc.substring(8, 10);
			const month = values.rfc.substring(6, 8);
			if (!validDay(day, month)) {
				errors.rfc = 'Ingresa un RFC válido';
			} else if (!RFCPF.test(values.rfc)) {
				errors.rfc = 'Ingresa un RFC válido';
			}
		} else if (sessionStorage.type === 'PM') {
			const day = values.rfc.substring(7, 9);
			const month = values.rfc.substring(5, 7);
			if (!validDay(day, month)) {
				errors.rfc = 'Ingresa un RFC válido';
			} else if (!RFCPM.test(values.rfc)) {
				errors.rfc = 'Ingresa un RFC válido';
			}
		}
	}

	if (!values.street) {
		errors.street = 'Ingresa la calle de tu negocio';
	}

	if (!values.extNumber) {
		errors.extNumber = 'Ingresa el número exterior de tu negocio';
	}

	if (
		!/^[A-Za-z0-9\s-]+$/g.test(values.intNumber) &&
		values.intNumber != null
	) {
		errors.intNumber = 'Ingresa un número válido';
	}

	if (!values.town) {
		errors.town = 'Ingresa la colonia donde se ubica tu negocio';
	}

	if (!values.phone) {
		errors.phone = 'Ingresa el teléfono de tu negocio';
	} else if (
		!/^[0-9]\d+$/.test(values.phone) ||
		values.phone.length > 10 ||
		values.phone.length < 10
	) {
		errors.phone = 'Ingresa un teléfono válido';
	}

	if (!values.warranty) {
		errors.warranty = 'Selecciona una opción';
	}

	if (!values.terminal) {
		errors.terminal = 'Selecciona una opción';
	}

	return errors;
};