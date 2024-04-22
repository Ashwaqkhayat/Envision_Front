import React from "react";
import { Link } from "react-router-dom";
import s from './Footer.module.css'
//importing images
import logo from '../../assets/images/logo.png'

export default function Footer() {
    const auth = JSON.parse(localStorage.getItem('user-info'))

    if (auth && auth.userType == "child") { //If user is a child, hide footer
        return (null)
    } else {
        return (

            <div className={s.footer}>
                <div className={s.left_side}>
                    <p>&copy; جميع الحقوق محفوظة</p>
                </div>
                <div className={s.middle}>
                    <img src={logo} alt="Envision Logo" />
                    <h2>تخيـّــــل</h2>
                </div>
                <div className={s.right_side}>
                    <Link to="/Contact">تواصل معنا</Link>
                </div>
            </div>
        )
    }
}