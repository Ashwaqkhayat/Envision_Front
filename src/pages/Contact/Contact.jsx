import React from 'react'
import s from './Contact_style.module.css'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'

function Contact(){
    return (
        <>
        <Navbar/>
        <div className={s.body}>
            <h1>Hi</h1>
        </div>
        <Footer/>
        </>
    )
}

export default Contact