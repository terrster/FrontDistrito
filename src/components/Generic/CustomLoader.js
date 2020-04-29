import React from 'react';
import Loader from 'react-loader-spinner';

const CustomLoader = () => {
	return (
		<div className="mt-50 text-center">
            <Loader type="Oval" color="#2421de" height="100" width="100" />
        </div>
	)
}

export default CustomLoader