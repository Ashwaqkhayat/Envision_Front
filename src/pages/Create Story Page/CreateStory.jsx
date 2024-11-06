import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import s from "./CreateStory_style.module.css"
import 'boxicons'
//Import components
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import Slide from '../../components/Slide/Slide'
// translation hook
import { useTranslation } from 'react-i18next';
//import Ant Components
import { ConfigProvider, message, Button } from 'antd'

function CreateStory() {
    // Translation
    const { t, i18n } = useTranslation()
    // Slide animation
    const [startAnimate, setStartAnimate] = useState(true)
    const [mode, setMode] = useState(t("create story desc"))
    useEffect(() => {
        setMode(startAnimate ? t("create story desc") : t("create story selec"))
    }, [startAnimate])
    // Define variables
    const navigate = useNavigate()
    const [messageApi, contextHolder] = message.useMessage()
    const popMsg = (msg, type) => {
        messageApi.open({
            type: type,
            content: msg,
            duration: 3.5,
            style: {
                fontSize: '18px',
                justifyContent: 'center',
            },
        })
    }

    return (
        <>
            {contextHolder}
            <ConfigProvider theme={{ token: { colorPrimary: '#96CCC0', } }} >
                <div className={s.body}>
                    <Navbar />
                    <div className={`${s.content}`}>
                        <div className={s.cont} style={{direction: i18n.dir()}}>
                            <Slide startAnimate={startAnimate} />
                            <div className={`${s.form_changer} `}>
                                <h2 style={{ color: '#b3b3b3', marginBottom: '10px' }}>{mode}</h2>
                                <Button
                                    style={{ backgroundColor: 'transparent', padding: 30, border: 'none' }}
                                    shape="circle"
                                    onClick={() => {
                                        setStartAnimate(!startAnimate)
                                    }}
                                    icon={<box-icon
                                        className={s.arrowBtn}
                                        name='right-arrow-circle'
                                        style={startAnimate ? { transform: 'rotate(-180deg)' } : { transform: 'rotate(0deg)' }}
                                        size='70px'
                                        color="#b3b3b3" ></box-icon>}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </ConfigProvider>
            <Footer />
        </>
    )
}

export default CreateStory