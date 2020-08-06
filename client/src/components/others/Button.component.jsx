import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({ color, children, type, link, to, onClick, myStyle }) => {

    return link ? (
        <Link to={to} role='button' className={`btn btn-${color} ${myStyle ? myStyle : ''}`}>
            {children}
        </Link>
    ) :
        (
            <button type={type} onClick={onClick} className={`btn btn-${color} ${myStyle ? myStyle : ''}`}>
                {children}
            </button>
        )
}

export default Button
