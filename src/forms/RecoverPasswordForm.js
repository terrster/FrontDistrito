import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { updateLoader } from "../redux/actions/loaderActions";
import { updateModal } from "../redux/actions/modalActions";

const RecoverPasswordForm = (props) => {
  const dispatch = useDispatch();
  const [submitting, setSubmitting] = useState(true);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [touchPassword, setTouchPassword] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");
  const [touchPasswordConfirm, setTouchPasswordConfirm] = useState(false);

  const onFormSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateLoader(true));
    //let hash = props.match.params.hash;
    console.log(password);
    console.log(passwordConfirm);
    try {
      /* let d = await RecoverPassword({variables: {password:pass, hash}});
		  let status = d.data.createPassword.status;
		  let text = (!status) ? 'Url invalida no se puede actualizar tu contraseña.': 'Tu contraseña se ha restablecido Correctamente, seras reedirigido a login';
		  if(status) setTimeout(() => {props.history.push('/login')}, 2000); 
      props.updateRecoverPassword(status, text); */
      dispatch(updateLoader(false));
    } catch (err) {
      dispatch(updateLoader(false));
      dispatch(updateModal("err"));
    }
  };

  useEffect(() => {
    if (password === passwordConfirm && password.length >= 8) {
      setPasswordError("");
      setPasswordConfirmError("");
      setSubmitting(false);
    } else {
      setSubmitting(true);
    }
    if (password.length < 8 && touchPassword) {
      setPasswordError("La contraseña debe tener 8 o más caracteres");

    } else {
      setPasswordError("");
    }
    if (password !== passwordConfirm && touchPasswordConfirm) {
      setPasswordConfirmError("Las contraseñas no coinciden");
    } else {
      setPasswordConfirmError("");
    }
  }, [password, passwordConfirm, touchPassword, touchPasswordConfirm]);

  const submitButtonClass = submitting
    ? "btn-register mt-30 disabled"
    : "btn-register mt-30";
    
  return (
    <div className="container">
      <form
        onSubmit={onFormSubmit}
        className="mr-auto ml-auto"
        style={{ maxWidth: "690px" }}
      >
        <div>
          <div className="input-container">
            <input
              className="form-control custom-form-input mt-24"
              placeholder="Ingresa la nueva contraseña"
              onChange={({ target: { value } }) => {
                setTouchPassword(true);
                setPassword(value);
              }}
              value={password}
              type="password"
            />
          </div>
          {passwordError && (
            <span>
              <small className="error">{passwordError}</small>
            </span>
          )}
        </div>
        <div>
          <div className="input-container">
            <input
              className="form-control custom-form-input mt-24"
              placeholder="Ingresa la nueva contraseña"
              onChange={({ target: { value } }) => {
                setTouchPasswordConfirm(true);
                setPasswordConfirm(value);
              }}
              value={passwordConfirm}
              type="password"
            />
          </div>
          {passwordConfirmError && (
            <span>
              <small className="error">{passwordConfirmError}</small>
            </span>
          )}
        </div>
        <div className="text-center">
          <Button
            type="submit"
            className={submitButtonClass}
            disabled={submitting}
          >
            Reestablecer
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RecoverPasswordForm;
