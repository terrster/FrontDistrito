import React, { useEffect, useState } from 'react';
import { withFormik, Form, Field } from 'formik';
import { Row, Col, Button } from 'react-bootstrap';
import { renderField, renderFieldSelect } from '../components/Generic/FinancialDataFields';
import SubtitleForm from '../components/Generic/SubtitleForm';
import Delete from "../assets/img/basura-01.png";
import {validateOpenBanking} from '../components/Validate/ValidateOpenBanking';

const OpenBankingForm = (props) => {

    const { user, banksOptions, initialValues, setinitialValues, getBankFields } = props;

    const deleteBank = async(bank) => {
        let initialValuesCopy = {...initialValues};

        if(bank === 'bank0'){
            initialValuesCopy[`${bank}`] = {
                id: '',
                fields: [],
                values: {},
                validate: false,
            };
        }
        else{
            delete initialValuesCopy[`${bank}`];
        }
        setinitialValues(initialValuesCopy);
    };

    useEffect(() => {
        setinitialValues({...initialValues, ...props.values})
    }, [props.values, props.initialValues])

    return (
        <Form className="ml-auto mr-auto pl-3 pr-3 pb-4" style={{ maxWidth: "690px" }}>
            <SubtitleForm subtitle="Información Bancaria" className="mb-3"/>

            <Row>
                <Col xs={12} sm={11}>
                    <Field
                        key={0}
                        component={renderFieldSelect}
                        name={`bank${0}.id`}
                        required={true}
                        className="mb-3"
                        onChange={({target}) => {
                            getBankFields(target.value, `bank0`);
                        }}
                    >
                        <option value="">Seleccionar</option>
                        {banksOptions.map((bank, index) => {
                            return (
                                <option value={bank.id} key={bank.name + index}>
                                    {bank.name}
                                </option>
                            );
                        })}
                    </Field>
                </Col>
                <Col xs={12} sm={1}>
                    <Button className="btn btn-bank-del mb-xs-5" onClick={() => deleteBank(`bank0`)}>
                        <img src={Delete} alt="Datos bancarios delete" title="Eliminar banco" className="bankDel"/>
                    </Button>
                </Col>
                {
                    initialValues[`bank${0}`].fields.map((field, index) => {
                        return <Col xs={12} key={index} key={field.name + 0}>
                                    <Field
                                        component={renderField}
                                        placeholder={field.friendlyName}
                                        type={field.type}
                                        name={`bank${0}.values.${field.name}`}
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
                                            <option value="">Seleccionar</option>
                                            {banksOptions.map((bank, index) => {
                                                return (
                                                    <option value={bank.id} key={bank.name + index}>
                                                        {bank.name}
                                                    </option>
                                                );
                                            })}
                                        </Field>
                                    </Col>
                
                                    <Col xs={12} sm={1}>
                                        <Button className="btn btn-bank-del" onClick={() => deleteBank(bank)}>
                                            <img src={Delete} alt="Datos bancarios delete" title="Eliminar banco" className="bankDel"/>
                                        </Button>
                                    </Col>

                                    {
                                        initialValues[bank].fields.map((field, index) => {
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
            <Button
                type="button"
                className={"btn-blue-general btn-add-bank"}
                disabled={Object.keys(initialValues).length < 10 ? false : true}
                onClick={() => {
                    if(Object.keys(initialValues).length < 10){
                        //if(initialValues[`bank${Object.keys(initialValues).length - 1}`].validate){
                            let valuesCopy = {...initialValues,
                                [`bank${Object.keys(initialValues).length}`]: {
                                    id: '',
                                    fields: [],
                                    values: {},
                                    validate: false,
                                }
                            };
                            setinitialValues(valuesCopy);
                        }
                    //}
                }}>
                Agregar otro banco
            </Button>
            <Button 
            type="submit"
            className={"btn-blue-general btn-add-bank float-right"}
            >
                Guardar
            </Button>
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
