import React, { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import s from './Profile_style.module.css'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import ChildProfile from './Child/ChildProfile'
import GuardianProfile from './Guardian/GuardianProfile'
import { ConfigProvider } from 'antd';

function Profile() {
    const navigate = useNavigate()
    const accType = JSON.parse(window.localStorage.getItem("user-info")).userType
    const [info, setInfo] = useState(null)
    //get user profile

    useEffect(() => {
        let url = accType === "child" ? "/children/profile" : "/guardians/profile"
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_url}${url}`, {
                    method: 'GET',
                    credentials: 'include',
                })
                if (response.ok) {
                    console.log("Profile fetched successfully")
                    const data = await response.json();
                    setInfo(JSON.parse(JSON.stringify(data)).profile)
                } else {
                    throw new Error(`Network response was not ok: ${response.status}`)
                }
            } catch (err) {
                console.error("Failed getting user's profile: ", err)
                localStorage.clear()
                navigate('/')
            }
        }

        fetchData()
    }, [])

    if (info !== null) {
        return (
            <>
                <div className={s.body}>
                    <ConfigProvider
                        theme={{
                            token: {
                                colorPrimary: '#8EC3B7',
                            }
                        }}
                    >
                        <Navbar />
                        <div className={`${s.content} ${s.center_flex}`}>
                            {info && accType === "child" ?
                                <ChildProfile info={info} />
                                :
                                <GuardianProfile info={info} />
                            }
                        </div>
                    </ConfigProvider>
                </div>
                <Footer />
            </>
        )
    }
}

export default Profile