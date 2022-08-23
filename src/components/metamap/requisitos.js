export const requisitos = {
    "PF": [
        {
            "name": "oficialID",
            "description": " Identificación oficial y comprobante de domicilio particular",
            "required": true,
            "step": "A",
        },
        {
            "name": "bankStatements",
            "description": "Estados de cuenta bancarios",
            "required": true,
            "step": "B",
        },
        {
            "name": "others",
            "description": "otros documentos",
            "required": false,
            "step": "B",
        },
    ],
    "PFAE": [
        {
            "name": "oficialID",
            "description": " Identificación oficial y comprobante de domicilio particular",
            "required": true,
            "step": "A",
        },
        {
            "name": "proofAddress",
            "description": "comprobante de domicilio de la empresa o negocio",
            "required": true,
            "step": "B",
        },
        {
            "name": "bankStatements",
            "description": "estados de cuenta bancarios",
            "required": true,
            "step": "B",
        },
        {
            "name": "others",
            "description": "otros documentos",
            "required": false,
            "step": "B",
        },
    ],
    "PM": [
        {
            "name": "rfc",
            "description": "constancia de situación fiscal",
            "required": true,
            "step": "A",
        },
        {
            "name": "legalStatements",
            "description": "documentacion legal",
            "required": true,
            "step": "B",
        },
        {
            "name": "bankStatements",
            "description": "estados de cuenta bancarios",
            "required": true,
            "step": "B",
        },
        {
            "name": "oficialID",
            "description": "identificación oficial y comprobante de domicilio particular",
            "required": true,
            "step": "A",
        },
        {
            "name": "proofAddress",
            "description": "comprobante de domicilio de la empresa",
            "required": true,
            "step": "B",
        },
        {
            "name": "others",
            "description": "otros documentos",
            "required": false,
            "step": "B",
        },
    ],
};
export const garantias = {
    "1": [{
        "name": "inmobiliaria",
        "description": "garantía inmobiliaria",
        "required": true,
        "step": "C",
    }],
    "2": [{
        "name": "activo",
        "description": "activo fijo como garantía",
        "required": true,
        "step": "C",
    }],
    "3": [
        {
            "name": "inmobiliaria",
            "description": "garantía inmobiliaria",
            "required": true,
            "step": "C",
        },
        {
            "name": "activo",
            "description": "activo fijo como garantía",
            "required": true,
            "step": "C",
        },
    ]
};
//# sourceMappingURL=requisitos.js.map