import React from "react";
import s from './Navbar_style.module.css'
import { useNavigate, Link } from "react-router-dom";
//Antd buttons
import { ConfigProvider, Button, Flex } from 'antd';
import { UserOutlined } from '@ant-design/icons';
//importing images
import logo from '../../assets/images/logo.png'

export default function Navbar() {
    const navigate = useNavigate()
    const auth = JSON.parse(localStorage.getItem('user-info'))

    // React.useEffect(() => {
    //     const checkExpired = async () => {
    //         try {
    //             const response = await fetch(`${process.env.REACT_APP_url}/expired`, {
    //                 method: 'POST',
    //                 credentials: 'include',
    //             })
    //             if (response.status == 401 || response.status == 403) {
    //                 console.warn("Token invalid, signing out..")
    //                 localStorage.clear()
    //             } else {
    //                 // console.log("Token Valid.")
    //             }
    //         } catch (err) {
    //             console.error("Failed: ", err)
    //         }
    //     }
    //     checkExpired()
    // },[])

    return (
        <div className={s.nav}>
            <div className={s.nav_left}>
                <Flex gap="small" wrap="wrap">
                <ConfigProvider
                theme={{
                    token: {
                        sizeStep: 7,
                        colorPrimary: '#8993ED',
                        colorBgContainer: 'rgba(73, 76, 76, 0)',
                    }
                }} >
                    
                    {/* If user is authinticated/logged in then show the profile, otherwise show the login/register btns */}
                    {auth? 
                        <>
                        <Button 
                            type="primary"
                            onClick={() => {navigate('/profile')}}
                            shape="round" 
                            size="large"
                            icon={ <UserOutlined style={{ fontSize: '20px'}} /> }
                            > ملفي الشخصي </Button>

                            {auth.userType === "child" &&
                            <Button 
                            type="text" 
                            shape="round"
                            size="large"
                            onClick={() => {navigate('/library')}}
                            > مكتبتي</Button>
                            }

                            <Button 
                            type="text" 
                            shape="round"
                            size="large"
                            onClick={() => {navigate('/')}}
                            > الرئيسية</Button>
                            
                        </>
                    :
                        <>
                        <Button 
                        className={s.nav_register}
                        size="large"
                        onClick={() => navigate('/Signup')}
                        >التسجيل</Button>

                        <Button
                        className={s.nav_login}
                        type="primary"
                        size="large"
                        onClick={() => navigate('/Signin') }
                        >تسجيل الدخول</Button>                        
                        </>
                    }

                </ConfigProvider>
                </Flex>
            </div>

            <div className={s.nav_right}>
                {/* <a href='/'><img src={logo} className={s.nav_logo} alt="Envision Logo" /></a> */}
                <Link to='/' className={s.nav_title}>تخيـّـــــــل </Link>
            </div>
        </div>
    )
}