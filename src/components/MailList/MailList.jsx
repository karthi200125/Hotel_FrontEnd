import React from 'react'
import './MailList.css'

const MailList = () => {
  return (
    <div className='mail'>
    <h1 className="mailtitle">Save Time Save Money</h1>
    <span className="maildesc">Sign Up and send the best deals To You</span>
    <div className="mailinputcon">
        <input type="email"placeholder='Your Email' />
        <button>Subscribe</button>
    </div>
    </div>
  )
}

export default MailList