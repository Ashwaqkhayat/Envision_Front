import React, { useEffect, useRef, useState } from "react"
import s from './Landing_style.module.css'
//Navigations using buttons
import { Link, useNavigate } from "react-router-dom";
//photos
import userProfile from '../../assets/images/user-icon.jpg'
import planet from '../../assets/images/planet 1.png'
import ball from '../../assets/images/magicBall.png'
import wind from '../../assets/images/magicWind.png'
//Antd imports 
import { ConfigProvider, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons'
// Navbar + Footer
import Navbar from "../../components/Navbar/Navbar"
import Footer from "../../components/Footer/Footer"
// translation hook
import { useTranslation } from 'react-i18next';

// Parallax Images
import brush from '../../assets/images/parallax/brush.png'
import castle from '../../assets/images/parallax/castle.png'
import mountains from '../../assets/images/parallax/mountains.png'
import path from '../../assets/images/parallax/path.png'
import pegions from '../../assets/images/parallax/pegions.png'
import trees from '../../assets/images/parallax/trees.png'

export default function Landing() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate()
    // const lang = Cookies.get("i18next");
    // const [direc, setDirec] = "rtl";
    

    // Parallax Scripts
    let brushRef = useRef(null)
    let castleRef = useRef(null)
    let mountsRef = useRef(null)
    let treesRef = useRef(null)
    let pathRef = useRef(null)
    let pegionsRef = useRef(null)

    useEffect(() => {
        // brushRef.current.style.opacity = "80%"
        window.addEventListener('scroll', function () {
            let value = window.scrollY
            brushRef.current.style.top = value * 0.65 + 'px'
            pegionsRef.current.style.top = value * 0.45 + 'px'
            castleRef.current.style.top = value * 0.30 + 'px'
            mountsRef.current.style.top = value * 0.25 + 'px'
            treesRef.current.style.top = value * 0.35 + 'px'
            pathRef.current.style.top = value * 0.10 + 'px'
        })
    }, [])


    return (
        <>
            <div className={s.body}>
                <div className={s.parallax}>
                    <Navbar />
                    <div className={s.hero} id={s.hero}>
                        <div className={s.hero_text}>
                            <h1>{t('lp hero title')}</h1>
                            <p className={s.desc}>{t('lp hero desc')}</p>
                        </div>
                        <ConfigProvider theme={{ token: { colorPrimary: '#8993ED', sizeStep: 18, } }} >
                            <Button
                                style={{ height: "70px", fontSize: "18pt", fontWeight: "500" }}
                                className={s.hero_startbtn}
                                type="primary"
                                size="large"
                                onClick={() => navigate('/CreateStory')}
                            >{t('lp start button')}
                            </Button>
                        </ConfigProvider>
                    </div>
                    <img className={s.parallax_brush} id={s.brush} ref={brushRef} src={brush}></img>
                    <img className={`${s.parallax_castle} ${s.opac}`} ref={castleRef} id={s.castle} src={castle}></img>
                    <img className={`${s.parallax_mountains} ${s.opac}`} ref={mountsRef} id={s.mountains} src={mountains}></img>
                    <img className={`${s.parallax_trees} ${s.opac}`} ref={treesRef} id={s.trees} src={trees}></img>
                    <img className={`${s.parallax_path} ${s.opac}`} ref={pathRef} id={s.path} src={path}></img>
                    <img className={`${s.parallax_pegions} ${s.opac}`} ref={pegionsRef} id={s.pegions} src={pegions}></img>
                </div>
                <div className={s.main_content}>
                    {/*======= Why Envision =======*/}
                    <div className={s.feature_cont}>
                        <div className={s.feature_box}>
                            <div className={s.feature_text}>
                                <h2>{t('lp features title')}</h2>
                                <p style={{ fontWeight: '500', fontSize: '18pt', direction: 'rtl' }}>
                                {t('lp features desc')}
                                </p>
                            </div>

                            <div className={s.feature_cards}>
                                <div className={s.card}>
                                    <h3>{t('lp features 1')}</h3>
                                </div>
                                <div className={s.card}>
                                    <h3>{t('lp features 2')}</h3>
                                </div>
                                <div className={s.card}>
                                    <h3>{t('lp features 3')}</h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*======= goal =======*/}
                    <div className={s.goal_box}>
                        <div className={s.goal_content}>
                            <h1>
                            {t('lp goal 1')}<span>{t('lp goal 2')}</span>{t('lp goal and')}<span>{t('lp goal 3')}</span>{t('lp goal 4')}
                            </h1>
                        </div>
                    </div>

                    {/* How to use */}
                    <div className={s.steps}>
                        <div className={s.steps_bg}>
                            <img className={s.magicwind} src={wind} alt="magic wind" />
                            <img className={s.magicball} src={ball} alt="magic ball" />
                        </div>

                        <div className={s.steps_left_column}>
                            <div className={s.step_box1}>
                                <h3 style={{ direction: "rtl", textAlign: 'left' }}>{t('lp steps 1')}</h3>
                            </div>
                            <div className={s.step_box2}>
                                <h3 style={{ direction: "rtl", textAlign: 'left' }}>{t('lp steps 3')}</h3>
                            </div>
                        </div>
                        <div className={s.steps_right_column}>
                            <div className={s.step_box_title}>
                                <h2 style={{ direction: "rtl", textAlign: 'left' }}>{t('lp steps title')}</h2>
                                <hr />
                            </div>
                            <div className={s.step_box3}>
                                <h3 style={{ direction: "rtl", textAlign: 'left' }}>{t('lp steps 2')}</h3>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    )
}