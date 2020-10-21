export const missingDocs = (user, docs) => {
    let missing_docs = [];

    // if(docs != null){
        if(user.idClient.type == 'PF'){
            if(docs == null){
                missing_docs.push('Identificación oficial');
                missing_docs.push('Comprobante de domicilio particular y del negocio');
                missing_docs.push('Estados de cuenta bancarios');
                missing_docs.push('Otros');
            }
            else{
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
        }

        if(user.idClient.type == 'PFAE'){
            if(docs == null){
                if(user.idClient.appliance[0].idComercialInfo.ciec != null){
                    missing_docs.push('Identificación oficial');
                    missing_docs.push('Comprobante de domicilio particular y del negocio');
                    missing_docs.push('Estados de cuenta bancarios');
                    missing_docs.push('Otros');
                }
                else{
                    missing_docs.push('Identificación oficial');
                    missing_docs.push('RFC');
                    missing_docs.push('Comprobante de domicilio particular y del negocio');
                    missing_docs.push('Estados de cuenta bancarios');
                    missing_docs.push('Última declaración de impuestos presentada');
                    missing_docs.push('Opinión de cumplimiento');
                    missing_docs.push('Otros');
                }
            }
            else{
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
        }

        if(user.idClient.type == 'RIF'){
            if(docs == null){
                if(user.idClient.appliance[0].idComercialInfo.ciec != null){
                    missing_docs.push('Identificación oficial');
                    missing_docs.push('Comprobante de domicilio particular y del negocio');
                    missing_docs.push('Estados de cuenta bancarios');
                    missing_docs.push('Otros');
                }
                else{
                    missing_docs.push('Identificación oficial');
                    missing_docs.push('RFC');
                    missing_docs.push('Comprobante de domicilio particular y del negocio');
                    missing_docs.push('Estados de cuenta bancarios');
                    missing_docs.push('Última declaración de impuestos presentada');
                    missing_docs.push('Opinión de cumplimiento');
                    missing_docs.push('Otros');
                }
            }
            else{
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
        }

        if(user.idClient.type == 'PM'){
            if(docs == null){
                if(user.idClient.appliance[0].idComercialInfo.ciec != null){
                    missing_docs.push('Acta constitutiva, asamblea y poderes');
                    missing_docs.push('Estados financieros');
                    missing_docs.push('Estados de cuenta bancarios');
                    missing_docs.push('Identificación de representante legal y principales accionistas');
                    missing_docs.push('Comprobante de domicilio del negocio y particular del representante legal y principales accionistas');
                    missing_docs.push('Fotos de tu empresa o negocio u otros');
                }
                else{
                    missing_docs.push('Acta constitutiva, asamblea y poderes');
                    missing_docs.push('RFC');
                    missing_docs.push('Estados financieros');
                    missing_docs.push('Estados de cuenta bancarios');
                    missing_docs.push('Declaraciones anuales de los dos últimos años');
                    missing_docs.push('Identificación de representante legal y principales accionistas');
                    missing_docs.push('Comprobante de domicilio del negocio y particular del representante legal y principales accionistas');
                    missing_docs.push('Fotos de tu empresa o negocio u otros');
                }
            }
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

        if(user.idClient.appliance[0].idComercialInfo.terminal){
            missing_docs.push('Reporte de cobranza de las terminales punto de venta (12 meses)');
            missing_docs.push('Contrato de arrendamiento vigente de tu local');
        }
    // }

    return missing_docs;
}