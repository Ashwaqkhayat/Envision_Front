import React from "react"
import s from './Library_style.module.css'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'

function Library() {
    return (
        <>
            <div className={s.body}>
                <Navbar />
                <div className={`${s.content} ${s.center_flex}`}>

                </div>
            </div>
            <Footer />
        </>
    )
}

export default Library