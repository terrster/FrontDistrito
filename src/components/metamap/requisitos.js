export const requisitos = {
    "PF": [
        {
            "name": "oficialID",
            "description": " identificación oficial y comprobante de domicilio particular",
            "required": true,
            "flow": "62f15ad24621d7001caa5471",
            "step": "A",
        },
        {
            "name": "bankStatements",
            "description": "Estados de cuenta bancarios",
            "required": true,
            "flow": "62f197e88a9445001c6bc082",
            "step": "B",
        },
        {
            "name": "others",
            "description": "otros documentos",
            "required": false,
            "flow": "62fb0cb37b0f3a001ce0cd21",
            "step": "B",
        },
    ],
    "PFAE": [
        {
            "name": "oficialID",
            "description": " Identificación oficial y comprobante de domicilio particular",
            "required": true,
            "flow": "62f15ad24621d7001caa5471",
            "step": "A",
        },
        {
            "name": "proofAddress",
            "description": "comprobante de domicilio de la empresa o negocio",
            "required": true,
            "flow": "62fb09fa249da5001d41ce7e",
            "step": "B",
            "state": false,
        },
        {
            "name": "bankStatements",
            "description": "estados de cuenta bancarios",
            "required": true,
            "flow": "62f197e88a9445001c6bc082",
            "step": "B",
        },
        {
            "name": "others",
            "description": "otros documentos",
            "required": false,
            "flow": "62fb0cb37b0f3a001ce0cd21",
            "step": "B",
        },
    ],
    "PM": [
        {
            "name": "rfc",
            "description": "constancia de situación fiscal",
            "required": true,
            "flow": "62f41fce34cd3c001cbd8120",
            "step": "A",
        },
        {
            "name": "legalStatements",
            "description": "documentacion legal",
            "required": true,
            "flow": "62f56b0f235dfd001ed2a123",
            "step": "B",
        },
        {
            "name": "bankStatements",
            "description": "estados de cuenta bancarios",
            "required": true,
            "flow": "62f197e88a9445001c6bc082",
            "step": "B",
        },
        {
            "name": "oficialID",
            "description": "identificación oficial y comprobante de domicilio particular",
            "required": true,
            "flow": "62f15ad24621d7001caa5471",
            "step": "A",
        },
        {
            "name": "proofAddress",
            "description": "comprobante de domicilio de la empresa",
            "required": true,
            "flow": "62fb09fa249da5001d41ce7e",
            "step": "B",
            "state": false,
        },
        {
            "name": "others",
            "description": "otros documentos",
            "required": false,
            "flow": "62fb0cb37b0f3a001ce0cd21",
            "step": "B",
        },
    ],
};
export const garantias = {
    "1": [{
        "name": "guaranteeStatement",
        "description": "garantía inmobiliaria",
        "required": true,
        "flow": "62fe7fc0017992001cd8b11f",
        "step": "C",
    }],
    "2": [{
        "name": "guaranteeFixedAssets",
        "description": "activo fijo como garantía",
        "required": true,
        "flow": "62fc6cb8d9d2ed001cbe392d",
        "step": "C",
    }],
    "3": [
        {
            "name": "guaranteeStatement",
            "description": "garantía inmobiliaria",
            "required": true,
            "flow": "62fe7fc0017992001cd8b11f",
            "step": "C",
        },
        {
            "name": "guaranteeFixedAssets",
            "description": "activo fijo como garantía",
            "required": true,
            "flow": "62fc6cb8d9d2ed001cbe392d",
            "step": "C",
        },
    ]
};
//# sourceMappingURL=requisitos.js.map