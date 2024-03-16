import React from "react";
import { Link } from "react-router-dom";
import s from './Footer.module.css'
//importing images
import logo from '../../assets/images/base.png'

export default function Footer() {
    return (
        <div className={s.footer}>
            <div className={s.left_side}>
                <p>&copy; All rights reserved</p>
            </div>
            <div className={s.middle}>
                <img src={logo} alt="Envision Logo"/>
                    <h2>Envision</h2>
            </div>
            <div className={s.right_side}>
                <Link to="">Contact Us</Link>
            </div>
        </div>
    )
}