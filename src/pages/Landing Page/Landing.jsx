import React from "react"
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

import Navbar from "../../components/Navbar/Navbar"
import Footer from "../../components/Footer/Footer"

export default function Landing() {
    const navigate = useNavigate()
    return (
        <>
            <Navbar />
            {/*======= Hero =======*/}
            <div className={s.hero}>
                <div className={s.hero_content}>
                    <img className={s.hero_bg} src={planet} alt="planet image" />

                    <div className={s.hero_text}>
                        <h1>Envision</h1>
                        <p className={s.desc}>
                            Unleash your inner hero! Spark your imagination and create one of a kind stories with adventures designed just for you
                        </p>

                        <ConfigProvider //change color theme
                            theme={{
                                token: {
                                    colorPrimary: '#8993ED',
                                    fontSize: 16,
                                    sizeStep: 20,
                                }
                            }}
                        >
                            <Button
                                className={s.hero_startbtn}
                                type="primary"
                                size="large"
                                onClick={() => navigate('/CreateStory')}
                            >Start Now</Button>
                        </ConfigProvider>
                    </div>

                    {/*======= Down Arrow =======*/}
                    <Link className={s.arrow_link} to=''>
                        <DownOutlined style={{ color: '#ededed', fontSize: '20px' }} />
                    </Link>
                </div>


            </div>

            {/*======= Why Envision =======*/}
            <div className={s.feature_box}>
                <div className={s.feature_text}>
                    <h2>Why Envision?</h2>
                    <p>In Envision, we designed a complete platform to
                        start your journey in imagining your favorite experiences!</p>
                </div>

                <div className={s.feature_cards}>
                    <div className={s.card}>
                        <h3>Simple Steps For Your Story</h3>
                    </div>
                    <div className={s.card}>
                        <h3>Friendly Interface</h3>
                    </div>
                    <div className={s.card}>
                        <h3>Guardian Monitoring</h3>
                    </div>
                </div>
            </div>

            {/*======= goal =======*/}
            <div className={s.goal_box}>
                <h1>We want to empower children with autism to unleash
                    their <span>imagination</span> and <span>creativity</span> in their own special
                    worlds through visualized stories</h1>
            </div>

            {/* How to use */}
            <div className={s.steps}>
                <div className={s.steps_bg}>
                    <img className={s.magicwind} src={wind} alt="magic wind" />
                    <img className={s.magicball} src={ball} alt="magic ball" />
                </div>

                <div className={s.steps_left_column}>
                    <div className={s.step_box1}>
                        <h3>01  Choose your preferred way to build your story</h3>
                    </div>
                    <div className={s.step_box2}>
                        <h3>03  Enjoy reading your story</h3>
                    </div>
                </div>
                <div className={s.steps_right_column}>
                    <div className={s.step_box_title}>
                        <h2>How Magic Works!</h2>
                        <hr />
                    </div>
                    <div className={s.step_box3}>
                        <h3>02  Write a description of your story subject</h3>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}