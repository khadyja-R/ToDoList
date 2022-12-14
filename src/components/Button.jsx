import React from 'react'
import PropTypes from 'prop-types'

export const Button = ({ text , onClick}) => {
  return (

    <button
    onClick={onClick}
    className='btn'
  >
    {text}
  </button>
  )

}

Button.defaultProps = {
    color: 'steelblue',
  }
  
  Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func,
  }


