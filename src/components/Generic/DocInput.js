import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { FileDrop } from 'react-file-drop';
import Chip from './Chip';

export const FieldDoc = ({
    name,
    className,
    props,
    refs, 
    fileMethod, 
    image, 
    title, 
    deleteFile, 
    files, 
    subtitle
}) => {
    return(
        <Field name={name}>{({field, form}) => (
			<div className='fz18 metropolisReg mb-16'>
				<div className="font-weight-bold">
					{title} {subtitle && <span className="fz12 font-weight-normal">{subtitle}</span>}
				</div>
				<input className="d-none" type="file" ref={refs} onChange={ (e)  => fileMethod('input', name, e) } value="" multiple/>
				<FileDrop {...field} {...props} onDrop={ (e)  => fileMethod('drag', name, e)}>
					<div className={`dnd ${className}`}>
					<img src={image} className="clip-image" alt="Clip"/>
					<label className="drop-content" onClick={(e) => refs.current.click(e)}>
						Adjunta tu archivo <span className="d-none d-lg-inline">(o arrastra aquí)</span>
					</label>
					</div>
				</FileDrop>
                <ErrorMessage name={field.name} render={msg => <div className="fz15 error mt-1">{msg}</div>}/>
				{files && files.map((value, index) => {
					let nameDoc = ""
					if(value.name == undefined){
                        let aux = value.split('-');
                        for(let i=6; i<aux.length; i++){
                            nameDoc += aux[i];
                        }
                        if(nameDoc === ''){
                            for(let i=5; i<aux.length; i++){
                                nameDoc += aux[i];
                            }
                        }
                    } 
                    else{
                        let aux = value.name.replace(' ', '');
						nameDoc = aux;	
					}
					return (
						(value !== undefined) &&
                            <Chip fileName={nameDoc} typeDoc={name} delete={() => deleteFile(index, name)} docName={value} index={index} key={index}/>
                        );
				})}
			</div>
        )}</Field>
    );
}