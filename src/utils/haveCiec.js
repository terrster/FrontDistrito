const verify = (object, property) => {
	return object.hasOwnProperty(property);
}

const verifyAppliance = (array) => {
    if (typeof array !== "object") return false;
    return array.length === 0 ? false : array[array.length - 1];
  };

const haveCiec = () => {
    const user = JSON.parse(sessionStorage.getItem("user"))
    const idClient = user.idClient;
    const ciec = true;
    let appliance = verifyAppliance(idClient.appliance);
    let idFiscal= verify(appliance, "idFiscal");
    if (idFiscal) {
      let fiscal = idClient.appliance[0].idFiscal;
      if(!fiscal.ciecStatus) {
        let idComercialInfo = verify(appliance, "idComercialInfo");
        if (idComercialInfo) {
          let comercial = idClient.appliance[0].idComercialInfo;
          if(!comercial.ciecstatus) {
            return false
          }
        } else {
          return false
        }
      } else {
        return true
      }
    } else {
      return false
    }
    return ciec
}

export default haveCiec