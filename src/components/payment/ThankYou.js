import React from 'react'
import { Link } from 'react-router-dom'

const ThankYou = () => {
  return (
    <div>
        <h1 style={{marginTop:'135px'}}>Thank You for Shopping with us...</h1>
        <h3 style={{textAlign:'center', marginTop:'60px'}}>Your Orders has been Placed...</h3>
        <h5 style={{textAlign:'center', marginTop:'60px'}}><Link to={'/Orders'} style={{textAlign:'center', color:'black', marginTop:'60px'}}>Click here to check your Order.</Link></h5>
    </div>
  )
}

export default ThankYou