import React from 'react'
import SpainFlag from '../assets/images/spain.svg';
function Nav() {
    return (
        <nav>
            <a href='/'><img src={SpainFlag} alt='es flag icon'></img> Spanish Verbs</a>
            <a className='dotted' href='/api'>API</a>
        </nav>
    )
}

export default Nav