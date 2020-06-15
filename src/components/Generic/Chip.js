import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIgloo,faPaperclip } from '@fortawesome/free-solid-svg-icons'
import clip from "../../assets/img/clip-01.png";


library.add(faIgloo,faPaperclip)

/**
 *  @Params { fileName }
 */
class Chip extends Component {

	constructor(props){
		super(props)
		this.state = {
			...props
		}
	}

	render() { 
		
		return ( 

			<div className="chip">
				<img className="icon" src={clip} style={{width : 96, height : 96}}style={{width : 96, height : 96}}/>
				{/* <FontAwesomeIcon className="icon" icon="paperclip" style={{width : 96, height : 96}} /> */}
						<label className="texto-chip">{this.props.fileName}</label>
				<span className="closebtn" onClick={() => this.props.delete(this.props.index, this.props.docName)} >&times;</span>
			</div>
		 );
	}
}
 
export default Chip;
