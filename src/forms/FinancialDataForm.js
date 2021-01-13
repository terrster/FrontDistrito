import React, { useEffect, useState } from 'react';
import { withFormik, Form, Field } from 'formik';
import { Row, Col, Button } from 'react-bootstrap';
import { renderField, renderFieldSelect } from '../components/Generic/FinancialDataFields';
import SubtitleForm from '../components/Generic/SubtitleForm';

import Delete from "../assets/img/basura-01.png";

const FinancialDataForm = ({user, banksOptions, getBankFields, bankFields, banks, setBanks}) => {

    return (
        <Form className="ml-auto mr-auto pl-3 pr-3 pb-4" style={{ maxWidth: "690px" }}>
            {/* {user.idClient.type !== "PM" && (
            <>
            <SubtitleForm subtitle="Datos Bancarios" className="mt-11 mb-3" />
            <div
                onClick={() => {
                dispatch(updateModalBanks(true));
                }}
                style={{ cursor: "pointer", width: "0", height: "0" }}
            >
                <img
                src={Info}
                alt="Datos bancarios info"
                title="Información de datos bancarios"
                className="bankInfo"
                />
            </div>
            <Row>
                <Col lg={10} md={10} sm={10}>
                <Field
                    key={0}
                    component={renderSelectField}
                    name={"banks" + 0}
                    required={true}
                    cls="mb-3"
                    onChange={(e, newValue) => {
                    dispatch(updateLoader(true));
                    const currBank = banksOptions.filter(
                        (bank) => bank.id == newValue
                    );
                    const copyBanks = banks;
                    copyBanks[0] = {
                        ...currBank[0],
                        idArray: 0,
                    };
                    setBanks(copyBanks);
                    if (currBank.length > 0) {
                        const idBank = currBank[0].id;
                        handleChangeBank(idBank, 0);
                    }
                    }}
                >
                    <option value="" disabled>
                    Bancos
                    </option>
                    {banksOptions.map((bank, index) => {
                    return (
                        <option value={bank.id} key={bank.name + index}>
                        {bank.name}
                        </option>
                    );
                    })}
                </Field>
                </Col>

                <Col lg={2} md={2} sm={2}>
                <Button
                    className="btn btn-bank-del"
                    onClick={() => deleteBank(0)}
                >
                    <img
                    src={Delete}
                    alt="Datos bancarios delete"
                    title="Eliminar banco"
                    className="bankDel"
                    />
                </Button>
                </Col>
            </Row>
            {bankFields
                .filter((fields, indexField) => indexField === 0)
                .map((fields, indexField) =>
                fields.map((field) => {              
                    return (
                    <Field
                        key={field.name + 0}
                        component={renderField}
                        label={field.friendlyName}
                        type={field.type}
                        name={field.name + 0}
                        normalize={field.name == 'username' ? onlyNumbers : ''}
                        required={true}
                        onChange={(e, newValue) => {
                        const copyBanks = banks;
                        const currentBank = banks[0];
                        const { name } = field;
                        const addCurrentBank = {
                            ...currentBank,
                        };
                        addCurrentBank[name] = newValue;
                        copyBanks[0] = addCurrentBank;
                        setBanks(copyBanks);
                        }}
                        cls="mb-3"
                    />
                    );
                })
                )}
            {banks.map((bank, indexBank) => {
                if (indexBank === 0){
                return null
                }
                return (
                <div key={indexBank}>
                    <Row>
                    <Col lg={10} md={10} sm={10}>
                        <Field
                        key={indexBank}
                        component={renderSelectField}
                        name={"banks" + indexBank}
                        required={true}
                        cls="mb-3"
                        onChange={(e, newValue) => {
                            dispatch(updateLoader(true));
                            const currBank = banksOptions.filter(
                            (bank) => bank.id == newValue
                            );
                            const copyBanks = banks;
                            copyBanks[indexBank] = {
                            ...currBank[0],
                            idArray: indexBank,
                            };
                            setBanks(copyBanks);
                            if (currBank.length > 0) {
                            const idBank = currBank[0].id;
                            handleChangeBank(idBank, indexBank);
                            }
                        }}
                        >
                        <option value="" disabled>
                            Bancos
                        </option>
                        {banksOptions.map((bank, index) => {
                            return (
                            <option value={bank.id} key={bank.name + index}>
                                {bank.name}
                            </option>
                            );
                        })}
                        </Field>
                    </Col>
    
                    <Col lg={2} md={2} sm={2}>
                        <Button
                        className="btn btn-bank-del"
                        onClick={() => deleteBank(indexBank)}
                        >
                        <img
                            src={Delete}
                            alt="Datos bancarios delete"
                            title="Eliminar banco"
                            className="bankDel"
                        />
                        </Button>
                    </Col>
                    </Row>
                    {bankFields
                    .filter((fields, indexField) => {
                        return indexField === indexBank
                    })
                    .map((fields, indexField) =>
                        fields.map((field) => {
                        return (
                            <Field
                            key={field.name + indexBank}
                            component={renderField}
                            label={field.friendlyName}
                            type={field.type}
                            name={field.name + indexBank}
                            normalize={field.name == 'username' ? onlyNumbers : ''}
                            required={true}
                            onChange={(e, newValue) => {
                                const copyBanks = banks;
                                const currentBank = banks[indexBank];
                                const { name } = field;
                                const addCurrentBank = {
                                ...currentBank,
                                };
                                addCurrentBank[name] = newValue;
                                copyBanks[indexBank] = addCurrentBank;
                                setBanks(copyBanks);
                            }}
                            cls="mb-3"
                            />
                        );
                        })
                    )}
                </div>
                );
            })}
            <div className="fz18 gray50 text-dp mb-30 mt-2">
                Esta información no es obligatoria, pero podrá agilizar tu solicitud de crédito a la mitad del tiempo. 
                Se ingresará por única ocasión para descargar solo tus movimientos bancarios.
            </div>
            <Button
                type="button"
                className={"btn-blue-general btn-add-bank"}
                disabled={banks.length < 10 ? false : true}
                onClick={() => {
                if(banks.length < 10){
                    const newBank = {
                    code: null,
                    id: null,
                    idArray: banks.length ? banks[banks.length - 1].idArray + 1 : 1,
                    name: null,
                    status: null,
                    };
                    setBanks([...banks, newBank]);
                }
                }}
            >
                Agregar otro banco
            </Button>
            <PopUpBanks />
            </>
            )} */}
            <SubtitleForm subtitle="Información Bancaria" className="mb-3"/>

            <Row>
                <Col xs={12} sm={11}>
                    <Field
                        key={0}
                        component={renderFieldSelect}
                        name={"bank" + 0}
                        required={true}
                        className="mb-3"
                        onChange={({target}) => {
                            // dispatch(updateLoader(true));
                            // const currBank = banksOptions.filter(
                            //     (bank) => bank.id == target.value
                            // );
                            // const copyBanks = banks;
                            // copyBanks[0] = {
                            //     ...currBank[0],
                            //     idArray: 0,
                            // };
                            // setBanks(copyBanks);
                            // if (currBank.length > 0) {
                            //     const idBank = currBank[0].id;
                            //     handleChangeBank(idBank, 0);
                            // }
                            getBankFields(target.value, 0);
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
                    <Button className="btn btn-bank-del mb-xs-5" /*onClick={() => deleteBank(0)}*/>
                        <img src={Delete} alt="Datos bancarios delete" title="Eliminar banco" className="bankDel"/>
                    </Button>
                </Col>
                {
                    bankFields
                    .filter((fields, index) => index === 0)
                    .map((fields, index) => {
                        return fields.map((field) => {console.log(field);
                            return (
                                <Col xs={12} key={index}>
                                    <Field
                                        key={field.name + 0}
                                        component={renderField}
                                        placeholder={field.friendlyName}
                                        type={field.type}
                                        name={field.name + 0}
                                        // normalize={field.name == 'username' ? onlyNumbers : ''}
                                        required={true}
                                        className="mb-3"
                                        // onChange={(e, newValue) => {
                                        //     const copyBanks = banks;
                                        //     const currentBank = banks[0];
                                        //     const { name } = field;
                                        //     const addCurrentBank = {
                                        //         ...currentBank,
                                        //     };
                                        //     addCurrentBank[name] = newValue;
                                        //     copyBanks[0] = addCurrentBank;
                                        //     setBanks(copyBanks);
                                        // }}
                                    />
                                </Col>
                            )
                        })
                    })
                }
                {/* {
                    bankFields
                    .filter((fields, indexField) => indexField === 0)
                    .map((fields, indexField) =>
                        fields.map((field, index) => {              
                            return (
                                <Col key={index}>
                                    <Field
                                        // key={field.name + 0}
                                        // component={renderField}
                                        label={field.friendlyName}
                                        type={field.type}
                                        name={field.name + 0}
                                        // normalize={field.name == 'username' ? onlyNumbers : ''}
                                        required={true}
                                        className="mb-3"
                                        // onChange={(e, newValue) => {
                                        //     const copyBanks = banks;
                                        //     const currentBank = banks[0];
                                        //     const { name } = field;
                                        //     const addCurrentBank = {
                                        //         ...currentBank,
                                        //     };
                                        //     addCurrentBank[name] = newValue;
                                        //     copyBanks[0] = addCurrentBank;
                                        //     setBanks(copyBanks);
                                        // }}
                                    />
                                </Col>
                            );
                        })
                    )
                } */}
            </Row>

            {banks.map((bank, indexBank) => {
                if (indexBank > 0){
                    return (
                        <div key={indexBank}>
                            <Row>
                                <Col xs={12} sm={11}>
                                    <Field
                                        key={indexBank}
                                        component={renderFieldSelect}
                                        name={"banks" + indexBank}
                                        required={true}
                                        className="mb-3"
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
                                    <Button className="btn btn-bank-del" /*onClick={() => deleteBank(indexBank)}*/>
                                        <img src={Delete} alt="Datos bancarios delete" title="Eliminar banco" className="bankDel"/>
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    )
                }
            })}

            <div className="fz18 gray50 text-dp mb-30 mt-4 text-left">
                Esta información no es obligatoria, pero podrá agilizar tu solicitud de crédito a la mitad del tiempo. 
                Se ingresará por única ocasión para descargar solo tus movimientos bancarios.
            </div>
            <Button
                type="button"
                className={"btn-blue-general btn-add-bank"}
                disabled={banks.length < 10 ? false : true}
                onClick={() => {
                    if(banks.length < 10){
                        const newBank = {
                            code: null,
                            id: null,
                            idArray: banks.length ? banks[banks.length - 1].idArray + 1 : 1,
                            name: null,
                            status: null,
                        };
                        setBanks([...banks, newBank]);
                    }
                }}>
                Agregar otro banco
            </Button>
        </Form>
    );
}

export default withFormik({
    // mapPropsToValues({initialValues}){
    //     return initialValues;
    // },
    // validate: itemValidations, 
    // handleSubmit(values, formikBag){
    //     formikBag.setSubmitting(false);
    //     formikBag.props.submitFunction(values);
    // },
    enableReinitialize: true,
    displayName: 'FinancialDataForm'
})(FinancialDataForm);
