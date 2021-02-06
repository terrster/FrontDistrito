import React, { useEffect, useState } from 'react';
import { withFormik, Form, Field } from 'formik';
import { Row, Col, Spinner, Button } from 'react-bootstrap';
import { renderField, renderFieldSelect } from '../components/Generic/FinancialDataFields';
import SubtitleForm from '../components/Generic/SubtitleForm';
import Delete from "../assets/img/basura-01.png";
import {validateOpenBanking} from '../components/Validate/ValidateOpenBanking';

const OpenBankingForm = (props) => {

    const { user, banksOptions, bankFields, setBankFields, initialValues, setinitialValues, getBankFields } = props;
    const [error, setError] = useState(null);

    const deleteBank = async(bank) => {
        let bankFieldsCopy = {...bankFields};
        let initialValuesCopy = {...initialValues};

        if(bank === 'bank0'){
            initialValuesCopy[`${bank}`] = {
                id: '',
                values: {},
                validate: false,
            };
        }
        else{
            delete initialValuesCopy[`${bank}`];
        }
        delete bankFieldsCopy[`${bank}`];
        setinitialValues(initialValuesCopy);
        setBankFields(bankFieldsCopy);
    };

    useEffect(() => {
        setinitialValues({...initialValues, ...props.values})
    }, [props.values, props.initialValues])

    useEffect(() => {
        console.log(props);
    }, [props])

    return (
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
                                        // normalize={field.name == 'username' ? onlyNumbers : ''}
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
                                                            // normalize={field.name == 'username' ? onlyNumbers : ''}
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
                    className={"btn-blue-general btn-add-bank"}
                    disabled={Object.keys(initialValues).length < 10 ? false : true}
                    onClick={() => {
                        let invalid = Object.keys(initialValues).find(credencial => !credencial.validate);
                        if(Object.keys(initialValues).length < 10){
                            if(!invalid){
                                setinitialValues({...initialValues,
                                    [`bank${Object.keys(initialValues).length}`]: {
                                        id: '',
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
                    {
                        Object.keys(initialValues).find(credencial => !credencial.validate) &&
                        <Button 
                        type="submit"
                        className={"btn-blue-general btn-add-bank"}
                        >
                            Validar
                        </Button>
                    }
                </Col>
            </Row>
        </Form>
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
