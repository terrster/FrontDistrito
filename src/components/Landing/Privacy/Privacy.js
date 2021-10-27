import React from 'react';
import Title from '../../Generic/Title'
import Paragraph from '../Terms/Paragraph';

const Privacy = () => {
	return (
		<div className="container mb-120">
			<div className="text-center mt-120">
				<Title title="Aviso de privacidad" className="title-dp fz48" />
			</div>
			
			<Title title="Sitio web" className="subtitle-dp fz22 text-center"/>
			<Paragraph 
				texts={[
					"El presente documento constituye el Aviso de Privacidad para efectos de lo dispuesto en la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (la “LFPDP”) y las disposiciones que emanan de ella o se relacionan con la misma y tiene por objeto informar a los titulares los alcances y condiciones generales del tratamiento de sus datos personales, a fin de que estén en posibilidades de tomar decisiones informadas sobre el uso de los mismos."
				]}
			/>		

			<Paragraph 
				title="I. IDENTIDAD Y DOMICILIO DEL RESPONSABLE"
				texts={[
					"<br>Distrito Pyme, Sociedad Anónima de Capital Variable (el “Responsable”), con domicilio en Avenida de los Deportes 27, Colonia Las Arboledas, Municipio de Tlalnepantla de Baz, Estado de México, Código Postal 54020, México, es responsable de recabar datos personales y datos personales sensibles del Titular, del manejo de los mismos y de su protección."
				]}
			/>	

			<Paragraph 
				title="II. DATOS PERSONALES QUE SE TRATARÁN"
				texts={[
					"<br>Para llevar a cabo el correcto proceso de contratación de los servicios que ofrece el Responsable y de los aliados comerciales de este último que más adelante se enlistan, recabaremos datos personales del Titular mediante la entrega personal, directa o mediante la transferencia de los mismos por parte de sus subsidiarias, previo consentimiento otorgado por el Titular a los Responsables o sus Encargados, así mismo, el Responsable puede recabar datos personales de manera indirecta a través de fuentes de acceso público y de otras fuentes disponibles en el mercado, tales como bolsas de trabajo y páginas de internet en las cuales el Titular haya hecho públicos sus datos de contacto.",

					"<br>Los datos personales que recabamos para la prestación de nuestros servicios son: (i) datos de identificación, (ii) datos de contacto, (iii) datos laborales, (iv) datos académicos, (v) datos familiares, (vi) datos relacionados con sus referencias personales, y (v) datos relacionados con el aval que en su caso se requiera; así mismo, tratamos los siguientes datos personales sensibles: (i) datos de sus hábitos e intereses de vida, (ii) datos patrimoniales, (iii) datos financieros, y (iv) datos biométricos.",

					"<br>Al proporcionar los datos referentes a datos familiares, referencias personales y avales que en su caso se requieran, el Titular reconoce que tiene el consentimiento de éstos para que el Responsable pueda contactarlos y solicitar las referencias que sean necesarias para llevar a cabo su proceso de prestación de servicios.",

					"<br>Para el caso en que usted desee hacer uso de los servicios del Responsable, deberá otorgar su consentimiento expreso y por escrito en favor de Responsable para el uso de sus datos personales, a través del aviso de privacidad que en el proceso de contratación de los servicios se le estará compartiendo."
				]}
			/>	

			<Paragraph 
				title="III.	FINALIDAD DEL TRATAMIENTO"
				texts={[
					"<br>Finalidades Primarias",
					"<br>Los datos personales que se proporcionen al Responsable serán utilizados para llevar a cabo de manera correcta la integración de su expediente como usuario de nuestros servicios, por lo que el responsable utilizará sus datos personales para llevar a cabo las siguientes actividades: (i) atender su solicitud de crédito, (ii) validar la información proporcionada por usted, (iii) llevar a cabo el análisis de su solicitud, (iv) realizar la integración de su expediente como usuario, (v) compartir su solicitud y expediente con las financieras que podrían otorgarle el crédito solicitado, (vi) informarle sobre el estatus de solicitud, (vii) notificarle las condiciones en las que se podría otorgar el crédito que en su caso se autorice, (viii) dar seguimiento a su proceso de atención del crédito, y (ix) elaborar informes relativos a la prestación del servicio.",

					"<br>Finalidades Secundarias",
					"<br>Los datos personales que usted le proporcione al Responsable podrán ser utilizados para llevar a cabo finalidades secundarias con fines estadísticos e informativos, tales como: (i) envío del newsletter, (ii) informar sobre cambios en nuestros productos o servicios, (iii) informar sobre nuevos productos o servicios que estén relacionados con los contratados por el cliente, (iv) evaluar la calidad de nuestros servicios, y (v) aplicación de encuestas de satisfacción.",
					"<br>Si usted no está de acuerdo en que sus datos personales sean utilizados para las finalidades secundarias antes descritas, usted podrá negarse mediante el envío de un correo electrónico a la dirección <a href='mailto:legal@distritopyme.com'>legal@distritopyme.com</a> únicamente manifestando que no consiente que el Responsable utilice sus datos personales para las finalidades secundarias, debiendo indicar en su solicitud los datos que permitan identificarlo dentro de nuestros registros o bases de datos."
				]}
			/>	

			<Paragraph 
				title="IV. TRANSFERENCIA DE DATOS."
				texts={[
					"<br>El Responsable para llevar a cabo de manera correcta la prestación de sus servicios en favor del Titular, y en los caso de que el mismo pueda ser sujeto del otorgamiento del servicio requerido por alguno de los aliados comerciales del Responsable, requiere transferir sus datos personales a las siguientes sociedades: Impulso Distrito, S.A.P.I. de C.V., (ImpulsoMx), Unifin Financiera, S.A.B. de C.V. (Uniclick), Pretmex, S.A. de C.V. (Pretmex), Advantech Servicios Financieros, S.A.P.I. de C.V., SOFOM E.N.R. (Aspiria), Bien para Bien, S.A.P.I. de C.V., SOFOM E.N.R. (Bien para Bien), Cumplomex, S.A. de C.V. (Cumplo), Apjusto, S.A.P.I. de C.V., SOFOM, E.N.R., Justo Lease, S.A.P.I. de C.V. (Credijusto), Mundi Trade, INC (Mundi), Factor Expres, S.A.P.I. de C.V. SOFOM E.N.R. (Factor Expres), AV Socios de Capital S.A.P.I. de C.V. (AV Capital), Haycash, S.A.P.I. de C.V. (HayCash), Dimex S.A. de C.V. (Dimex), UKU S.A.P.I. de C.V. (PagaLoop), First Home Solutions, S.A.P.I. de C.V. (iBan), ION FInanciera, S.A.P.I. de C.V., SOFOM, E.R., SGS Soluciones a tu Medida, S.A.P.I. de C.V. SOFOM, E.N.R. (Amifin), Happy Days Tech, S.A.P.I. de C.V. (Delt.ai), Prestadora de Servicios Ciclomart, S.A.P.I de C.V (Creze), Financiera Cualli, S.A.P.I. de C.V., SOFOM, E.N.R (Cualli), Banca Afirme, S.A. (Afirme), Institución de Banca Múltiple, Afirme Grupo Financiero, en adelante como “los Encargados”, ku-bo financiero, S.A. de C.V. S.F.P. (Kubo), MEXARREND S.A.P.I. DE C.V. (Mexarrend), Lenmi, S.A. de C.V. (Lenmi), Reparadora RTD, S.A. de C.V. (Resuelve tu Deuda), Inteligencia en Finanzas S.A.P.I. de C.V. (Albo), Drip Capital México Holding, S.A. de C.V. (Drip Capital), Quant Capital, S.A. de C.V., SOFOM, E.N.R. (Quant Capital), SQN Latina S. de R.L. de C.V. (SQNLatina), Satws Technologies, S.A.P.I. de C.V. (Satws), LGF Occidente, S.A. DE C.V., SOFOM, E.N.R. (Creditas Home Y Creditas Auto) SORABIL, S. DE RL DE C.V. (Creditas @Work), SBLEASING, S.A. DE C.V., CF TECH, S.A. DE C.V. (CALARA) y Red Amigo DAL, SAPI de CV, SOFOM, ENR, (Konfío) con la finalidad de que dichas sociedades puedan otorgarle una propuesta de servivios en los términos y condiciones solicitadas por el Titular; por lo que el Responsable hace del conocimiento del Titular que, el Responsable tiene celebrado un contrato para la prestación de servicios con cada uno de los Encargados, en el cual se establece el tratamiento que el Encargado deberá dar a sus datos personales con la finalidad de proteger sus datos en los casos en que los mismos sean transferidos a dicha sociedad, previo consentimiento otorgado por el Titular.",
					"<br>Derivado de lo anterior, el Responsable hace de su conocimiento que, para el caso en que usted desee hacer uso de los servicios del Responsable, de manera expresa y por escrito, el Responsable recabará de usted dicho consentimiento, toda vez que, sin el mismo, el Responsable no podrá realizar la correcta prestación de sus servicios en favor del Titular, ya que la transferencia de su expediente es parte fundamental para poderle ofrecer una propuesta de servicios por parte de los Encargados."
				]}
			/>	

			<Paragraph 
				title="V. MECANISMOS PARA EL EJERCICIO DE DERECHOS A.R.C.O."
				texts={[
					"<br>El Responsable ha implementado un mecanismo para que el titular conozca ¿Qué datos tenemos del titular?, ¿Para qué los utilizamos?, y las condiciones del uso que se les da (Acceso), asimismo, el titular podrá solicitar la corrección de la información que tiene el Responsable toda vez que la misma este desactualizada, inexacta o incompleta (Rectificación), que sea eliminada de nuestros registros o bases de datos cuando se considere que la misma no está siendo utilizada conforme a los principios, deberes y obligaciones previstas en la normativa (Cancelación), así como, para oponerse al uso de sus datos personales para fines específicos (Oposición).",
					
					"<br>En ese sentido, usted en cualquier momento podrá ejercitar los anteriores derechos sobre los datos personales que se encuentran en posesión del Responsable, mediante el envío de una solicitud por escrito a través del correo electrónico <a href='mailto:legal@distritopyme.com'>legal@distritopyme.com</a> acompañado de la siguiente información:",

					"<br><ul><li>Nombre del Titular, así como un domicilio, número telefónico o algún otro medio de contacto para dar respuesta a la solicitud.</li><li>Los documentos oficiales que acrediten la personalidad del Titular de los datos.</li><li>Una descripción clara respecto de las modificaciones que desea utilizar sobre sus datos personales, o bien si es posible, cualquier otro documento que permita facilitar la localización de los datos personales.</li></ul>",

					"Una vez recibida su solicitud el Responsable contará con un plazo no mayor a 15 días naturales para atender dicha petición y enviarle un informe sobre la misma a través del medio de contacto que se proporcione."
				]}
			/>	

			<Paragraph 
				title="VI. MECANISMOS Y PROCEDIMIENTOS PARA LA REVOCACIÓN DEL CONSENTIMIENTO"
				texts={[
					"<br>El Responsable pone a disposición la oficina de datos personales ubicada en Avenida de los Deportes 27, Colonia Las Arboledas, Municipio de Tlalnepantla de Baz, Estado de México, Código Postal 54020, México, en la cual el Titular mediante el llenado de los formatos correspondientes podrá revocar el consentimiento de uso de sus datos personales en posesión del Responsable, así mismo el Titular podrá revocar el consentimiento mediante correo electrónico a la cuenta <a href='mailto:legal@distritopyme.com'>legal@distritopyme.com</a> en donde deberá explicar de manera detallada su petición de revocación, y el Responsable en un plazo no mayor a 10 días naturales le enviará un informe sobre la misma a través del correo electrónico en que se realizó la solicitud."
				]}
			/>

			<Paragraph 
				title="VII.	VIDEOVIGILANCIA"
				texts={[
					"<br>Para efectos de mantener un control y monitoreo de las personas que accedan a las instalaciones del Responsable, se cuenta con un circuito cerrado de televisión, mismo que es monitoreado las 24 (veinticuatro) horas del día, con la finalidad de brindar seguridad a los bienes y las personas que se encuentran en el interior del inmueble, y para poder detectar en tiempo real cualquiera amenaza que pudiera poner en riesgo al inmueble, por lo que, cualquier candidato que ingrese a las instalaciones del Responsable será videograbada por nuestras cámaras de seguridad. Las videograbaciones serán almacenadas por 20 (veinte) días en nuestros servidores, y para el caso, en que se detecte cualquier anomalía, dichos videos podrán ser conservados por el periodo que dure la investigación que en su caso se realice."
				]}
			/>

			<Paragraph 
				title="VIII. USO DE COOKIES Y WEB BEACONS"
				texts={[
					"<br>El Responsable utiliza <i>“cookies”</i> y otras tecnologías a través de las cuales es posible monitorear su comportamiento como usuario de Internet, con la finalidad de brindarle un mejor servicio y experiencia de usuario al navegar en nuestro sitio web.",
					
					"<br>Los datos que obtenemos de esas tecnologías de rastreo son los siguientes: (i) Horario de navegación, (ii) Tiempo de navegación en nuestro sitio web, (iii) Secciones consultadas, y (iv) Páginas de Internet accedidas previo a la visita de la nuestra. "
				]}
			/>

			<Paragraph 
				title="IX. CAMBIOS AL AVISO DE PRIVACIDAD"
				texts={[
					"<br>Para el caso en que el Responsable deba realizar modificaciones o actualizaciones al presente aviso de privacidad para la atención de novedades legislativas, jurisprudenciales o políticas internas, lo notificará en el sitio web <a href='https://www.distritopyme.com'>https://www.distritopyme.com</a> mediante la implementación de un banner, por lo que se sugiere al Titular de los datos, ingresar de forma periódica a dicho sitio web."
				]}
			/>

			<Paragraph 
				title="X. CONSENTIMIENTO DEL TITULAR"
				texts={[
					"<br>Para los casos en que el Responsable deba recabar el consentimiento expreso o el consentimiento expreso y por escrito del Titular para el uso de sus datos personales, el Titular durante los procesos de contratación de los servicios que según corresponda, realizará el envío del aviso de privacidad que corresponda para cada caso, en el cual se estipularán de manera clara y precisa los datos para los cuales se requiere dicho consentimiento, así como las finalidades para las cuales serán utilizados; esto último, con la finalidad de que el Titular en todo momento se encuentre informado sobre el tratamiento que se le dará a sus datos personales por parte del Responsable. "
				]}
			/>

			<br></br>
			<Title title="“Ultima actualización 24 de marzo de 2021”" className="subtitle-dp fz20 text-center"/>
		</div>
	)
}

export default Privacy