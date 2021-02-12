import React, { useEffect, useState, useRef } from 'react';
import { withFormik, Form, Field  } from 'formik';
import { Modal, Row, Col, Spinner, Button, Alert } from 'react-bootstrap';
import { renderField, renderFieldSelect } from '../components/Generic/FinancialDataFields';
import SubtitleForm from '../components/Generic/SubtitleForm';
import Delete from "../assets/img/basura-01.png";
import {validateOpenBanking} from '../components/Validate/ValidateOpenBanking';

const OpenBankingForm = (props) => {

    const { socket, axios, banksOptions, initialValues, setinitialValues, dispatch, updateLoader, validating, setValidating, error, setError, message, setMessage } = props;

    const [bankFields, setBankFields] = useState([]);//Fields of a chosen bank
    const [timer, setTimer] = useState(60);
    const [success, setSuccess] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const tokenRef = useRef();
    const [provideToken, setProvideToken] = useState({
        token: '',
        idCredential: ''
    });

    useEffect(() => {
        if(socket){
            socket.on('forceDisconnect', () => {
                socket.disconnect();
                sessionStorage.clear();
                window.location.reload();
            });

            socket.on('askForToken', (callback) => {
                // dispatch(updateLoader(false));
                setProvideToken({
                    ...provideToken,
                    idCredential: callback.credentialId
                });
                setShowModal(true);
            });

            socket.on('notifySuccess', (callback) => {
                let index = Object.keys(initialValues).find(bank => initialValues[bank].idCredential === callback.credentialId);

                if(index){
                    let initialValuesCopy = {...initialValues};
                    initialValuesCopy[index].validate = true;
                    props.values[index].validate = true;
                    setinitialValues(initialValuesCopy);

                    sessionStorage.setItem('user', JSON.stringify(callback.user));

                    setSuccess(true);
                    setTimeout(() => {
                        setSuccess(false);
                    }, 5000);

                    setValidating(false);
                    dispatch(updateLoader(false));

                    props.setErrors({});
                    props.setSubmitting(false);
                }
            });

            socket.on('notifyFailure', async(callback) => {
                let index = Object.keys(initialValues).find(bank => initialValues[bank].idCredential === callback.credentialId);
                
                if(index){
                    let {data} = await axios.delete(`api/finerio/credentials/${callback.credentialId}`);
                
                    if(data.user){
                        sessionStorage.setItem('user', JSON.stringify(data.user));
                    }    

                    let initialValuesCopy = {...initialValues};
                    initialValuesCopy[index].idCredential = null;
                    props.values[index].idCredential = null;

                    setinitialValues(initialValuesCopy);

                    setError(callback.message);
                    setTimeout(() => {
                        setError(null);
                    }, 5000);

                    setValidating(false);
                    dispatch(updateLoader(false));

                    props.setErrors({});
                    props.setSubmitting(false);
                }

            });
        }
    }, [socket, initialValues, props.values]);

    const getBankFields = async (idBank, bank) => {
        dispatch(updateLoader(true));

        let bankFieldsCopy = {...bankFields};
        let initialValuesCopy = {...initialValues};

        const { data } = await axios.get(`api/finerio/bank/${idBank}/fields`);

        initialValuesCopy[bank].id = idBank;
        bankFieldsCopy[bank] = data;

        Object.entries(data).forEach(([key]) => {
            initialValuesCopy[bank].values[data[key].name] = '';
            props.values[bank].values[data[key].name] = '';
        });

        setinitialValues(initialValuesCopy);
        setBankFields(bankFieldsCopy);

        props.setErrors({});
        props.setSubmitting(false);

        dispatch(updateLoader(false));
    };

    const deleteBank = async(bank) => {
        dispatch(updateLoader(true));
        let bankFieldsCopy = {...bankFields};
        let initialValuesCopy = {...initialValues};

        if(bank === 'bank0'){
            if(initialValuesCopy[bank].idCredential){
                let {data} = await axios.delete(`api/finerio/credentials/${initialValuesCopy[bank].idCredential}`);
                
                if(data.hasOwnProperty('user')){
                    sessionStorage.setItem('user', JSON.stringify(data.user));
                }
            }

            initialValuesCopy[`${bank}`] = {
                id: '',
                idCredential: null,
                values: {},
                validate: false,
            };
        }
        else{
            if(initialValuesCopy[bank].idCredential){
                let {data} = await axios.delete(`api/finerio/credentials/${initialValuesCopy[bank].idCredential}`);
                if(data.hasOwnProperty('user')){
                    sessionStorage.setItem('user', JSON.stringify(data.user));
                }
            }

            delete initialValuesCopy[`${bank}`];
        }
        delete bankFieldsCopy[`${bank}`];
        setinitialValues(initialValuesCopy);
        setBankFields(bankFieldsCopy);

        dispatch(updateLoader(false));
    };

    const handleProvideToken = async() => {
        dispatch(updateLoader(true));
        setShowModal(false);

        const { data } = await axios.post(`api/open-banking/storeToken`, provideToken);

        if(data.code === 200){
            setProvideToken({
                token: '',
                idCredential: ''
            });
        }
    }

    useEffect(() => {
        let interval = null;

        if(showModal){
            interval = setInterval(() => {
                setTimer(timer => timer - 1);
            }, 1000);
        }
        
        if(!showModal || timer === 0){
            clearInterval(interval);
            setShowModal(false);
            setTimeout(() => {
                setTimer(60);
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [showModal, timer]);

    const handleChangeToken = ({target}) => {
        setProvideToken({
            ...provideToken,
            token: target.value
        });
    };

    useEffect(() => {
        console.log(props);
    }, [props])

    return (
        <>
            <Modal show={showModal} backdrop="static" keyboard={false} onEnter={() => tokenRef.current.focus()}>
                <Modal.Header>
                <Modal.Title>Información adicional</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="text-dp">Necesitamos el token para terminar de validar tu cuenta</p>
                    <input className="form-control custom-form-input text-dp" ref={tokenRef} value={provideToken.token} onChange={handleChangeToken}/>
                    <p className="text-dp">Tienes: </p>
                    <p className="title-dp fz25 text-center">{timer} {timer > 1 ? "segundos" : "segundo"}</p>
                </Modal.Body>
                <Modal.Footer>
                <Button className="btn-blue-general" style={{width: '150px'}} onClick={() => handleProvideToken()}>Enviar</Button>
                </Modal.Footer>
            </Modal>

            <Form className="ml-auto mr-auto pl-3 pr-3 pb-4" style={{ maxWidth: "690px" }}>
                <SubtitleForm subtitle="Información Bancaria" className="mb-3"/>

                <Row>
                    <Col xs={12} sm={11}>
                        <Field
                            key={0}
                            component={renderFieldSelect}
                            name={`bank0.id`}
                            required={true}
                            className="mb-3"
                            onChange={({target}) => {
                                getBankFields(target.value, `bank0`);
                            }}
                            disabled={initialValues[`bank0`].validate}
                        >
                            {
                                initialValues[`bank0`].id === '' &&
                                <option value="">Seleccionar</option>
                            }
                            {banksOptions.map((bank, index) => {
                                return (
                                    <option value={bank.id} key={bank.name + index}>
                                        {bank.name}
                                    </option>
                                );
                            })}
                        </Field>
                    </Col>
                    <Col xs={12} sm={1} className="text-center">
                        <Button className="btn btn-bank-del mb-xs-5" onClick={() => deleteBank(`bank0`)}>
                            <img src={Delete} alt="Datos bancarios delete" title="Eliminar banco" className="bankDel"/>
                        </Button>
                    </Col>
                    {
                        !initialValues[`bank0`].validate && bankFields.hasOwnProperty(`bank0`) && bankFields[`bank0`].map((field, index) => {
                            return <Col xs={12} key={index} key={field.name + 0}>
                                        <Field
                                            component={renderField}
                                            placeholder={field.friendlyName}
                                            type={field.type}
                                            name={`bank0.values.${field.name}`}
                                            normalize={
                                                field.name === 'username' && initialValues[`bank0`].id <= 7
                                                ? 'onlyNumbers' : 'numbersLettersWithoutSpace'
                                            }
                                            required={true}
                                            className="mb-3"
                                        />
                                    </Col>
                        })
                    }
                </Row>

                {
                    Object.keys(initialValues).map((bank, indexBank) => {
                        if (indexBank > 0){
                            return  <Row key={`${bank}`}>
                                        <Col xs={12} sm={11}>
                                            <Field
                                                key={bank.substring(4)}
                                                component={renderFieldSelect}
                                                name={`${bank}.id`}
                                                required={true}
                                                className="mb-3"
                                                onChange={({target}) => {
                                                    getBankFields(target.value, bank);
                                                }}
                                                disabled={initialValues[bank].validate}
                                            >
                                                {
                                                    initialValues[bank].id === '' &&
                                                    <option value="">Seleccionar</option>
                                                }
                                                {banksOptions.map((bank, index) => {
                                                    return (
                                                        <option value={bank.id} key={bank.name + index}>
                                                            {bank.name}
                                                        </option>
                                                    );
                                                })}
                                            </Field>
                                        </Col>
                    
                                        <Col xs={12} sm={1} className="text-center">
                                            <Button className="btn btn-bank-del" onClick={() => deleteBank(bank)}>
                                                <img src={Delete} alt="Datos bancarios delete" title="Eliminar banco" className="bankDel"/>
                                            </Button>
                                        </Col>

                                        {
                                            !initialValues[bank].validate && bankFields.hasOwnProperty(bank) && bankFields[bank].map((field, index) => {
                                                return <Col xs={12} key={index} key={field.name + index}>
                                                            <Field
                                                                component={renderField}
                                                                placeholder={field.friendlyName}
                                                                type={field.type}
                                                                name={`${bank}.values.${field.name}`}
                                                                normalize={
                                                                    field.name === 'username' && initialValues[bank].id <= 7
                                                                    ? 'onlyNumbers' : 'numbersLettersWithoutSpace'
                                                                }
                                                                required={true}
                                                                className="mb-3"
                                                            />
                                                        </Col>
                                            })
                                        }
                                    </Row>
                        }
                    })
                }

                {
                    error &&
                    <div className="mt-4 mb-4">
                        <p className="text-center"><Spinner animation="grow" variant="danger" /></p>
                        <Alert variant="danger">
                            {error}
                        </Alert>
                    </div>
                }

                {
                    success &&
                    <div className="mt-4 mb-4">
                        <p className="text-center"><Spinner animation="grow" variant="success" /></p>
                        <Alert variant="success">
                            Credencial guardada exitosamente.
                        </Alert>
                    </div>
                }

                {
                    message &&
                    <div className="mt-4 mb-4">
                        <p className="text-center"><Spinner animation="grow" variant="info" /></p>
                        <Alert variant="info">
                            {message}
                        </Alert>
                    </div>
                }

                <div className="fz18 gray50 text-dp mb-30 mt-4 text-left">
                    Esta información no es obligatoria, pero podrá agilizar tu solicitud de crédito a la mitad del tiempo. 
                    Se ingresará por única ocasión para descargar solo tus movimientos bancarios.
                </div>
                
                <Row>
                    <Col className="mb-2 d-flex justify-content-around justify-content-md-start">
                        <Button
                        type="button"
                        className={"btn-blue-general btn-open-banking"}
                        disabled={Object.keys(initialValues).length < 10 ? false : true}
                        onClick={() => {
                            let invalid = Object.keys(initialValues)[Object.values(initialValues).findIndex(c => c.validate === false)];
                            if(Object.keys(initialValues).length < 10){
                                if(invalid === undefined){
                                    setinitialValues({...initialValues,
                                        [`bank${Object.keys(initialValues).length}`]: {
                                            id: '',
                                            idCredential: null,
                                            values: {},
                                            validate: false,
                                        }
                                    });
                                }
                                else{
                                    setError("Para poder agregar una credencial adicional, debe primero agregar una correctamente.");
                                    setTimeout(() => {
                                        setError(null);
                                    }, 5000);
                                }
                            }
                        }}>
                        Agregar otro banco
                        </Button>
                    </Col>
                    <Col className="d-flex justify-content-around justify-content-md-end">
                        <Button 
                        type="submit"
                        className={"btn-blue-general btn-open-banking"}
                        disabled={validating || !Object.keys(initialValues).find(bank => initialValues[bank].validate === false) || !Object.keys(props.values).find(bank => props.values[bank].validate === false)}
                        onClick={() => props.submitForm()}
                        >
                            <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            hidden={!validating}
                            />
                            {!validating ? "Validar" : " Validando..."}
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
}

export default withFormik({
    mapPropsToValues({initialValues}){
        return initialValues;
    },
    validate: validateOpenBanking, 
    handleSubmit(values, formikBag){
        formikBag.props.handleSubmit(values);
        formikBag.setSubmitting(false);
    },
    enableReinitialize: true,
    displayName: 'OpenBankingForm'
})(OpenBankingForm);
