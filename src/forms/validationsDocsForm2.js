export default function validationsDocsForm2(values){
    let errors = {};

    if(values.oficialID.length > 4){
        errors.oficialID = "Solo se permiten cuatro documentos para Identificación oficial.";
    }

    if(values.proofAddress.length > 3){
        errors.proofAddress = "Solo se permiten tres documentos para Comprobante de domicilio.";
    }

    if(values.bankStatements.length > 12){
        errors.bankStatements = "Solo se permiten doce documentos para Estados de cuenta.";
    }

    if(values.rfc.length > 1){
        errors.rfc = "Solo se permite un documento para RFC.";
    }

    if(values.lastDeclarations.length > 4){
        errors.lastDeclarations = "Solo se permiten cuatro documentos para Declaraciones anuales de los dos últimos años.";
    }

    if(values.acomplishOpinion.length > 1){
        errors.acomplishOpinion = "Solo se permite un documento para Opinión de cumplimiento.";
    }

    if(values.constitutiveAct.length > 1){
        errors.constitutiveAct = "Solo se permite un documento para Acta constitutiva, asamblea y poderes.";
    }

    if(values.financialStatements.length > 6){
        errors.financialStatements = "Solo se permiten seis documentos para Estados financieros.";
    }

    if(values.others.length > 4){
        errors.others = "Solo se permiten cuatro documentos para Fotos de tu empresa o negocio u otros.";
    }

    if(values.collectionReportSaleTerminals.length > 1){
        errors.collectionReportSaleTerminals = "Solo se permite un documento para Reporte de cobranza de las terminales punto de venta (12 meses).";
    }

    if(!values.localContractLease){
        errors.localContractLease = "Solo se permite un documento para Contrato de arrendamiento vigente de tu local.";
    }

    return errors;
}