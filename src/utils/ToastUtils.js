import { toast } from "react-toastify";

let registerMessage = [
	"6 empresas se están registrando en este momento",
	"4 empresas se están registrando en este momento",
	"3 empresas se están registrando en este momento",
	"3 empresas acaban de recibir su crédito",
	"2 empresas acaban de recibir su crédito",
	"Una empresa acaba de recibir su crédito"
]

let firstForm = [
	"4 empresas completaron su solicitud de crédito",
	"4 empresas completaron su solicitud de crédito",
	"4 empresas completaron su solicitud de crédito"
]

let secondForm = [
	"8 empresas están llenando  su solicitud de crédito",
	"12 empresas están llenando su solicitud de crédito",
	"6 empresas están llenando  su solicitud de crédito"
]

let documentsForm = [
	"4 empresas están recibiendo sus propuestas de crédito ahora mismo",
	"3 empresas están recibiendo sus propuestas de crédito ahora mismo",
	"2 empresas están recibiendo sus propuestas de crédito ahora mismo",
	"Una empresa está recibiendo sus propuestas de crédito ahora mismo"
]

class ToastUtils {
	
	registerMessages = (path) => {
		switch (path) {
			case "register":
				return this.buildRegisterMessage()
			case "first":
				return this.buildMessages(firstForm)
			case "second":
				return this.buildMessages(secondForm)
			case "third":
				return this.buildMessages(secondForm)
			case "documents":
				return this.buildMessages(documentsForm, 'docs')
			default:
				break;
		}
	}

	buildRegisterMessage = () => {
		let random = Math.floor((Math.random() * 6));
		return registerMessage[random]
	}

	buildMessages = (form, type) => {	
		let random;
		(!type) 
		? random = Math.floor((Math.random() * 3 ))
		: random = Math.floor((Math.random() * 4 ))

		return form[random]
	}

}

const toastUtils = new ToastUtils()
export const execToast = (path) => {
		setTimeout(() => {
			toast.success(toastUtils.registerMessages(path))
		}, 4000 )
}
