import React, { useEffect, useState } from 'react';
import { withFormik, Form, Field } from 'formik';
import { Modal, Row, Col, Spinner, Button } from 'react-bootstrap';
import { renderField, renderFieldSelect } from '../components/Generic/FinancialDataFields';
import SubtitleForm from '../components/Generic/SubtitleForm';
import Delete from "../assets/img/basura-01.png";
import {validateOpenBanking} from '../components/Validate/ValidateOpenBanking';

const OpenBankingForm = (props) => {

    const { user, axios, banksOptions, bankFields, setBankFields, error, setError, initialValues, setinitialValues, getBankFields, validating, setValidating, showModal, setShowModal, provideToken, setProvideToken, handleProvideToken } = props;
    const [timer, setTimer] = useState(30);

    const deleteBank = async(bank) => {
        let bankFieldsCopy = {...bankFields};
        let initialValuesCopy = {...initialValues};

        if(bank === 'bank0'){
            if(initialValuesCopy[bank].idCredential){
                let {data} = await axios.delete(`api/finerio/credentials/${initialValuesCopy[bank].idCredential}`);
                sessionStorage.setItem('user', JSON.stringify(data.user));
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
                sessionStorage.setItem('user', JSON.stringify(data.user));
            }

            delete initialValuesCopy[`${bank}`];
        }
        delete bankFieldsCopy[`${bank}`];
        setinitialValues(initialValuesCopy);
        setBankFields(bankFieldsCopy);
    };

    useEffect(() => {
        setinitialValues({...initialValues, ...props.values})
    }, [props.values, props.initialValues]);

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
            setValidating(false);
            setTimeout(() => {
                setTimer(30);
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [showModal, timer])

    return (
        <>
            <Modal show={showModal} backdrop="static" keyboard={false}>
                <Modal.Header>
                <Modal.Title>Información adicional</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="text-dp">Necesitamos el token para terminar de validar tu cuenta</p>
                    <input className="form-control custom-form-input text-dp" value={provideToken.token} onChange={({target}) => {
                        setProvideToken({
                            ...provideToken,
                            token: target.value
                        });
                    }}/>
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
                            disabled={props.values[`bank0`].validate}
                        >
                            {
                                props.values[`bank0`].id === '' &&
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
                        bankFields.hasOwnProperty(`bank0`) && bankFields[`bank0`].map((field, index) => {
                            return <Col xs={12} key={index} key={field.name + 0}>
                                        <Field
                                            component={renderField}
                                            placeholder={field.friendlyName}
                                            type={field.type}
                                            name={`bank0.values.${field.name}`}
                                            normalize={
                                                field.name === 'username' && props.values[`bank0`].id <= 7
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
                                                disabled={props.values[bank].validate}
                                            >
                                                {
                                                    props.values[bank].id === '' &&
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
                                            bankFields.hasOwnProperty(bank) && bankFields[bank].map((field, index) => {
                                                return <Col xs={12} key={index} key={field.name + index}>
                                                            <Field
                                                                component={renderField}
                                                                placeholder={field.friendlyName}
                                                                type={field.type}
                                                                name={`${bank}.values.${field.name}`}
                                                                normalize={
                                                                    field.name === 'username' && props.values[bank].id <= 7
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

                <div className="fz18 gray50 text-dp mb-30 mt-4 text-left">
                    Esta información no es obligatoria, pero podrá agilizar tu solicitud de crédito a la mitad del tiempo. 
                    Se ingresará por única ocasión para descargar solo tus movimientos bancarios.
                </div>

                {
                    error &&
                    <div className="error mb-4">
                        <p className="text-center"><Spinner animation="grow" variant="danger" /></p>
                        {error}
                    </div>
                }
                
                <Row>
                    <Col className="mb-2 d-flex justify-content-around justify-content-md-start">
                        <Button
                        type="button"
                        className={"btn-blue-general btn-open-banking"}
                        disabled={Object.keys(initialValues).length < 10 ? false : true}
                        onClick={() => {
                            let invalid = Object.keys(initialValues).find(credencial => !credencial.validate);
                            if(Object.keys(initialValues).length < 10){
                                if(!invalid){
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
                        {/*Object.keys(initialValues).find(credencial => !credencial.validate)*/}
                        <Button 
                        type="submit"
                        className={"btn-blue-general btn-open-banking"}
                        disabled={validating}
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
    },
    enableReinitialize: true,
    displayName: 'OpenBankingForm'
})(OpenBankingForm);
