import React from 'react'

const Banner = () => {

  return(
  <>
      <video style={{
                objectFit: 'fill',
                width: '100%',
                height: '350px',
                border: '0',
                padding: '0'
            }} 
          controls={false} autoPlay={true} preload={"true"} 
          src="https://distrito-pyme-media.s3.us-west-2.amazonaws.com/%C2%BFC%C3%B3mo+Funciona+Distrito+Pyme_+Solicita+tu+CR%C3%89DITO+Ya!!.mp4"/>
  </>
  );
}

export default Banner;