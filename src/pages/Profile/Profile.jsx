import React, { useState, useEffect } from "react"
import s from './Profile_style.module.css'
import { useNavigate } from "react-router-dom";
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import ChildProfile from './Child/ChildProfile'
import GuardianProfile from './Guardian/GuardianProfile'
import { ConfigProvider } from 'antd';


function Profile() {
    const navigate = useNavigate()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user-info'))) 

    // If user not logged in then navigate to main page
    useEffect(() => {
        if (user===null) {
            navigate('/')
        }
    }, [])

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
                        {/* Check if usertype is child or guardian============= */}
                        {user && user.userType==="child" ?
                            // console.log("Work1", user)
                            <ChildProfile user={user} />
                        :
                            // console.log("Work", user)
                            <GuardianProfile user={user}/>
                        }         
                    </div>
                </ConfigProvider>
            </div>
            <Footer />
        </>
    )
}

export default Profile