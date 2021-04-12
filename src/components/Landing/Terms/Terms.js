import React from 'react';
import Title from '../../Generic/Title'
import Paragraph from './Paragraph';

const Terms = props => {
	return (
		<div className="container mb-120">
			<div className="text-center mt-120">
				<Title title="Términos y condiciones" className="title-dp fz48" />
			</div>
			<div className="text-dp fz20 text-justify">
				<br></br>Este contrato describe los términos y condiciones generales (en adelante únicamente "TÉRMINOS Y CONDICIONES") aplicables al uso de los contenidos, productos y servicios ofrecidos a través del sitio <strong>www.distritopyme.com</strong> (en adelante, "SITIO WEB"), del cual es titular <strong>Distrito Pyme S.A. de C.V.</strong> (en adelante, "DISTRITOPYME") quien tiene su domicilio establecido en Avenida de los Deportes 27, Colonia Las Arboledas, Municipio de Tlalnepantla de Baz, Estado de México, Código Postal 54020, México; y en el cual se estipula que cualquier persona que desee acceder o hacer uso del sitio o los servicios que en él se ofrecen, podrá hacerlo sujetándose a los presentes TÉRMINOS Y CONDICIONES, así como a políticas y principios incorporados al presente documento. En todo caso, cualquier persona que no acepte los presentes términos y condiciones, deberá abstenerse de utilizar el SITIO WEB y/o adquirir los productos y servicios ofrecidos.
			</div>
			<Paragraph 
				title="I. DEL OBJETO."
				texts={[
					"<br>El objeto de los presentes TÉRMINOS Y CONDICIONES es regular el acceso y la utilización del SITIO WEB, entendiendo por este cualquier tipo de contenido, producto o servicio que se encuentre a disposición del público en general dentro del dominio: <strong>www.distritopyme.com.</strong>",

					"<br>DISTRITOPYME se reserva la facultad de modificar en cualquier momento y sin previo aviso, la presentación, los contenidos, la funcionalidad, los productos, los servicios, y la configuración que pudiera estar contenida en el SITIO WEB; en este sentido, el USUARIO reconoce y acepta que <strong>Distrito Pyme S.A. de C.V.</strong> en cualquier momento podrá interrumpir, desactivar o cancelar cualquiera de los elementos que conforman el SITIO WEB o el acceso a los mismos.",
					
					"<br>Además del costo de la conexión a internet en virtud de los servicios que el USUARIO tenga contratados con algún proveedor de telecomunicaciones, parte de los contenidos o servicios ofrecidos en el sitio <strong>www.distritopyme.com</strong> o, en su caso, por terceros a través del SITIO WEB pueden estar sujetos a la contratación previa del contenido, producto o servicio, en cuyo caso se especificará de forma clara y se pondrá a disposición del USUARIO las condiciones generales o particulares por las que se rija el acceso a dichos contenidos.",
					
					"<br>El acceso a parte de los contenidos y servicios del SITIO WEB podrá realizarse previa suscripción o registro previo del USUARIO.",
					
					"<br>El SITIO WEB se encuentra dirigido exclusivamente a personas que cuenten con la mayoría de edad (mayores de 18 años); en este sentido, <strong>Distrito Pyme S.A. de C.V.</strong> declina cualquier responsabilidad por el incumplimiento de este requisito.",
					
					"<br>El SITIO WEB está dirigido principalmente a USUARIOS residentes en la República Mexicana, por lo cual, <strong>Distrito Pyme S.A. de C.V.</strong> no asegura que el SITIO WEB cumpla total o parcialmente con la legislación de otros países, de forma que, si el USUARIO reside o tiene su domicilio establecido en otro país y decide acceder o utilizar el SITIO WEB lo hará bajo su propia responsabilidad y deberá asegurarse de que tal acceso y navegación cumple con la legislación local que le es aplicable, no asumiendo <strong>Distrito Pyme S.A. de C.V.</strong> ninguna responsabilidad que se pueda derivar de dicho acto.",
					
					"<br>Se hace del conocimiento del USUARIO que DISTRITOPYME podrá administrar o gestionar el SITIO WEB de manera directa o a través de un tercero, lo cual no modifica en ningún sentido lo establecido en los presentes TÉRMINOS Y CONDICIONES."
				]}
			/>

			<Paragraph
				title="II. DEL USUARIO."
				texts={[
					"<br>El acceso o utilización del SITIO WEB, así como de los recursos habilitados para interactuar entre los USUARIOS, o entre el USUARIO y DISTRITOPYME tales como medios para realizar publicaciones o comentarios, confiere la condición de USUARIO del SITIO WEB, por lo que quedará sujeto a los presentes TÉRMINOS Y CONDICIONES, así como a sus ulteriores modificaciones, sin perjuicio de la aplicación de la legislación aplicable, por tanto, se tendrán por aceptados desde el momento en el que se accede al SITIO WEB. Dada la relevancia de lo anterior, se recomienda al USUARIO revisar las actualizaciones que se realicen a los presentes TÉRMINOS Y CONDICIONES.",

					"<br>Es responsabilidad del USUARIO utilizar el SITIO WEB de acuerdo a la forma en la que fue diseñado; en este sentido, queda prohibida la utilización de cualquier tipo de software que automatice la interacción o descarga de los contenidos o servicios proporcionados a través del SITIO WEB. Además, el USUARIO se compromete a utilizar la información, contenidos o servicios ofrecidos a través del SITIO WEB de manera lícita, sin contravenir lo dispuesto en los presentes TÉRMINOS Y CONDICIONES, la moral o el orden público, y se abstendrá de realizar cualquier acto que pueda suponer una afectación a los derechos de terceros, o perjudique de algún modo el funcionamiento del SITIO WEB.",

					"<br>Así mismo, <strong>el usuario se compromete a proporcionar información lícita y veraz en los formularios habilitados en el SITIO WEB</strong>, en los cuales el usuario tenga que proporcionar ciertos datos o información para el acceso a las ofertas de crédito y demás servicios ofrecidos por el propio SITIO WEB. En todo caso, el USUARIO notificará de forma inmediata a DISTRITOPYME acerca de cualquier hecho que permita suponer el uso indebido de la información registrada en dichos formularios, tales como, robo, extravío, o acceso no autorizado a cuentas y/o contraseñas, con el fin de proceder a su inmediata cancelación.",

					"<br>El Usuario manifiesta bajo protesta de decir verdad que la información asentada en la presente página es verdadera, por lo que en caso contrario la misma será rechazada, obligándose a sacar en paz de cualquier controversia a DISTRITOPYME.",

					"<br>DISTRITOPYME se reserva el derecho de retirar todos aquellos comentarios y aportaciones que vulneren la ley, el respeto a la dignidad de la persona, que sean discriminatorios, atenten contra los derechos de terceros o el orden público, o bien, que a su juicio no resulten adecuados para su publicación.",

					"<br> En cualquier caso, DISTRITOPYME no será responsable de las opiniones vertidas por los USUARIOS a través de comentarios o publicaciones que estos realicen.",
					
					"<br>El sólo acceso al SITIO WEB no supone el establecimiento de ningún tipo de relación entre DISTRITOPYME y el USUARIO.",

					"<br>Al tratarse de un SITIO WEB dirigido exclusivamente a personas que cuenten con la mayoría de edad, el USUARIO manifiesta ser mayor de edad y disponer de la capacidad jurídica necesaria para sujetarse a los presentes TÉRMINOS Y CONDICIONES."
				]}
			/>

			<Paragraph
				title="III. DEL ACCESO Y NAVEGACIÓN EN EL SITIO WEB."
				texts={[
					"<br>DISTRITOPYME no garantiza de ningún modo la continuidad y disponibilidad de los contenidos, productos o servicios ofrecidos a través del SITIO WEB, no obstante, DISTRITOPYME llevará a cabo las acciones que de acuerdo a sus posibilidades le permitan mantener el buen funcionamiento del SITO WEB, sin que esto suponga alguna responsabilidad de parte de DISTRITOPYME.",

					"<br>De igual forma DISTRITOPYME no será responsable ni garantiza que el contenido o software al que pueda accederse a través del SITIO WEB, se encuentre libre de errores, software malicioso, o que pueda causar algún daño a nivel de software o hardware en el equipo a través del cual el USUARIO accede al SITIO WEB.",

					"<br>DISTRITOPYME tampoco se hace responsable de los daños que pudiesen ocasionarse por un uso inadecuado del SITIO WEB. En ningún caso DISTRITOPYME será responsable por las pérdidas, daños o perjuicios de cualquier tipo que surjan por el sólo acceso o utilización del SITIO WEB."

				]}
			/>

			<Paragraph
				title="IV. POLÍTICA DE PRIVACIDAD Y PROTECCIÓN DE DATOS."
				texts={[
					"<br>De conformidad con lo establecido en la Ley Federal de Protección de Datos Personales en Posesión de Particulares, DISTRITOPYME se compromete a adoptar las medidas necesarias que estén a su alcance para asegurar la privacidad de los datos personales recabados de forma que se garantice su seguridad, se evite su alteración, pérdida o tratamiento no autorizado.",
					
					"<br>Además, a efecto de dar cumplimiento a lo establecido en la Ley Federal de Protección de Datos Personales en Posesión de Particulares, todo dato personal que sea recabado a través del SITIO WEB, será tratado de conformidad con los principios de licitud, calidad, finalidad, lealtad, y responsabilidad. Todo tratamiento de datos personales quedará sujeto al consentimiento de su titular. DISTRITOPYME podrá compartir la información y documentación del USUARIO con terceros Otorgantes de Crédito como son Impulso Distrito, S.A.P.I. de C.V. (ImpulsoMx), Unifin Financiera, S.A.B. de C.V. (Uniclick), Pretmex, S.A. de C.V. (Pretmex), Advantech Servicios Financieros, S.A.P.I. de C.V., SOFOM E.N.R. (Aspiria), Bien para Bien, S.A.P.I. de C.V., SOFOM E.N.R. (Bien para Bien), Cumplomex, S.A. de C.V. (Cumplo), Apjusto, S.A.P.I. de C.V., SOFOM, E.N.R., Justo Lease, S.A.P.I. de C.V. (Credijusto), Mundi Trade, INC (Mundi), Factor Expres, S.A.P.I. de C.V. SOFOM E.N.R. (Factor Expres), AV Socios de Capital S.A.P.I. de C.V. (AV Capital), Haycash, S.A.P.I. de C.V. (HayCash), Dimex S.A. de C.V. (Dimex), UKU S.A.P.I. de C.V. (PagaLoop), First Home Solutions, S.A.P.I. de C.V. (iBan), ION FInanciera, S.A.P.I. de C.V., SOFOM, E.R., SGS Soluciones a tu Medida, S.A.P.I. de C.V. SOFOM, E.N.R. (Amifin), Happy Days Tech, S.A.P.I. de C.V. (Delt.ai), Prestadora de Servicios Ciclomart, S.A.P.I de C.V (Creze), Financiera Cualli, S.A.P.I. de C.V., SOFOM, E.N.R (Cualli), Banca Afirme, S.A. (Afirme) y ku-bo financiero, S.A. de C.V. S.F.P. (Kubo) con la finalidad de dar cumplimiento a su principal servicio, que es ofrecer al USUARIO la mayor cantidad y las mejores propuestas de financiamiento posibles que se adecuen a sus necesidades, en todo caso se dará la mayor diligencia y cuidado a este tipo de datos. Adicional a lo anterior, DISTRITO PYME compartirá sus datos previa autorización del Titular con sus Aliados Comerciales, los cuales podrán ofrecerle servicios financieros como: apertura de cuentas de cheques, debito, ahorro y monederos, sistemas de administración, terminales punto de venta para cobros con tarjeta, entre algunos otros que se encuentren disponibles en los portafolios de servicios de los mismos y que sean requeridos por el USUARIO; así mismo se podrán ofrecer servicios no financieros, tales como herramientas y servicios empresariales relativos a la administración de negocios.",

					"<br>En todo momento se procurará que los datos personales contenidos en las bases de datos o archivos que en su caso se utilicen, sean pertinentes, correctos y actualizados para los fines para los cuales fueron recabados.",

					"<br>El tratamiento de datos personales se limitará al cumplimiento de las finalidades previstas en el Aviso de Privacidad el cual se encontrará disponible en la siguiente dirección electrónica <a href='https://www.distritopyme.com/privacidad'>https://www.distritopyme.com/privacidad</a>",

					"<br>El SITIO WEB podrá incluir hipervínculos o enlaces que permitan acceder a páginas web de terceros distintos de DISTRITOPYME. Los titulares de dichos sitios web dispondrán de sus propias políticas de privacidad y protección de datos, por lo cual DISTRITOPYME no asume ningún tipo de responsabilidad por los datos que son facilitados por el USUARIO a través de cualquier sitio web distinto a <a href='https://www.distritopyme.com'>https://www.distritopyme.com</a>",

					"<br>Por otra parte, el acceso al SITIO WEB puede implicar la utilización de cookies, las cuales, son pequeñas cantidades de información que se almacenan en el navegador utilizado por el USUARIO. Las cookies facilitan la navegación, la hacen más amigable, y no dañan el dispositivo de navegación, para ello, pueden recabar información para ingresar al SITIO WEB, almacenar las preferencias del USUARIO, así como la interacción que este tenga con el SITIO WEB, como por ejemplo: la fecha y hora en la que se accede al SITIO WEB, el tiempo que se ha hecho uso de este, los sitios visitados antes y después del mismo, el número de páginas visitadas, la dirección IP de la cual accede el usuario, la frecuencia de visitas, etc.",

					"<br>Este tipo de información será utilizada para mejorar el SITIO WEB, detectar errores, y posibles necesidades que el USUARIO pueda tener, lo anterior a efecto de ofrecer a los USUARIOS servicios y contenidos de mejor calidad. En todo caso, la información que se recopile será anónima y no se identificará a usuarios individuales.",

					"<br>En caso de que el USUARIO no desee que se recopile este tipo de información deberá deshabilitar, rechazar, restringir y/o eliminar el uso de cookies en su navegador de internet. Los procedimientos para realizar estas acciones pueden diferir de un navegador a otro; en consecuencia, se sugiere revisar las instrucciones facilitadas por el desarrollador del navegador. En el supuesto de que rechace el uso de cookies (total o parcialmente) el USUARIO podrá continuar haciendo uso del SITIO WEB, aunque podrían quedar deshabilitadas algunas de las funciones del mismo.",

					"<br>Es posible que en el futuro estas políticas respecto a las cookies cambien o se actualicen, por ello es recomendable revisar las actualizaciones que se realicen a los presentes TÉRMINOS Y CONDICIONES, con objetivo de estar adecuadamente informado sobre cómo y para qué utilizamos las cookies que se generan al ingresar o hacer uso del SITIO WEB.",
				]}
			/>

			<Paragraph
				title="V. POLÍTICA DE ENLACES."
				texts={[
					"<br>El SITIO WEB puede contener enlaces, contenidos, servicios o funciones, de otros sitios de internet pertenecientes y/o gestionados por terceros, como por ejemplo imágenes, videos, comentarios, motores de búsqueda, etc.",

					"<br>La utilización de estos enlaces, contenidos, servicios o funciones, tiene por objeto mejorar la experiencia del USUARIO al hacer uso del SITIO WEB, sin que pueda considerarse una sugerencia, recomendación o invitación para hacer uso de sitios externos. DISTRITOPYME en ningún caso revisará o controlará el contenido de los sitios externos, de igual forma, no hace propios los productos, servicios, contenidos, y cualquier otro material existente en los referidos sitios enlazados; por lo cual, tampoco se garantizará la disponibilidad, exactitud, veracidad, validez o legalidad de los sitios externos a los que se pueda tener acceso a través del SITIO WEB. Así mismo, DISTRITOPYME no asume ninguna responsabilidad por los daños y perjuicios que pudieran producirse por el acceso o uso, de los contenidos, productos o servicios disponibles en los sitios web no gestionados por DISTRITOPYME a los que se pueda acceder mediante el SITIO WEB.",

					"<br>Los USUARIOS o terceros que realicen o publiquen un enlace web desde una página web externa, a este SITIO WEB deberán tomar en cuenta lo siguiente:",

					"<br>No se permite la reproducción (total o parcial) de los contenidos, productos o servicios disponibles en el SITIO WEB sin la autorización expresa de DISTRITOPYME o su titular. Tampoco se permitirán manifestaciones falsas, inexactas o incorrectas sobre el SITIO WEB, ni sobre sus contenidos, productos o servicios, pudiendo DISTRITOPYME restringir el acceso al SITIO WEB a toda aquella persona que incurra en este tipo de actos.",

					"<br>El establecimiento de un enlace al SITIO WEB desde cualquier sitio externo, no implicará la existencia de alguna relación entre DISTRITOPYME y el titular del sitio web desde el cual se realice, tampoco implicará el conocimiento de DISTRITOPYME de los contenidos, productos o servicios ofrecidos en los sitios externos desde los cuales se pueda acceder al SITIO WEB.",
				]}
			/>


			<Paragraph 
				title="VI. DE LA PROPIEDAD INTELECTUAL E INDUSTRIAL"
				texts={[
					"<br>DISTRITOPYME por sí o como parte cesionaria, es titular de todos los derechos de propiedad intelectual e industrial del SITIO WEB, entendiendo por este el código fuente que hace posible su funcionamiento así como las imágenes, archivos de audio o video, logotipos, marcas, combinaciones de colores, estructuras, diseños y demás elementos que lo distinguen. Serán, por consiguiente, protegidas por la legislación mexicana en materia de propiedad intelectual e industrial, así como por los tratados internacionales aplicables. Por consiguiente, queda expresamente prohibida la reproducción, distribución, o difusión de los contenidos del SITIO WEB, con fines comerciales, en cualquier soporte y por cualquier medio, sin la autorización de DISTRITOPYME.",

					"<br>El USUARIO se compromete a respetar los derechos de propiedad intelectual e industrial de DISTRITOPYME. No obstante, además de poder visualizar los elementos del SITIO WEB podrá imprimirlos, copiarlos o almacenarlos, siempre y cuando sea exclusivamente para su uso estrictamente personal.",

					"<br>Por otro lado, el USUARIO, se abstendrá de suprimir, alterar, o manipular cualquier elemento, archivo, o contenido, del SITIO WEB, y por ningún motivo realizará actos tendientes a vulnerar la seguridad, los archivos o bases de datos que se encuentren protegidos, ya sea a través de un acceso restringido mediante un usuario y contraseña, o porque no cuente con los permisos para visualizarlos, editarlos o manipularlos.",

					"<br>En caso de que el USUARIO o algún tercero consideren que cualquiera de los contenidos del SITIO WEB suponga una violación de los derechos de protección de la propiedad industrial o intelectual, deberá comunicarlo inmediatamente a DISTRITO PYME a través de los datos de contacto disponibles en el propio SITIO WEB y/o a través de los siguientes medios:",

					"<br><p>Teléfono: <a href='tel:(55) 8661 9486'>(55) 8661 9486 </a> <br> Correo electrónico: <a href='mailto:contacto@distritopyme.com'>contacto@distritopyme.com</a></p>"
				]}
				/>

			<Paragraph
				title="VII. CLAVES DE ACCESO" 
				texts={[
					"<br>En todo momento, el Usuario es el responsable único y final de mantener en secreto sus claves de acceso con las cuales tenga acceso a los servicios y contenidos del SITIO WEB; así como a las páginas de terceros, liberando de cualquier responsabilidad por este concepto a DISTRITOPYME."
				]}	
				/>

			<Paragraph
				title="VIII. USO DE FIRMA ELECTRÓNICA AVANZADA COMO MEDIO DE AUTENTICACIÓN " 
				texts={[
					"<br>DISTRITO PYME ofrece sus productos o servicios a quienes manifiesten su aceptación para utilizar como medio de autenticación, para efectos de su relación comercial, la firma electrónica avanzada amparada en un certificado digital válido y vigente emitido a su nombre por un Prestador de Servicios de Certiﬁcación acreditado conforme a la Legislación Mexicana."
				]}	
				/>

			<Paragraph 
				title="IV. ADVERTENCIA"
				texts={[
					"<br>El Usuario es consciente de que Incumplir sus obligaciones puede generar comisiones e intereses moratorios, así como que contratar créditos por arriba de su capacidad de pago puede afectar su historial crediticio."
				]}
			/>

			<Paragraph
				title="X. DE LA INFORMACIÓN CREDITICIA"
				texts={[
					"<br>DISTRITO PYME, con la finalidad de llevar a cabo de la mejor manera la prestación de sus servicios, requiere conocer el comportamiento de crediticio del USUARIO, y en ese sentido podrá previa autorización del USUARIO solicitar y generar reportes de su historial crediticio a las sociedades de información crediticia."
				]}
			/>

			<Paragraph
				title="XI. CALIDAD"
				texts={[
					"<br>Ni DISTRITO PYME, ni sus proveedores o socios comerciales serán responsables de cualquier daño o perjuicio que sufra el Usuario a consecuencia de inexactitudes, consultas realizadas, asesorías, errores tipográficos y cambios o mejoras que se realicen periódicamente a los Servicios y Contenidos.",
					"<br>Las recomendaciones y consejos obtenidos a través del Portal son de naturaleza general, por lo que no deben tomarse en cuenta en la adopción de decisiones personales ni profesionales. Para ello se debe consultar a un profesional apropiado que pueda asesorar al Usuario de acuerdo con sus necesidades específicas."
				]}
			/>

			<Paragraph
				title="XII. USO DE LOS RECURSOS PRESTADOS"
				texts={[
					"<br>El Usuario se compromete a utilizar los recursos de manera permitida por la ley, y a que los recursos obtenidos y/o generados para pagar el crédito serán de una fuente permitida por la ley."
				]}
			/>

			<Paragraph
				title="XIII. LEGISLACIÓN Y JURISDICCIÓN APLICABLE. "
				texts={[
					"<br>DISTRITO PYME se reserva la facultad de presentar las acciones civiles o penales que considere necesarias por la utilización indebida del SITIO WEB, sus contenidos, productos o servicios, o por el incumplimiento de los presentes TÉRMINOS Y CONDICIONES. La relación entre el USUARIO y Distrito Pyme S.A. de C.V. se regirá por la legislación vigente en México, específicamente en la Ciudad de México. De surgir cualquier controversia en relación a la interpretación y/o a la aplicación de los presentes TÉRMINOS Y CONDICIONES, las partes se someterán a la jurisdicción ordinaria de los tribunales que correspondan conforme a derecho en el estado al que se hace referencia."
				]}
			/>
		</div>
	)
}

export default Terms