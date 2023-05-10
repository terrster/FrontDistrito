const altisonantes = [
    'BACA', 'BAKA', 'BUEI', 'BUEY', 'CACA', 'CACO', 'CAGA', 'CAGO', 'CAKA',
    'CAKO', 'COGE', 'COGI', 'COJA', 'COJE', 'COJI', 'COJO', 'COLA', 'CULO',
    'FALO', 'FETO', 'GETA', 'GUEI', 'GUEY', 'JETA', 'JOTO', 'KACA', 'KACO',
    'KAGA', 'KAGO', 'KAKA', 'KAKO', 'KOGE', 'KOGI', 'KOJA', 'KOJE', 'KOJI',
    'KOJO', 'KOLA', 'KULO', 'LILO', 'LOCA', 'LOCO', 'LOKA', 'LOKO', 'MAME',
    'MAMO', 'MEAR', 'MEAS', 'MEON', 'MIAR', 'MION', 'MOCO', 'MOKO', 'MULA',
    'MULO', 'NACA', 'NACO', 'PEDA', 'PEDO', 'PENE', 'PIPI', 'PITO', 'POPO',
    'PUTA', 'PUTO', 'QULO', 'RATA', 'ROBA', 'ROBE', 'ROBO', 'RUIN', 'SENO',
    'TETA', 'VACA', 'VAGA', 'VAGO', 'VAKA', 'VUEI', 'VUEY', 'WUEI', 'WUEY'
  ]
  
  const quitarAltisonante = (palabra) => {
    if (altisonantes.includes(palabra)) {
      return palabra.replace(/^(\w)\w/, '$1X')
    }
    return palabra
  }
  
  const msgLongitudError = (rfcPart = '') => {
    const msgs = [
      '× Inicial del 1er apellido',
      '•× 1er vocal interna del 1er apellido',
      '••× Inicial del 2do apellido',
      '•••× 1er vocal interna del 2do apellido',
      '••••×× Año de nacimiento (2 digitos)',
      '••••×× Año de nacimiento (2 digitos)',
      '••••••××  Mes de nacimiento (2 digitos)',
      '••••••×× Mes de nacimiento (2 digitos)',
      '••••••••×× Día del mes de nacimiento (2 digitos)',
      '••••••••×× Día del mes de nacimiento (2 digitos)',
      '••••••••••××× homoclave (3 caracteres)'
    ]
    if (rfcPart.length < msgs.length) {
      return msgs[rfcPart.length]
    }
    return 'Error de formato'
  }

  const regex = /^([a-z]{3,4})(\d{2})(\d{2})(\d{2})([0-9a-z]{3})$/i
  
  /*
   * Se encarga de validar y extraer meta información del RFC:
   *
   * @link: https://www.elcontribuyente.mx/rfc/
   */
  const metaRFC = (rfcInputTxt) => {
    const rfcInputText = String(rfcInputTxt).toUpperCase()
    
    const metaInfo = {
      rfc_input: rfcInputText,
      nombre_parte: null,
      fecha_nacimiento_anio: null,
      fecha_nacimiento_mes: null,
      fecha_nacimiento_dia: null,
      homoclave: null
    }
    const metaKeys = Object.keys(metaInfo)
    metaInfo.tipo_persona = null // moral | físico
    // obtiene los datos
    const values = rfcInputText.match(regex)
    metaInfo.valido = (values !== null)
    if(rfcInputText.length === 10){
      metaInfo.valido = true
      return metaInfo
    }
    if (metaInfo.valido) {
      for (const i in metaKeys) {
        metaInfo[metaKeys[i]] = values[i]
      }
      const nombre = metaInfo.nombre_parte
      metaInfo.nombre_parte = quitarAltisonante(nombre)
      metaInfo.valido = (nombre === metaInfo.nombre_parte)
      metaInfo.tipo_persona = (rfcInputText.length === 13) ? 'física' : 'moral'
      metaInfo.longitud = rfcInputText.length
    }
    if (metaInfo.valido) {
      metaInfo.msg = '✅ RFC valido'
    }
    metaInfo.msg = msgLongitudError(rfcInputText)
    return metaInfo
  }

  const RFCValido = (rfcInputTxt) => {
    const meta = metaRFC(rfcInputTxt)
    return meta.valido
  }
  
  export { RFCValido, metaRFC }