import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateLoader } from "../redux/actions/loaderActions";
import { updateModal } from "../redux/actions/modalActions";
import axios from "../utils/axios";

const RecoverPasswordForm = (props) => {
  const dispatch = useDispatch();
  const [submitting, setSubmitting] = useState(true);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [touchPassword, setTouchPassword] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");
  const [touchPasswordConfirm, setTouchPasswordConfirm] = useState(false);
  const hash = props.hash;

  const onFormSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateLoader(true));
    
    try {
      let {data} = await axios.post("/reset_password/" + hash, {password});

      if(data.code == 200){
        dispatch( updateModal('reset_password', 'Tu contraseña se ha cambiado exitosamente, serás reedirigido a login.') );
        setTimeout(() => { window.location.href = `${process.env.REACT_APP_REDIRECT}/login`; }, 2000);
      }
      else{
        dispatch( updateModal('reset_password', 'Ha ocurrido un error al cambiar la contraseña, intentelo de nuevo.') );
      }

      dispatch(updateLoader(false));
    } catch (err) {
      dispatch(updateLoader(false));
      dispatch( updateModal('reset_password', 'Ha ocurrido un error al cambiar la contraseña, intentelo de nuevo.') );
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
    ? "btn-blue-general mt-30 disabled"
    : "btn-blue-general mt-30";
    
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
            style={{width: '250px'}}
          >
            Reestablecer
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RecoverPasswordForm;
