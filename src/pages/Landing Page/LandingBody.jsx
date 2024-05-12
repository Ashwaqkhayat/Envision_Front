import React, { useEffect, useState } from "react"
import s from './Landing_style.module.css'
//Navigations using buttons
import { Link, useNavigate } from "react-router-dom"
//photos
import ball from '../../assets/images/magicBall.png'
import wind from '../../assets/images/magicWind.png'
//Antd imports 
import { ConfigProvider, Button } from 'antd'
import { DownOutlined } from '@ant-design/icons'

export default function LandingBody() {
    return (
        <>
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
                            <h3 style={{ direction: 'rtl', textAlign: 'left' }}>01  اختر اسلوبك المفضل في إنشاء قصتك</h3>
                        </div>
                        <div className={s.step_box2}>
                            <h3 style={{ direction: 'rtl', textAlign: 'left' }}>03  استمتع بقراءة قصتك الرائعة!</h3>
                        </div>
                    </div>
                    <div className={s.steps_right_column}>
                        <div className={s.step_box_title}>
                            <h2 style={{ direction: 'rtl', textAlign: 'left' }}>كيف نصنع القصص!</h2>
                            <hr />
                        </div>
                        <div className={s.step_box3}>
                            <h3 style={{ direction: 'rtl', textAlign: 'left' }}>02  حدد مكونات وأجزاء تكوين قصتك</h3>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}