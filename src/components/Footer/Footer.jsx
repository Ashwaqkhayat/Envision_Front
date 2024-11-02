import React from "react";
import { Link } from "react-router-dom";
import s from './Footer.module.css'
//importing images
import logo from '../../assets/images/test.png'
// translation hook
import { useTranslation } from 'react-i18next';

export default function Footer() {
    const auth = JSON.parse(localStorage.getItem('user-info'));
    const { t, i18n } = useTranslation();

    if (auth && auth.userType == "child") { //If user is a child, hide footer
        return (null)
    } else {
        return (

            <div className={s.footer}>
                <div className={s.left_side}>
                    <p>&copy; {t('footer rights')}</p>
                </div>
                <div className={s.middle}>
                    <img src={logo} alt="Envision Logo" />
                    <h2>{t('footer title')}</h2>
                </div>
                <div className={s.right_side}>
                    <Link to="/Contact">{t('footer contact')}</Link>
                </div>
            </div>
        )
    }
}