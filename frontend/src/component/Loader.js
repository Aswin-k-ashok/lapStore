import React from 'react'
import { Spinner } from 'react-bootstrap'
function Loader() {
  return (
    <Spinner
      animation='grow'
      role='status'
      style={{
        width: '200px',
        height: '200px',
        margin: 'auto',
        display: 'block',
      }}
    >
      <iframe src='https://embed.lottiefiles.com/animation/44377'></iframe>
      <span className='sr-only'>Loading.....</span>
    </Spinner>
  )
}

export default Loader
