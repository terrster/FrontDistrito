import React from 'react';
import { useSelector } from 'react-redux';
import '../../css/loader.css'


const Loader = () => {
	const { isLoading } = useSelector(state => state.loader);
	if (isLoading){
		return ( 
			<div className="loader-container" style={{ width: '100vw', height: '100vh', zIndex: '200', position: 'fixed', top: '0', left: '0' }}>
				<div className="lds-ripple">
					<div/><div/>
				</div>
			</div>
		);
	}
	return null
}
 
export default Loader;
