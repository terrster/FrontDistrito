export const validateOpenBanking = (values) => {
    let errors = {};
    // console.log(Object.keys(values).length);
    
    for(let i=0; i<=Object.keys(values).length - 1; i++){
        if(values[`bank${i}`].values.hasOwnProperty("username")){
            if(!values[`bank${i}`].values.username){
                errors[`bank${i}.values.username`] = "Ingresa el usuario/número de tarjeta o cuenta de tu banco.";
            }
        }

        if(values[`bank${i}`].values.hasOwnProperty("password")){
            if(!values[`bank${i}`].values.password){
                errors[`bank${i}.values.password`] = "Ingresa la contraseña de tu banco.";
            }
        }

        if(values[`bank${i}`].values.hasOwnProperty("securityCode")){
            if(!values[`bank${i}`].values.securityCode){
                errors[`bank${i}.values.securityCode`] = "Ingresa el token/clave de seguridad de tu banco.";
            }
        }
    }

    console.log(values);
    console.log(errors);
    return errors;
};
