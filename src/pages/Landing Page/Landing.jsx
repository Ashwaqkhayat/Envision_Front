import React, { useEffect, useState, useRef } from "react"
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
// Parallax Images
import brush from '../../assets/images/parallax/brush.png'
import castle from '../../assets/images/parallax/castle.png'
import mountains from '../../assets/images/parallax/mountains.png'
import path from '../../assets/images/parallax/path.png'
import pegions from '../../assets/images/parallax/pegions.png'
import trees from '../../assets/images/parallax/trees.png'

import LandingBody from "./LandingBody"

export default function Landing() {
    const navigate = useNavigate()

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
                            <h1>مرحبـًـــا</h1>
                            <p className={s.desc}> اطلق العنان لبطلك الداخلي! انطلق بخيالك وابتكر قصة فريدة من نوعها مع مغامرات مصممة خصيصا لك
                            </p>
                        </div>
                        <ConfigProvider theme={{ token: { colorPrimary: '#8993ED', sizeStep: 18, } }} >
                            <Button
                                style={{ height: "70px", fontSize: "18pt", fontWeight: "500" }}
                                className={s.hero_startbtn}
                                type="primary"
                                size="large"
                                onClick={() => navigate('/CreateStory')}
                            >ابــدأ الآن
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
                                <h2>لم تخيـّــل؟</h2>
                                <p style={{ fontWeight: '500', fontSize: '18pt', direction: 'rtl' }}>
                                    في "تخيـّــل" ، قمنا بتصميم
                                    منصة كاملة لبدء رحلتك في تخيل تجاربك المفضلة!</p>
                            </div>

                            <div className={s.feature_cards}>
                                <div className={s.card}>
                                    <h3>خطوات بسيطة لإنشاء قصتك</h3>
                                </div>
                                <div className={s.card}>
                                    <h3>تصاميم تتبع معايير اضطراب التوحد</h3>
                                </div>
                                <div className={s.card}>
                                    <h3>مراقبة الأوصياء</h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*======= goal =======*/}
                    <div className={s.goal_box}>
                        <div className={s.goal_content}>
                            <h1>
                                نريد تمكين الأطفال المصابين بالتوحد من إطلاق العنان <span>لخيالهم</span> و<span>إبداعهم</span> في عوالمهم الخاصة من خلال القصص المصورة
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
                                <h3 style={{ direction: 'rtl', textAlign: 'left' }}>اختر اسلوبك المفضل في إنشاء قصتك</h3>
                            </div>
                            <div className={s.step_box2}>
                                <h3 style={{ direction: 'rtl', textAlign: 'left' }}>استمتع بقراءة قصتك الرائعة!</h3>
                            </div>
                        </div>
                        <div className={s.steps_right_column}>
                            <div className={s.step_box_title}>
                                <h2 style={{ direction: 'rtl', textAlign: 'left' }}>كيف نصنع القصص!</h2>
                                <hr />
                            </div>
                            <div className={s.step_box3}>
                                <h3 style={{ direction: 'rtl', textAlign: 'left' }}>حدد مكونات وأجزاء تكوين قصتك</h3>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    )
}