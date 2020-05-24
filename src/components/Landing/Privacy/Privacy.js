import React from 'react';
import Title from '../../Generic/Title'
import Paragraph from '../Terms/Paragraph';

const Privacy = props => {
	return (
		<div className="container mb-120">
			<div className="text-center mt-120">
				<Title title="Aviso de privacidad" className="coolvetica fz48 blackBlue" />
			</div>
			
			<Paragraph 
				texts={[
					'<p>De acuerdo a lo previsto en la “Ley Federal de Protección de Datos Personales”, declara DISTRITO PYME, S.A. DE C.V. (en lo sucesivo DISTRITOPYME), ser una sociedad constituida conforme a la leyes mexicanas, y señala como su domicilio el ubicado en Estado de México; y como responsable del tratamiento de datos personales, en el presente aviso de privacidad, se describen las formas en que se recaban y usan los datos personales que se nos brindan; así como, los tipos de opciones con las cuales se cuentan para limitar el uso de dichos datos.</p>',

					'<p>Por ello, protegemos su información mediante la continua revisión de nuestros procesos de protección tanto física como electrónica, por este motivo compartimos con usted nuestra política de privacidad y del como salvaguardamos la integridad, privacidad y protección de sus datos personales, en apego a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares y su Reglamento la “Ley”.</p>',

					'<p>DISTRITOPYME cuenta con políticas administrativas, técnicas y físicas que han sido desarrolladas con la finalidad de evitar pérdidas, usos incorrectos o accesos no autorizados a datos personales; dichas políticas son llevadas a cabo de forma permanente por DISTRITOPYME procurando la protección, privacidad y confidencialidad de la información; evitando así daños, perdidas, alteración o cualquier tipo de trato no autorizado.</p>',

					'<p>Sus datos personales serán utilizados para las siguientes finalidades:</p>',
					'<li>Proveer los servicios y productos requeridos.</li>',
					'<li>Compartir con las entidades otorgantes de crédito.</li>',
					'<li>Dar seguimiento a obligaciones contraídas con nuestros clientes.</li>',
					'<li>Informar sobre cambios en nuestros productos y servicios.</li>',
					'<li>Informar sobre nuevos productos o servicios que estén relacionados con los contratados por el cliente.</li>',
					'<li>Evaluar la calidad en el servicio.</li>',
					'<li>Procesos de contratación laboral.</li>',
					'<li>Elaborar informes relativos a la prestación del servicio.</li>',

					'<br><p>De manera adicional, utilizaremos su información personal para las siguientes finalidades secundarias que no son necesarias para el servicio solicitado, pero que nos permiten y facilitan brindarle una mejor atención: Mercadotecnia, publicidad, prospección comercial, así como elaboración de perfil de clientes para el desarrollo y ofrecimiento de nuevos productos, realización de encuestas, creación o implementación de procesos analíticos y estadísticos, relacionados con las operaciones y servicios de procesos analíticos y estadísticos, relacionados con las operaciones y servicios señalados así como para la participación en actividades no lucrativas, relacionados con los fines señalados.</p>',

					'<p>Para las finalidades señaladas en el presente aviso de privacidad, podemos recabar sus datos personales de distintas formas; cuando usted nos los proporciona directamente, cuando visita nuestro sitio web, cuando utiliza nuestros servicios en línea, vía telefónica y a través de otras fuentes permitidas por la ley. Dichos datos personales pueden haber sido o pueden ser obtenidos de usted personalmente o bien, por cualquier medio electrónico, óptico, sonoro, visual, o a través de otra tecnología. Asimismo, podemos obtener datos personales de los que usted es titular, a través de terceros y de otras fuentes permitidas por la Ley, tales como las sociedades de información crediticia.</p>',

					'<p>Sus datos personales pueden ser transferidos y tratados dentro y fuera del país por personas distintas a DISTRITOPYME. En este sentido, su información puede ser compartida con clientes y socios comerciales, como son Impulso Distrito, S.A.P.I. de C.V. (ImpulsoMx), Unifin Financiera, S.A.B. de C.V. (Uniclick), Pretmex, S.A. de C.V. (Pretmex), Advantech Servicios Financieros, S.A.P.I. de C.V., SOFOM E.N.R. (Aspiria), Bien para Bien, S.A.P.I. de C.V., SOFOM E.N.R. (Bien para Bien), Cumplomex S.A. de C.V. (Cumplo), APJUSTO, S.A.P.I. DE C.V., SOFOM, ENR, Y JUSTO LEASE, S.A.P.I. DE C.V (CREDIJUSTO) y Mundi Trade, INC (Mundi) para la realización de proyectos.</p>',
					'<p>Si usted no manifiesta su oposición para que sus datos personales sean transferidos, se entenderá que ha otorgado un consentimiento para ello.</p>',

					'<p>Derechos ARCO del titular de datos personales.</p>',

					'<p>El Responsable designa a la Dirección Jurídica de DISTRITOPYME para dar atención y trámite a las solicitudes de los titulares para el ejercicio de los derechos ARCO a que se refiere la Ley (Acceso, Rectificación, Cancelación y Oposición).</p>',

					'<p>Medios para ejercer los derechos ARCO.</p>',

					'<p>El titular o su representante legal debidamente acreditado en términos de la legislación común aplicable, podrán ejercer sus derechos ARCO: Conocer información específica que el Responsable tiene en su posesión (Acceso); solicitar la rectificación de datos personales en caso de que estén desactualizados, sean inexactos o incompletos, para ejercer este derecho se deberá entregar la documentación que acredite la rectificación solicitada de acuerdo a los datos personales (Rectificación); bloqueo y posterior eliminación de datos personales de nuestra base de datos cuando considere que la misma no está siendo utilizada adecuadamente (Cancelación); así como oponerse al uso de sus datos personales para fines específicos (Oposición).</p>',

					'<p>En cualquier momento usted tendrá el derecho de acceder a los datos personales que se encuentren en poder de DISTRITOPYME con la finalidad de actualizar, revocar, cancelar u oponerse al uso de sus datos personales; para hacer uso de cualquiera de sus derechos, usted podrá solicitarlo mediante escrito dirigido a la dirección de Atención a Clientes de DISTRITOPYME a través del correo electrónico <a href="mailto:avisodeprivacidad@distritopyme.com">avisodeprivacidad@distritopyme.com.</a>, su solicitud deberá ir acompañada de la siguiente información:</p>',

					'<li>Nombre del titular, correo de registro, así como un domicilio y otro medio para comunicarle la respuesta de la solicitud.</li>', 
					'<li>Los documentos oficiales que acrediten la personalidad del titular de los datos.</li>',
					'<li>Una descripción clara respecto de las modificaciones que desea realizar sobre sus datos personales.</li>',
					'<li>Cualesquier elemento o documento que facilite la localización de los datos personales de que se traten.</li><br>',

					'<p>DISTRITOPYME cuenta con un plazo no mayor a 15 días naturales para atender a la petición y enviarle un informe sobre la misma a través del correo electrónico u otro medio disponible de contacto.</p>',

					'<p>En caso de inconformidad podrán acudir al Instituto Nacional de Acceso a la Información y Datos Personales (INAI).</p>', 

					'<p>El presente aviso de privacidad puede sufrir modificaciones, cambios o actualizaciones derivadas de novedades legislativas, jurisprudenciales, políticas internas, nuevos requerimientos para la prestación u ofrecimiento de nuestros servicios o productos y prácticas en el mercado. Cualquier modificación al presente aviso de privacidad le será notificada a través de nuestra página de internet, o cualquier otro medio que se considere conveniente.</p>',

					'<p>"LA ÚLTIMA ACTUALIZACIÓN DEL PRESENTE AVISO DE PRIVACIDAD SE REALIZÓ EL DÍA 24 DE FEBRERO DE 2020"</p>',
					]}
			/>			
		</div>
	)
}

export default Privacy