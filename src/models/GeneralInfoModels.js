let civilStatusOptions = {
	"SINGLE" : { value : "Soltero"},   
	"MARRIED": { value : "Casado"}, 
	"DIVORCED": { value : "Divorciado"}, 
	"WIDOWER": { value : "Viudo"}, 
}

let realtiveOptions = {
	"FAMILY" : { value : "Familiar"},
	// "FRIEND" : { value : "Amigo"},
	"CLIENT" : { value: "Cliente" },
	"PROVIDER" : { value: "Proveedor"} 

}

let carYear = {
	"MORE4" : 'Hace 4 años o más',
	"YES" : "Sí",
	"NO" : "No"

}

let bankAccount = {
	'1': {value: "Sí, ahí recibo mis ventas"},
	'2': {value: "Sí, pero no la uso mucho"},
	'0': {value: "No tengo"}

}

let generalInfoOptions = {
	civilStatusOptions,
	realtiveOptions,
	carYear,
	bankAccount
}



export default generalInfoOptions