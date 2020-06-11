import React from 'react';
import Title from '../../Generic/Title';
import Question from './Question';


const Questions = props => {
	return (
		<div className="container mb-120">
			<div className="text-center mt-120">
				<Title title="Preguntas frecuentes" className="title-dp fz48" />
			</div>

			<Question
				question="¿CÓMO PUEDO MEJORAR MI TASA?"
				text="Existen requisitos básicos con los que te vuelves acreedor a un crédito, sin embargo puedes ayudarnos a conocerte mucho mejor brindándonos información y documentación adicional tales como CIEC (Clave de Identificación Electrónica Confidencial), archivos XML de la facturación electrónica de egresos (6 meses mínimo), declaraciones anuales, estados financieros, relaciones analíticas, referencias comerciales, referencias personales del principal accionista, relación patrimonial del principal accionista, carta de no revocaciones de poderes, etc. la cual te dará la oportunidad de obtener tasas más bajas y montos más altos. Recuerda, algo que te ayudará aún más es realizar siempre tus pagos a tiempo. "
			/>	

			<Question
				question="¿CUÁLES SON LOS REQUISITOS PARA PEDIR UN CRÉDITO? "
				text="Los requisitos básicos son: llenar nuestro formulario, tener un mínimo de 6 meses de antigüedad con tu empresa o negocio, ventas mensuales mínimas de $25,000, no tener mal historial crediticio y subir tu documentación a nuestro portal."
			/>

			<Question
				question="¿CUÁNTO PUEDO PEDIR? "
				text="No tenemos mínimos ni máximos para prestarte, ya que contamos con diversas opciones de financiamiento y siempre buscamos ofrecerte la que mejor se adapte a tus necesidades. "
			/>

			<Question 
				question="¿MI EMPRESA TIENE QUE ESTAR REGISTRADA ANTE EL SAT? "
				text="No necesariamente, en Distrito PyME contamos con alternativas para todo tipo de negocios. "
			/>

			<Question
				question="¿QUÉ PLAZOS MANEJAN? "
				text="Contamos con diferentes opciones de crédito, que pueden ir desde 1 mes y hasta 4 años "
			/>

			<Question 
				question="¿EN CUÁNTO TIEMPO RECIBO MI CRÉDITO?"
				text="En un máximo de 48 horas comenzaras recibir las mejores ofertas de crédito para tu empresa o negocio, contamos con diversas opciones en las que podrás recibir tu dinero desde 24 horas, una semana y hasta un mes para proyectos especiales."
			/>

			<Question
				question="¿ESTÁN PROTEGIDOS MIS DATOS?"
				text="Tus datos siempre están protegidos. Contamos con los más altos estándares de seguridad informática, operativa y legal que nos permiten tener un estricto manejo de tu información. "
			/>

			<Question
				question="¿PUEDO PEDIR MÁS DE UN PRÉSTAMO? "
				text="¡Claro! Una vez que comiences a generar historial con nosotros podremos ir incrementando y mejorando tus montos, tasas y plazos. "
			/>

			<Question
			 	question="SI RECHAZARON MI SOLICITUD ¿PUEDO VOLVER A PEDIR UN PRÉSTAMOS? "
				 text="Sí. Podrás hacerlo cuando hayas mejorado tus condiciones. Pero no te preocupes, nuestros asesores te darán las mejores recomendaciones y te ayudaran a que pronto puedas obtener tu crédito. "
			/>

			<Question
				question="¿PUEDO LIQUIDAR MI CRÉDITO ANTES DEL PLAZO QUE ELEGÍ? "
				text="La mayoría de las opciones de crédito que manejamos puedes liquidar tu crédito anticipadamente, las condiciones especificas las indica el otorgante de crédito al momento de emitir su autorización. "
			/>	

			<Question
				question="¿QUÉ PASA SI ME ATRASO O NO PAGO MI MENSUALIDAD? "
				text="Desafortunadamente en caso de no realizar tu pago puntual se generarán gastos de cobranza, intereses moratorios y lo más importante bajaras tu calificación, lo cual dificultará obtener más y mejores créditos en el futuro. "
			/>
		</div>
	)
}

export default Questions