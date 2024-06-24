import React from 'react'
import Dashboard from '../../dashBoard/Dashboard'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

function Testing() {
  return (
    <div>
      <Dashboard/>
      <div style={{display: "flex"}}>
        <img className="responsive-image" width={560} src="Login.png" alt="" />
        <RegisterForm/>
      </div>
      <style jsx>{`
        .responsive-image {
          display: block;
        }
        @media (max-width: 768px) {
          .responsive-image {
            display: none;
          }
        }
      `}</style>
    </div>
  )
}

export default Testing
