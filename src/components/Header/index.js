import React from 'react'
import {Link} from 'react-router-dom'

export default function Header() {
    return (
        <div>
            <h1>Đây là Header</h1>
            <Link to="/">Home</Link>
            <Link to="/courses/fontend">Course List</Link>
            <Link to="/course/bootcamp">Course Detail </Link>
        </div>
    )
}
