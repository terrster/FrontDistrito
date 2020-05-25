import React from 'react';
import { FileDrop } from 'react-file-drop';
import Chip from './Chip';

/**
 * 
 * @param {refs, name, fileMethod, message} props 
 */

const FileInput = ({
	nombre, refs, fileMethod, image, title, input, deleteFile, files, subtitle,
}) => {
	// delete input.value
	return (
		<>
			<div className='fz20 brandonReg mb-16'>
				<div className="font-weight-bold">
					{title} {subtitle && <span className="h6 font-weight-normal">{subtitle}</span>}
				</div>
				<input className="d-none" type="file" ref={refs} name={nombre} onChange={ (e)  => fileMethod('input',nombre,e) } multiple/>
				<FileDrop 
					onDrop={ e  => fileMethod('drag',nombre,e)} 
					className="dnd" 
				>
					<div>
						<img src={image} className="clip-image" alt="Clip"/>
						<label className="drop-content" onClick={(e) => refs.current.click(e)}>
							Adjunta tu archivo <span className="d-none d-lg-inline">(o arrastra aquí)</span>
						</label>
					</div>
				</FileDrop>
				{
				files && files.map( (value, index) => {
					return (
						(value !== undefined) ?
						((value.name === undefined ) ? 
							<Chip fileName={nombre} delete={deleteFile} docName={nombre} index={index} key={index}/>: 
							<Chip fileName={nombre} delete={deleteFile} docName={nombre} index={index} key={index}/>)
						:<></>
					);
				}  )
			}
			</div>
		</>
	);
}

export default FileInput
