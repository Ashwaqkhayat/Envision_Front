import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import s from "./CreateStory_style.module.css"
import 'boxicons'

//Import components
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import Selection from './Selection'
import Description from './Description'
import Slide from '../../components/Slide/Slide'

//import Ant Components
import { ConfigProvider, message, Spin, Button } from 'antd'

function CreateStory() {
    // Slide animation
    const [startAnimate, setStartAnimate] = useState(true)
    const [btnIcon, setBtnIcon] = useState('right-arrow-circle')
    const [mode, setMode] = useState("Select")
    useEffect(() => {
        setBtnIcon(startAnimate ? 'left-arrow-circle' : 'right-arrow-circle')
        setMode(startAnimate ? 'Select' : 'Describe')
    }, [startAnimate])
    // Define variables
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
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
                        {isLoading ?
                            <div className={s.center_flex}> <Spin size="large" /> </div>
                            :
                            <div className={s.cont}>
                                <Slide startAnimate={startAnimate} />

                                <div className={s.form_changer}>
                                    <h2 style={{ color: '#b3b3b3', marginBottom: '10px' }}>{mode}</h2>
                                    <Button
                                        style={{ backgroundColor: 'transparent', padding: 30, border: 'none' }}
                                        shape="circle"
                                        onClick={() => {
                                            setStartAnimate(!startAnimate)
                                        }}
                                        icon={<box-icon
                                            name={btnIcon}
                                            size='70px'
                                            color="#b3b3b3" ></box-icon>}
                                    ></Button>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </ConfigProvider>
            <Footer />
        </>
    )
}

export default CreateStory