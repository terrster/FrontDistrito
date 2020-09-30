export const missingDocs = (user, docs) => {
    let missing_docs = [];

    if(docs != null){
        if(user.idClient.type == 'PF'){
            if(docs.oficialID.length == 0){
                missing_docs.push('Identificación oficial');
            }
            if(docs.proofAddress.length == 0){
                missing_docs.push('Comprobante de domicilio particular y del negocio');
            }
            if(docs.bankStatements.length == 0){
                missing_docs.push('Estados de cuenta bancarios');
            }
            if(docs.others.length == 0){
                missing_docs.push('Otros');
            }
        }

        if(user.idClient.type == 'PFAE'){
            if(user.idClient.appliance[0].idComercialInfo.ciec != null){
                if(docs.oficialID.length == 0){
                    missing_docs.push('Identificación oficial');
                }
                if(docs.proofAddress.length == 0){
                    missing_docs.push('Comprobante de domicilio particular y del negocio');
                }
                if(docs.bankStatements.length == 0){
                    missing_docs.push('Estados de cuenta bancarios');
                }
                if(docs.others.length == 0){
                    missing_docs.push('Otros');
                }
            }
            else{
                if(docs.oficialID.length == 0){
                    missing_docs.push('Identificación oficial');
                }
                if(docs.rfc.length == 0){
                    missing_docs.push('RFC');
                }
                if(docs.proofAddress.length == 0){
                    missing_docs.push('Comprobante de domicilio particular y del negocio');
                }
                if(docs.bankStatements.length == 0){
                    missing_docs.push('Estados de cuenta bancarios');
                }
                if(docs.lastDeclarations.length == 0){
                    missing_docs.push('Última declaración de impuestos presentada');
                }
                if(docs.acomplishOpinion.length == 0){
                    missing_docs.push('Opinión de cumplimiento');
                }
                if(docs.others.length == 0){
                    missing_docs.push('Otros');
                }
            }
        }

        if(user.idClient.type == 'RIF'){
            if(user.idClient.appliance[0].idComercialInfo.ciec != null){
                if(docs.oficialID.length == 0){
                    missing_docs.push('Identificación oficial');
                }
                if(docs.proofAddress.length == 0){
                    missing_docs.push('Comprobante de domicilio particular y del negocio');
                }
                if(docs.bankStatements.length == 0){
                    missing_docs.push('Estados de cuenta bancarios');
                }
                if(docs.others.length == 0){
                    missing_docs.push('Otros');
                }
            }
            else{
                if(docs.oficialID.length == 0){
                    missing_docs.push('Identificación oficial');
                }
                if(docs.rfc.length == 0){
                    missing_docs.push('RFC');
                }
                if(docs.proofAddress.length == 0){
                    missing_docs.push('Comprobante de domicilio particular y del negocio');
                }
                if(docs.bankStatements.length == 0){
                    missing_docs.push('Estados de cuenta bancarios');
                }
                if(docs.lastDeclarations.length == 0){
                    missing_docs.push('Última declaración de impuestos presentada');
                }
                if(docs.acomplishOpinion.length == 0){
                    missing_docs.push('Opinión de cumplimiento');
                }
                if(docs.others.length == 0){
                    missing_docs.push('Otros');
                }
            }
        }

        if(user.idClient.type == 'PM'){
            if(user.idClient.appliance[0].idComercialInfo.ciec != null){
                if(docs.constitutiveAct.length == 0){
                    missing_docs.push('Acta constitutiva, asamblea y poderes');
                }
                if(docs.financialStatements.length == 0){
                    missing_docs.push('Estados financieros');
                }
                if(docs.bankStatements.length == 0){
                    missing_docs.push('Estados de cuenta bancarios');
                }
                if(docs.oficialID.length == 0){
                    missing_docs.push('Identificación de representante legal y principales accionistas');
                }
                if(docs.proofAddressMainFounders.length == 0){
                    missing_docs.push('Comprobante de domicilio del negocio y particular del representante legal y principales accionistas');
                }
                if(docs.others.length == 0){
                    missing_docs.push('Fotos de tu empresa o negocio u otros');
                }
            }
            else{
                if(docs.constitutiveAct.length == 0){
                    missing_docs.push('Acta constitutiva, asamblea y poderes');
                }
                if(docs.rfc.length == 0){
                    missing_docs.push('RFC');
                }
                if(docs.financialStatements.length == 0){
                    missing_docs.push('Estados financieros');
                }
                if(docs.bankStatements.length == 0){
                    missing_docs.push('Estados de cuenta bancarios');
                }
                if(docs.lastDeclarations.length == 0){
                    missing_docs.push('Declaraciones anuales de los dos últimos años');
                }
                if(docs.oficialID.length == 0){
                    missing_docs.push('Identificación de representante legal y principales accionistas');
                }
                if(docs.proofAddressMainFounders.length == 0){
                    missing_docs.push('Comprobante de domicilio del negocio y particular del representante legal y principales accionistas');
                }
                if(docs.others.length == 0){
                    missing_docs.push('Fotos de tu empresa o negocio u otros');
                }
            }
        }
    }

    return missing_docs;
}