import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import s from "./CreateStory_style.module.css"

//Import components
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import Selection from './Selection'
import Description from './Description'
import Slide1 from '../../components/Slide/Slide1'
import Slide2 from '../../components/Slide/Slide2'

//import Ant Components
import { ConfigProvider, message, Spin, Button, Switch } from 'antd'
import { RightOutlined } from '@ant-design/icons';

function CreateStory() {
    // Slide animation
    const [startAnimate, setStartAnimate] = useState(true)
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
                            <>
                                {/* <Slide1 startAnimate={startAnimate}>
                                    <div>
                                        <div className={s.wrapper}>
                                            <Selection />
                                        </div>
                                    </div>
                                </Slide1> */}

                                <div className={s.wrapper}>
                                    {startAnimate ? <Selection /> : <Description />}
                                </div>
                                <div className={s.form_changer}>
                                    <h2 style={{color:'#494C4C', marginBottom:'10px'}}>Mode</h2>
                                    <Switch 
                                    size="large" 
                                    defaultChecked 
                                    onChange={() => setStartAnimate(!startAnimate)} />
                                </div>
                            </>
                        }
                    </div>
                </div>
            </ConfigProvider>
            <Footer />
        </>
    )
}

export default CreateStory